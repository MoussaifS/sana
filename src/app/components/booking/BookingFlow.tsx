'use client';

import { useState } from 'react';
import FrequencySelector from './FrequencySelector';
import HorseCountSelector from './HorseCountSelector';
import DateSelector from './DateSelector';
import PriceSummary from './PriceSummary';
import BookingSummary from './BookingSummary';
import ShrinkTypeSelector from './ShrinkTypeSelector';

type BookingFlowProps = {
  serviceType: 'shrink' | 'trimming';
  basePrice: number;
  serviceName: string;
};

export default function BookingFlow({ serviceType, basePrice, serviceName }: BookingFlowProps) {
  // State for booking details
  const [currentStep, setCurrentStep] = useState(serviceType === 'shrink' ? 0 : 1);
  const [shrinkType, setShrinkType] = useState<'Steel' | 'Aluminum' | 'Orthopedic'>('Steel');
  const [frequency, setFrequency] = useState<'One-time' | 'Annual'>('One-time');
  const [horseCount, setHorseCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  // Price calculation
  const calculatePrice = () => {
    let price = basePrice;
    
    // Adjust price based on shrink type if applicable
    if (serviceType === 'shrink') {
      if (shrinkType === 'Aluminum') price *= 1.2; // 20% more expensive
      if (shrinkType === 'Orthopedic') price *= 1.5; // 50% more expensive
    }
    
    // Calculate total before discounts
    let total = price * horseCount;
    
    // Apply discounts
    if (frequency === 'Annual') total *= 0.9; // 10% annual discount
    if (horseCount >= 10) total *= 0.9; // 10% volume discount
    
    return total.toFixed(2);
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < getTotalSteps() - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get total number of steps
  const getTotalSteps = () => {
    return serviceType === 'shrink' ? 4 : 3; // Shoeing has an extra step
  };

  // Render current step
  const renderStep = () => {
    if (showSummary) {
      return (
        <BookingSummary
          serviceName={serviceName}
          shrinkType={serviceType === 'shrink' ? shrinkType : undefined}
          frequency={frequency}
          horseCount={horseCount}
          selectedDate={selectedDate}
          totalPrice={calculatePrice()}
          onBack={() => setShowSummary(false)}
        />
      );
    }

    switch (currentStep) {
      case 0: // Shoeing type (only for shrink service)
        return (
          <ShrinkTypeSelector
            value={shrinkType}
            onChange={setShrinkType}
            onNext={handleNextStep}
          />
        );
      case 1: // Frequency
        return (
          <FrequencySelector
            value={frequency}
            onChange={setFrequency}
            onNext={handleNextStep}
            onBack={serviceType === 'shrink' ? handlePrevStep : undefined}
          />
        );
      case 2: // Horse count
        return (
          <HorseCountSelector
            value={horseCount}
            onChange={setHorseCount}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3: // Date selection
        return (
          <DateSelector
            value={selectedDate}
            onChange={setSelectedDate}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {Array.from({ length: getTotalSteps() }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-sana-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < getTotalSteps() - 1 && (
                <div
                  className={`h-1 w-full ${
                    index < currentStep ? 'bg-sana-primary' : 'bg-gray-200'
                  }`}
                  style={{ width: '50px' }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current step */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {renderStep()}
      </div>

      {/* Price summary */}
      <PriceSummary
        basePrice={basePrice}
        shrinkType={serviceType === 'shrink' ? shrinkType : undefined}
        frequency={frequency}
        horseCount={horseCount}
        totalPrice={calculatePrice()}
      />
    </div>
  );
}