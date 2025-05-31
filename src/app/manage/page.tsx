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
  color: string;
  activities: string[];
};

// Predefined lists for filters
const BREEDS = [
  "All Breeds",
  "Arabian", 
  "Thoroughbred", 
  "Anglo-Arabian", 
  "Akhal-Teke", 
  "Barb", 
  "Egyptian Arabian", 
  "Shagya Arabian", 
  "Marwari", 
  "Quarter Horse", 
  "Warmblood", 
  "Appaloosa", 
  "Andalusian", 
  "Friesian"
];

const COLORS = [
  "All Colors",
  "Bay", 
  "Chestnut", 
  "Black", 
  "Grey", 
  "White", 
  "Palomino", 
  "Buckskin", 
  "Dun", 
  "Roan", 
  "Pinto / Piebald", 
  "Appaloosa", 
  "Cremello", 
  "Perlino", 
  "Grullo", 
  "Liver Chestnut", 
  "Dapple Grey", 
  "Fleabitten Grey", 
  "Sorrel"
];

const ACTIVITIES = [
  "Show Jumping",
  "Endurance Riding",
  "Flat Racing",
  "Dressage",
  "Tent Pegging",
  "Polo",
  "Arabian Horse Shows",
  "Leisure Riding & Tourism"
];

export default function ManageHorsesPage() {
  const router = useRouter();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [filteredHorses, setFilteredHorses] = useState<Horse[]>([]);
  
  // Filter states
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 30]);
  const [selectedBreed, setSelectedBreed] = useState("All Breeds");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For prototype, we'll get from localStorage
    const storedHorses = JSON.parse(localStorage.getItem('horses') || '[]');
    setHorses(storedHorses);
    setFilteredHorses(storedHorses);
  }, []);

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...horses];
    
    // Filter by age range
    result = result.filter(horse => {
      const age = parseInt(horse.age);
      return age >= ageRange[0] && age <= ageRange[1];
    });
    
    // Filter by breed
    if (selectedBreed !== "All Breeds") {
      result = result.filter(horse => horse.breed === selectedBreed);
    }
    
    // Filter by color
    if (selectedColor !== "All Colors") {
      result = result.filter(horse => horse.color === selectedColor);
    }
    
    // Filter by activities
    if (selectedActivities.length > 0) {
      result = result.filter(horse => {
        // If horse has no activities property, treat as empty array
        const horseActivities = horse.activities || [];
        return selectedActivities.some(activity => horseActivities.includes(activity));
      });
    }
    
    setFilteredHorses(result);
  }, [horses, ageRange, selectedBreed, selectedColor, selectedActivities]);

  // Function to clear all horse data from localStorage
  const clearAllHorses = () => {
    if (confirm('Are you sure you want to clear all horse data? This action cannot be undone.')) {
      localStorage.removeItem('horses');
      setHorses([]);
      setFilteredHorses([]);
    }
  };

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => {
      if (prev.includes(activity)) {
        return prev.filter(a => a !== activity);
      } else {
        return [...prev, activity];
      }
    });
  };

  const resetFilters = () => {
    setAgeRange([0, 30]);
    setSelectedBreed("All Breeds");
    setSelectedColor("All Colors");
    setSelectedActivities([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Your Horses</h1>
        <div className="flex space-x-3">
          {horses.length > 0 && (
            <>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              <button
                onClick={clearAllHorses}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All Data
              </button>
            </>
          )}
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
      </div>
      
      {/* Filters Section */}
      {showFilters && horses.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filter Horses</h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-sana-primary hover:underline"
            >
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Age Range Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Age Range</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="0" 
                  max="30"
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                  className="w-20 px-2 py-1 border rounded-md"
                />
                <span>to</span>
                <input 
                  type="number" 
                  min="0" 
                  max="30"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                  className="w-20 px-2 py-1 border rounded-md"
                />
                <span>years</span>
              </div>
            </div>
            
            {/* Breed Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Breed</label>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
              >
                {BREEDS.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>
            
            {/* Color Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
              >
                {COLORS.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            
            {/* Activities Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Activities</label>
              <div className="max-h-32 overflow-y-auto border rounded-md p-2">
                {ACTIVITIES.map(activity => (
                  <div key={activity} className="flex items-center mb-1 last:mb-0">
                    <input
                      type="checkbox"
                      id={`filter-${activity}`}
                      checked={selectedActivities.includes(activity)}
                      onChange={() => handleActivityToggle(activity)}
                      className="mr-2 h-4 w-4 text-sana-primary focus:ring-sana-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`filter-${activity}`} className="text-sm text-gray-700">
                      {activity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredHorses.length} of {horses.length} horses
          </div>
        </div>
      )}
      
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
      ) : filteredHorses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">No Matching Horses</h2>
          <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHorses.map((horse) => (
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
                    <p><span className="font-medium">Color:</span> {horse.color}</p>
                  </div>
                  
                  {/* Display Activities */}
                  {horse.activities && horse.activities.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-600 mb-1">Activities:</p>
                      <div className="flex flex-wrap gap-1">
                        {horse.activities.slice(0, 3).map(activity => (
                          <span 
                            key={activity} 
                            className="px-2 py-0.5 bg-sana-neutral-light text-sana-primary text-xs rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                        {horse.activities.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{horse.activities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}