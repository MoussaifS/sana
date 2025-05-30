'use client';

type ShrinkTypeSelectorProps = {
  value: 'Steel' | 'Aluminum' | 'Orthopedic';
  onChange: (value: 'Steel' | 'Aluminum' | 'Orthopedic') => void;
  onNext: () => void;
};

export default function ShrinkTypeSelector({ value, onChange, onNext }: ShrinkTypeSelectorProps) {
  const options = [
    {
      id: 'Steel',
      title: 'Steel',
      description: 'Standard steel shoes, durable and economical',
      priceNote: 'Base price'
    },
    {
      id: 'Aluminum',
      title: 'Aluminum',
      description: 'Lightweight aluminum shoes, ideal for performance horses',
      priceNote: '+20% price'
    },
    {
      id: 'Orthopedic',
      title: 'Orthopedic',
      description: 'Specialized therapeutic shoes for horses with hoof issues',
      priceNote: '+50% price'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Select Shrink Type</h2>
      <p className="text-gray-600">Choose the type of horseshoe material that best suits your horse's needs.</p>
      
      <div className="space-y-4 mt-4">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${value === option.id ? 'border-sana-primary bg-sana-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => onChange(option.id as 'Steel' | 'Aluminum' | 'Orthopedic')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${value === option.id ? 'border-sana-primary' : 'border-gray-300'}`}>
                  {value === option.id && <div className="w-3 h-3 rounded-full bg-sana-primary"></div>}
                </div>
                <span className="ml-2 font-medium">{option.title}</span>
              </div>
              <span className="text-sm text-gray-500">{option.priceNote}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 pl-7">{option.description}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
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