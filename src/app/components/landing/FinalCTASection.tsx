// app/components/landing/FinalCTASection.tsx
import Link from 'next/link';
import { Scissors, Construction, PlusCircle } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="w-full py-20 md:py-32 bg-sana-neutral-light text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-sana-primary mb-6">
          Ready to Give Your Horse the Best?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700 font-elmessiri mb-10">
          Join many happy horse owners, stable managers, and vets in Saudi Arabia
          who trust SANA for easy bookings and total horse care.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
           <Link
            href="/book/trimming"
            className="inline-flex items-center justify-center rounded-md bg-sana-accent px-8 py-3 text-base font-medium text-sana-primary shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-sana-accent focus:ring-offset-2"
          >
            <Scissors size={20} className="mr-2" /> Book Hoof Trimming Now
          </Link>
          <Link
            href="/book/shoeing"
            className="inline-flex items-center justify-center rounded-md bg-sana-primary px-8 py-3 text-base font-medium text-white shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-sana-primary focus:ring-offset-2"
          >
            <Construction size={20} className="mr-2" /> Schedule Shoeing Service
          </Link>
        </div>
         <div className="mt-6">
          <Link
            href="/profile/create"
            className="inline-flex items-center text-base font-medium text-sana-primary hover:text-sana-accent transition-colors"
          >
             <PlusCircle size={20} className="mr-1" /> Or, Start Your Horse&apos;s Profile
          </Link>
        </div>
      </div>
    </section>
  );
}