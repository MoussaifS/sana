'use client';

import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-center mb-12">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Trimming Services Card */}
        <Link href="/trimming-services" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="h-48 bg-sana-primary flex items-center justify-center text-white text-xl font-semibold">
              Trimming Services
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-sana-primary transition-colors">Trimming Services</h2>
              <p className="text-gray-600">Professional hoof trimming services for your equine companions, ensuring proper foot health and comfort.</p>
              <div className="mt-4 flex justify-end">
                <span className="text-sana-primary font-medium flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Shrink Services Card */}
        <Link href="/shrink-services" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="h-48 bg-sana-primary flex items-center justify-center text-white text-xl font-semibold">
              Shrink Services
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-sana-primary transition-colors">Shrink Services</h2>
              <p className="text-gray-600">Specialized horseshoe fitting and adjustment services with options for steel, aluminum, and orthopedic solutions.</p>
              <div className="mt-4 flex justify-end">
                <span className="text-sana-primary font-medium flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}