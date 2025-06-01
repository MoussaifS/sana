'use client';

import { useState } from 'react';
import { Horse } from '../page';
import Image from 'next/image';

type HorseDetailViewProps = {
  horse: Horse;
  onBack: () => void;
  onEdit: () => void;
  onAddService: (type: string) => void;
};

export default function HorseDetailView({ horse, onBack, onEdit, onAddService }: HorseDetailViewProps) {
  const [showServiceModal, setShowServiceModal] = useState(false);
  
  // Service types for the modal
  const serviceTypes = ['Trimming', 'Steel Shoeing', 'Aluminum Shoeing', 'Orthopedic Shoeing', 'Vet Visit', 'Dental Care', 'Vaccination'];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      {/* Back button */}
      <div className="p-4 bg-gray-50 border-b">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Horse image */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              {horse.image ? (
                <Image 
                  src={horse.image} 
                  alt={horse.name} 
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Horse details */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{horse.name}</h2>
              <button
                onClick={onEdit}
                className="text-sana-primary hover:text-opacity-80 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Breed</h3>
                <p className="text-gray-800">{horse.breed}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age</h3>
                <p className="text-gray-800">{horse.age} years</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p className="text-gray-800">{horse.gender}</p>
              </div>
            </div>
            
            {horse.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{horse.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Services section */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Latest Related Services</h3>
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-3 py-1 bg-sana-primary text-white text-sm rounded-md hover:bg-opacity-90 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Service
            </button>
          </div>
          
          {horse.services.length === 0 ? (
            <div className="bg-gray-50 rounded-md p-4 text-center text-gray-500">
              No services recorded yet
            </div>
          ) : (
            <div className="space-y-3">
              {horse.services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-md p-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{service.type}</h4>
                    <p className="text-sm text-gray-500">{service.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Add Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Service</h3>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  className="w-full text-left p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    onAddService(type);
                    setShowServiceModal(false);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowServiceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}