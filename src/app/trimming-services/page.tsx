'use client';

import BookingHeader from '../components/booking/BookingHeader';
import BookingFlow from '../components/booking/BookingFlow';

export default function TrimmingServicesPage() {
  // Mock data for the service
  const serviceData = {
    title: "Trimming Services",
    description: "Professional hoof trimming services for your horses. Regular trimming helps maintain proper hoof balance and prevents lameness issues. Our experienced farriers provide expert care for your equine companions.",
    images: [
      "/public/ChatGPT.png", // Using existing image as placeholder
      "/public/Horizontal black.png", // Using existing image as placeholder
    ],
    basePrice: 100, // Base price in SAR
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <BookingHeader 
        title={serviceData.title}
        description={serviceData.description}
        images={serviceData.images}
      />
      
      <BookingFlow 
        serviceType="trimming"
        basePrice={serviceData.basePrice}
        serviceName={serviceData.title}
      />
    </main>
  );
}