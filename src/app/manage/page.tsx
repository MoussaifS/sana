'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Horse = {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  image: string;
  notes: string;
};

export default function ManageHorsesPage() {
  const router = useRouter();
  const [horses, setHorses] = useState<Horse[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For prototype, we'll get from localStorage
    const storedHorses = JSON.parse(localStorage.getItem('horses') || '[]');
    setHorses(storedHorses);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Your Horses</h1>
        <button
          onClick={() => router.push('/manage/add')}
          className="px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Horse
        </button>
      </div>
      
      {horses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">No Horses Added Yet</h2>
          <p className="text-gray-500 mb-6">Add your first horse to start managing your equestrian care.</p>
          <button
            onClick={() => router.push('/manage/add')}
            className="px-6 py-3 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Add Your First Horse
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horses.map((horse) => (
            <Link href={`/manage/${horse.id}`} key={horse.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={horse.image} 
                    alt={horse.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{horse.name}</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Breed:</span> {horse.breed}</p>
                    <p><span className="font-medium">Age:</span> {horse.age} years</p>
                    <p><span className="font-medium">Gender:</span> {horse.gender === 'male' ? 'Male' : 'Female'}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}