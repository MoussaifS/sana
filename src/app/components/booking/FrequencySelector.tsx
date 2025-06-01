'use client';


type FrequencySelectorProps = {
  value: 'One-time' | 'Annual';
  onChange: (value: 'One-time' | 'Annual') => void;
  onNext: () => void;
  onBack?: () => void;
};

export default function FrequencySelector({ value, onChange, onNext, onBack }: FrequencySelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Choose Service Frequency</h2>
      <p className="text-gray-600">Select how often you&apos;d like this service. Annual bookings receive a 10% discount.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all ${value === 'One-time' ? 'border-sana-primary bg-sana-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => onChange('One-time')}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${value === 'One-time' ? 'border-sana-primary' : 'border-gray-300'}`}>
              {value === 'One-time' && <div className="w-3 h-3 rounded-full bg-sana-primary"></div>}
            </div>
            <span className="ml-2 font-medium">One-time Service</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 pl-7">Book a single appointment for this service</p>
        </div>
        
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-all ${value === 'Annual' ? 'border-sana-primary bg-sana-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`}
          onClick={() => onChange('Annual')}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${value === 'Annual' ? 'border-sana-primary' : 'border-gray-300'}`}>
              {value === 'Annual' && <div className="w-3 h-3 rounded-full bg-sana-primary"></div>}
            </div>
            <span className="ml-2 font-medium">Annual Plan</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 pl-7">Regular service throughout the year (10% discount)</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        {onBack && (
          <button 
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
        <button 
          onClick={onNext}
          className="px-6 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors ml-auto"
        >
          Continue
        </button>
      </div>
    </div>
  );
}