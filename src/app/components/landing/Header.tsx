'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative h-12 w-32 md:w-40">
            <Image 
              src="/Horizontal black.png" 
              alt="SANA Logo" 
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-sana-primary transition-colors font-medium"
            >
              Services
            </Link>
            <Link 
              href="/shrink-services" 
              className="text-gray-700 hover:text-sana-primary transition-colors font-medium"
            >
              Shrink Services
            </Link>
            <Link 
              href="/trimming-services" 
              className="text-gray-700 hover:text-sana-primary transition-colors font-medium"
            >
              Trimming Services
            </Link>
            <Link 
              href="/manage" 
              className="text-gray-700 hover:text-sana-primary transition-colors font-medium"
            >
              Manage Your Horse
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md bg-sana-primary px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-90 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Link 
              href="/contact" 
              className="mr-4 inline-flex items-center justify-center rounded-md bg-sana-primary px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 transition-colors"
            >
              Contact
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-sana-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-3 px-4 z-50">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-sana-primary transition-colors font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/shrink-services" 
                className="text-gray-700 hover:text-sana-primary transition-colors font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Shrink Services
              </Link>
              <Link 
                href="/trimming-services" 
                className="text-gray-700 hover:text-sana-primary transition-colors font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Trimming Services
              </Link>
              <Link 
                href="/manage" 
                className="text-gray-700 hover:text-sana-primary transition-colors font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Your Horse
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}