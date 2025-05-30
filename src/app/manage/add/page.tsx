'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddHorsePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'male',
    image: null,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    // In a real app, this would handle file uploads
    // For prototype, we'll just store the file object
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send data to an API
    // For prototype, we'll store in localStorage
    const horses = JSON.parse(localStorage.getItem('horses') || '[]');
    const newHorse = {
      id: Date.now().toString(),
      ...formData,
      // If no image was uploaded, use a placeholder
      image: formData.image || 'https://placehold.co/400x300?text=Horse+Image'
    };
    
    horses.push(newHorse);
    localStorage.setItem('horses', JSON.stringify(horses));
    
    // Navigate to the dashboard
    router.push('/manage');
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="breed">Breed*</label>
            <input
              id="breed"
              name="breed"
              type="text"
              required
              value={formData.breed}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
            />
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sana-primary"
              />
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
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Add Horse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}