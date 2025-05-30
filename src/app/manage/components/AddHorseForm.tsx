'use client';

import { useState, useEffect } from 'react';
import { Horse } from '../page';
import Image from 'next/image';

type AddHorseFormProps = {
  onSubmit: (horse: any) => void;
  initialData?: Horse;
  isEditing?: boolean;
};

export default function AddHorseForm({ onSubmit, initialData, isEditing = false }: AddHorseFormProps) {
  // Form state
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Gelding'>('Male');
  const [image, setImage] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Populate form with initial data if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBreed(initialData.breed);
      setAge(initialData.age);
      setGender(initialData.gender);
      setImage(initialData.image);
      setPreviewUrl(initialData.image);
      setNotes(initialData.notes);
    }
  }, [initialData]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !breed || age === '' || !gender) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create horse object
    const horse = {
      name,
      breed,
      age: Number(age),
      gender,
      image: previewUrl,
      notes,
    };
    
    // If editing, include the ID and services
    if (isEditing && initialData) {
      onSubmit({
        ...horse,
        id: initialData.id,
        services: initialData.services,
      });
    } else {
      onSubmit(horse);
    }
  };

  // Handle image upload (mock)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImage(url);
  };

  // Handle using placeholder images
  const handleUsePlaceholder = () => {
    // Use an existing image from the project
    setPreviewUrl('/ChatGPT.png');
    setImage('/ChatGPT.png');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditing ? 'Edit Horse' : 'Add New Horse'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : '')}
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
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Preview */}
            <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={previewUrl} 
                    alt="Horse preview" 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="text-gray-400 text-sm text-center">No image selected</span>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              {/* Upload button */}
              <label className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition-colors">
                <span>Upload Image</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              
              {/* Use placeholder button */}
              <button
                type="button"
                onClick={handleUsePlaceholder}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
              >
                Use Placeholder
              </button>
              
              {/* Remove image button */}
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setImage(null);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md cursor-pointer hover:bg-red-200 transition-colors"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
          />
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            {isEditing ? 'Update Horse' : 'Add Horse'}
          </button>
        </div>
      </form>
    </div>
  );
}