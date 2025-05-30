'use client';

import { HorseProvider } from '../context/HorseContext';

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HorseProvider>
      <main className="min-h-screen bg-gray-50 pt-6">
        {children}
      </main>
    </HorseProvider>
  );
}