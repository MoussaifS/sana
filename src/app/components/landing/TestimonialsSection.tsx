// app/components/landing/TestimonialsSection.tsx
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
// import Image from 'next/image'; // Uncomment if using Next/Image

const testimonials = [
  {
    id: 'sarah',
    name: "Sarah Al-Otaibi",
    role: "Stable Manager",
    quote: "SANA has transformed how I manage my stable. Booking services and tracking horse health has never been easier. It's an indispensable tool for our daily operations.",
    image: "/placeholder-sarah.jpg"
  },
  {
    id: 'mohammed',
    name: "Dr. Mohammed Al-Harbi",
    role: "Equine Veterinarian",
    quote: "As a veterinarian, having access to complete SANA horse profiles allows me to provide more informed and efficient care. The streamlined scheduling system is a significant advantage.",
    image: "/placeholder-mohammed.jpg"
  },
  {
    id: 'layla',
    name: "Layla Al-Fahad",
    role: "Horse Owner",
    quote: "The SANA marketplace offers everything I need for my horses, and the quality of products is exceptional. Managing my horse's health records is now so straightforward. Highly recommended!",
    image: "/placeholder-layla.jpg"
  },
  {
    id: 'ahmed',
    name: "Ahmed Al-Ghamdi",
    role: "Rider & Trainer",
    quote: "The performance tracking is invaluable for preparing for competitions. SANA keeps all my horse's data organized and accessible.",
    image: "/placeholder-ahmed.jpg"
  },
];

const EMBLA_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start',
  slidesToScroll: 1,
};

// Reusable Testimonial Card
const TestimonialCard = ({
  testimonial,
  className,
  style,
}: {
  testimonial: typeof testimonials[0];
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`bg-sana-neutral-light p-6 rounded-xl shadow-lg flex flex-col items-center text-center h-full ${className || ''}`}
    style={style}
  >
    <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 border-2 border-sana-accent"
    />
    <p className="text-gray-700 font-elmessiri italic text-sm sm:text-base mb-4 leading-relaxed">"{testimonial.quote}"</p>
    <h3 className="text-md sm:text-lg font-semibold text-sana-primary">{testimonial.name}</h3>
    <p className="text-xs sm:text-sm text-sana-accent font-medium">{testimonial.role}</p>
  </div>
);

export default function TestimonialsSection() {
  // Remove isMobile state as we'll use the carousel for all screen sizes
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  const [slideOpacities, setSlideOpacities] = useState<number[]>([]);

  const onSelectOrResize = useCallback((emblaApi: EmblaCarouselType) => {
    const newOpacities: number[] = [];
    const slidesInView = emblaApi.slidesInView();
    const selectedSnap = emblaApi.selectedScrollSnap();

    emblaApi.slideNodes().forEach((_, slideIndex) => {
        if (slidesInView.includes(slideIndex)) {
            const distance = Math.abs(slideIndex - selectedSnap);
            if (distance === 0) {
                newOpacities.push(1);
            } else if (distance === 1 && slidesInView.length > 1) {
                newOpacities.push(0.7);
            } else {
                newOpacities.push(0.6);
            }
        } else {
            newOpacities.push(0.4);
        }
    });
    setSlideOpacities(newOpacities);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelectOrResize(emblaApi);
    emblaApi.on('select', onSelectOrResize);
    emblaApi.on('resize', onSelectOrResize);
    emblaApi.on('reInit', onSelectOrResize);

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelectOrResize);
        emblaApi.off('resize', onSelectOrResize);
        emblaApi.off('reInit', onSelectOrResize);
      }
    };
  }, [emblaApi, onSelectOrResize]);

  // Unified view for both mobile and desktop
  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sana-primary">
            Trusted by Equestrian Leaders in Saudi Arabia
          </h2>
        </div>

        <div className="embla relative mx-auto max-w-7xl" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <div
                className="embla__slide min-w-0 flex-[0_0_90%] xs:flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] px-3 sm:px-4"
                key={testimonial.id}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  style={{
                    opacity: slideOpacities[index] !== undefined ? slideOpacities[index] : 0.5,
                    transition: 'opacity 0.4s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease',
                    transform: slideOpacities[index] === 1 ? 'scale(1.02)' : 'scale(1)',
                  }}
                  className="hover:shadow-xl transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="text-sm text-gray-500 italic">
            Swipe or wait for auto-scroll
          </div>
        </div>
      </div>
    </section>
  );
}