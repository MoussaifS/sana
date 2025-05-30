'use client';

type HorseCountSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function HorseCountSelector({ value, onChange, onNext, onBack }: HorseCountSelectorProps) {
  const handleIncrement = () => {
    if (value < 10) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Number of Horses</h2>
      <p className="text-gray-600">Select how many horses need this service. 10 or more horses receive an additional 10% discount.</p>
      
      <div className="flex items-center justify-center space-x-6 my-8">
        <button 
          onClick={handleDecrement}
          disabled={value <= 1}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        
        <div className="text-4xl font-semibold text-gray-800 w-16 text-center">{value}</div>
        
        <button 
          onClick={handleIncrement}
          disabled={value >= 10}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
      
      {value >= 10 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm">
          Volume discount: 10% off for booking 10 or more horses!
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <button 
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="px-6 py-2 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}