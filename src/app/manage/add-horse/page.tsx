'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHorseContext } from '../../context/HorseContext';

export default function AddHorsePage() {
  const router = useRouter();
  const { addHorse, updateHorse, horses } = useHorseContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Gelding'>('Male');
  const [image, setImage] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Check URL for edit mode
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    
    if (id) {
      const horse = horses.find(h => h.id === id);
      if (horse) {
        setIsEditing(true);
        setEditId(id);
        setName(horse.name);
        setBreed(horse.breed);
        setAge(horse.age);
        setGender(horse.gender);
        setImage(horse.image);
        setPreviewUrl(horse.image);
        setNotes(horse.notes);
      }
    }
  }, [horses]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload the file to a server
      // For this prototype, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImage(url);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const horseData = {
      name,
      breed,
      age,
      gender,
      image,
      notes
    };

    if (isEditing && editId) {
      updateHorse(editId, horseData);
    } else {
      addHorse(horseData);
    }

    // Navigate to dashboard
    router.push('/manage');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Horse' : 'Add New Horse'}
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Horse Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Horse Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
              required
            />
          </div>
          
          {/* Breed */}
          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
              Breed *
            </label>
            <input
              type="text"
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
              required
            />
          </div>
          
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="number"
              id="age"
              min="0"
              max="40"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
              required
            />
          </div>
          
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Gelding')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Gelding">Gelding</option>
            </select>
          </div>
          
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horse Image (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                  <span>Upload Image</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              {previewUrl && (
                <div className="h-20 w-20 relative rounded-md overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Horse preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/manage')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Add Horse'}
          </button>
        </div>
      </form>
    </div>
  );
}