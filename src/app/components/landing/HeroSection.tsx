// app/components/landing/HeroWithTabs.tsx
"use client"; // Still needed for Headless UI client components

import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { Scissors, Construction, PlusCircle } from 'lucide-react';
import { Fragment } from 'react'; // Often needed with Headless UI for groups

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function HeroWithTabs() {
  const tabs = [
    {
      key: 'services',
      name: 'Book Services',
      content: (
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sana-primary tracking-tight leading-tight">
            Expert Care for Your Horse,
            <br />
            Instantly Booked.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-elmessiri">
            Find trusted farriers for trimming, shoeing, and other essential services.
            Give your horse the best, without the hassle.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/book/trimming"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-sana-accent px-8 py-3 text-base font-medium text-sana-primary shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-sana-accent focus:ring-offset-2"
            >
              <Scissors size={20} className="mr-2" /> Book Hoof Trimming
            </Link>
            <Link
              href="/book/shoeing"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-sana-primary px-8 py-3 text-base font-medium text-white shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-sana-primary focus:ring-offset-2"
            >
              <Construction size={20} className="mr-2" /> Book Shoeing Service
            </Link>
          </div>
        </div>
      ),
    },
    {
      key: 'profiles',
      name: 'Manage Horse Profiles',
      content: (
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sana-primary tracking-tight leading-tight">
            Your Horse&apos;s Story,
            <br />
            All in One Secure Place.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-elmessiri">
            Create a complete profile for your cherished companion. Track health,
            progress, and share securely with your vet or trainer.
          </p>
          <div className="mt-10">
            <Link
              href="/profile/create"
              className="inline-flex items-center justify-center rounded-md bg-sana-primary px-10 py-4 text-lg font-medium text-white shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-sana-primary focus:ring-offset-2"
            >
              <PlusCircle size={22} className="mr-2" /> Create Your Horse&apos;s Profile
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-sana-neutral-light text-center">
      <div className="container mx-auto px-4 md:px-6">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex justify-center mb-8 md:mb-12">
            {tabs.map((tab) => (
              <Tab key={tab.key} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      'px-6 py-3 text-lg font-medium focus:outline-none transition-colors duration-200 ease-in-out',
                      selected
                        ? 'border-b-2 border-sana-primary text-sana-primary'
                        : 'text-gray-500 hover:text-sana-primary/80 hover:border-b-2 hover:border-sana-primary/30'
                    )}
                  >
                    {tab.name}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.key} className="focus:outline-none">
                {tab.content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        <p className="mt-16 text-sm text-gray-600 font-elmessiri">
          Trusted by discerning horse owners across Saudi Arabia.
        </p>
      </div>
    </section>
  );
}