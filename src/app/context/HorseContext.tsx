'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

// Define types
export type Horse = {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female' | 'Gelding';
  image: string | null;
  notes: string;
  color: string;
  activities: string[];
};

export type Service = {
  id: string;
  horseId: string;
  type: string;
  date: Date;
};

type HorseContextType = {
  horses: Horse[];
  services: Service[];
  addHorse: (horse: Omit<Horse, 'id'>) => void;
  updateHorse: (id: string, horse: Omit<Horse, 'id'>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
};

const HorseContext = createContext<HorseContextType | undefined>(undefined);

// Sample data
const sampleHorses: Horse[] = [
  {
    id: '1',
    name: 'Thunder',
    breed: 'Arabian',
    age: 7,
    gender: 'Male',
    image: '/Horizontal black.png', // Using existing image as placeholder
    notes: 'Champion jumper, very energetic.',
    color: 'Bay',
    activities: ['Show Jumping', 'Dressage']
  },
];

const sampleServices: Service[] = [
  {
    id: '1',
    horseId: '1',
    type: 'Trimming',
    date: new Date(2023, 4, 12) // May 12
  },
  {
    id: '2',
    horseId: '1',
    type: 'Steel Shrink',
    date: new Date(2023, 3, 18) // April 18
  },
  {
    id: '3',
    horseId: '1',
    type: 'Vet Visit',
    date: new Date(2023, 2, 22) // March 22
  },
];

export function HorseProvider({ children }: { children: ReactNode }) {
  const [horses, setHorses] = useState<Horse[]>(sampleHorses);
  const [services, setServices] = useState<Service[]>(sampleServices);

  const addHorse = (horse: Omit<Horse, 'id'>) => {
    const newHorse = {
      ...horse,
      id: Math.random().toString(36).substring(2, 9),
    };
    setHorses([...horses, newHorse]);
  };

  const updateHorse = (id: string, horse: Omit<Horse, 'id'>) => {
    setHorses(horses.map(h => h.id === id ? { ...horse, id } : h));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: Math.random().toString(36).substring(2, 9),
    };
    setServices([...services, newService]);
  };

  return (
    <HorseContext.Provider value={{ horses, services, addHorse, updateHorse, addService }}>
      {children}
    </HorseContext.Provider>
  );
}

export function useHorseContext() {
  const context = useContext(HorseContext);
  if (context === undefined) {
    throw new Error('useHorseContext must be used within a HorseProvider');
  }
  return context;
}