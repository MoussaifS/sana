'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock data for services
const mockServices = [
  { id: 1, name: 'Trimming Service', date: '2023-10-15', status: 'Completed' },
  { id: 2, name: 'Shrink Service (Steel)', date: '2023-11-02', status: 'Scheduled' },
  { id: 3, name: 'Veterinary Check-up', date: '2023-09-28', status: 'Completed' },
];

export default function HorseDetailPage({ params }: { params: { horseId: string } }) {
  const router = useRouter();
  const [horse, setHorse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For prototype, we'll get from localStorage
    const storedHorses = JSON.parse(localStorage.getItem('horses') || '[]');
    const foundHorse = storedHorses.find(h => h.id === params.horseId);
    
    if (foundHorse) {
      setHorse(foundHorse);
    } else {
      // Horse not found, redirect to dashboard
      router.push('/manage');
    }
    
    setLoading(false);
  }, [params.horseId, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sana-primary"></div>
      </div>
    );
  }

  if (!horse) return null;

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
              </div>
              
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
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Schedule Service
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Latest Services */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Related Services</h2>
            
            <div className="space-y-4">
              {mockServices.map(service => (
                <div key={service.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(service.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center">
              View All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}