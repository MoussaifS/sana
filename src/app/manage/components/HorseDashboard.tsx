'use client';

import { Horse } from '../page';
import Image from 'next/image';
import { useState } from 'react';

type HorseDashboardProps = {
  horses: Horse[];
  onSelectHorse: (horse: Horse) => void;
  onAddNewHorse: () => void;
};

export default function HorseDashboard({ horses, onSelectHorse, onAddNewHorse }: HorseDashboardProps) {
  // Animation state for cards
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Your Horses</h2>
        <button
          onClick={onAddNewHorse}
          className="px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Horse
        </button>
      </div>
      
      {horses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Horses Added Yet</h3>
          <p className="text-gray-500 mb-6">Add your first horse to get started with managing your equine companions.</p>
          <button
            onClick={onAddNewHorse}
            className="px-6 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Your First Horse
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horses.map((horse) => (
            <div 
              key={horse.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 ${hoveredId === horse.id ? 'scale-105 shadow-lg' : ''}`}
              onClick={() => onSelectHorse(horse)}
              onMouseEnter={() => setHoveredId(horse.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-48 w-full">
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
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{horse.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Breed:</span> {horse.breed}</p>
                  <p><span className="font-medium">Age:</span> {horse.age} years</p>
                  <p><span className="font-medium">Gender:</span> {horse.gender}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{horse.services.length} services</span>
                  <span className="text-sana-primary text-sm font-medium">View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}