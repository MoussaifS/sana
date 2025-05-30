// app/components/landing/HorseProfileSpotlight.tsx
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const features = [
  { text: "Health Tracking: Monitor shots, vet visits, and your horse's wellbeing in one place." },
  { text: "Performance Stats: Track training progress and competition results easily." },
  { text: "Secure Sharing: Share information with your vet, trainer, or caretakers when needed." }
];

export default function HorseProfileSpotlight() {
  return (
    <section className="w-full py-16 md:py-24 bg-sana-neutral-light relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* First column with ChatGPT.png image */}
          <div className="aspect-video rounded-xl shadow-xl overflow-hidden relative mx-auto w-full max-w-md">
            <Image 
              src="/ChatGPT.png" 
              alt="ChatGPT" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Mobile centering for the second column */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sana-primary mb-6 leading-tight">
              Track Your Horse's Journey
            </h2>
            <p className="text-lg text-gray-700 font-elmessiri mb-8 leading-relaxed">
              Create your horse's digital profile today and keep all important information at your fingertips. Start managing your equine companion more effectively!
            </p>
            <ul className="space-y-4 mb-10 max-w-md mx-auto md:mx-0">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700 font-elmessiri">
                  <CheckCircle2 size={22} className="text-sana-primary mr-3 shrink-0 mt-1" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center md:justify-start">
              <Link
                href="/profile/create"
                className="inline-flex items-center justify-center rounded-md bg-sana-primary px-8 py-3 text-base font-medium text-white shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-sana-primary focus:ring-offset-2"
              >
                Create Your Horse's Profile Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}