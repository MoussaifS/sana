// app/page.tsx
import HeroSection from '../app/components/landing/HeroSection';
import CoreServicesSection from '../app/components/landing/CoreServicesSection';
import HorseProfileSpotlight from '../app/components/landing/HorseProfileSpotlight';
import TestimonialsSection from '../app/components/landing/TestimonialsSection';
import FinalCTASection from '../app/components/landing/FinalCTASection';
// import Footer from '@/components/landing/Footer'; // This specific Footer for the landing page

import Footer from "../app/components/landing/Footer"


export default function HomePage() {
  return (
    // The <main> tag here is part of the landing page's specific structure.
    // The overall <html> and <body> tags with global styles (like font) come from app/layout.tsx
    <main className="flex min-h-screen flex-col items-center"> {/* Removed justify-between for natural flow */}
      <HeroSection />
      <CoreServicesSection />
      <HorseProfileSpotlight />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}