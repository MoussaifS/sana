'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

// Predefined lists for dropdowns
const BREEDS = [
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

export default function AddHorsePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    breed: BREEDS[0],  // Default to first breed
    color: COLORS[0],  // Default to first color
    age: '',
    gender: 'male',
    image: null,
    notes: '',
    activities: [] as string[]
  });
  
  // Form validation state
  const [errors, setErrors] = useState({
    name: false,
    breed: false,
    color: false,
    age: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleActivityChange = (activity: string) => {
    setFormData(prev => {
      const activities = [...prev.activities];
      if (activities.includes(activity)) {
        return { ...prev, activities: activities.filter(a => a !== activity) };
      } else {
        return { ...prev, activities: [...activities, activity] };
      }
    });
  };

  const handleImageChange = (e) => {
    // In a real app, this would handle file uploads
    // For prototype, we'll just store the file object
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      breed: !formData.breed,
      color: !formData.color,
      age: !formData.age
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, this would send data to an API
    // For prototype, we'll store in localStorage
    const horses = JSON.parse(localStorage.getItem('horses') || '[]');
    const newHorse = {
      id: uuidv4(), // Generate unique ID
      ...formData,
      // If no image was uploaded, use a placeholder
      image: formData.image || 'https://placehold.co/400x300?text=Horse+Image',
    };
    
    horses.push(newHorse);
    localStorage.setItem('horses', JSON.stringify(horses));
    
    // Navigate to the horse detail page
    router.push(`/manage/${newHorse.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.push('/manage')} 
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Add New Horse</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">Horse Name*</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">Horse name is required</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="breed">Breed*</label>
            <select
              id="breed"
              name="breed"
              required
              value={formData.breed}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary ${errors.breed ? 'border-red-500' : ''}`}
            >
              {BREEDS.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
            {errors.breed && <p className="text-red-500 text-sm mt-1">Breed is required</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="color">Color*</label>
            <select
              id="color"
              name="color"
              required
              value={formData.color}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary ${errors.color ? 'border-red-500' : ''}`}
            >
              {COLORS.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            {errors.color && <p className="text-red-500 text-sm mt-1">Color is required</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="age">Age*</label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min="0"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary ${errors.age ? 'border-red-500' : ''}`}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">Age is required</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="gender">Gender*</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="image">Horse Image (Optional)</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
            />
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Preview" className="h-40 object-cover rounded-md" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
            ></textarea>
          </div>
          
          {/* Activities Multi-select */}
          <div>
            <label className="block text-gray-700 mb-2">Activities</label>
            <div className="grid grid-cols-2 gap-2">
              {ACTIVITIES.map(activity => (
                <div key={activity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`activity-${activity}`}
                    checked={formData.activities.includes(activity)}
                    onChange={() => handleActivityChange(activity)}
                    className="mr-2 h-4 w-4 text-sana-primary focus:ring-sana-primary border-gray-300 rounded"
                  />
                  <label htmlFor={`activity-${activity}`} className="text-sm text-gray-700">
                    {activity}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Add Horse
          </button>
        </form>
      </div>
    </div>
  );
}