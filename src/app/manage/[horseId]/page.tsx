'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { generateHorseQRPDF } from '../../utils/PDFTemplate';
// Import Horse and Service types from context
import { useHorseContext, Horse, Service } from '../../context/HorseContext';

// Service Modal Component
type ServiceModalProps = {
  horseId: string;
  onClose: () => void;
};

function ServiceModal({ horseId, onClose }: ServiceModalProps) {
  const { addService } = useHorseContext();
  const [serviceType, setServiceType] = useState('Trimming');
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addService({
      horseId,
      type: serviceType,
      date: new Date(serviceDate)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Schedule New Service</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Trimming">Trimming</option>
                <option value="Steel Shrink">Steel Shrink</option>
                <option value="Aluminum Shrink">Aluminum Shrink</option>
                <option value="Orthopedic Shrink">Orthopedic Shrink</option>
                <option value="Vet Visit">Vet Visit</option>
                <option value="Dental Care">Dental Care</option>
                <option value="Vaccination">Vaccination</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Schedule Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Define the correct types for Next.js App Router (supporting both old and new patterns)
interface HorseDetailPageProps {
  params: Promise<{
    horseId: string;
  }>;
}

export default function HorseDetailPage({ params }: HorseDetailPageProps) {
  const router = useRouter();
  const { services } = useHorseContext();

  // Use the Horse type for the horse state
  const [horse, setHorse] = useState<Horse | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [horseId, setHorseId] = useState<string>('');
  const qrCodeRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    // Resolve the params Promise and initialize the component
    const initializeComponent = async () => {
      try {
        const resolvedParams = await params;
        const currentHorseId = resolvedParams.horseId;
        setHorseId(currentHorseId);
        
        // In a real app, this would fetch from an API
        // For prototype, we'll get from localStorage
        // It's better to get this from context or API in a real app
        const storedHorses = JSON.parse(localStorage.getItem('horses') || '[]');
        const foundHorse = storedHorses.find((h: Horse) => h.id === currentHorseId);
        
        if (foundHorse) {
          setHorse(foundHorse);
          // Set the share URL
          setShareUrl(`${window.location.origin}/manage/${currentHorseId}`);
        } else {
          // Horse not found, redirect to dashboard
          router.push('/manage');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error resolving params:', error);
        setLoading(false);
        router.push('/manage');
      }
    };

    initializeComponent();
  }, [params, router]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('horse-qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        // Download the PNG
        const downloadLink = document.createElement('a');
        downloadLink.download = `${horse?.name || 'horse'}-QR.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const generatePDF = async () => {
    if (!horse) return;
    
    const qrCodeElement = document.getElementById('horse-qr-code');
    if (!qrCodeElement) return;
    
    try {
      const success = await generateHorseQRPDF(horse, qrCodeElement);
      
      if (!success) {
        alert('Failed to generate PDF. Please try again.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sana-primary"></div>
      </div>
    );
  }

  if (!horse) return null;

  // Get horse services from context
  const horseServices = services
    .filter((s: Service) => s.horseId === horseId)
    .sort((a: Service, b: Service) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.push('/manage')} 
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">{horse.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Horse Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img 
                src={horse.image} 
                alt={horse.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Breed</h3>
                  <p className="text-gray-800 font-semibold">{horse.breed}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Age</h3>
                  <p className="text-gray-800 font-semibold">{horse.age} years</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Gender</h3>
                  <p className="text-gray-800 font-semibold">{horse.gender === 'male' ? 'Male' : 'Female'}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">Color</h3>
                  <p className="text-gray-800 font-semibold">{horse.color}</p>
                </div>
              </div>
              
              {/* Activities Section */}
              {horse.activities && horse.activities.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-gray-500 text-sm font-medium mb-2">Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {horse.activities.map((activity: string, index: number) => (
                      <span 
                        key={`${activity}-${index}`} 
                        className="px-3 py-1 bg-sana-neutral-light text-sana-primary text-sm rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {horse.notes && (
                <div className="mt-4">
                  <h3 className="text-gray-500 text-sm font-medium mb-2">Notes</h3>
                  <p className="text-gray-700">{horse.notes}</p>
                </div>
              )}
              
              <div className="mt-6 flex space-x-4">
                <button className="px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors">
                  Edit Details
                </button>
                <button 
                  onClick={() => setShowServiceModal(true)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Schedule Service
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Latest Services and QR Code */}
        <div className="space-y-6">
          {/* QR Code Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Share this Horse</h2>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <QRCodeSVG 
                  id="horse-qr-code"
                  ref={qrCodeRef}
                  value={shareUrl} 
                  size={150} 
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                />
              </div>
              <div className="space-y-2 w-full">
                <button
                  onClick={handleCopyLink}
                  className="w-full px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copySuccess ? 'Link Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={handleDownloadQR}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download QR Code
                </button>
                <button
                  onClick={generatePDF}
                  className="w-full px-4 py-2 bg-sana-accent text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Branded PDF
                </button>
              </div>
            </div>
          </div>
          
          {/* Latest Services */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Related Services</h2>
            
            <div className="space-y-4">
              {horseServices.length > 0 ? (
                horseServices.map((service: Service) => (
                  <div key={service.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{service.type}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(service.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        Scheduled
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No services scheduled yet</p>
              )}
            </div>
            
            <button 
              onClick={() => setShowServiceModal(true)}
              className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Schedule New Service
            </button>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {showServiceModal && (
        <ServiceModal 
          horseId={horseId} 
          onClose={() => setShowServiceModal(false)} 
        />
      )}
    </div>
  );
}