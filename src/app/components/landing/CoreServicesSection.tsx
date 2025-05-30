// app/components/landing/CoreServicesSection.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CalendarDays, ClipboardList, ShoppingCart } from 'lucide-react';

const services = [
  {
    id: 'booking',
    icon: <CalendarDays size={36} strokeWidth={1.5} />,
    title: "Easy Service Booking",
    description: "Quickly book trusted farriers, vets, and other horse care. Simple and reliable.",
  },
  {
    id: 'profiles',
    icon: <ClipboardList size={36} strokeWidth={1.5} />,
    title: "Know Your Horse Better",
    description: "Keep all your horse's health, training, and care notes safe in one easy spot.",
  },
  {
    id: 'marketplace',
    icon: <ShoppingCart size={36} strokeWidth={1.5} />,
    title: "Top Quality Supplies",
    description: "Find the best food, gear, and supplies for your horse from brands you can trust.",
  }
];

const EMBLA_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center', // Center the active slide
  containScroll: 'trimSnaps', // Good for UX
  slidesToScroll: 1,
};

// Reusable Card Component
const ServiceCard = ({
  service,
  className,
  style,
}: {
  service: typeof services[0];
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`bg-sana-neutral-light p-6 sm:p-8 rounded-xl shadow-lg text-center flex flex-col items-center h-full ${className || ''}`}
    style={style}
  >
    <div className="text-sana-accent mb-4 sm:mb-5">
      {service.icon}
    </div>
    <h3 className="text-xl sm:text-2xl font-semibold text-sana-primary mb-2 sm:mb-3">
      {service.title}
    </h3>
    <p className="text-gray-700 text-sm sm:text-base font-elmessiri leading-relaxed">
      {service.description}
    </p>
  </div>
);

// Pagination Dots Component
const DotButton = ({ selected, onClick }: { selected: boolean; onClick: () => void }) => (
  <button
    className={`embla__dot w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full mx-1 transition-all duration-300
                ${selected ? 'bg-sana-primary scale-125' : 'bg-sana-accent opacity-50 hover:opacity-75'}`}
    type="button"
    onClick={onClick}
    aria-label="Go to slide"
  />
);

export default function CoreServicesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [slideOpacities, setSlideOpacities] = useState<number[]>([]);
  const [slideScales, setSlideScales] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());

    // Calculate opacity and scale for each slide
    const newOpacities: number[] = [];
    const newScales: number[] = [];
    emblaApi.slideNodes().forEach((_, index) => {
      if (index === emblaApi.selectedScrollSnap()) {
        newOpacities.push(1);
        newScales.push(1);
      } else {
        newOpacities.push(0.5); // Dim non-active slides
        newScales.push(0.9); // Slightly scale down non-active slides
      }
    });
    setSlideOpacities(newOpacities);
    setSlideScales(newScales);

  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi); // Initial setup of opacities/scales
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Re-run onSelect if Embla reinitializes

    // Clean up listeners
    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  if (!isMobile) {
    // Desktop Grid View
    return (
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sana-primary leading-tight">
              Caring for Your Horse,
              <br className="hidden md:block" />
              Made Simple with SANA.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-lg text-gray-600 font-elmessiri">
              We help you give the best care to your horse, like family. Here’s how SANA helps:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service) => (
              <ServiceCard
                service={service}
                key={service.id + "-desktop"}
                className="hover:shadow-2xl transition-all duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Mobile Carousel View
  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-0 sm:px-4 md:px-6"> {/* Adjusted padding for mobile */}
        <div className="text-center mb-12 px-4 sm:px-0"> {/* Added padding for text on mobile */}
          <h2 className="text-3xl sm:text-4xl font-bold text-sana-primary leading-tight">
            Caring for Your Horse,
            <br /> Made Simple with SANA.
          </h2>
          <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-md sm:text-lg text-gray-600 font-elmessiri">
            We help you give the best care to your horse, like family. Here’s how SANA helps:
          </p>
        </div>

        <div className="embla relative -mx-2 sm:mx-0" ref={emblaRef}>
          <div className="embla__container flex">
            {services.map((service, index) => (
              <div
                className="embla__slide min-w-0 flex-[0_0_75%] sm:flex-[0_0_70%] px-2 sm:px-3" // Slide takes up ~75% width, with padding
                key={service.id + "-mobile"}
              >
                <ServiceCard
                  service={service}
                  style={{
                    opacity: slideOpacities[index] !== undefined ? slideOpacities[index] : 0.5,
                    transform: `scale(${slideScales[index] !== undefined ? slideScales[index] : 0.9})`,
                    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {emblaApi && (
          <div className="embla__dots flex justify-center mt-6 sm:mt-8">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}