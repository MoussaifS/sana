'use client';

import BookingHeader from '../components/booking/BookingHeader';
import BookingFlow from '../components/booking/BookingFlow';

export default function ShrinkServicesPage() {
  // Mock data for the service
  const serviceData = {
    title: "Shrink Services",
    description: "Professional horse shoeing services with various shrink types including steel, aluminum, and orthopedic options. Our expert farriers provide quality service for your equine companions.",
    images: [
      "/public/ChatGPT.png", // Using existing image as placeholder
      "/public/Horizontal black.png", // Using existing image as placeholder
    ],
    basePrice: 150, // Base price in SAR
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <BookingHeader 
        title={serviceData.title}
        description={serviceData.description}
        images={serviceData.images}
      />
      
      <BookingFlow 
        serviceType="shrink"
        basePrice={serviceData.basePrice}
        serviceName={serviceData.title}
      />
    </main>
  );
}