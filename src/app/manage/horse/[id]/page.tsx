'use client';

import { useRouter } from 'next/navigation';
import { useHorseContext } from '../../../context/HorseContext';
import { useState } from 'react';

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
        <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
        
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
                <option value="Steel Shoeing">Steel Shoeing</option>
                <option value="Aluminum Shoeing">Aluminum Shoeing</option>
                <option value="Orthopedic Shoeing">Orthopedic Shoeing</option>
                <option value="Vet Visit">Vet Visit</option>
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
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sana-primary text-white rounded-md"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function HorseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { horses, services } = useHorseContext();
  const [showServiceModal, setShowServiceModal] = useState(false);
  
  const horse = horses.find(h => h.id === params.id);
  const horseServices = services
    .filter(s => s.horseId === params.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (!horse) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">Horse not found</p>
        <button
          onClick={() => router.push('/manage')}
          className="px-4 py-2 bg-sana-primary text-white rounded-md"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <button
          onClick={() => router.push('/manage')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Horse Image */}
          <div className="md:w-1/3 h-64 md:h-auto relative">
            {horse.image ? (
              <img 
                src={horse.image} 
                alt={horse.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          
          {/* Horse Details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{horse.name}</h1>
              <button
                onClick={() => router.push(`/manage/add-horse?id=${horse.id}`)}
                className="text-sana-primary hover:underline"
              >
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600 font-medium">Breed</p>
                <p className="text-gray-800">{horse.breed}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Age</p>
                <p className="text-gray-800">{horse.age} years</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Gender</p>
                <p className="text-gray-800">{horse.gender}</p>
              </div>
            </div>
            
            {horse.notes && (
              <div className="mb-6">
                <p className="text-gray-600 font-medium">Notes</p>
                <p className="text-gray-800">{horse.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Services Section */}
        <div className="border-t p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Latest Related Services</h2>
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Add New Service
            </button>
          </div>
          
          {horseServices.length > 0 ? (
            <div className="space-y-3">
              {horseServices.map(service => (
                <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <span className="font-medium">{service.type}</span>
                  <span className="text-gray-600">{formatDate(service.date)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No services recorded yet</p>
          )}
        </div>
      </div>

      {/* Service Modal */}
      {showServiceModal && (
        <ServiceModal 
          horseId={horse.id} 
          onClose={() => setShowServiceModal(false)} 
        />
      )}
    </div>
  );
}