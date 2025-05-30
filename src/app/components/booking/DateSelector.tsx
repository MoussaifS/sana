'use client';

type DateSelectorProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function DateSelector({ value, onChange, onNext, onBack }: DateSelectorProps) {
  // Simple date formatting function
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Preferred Date (Optional)</h2>
      <p className="text-gray-600">Select your preferred date for the service. We'll try to accommodate your preference.</p>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sana-primary focus:border-transparent"
          value={value ? value.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            onChange(date);
          }}
        />
      </div>
      
      {value && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-800">
          Selected date: {formatDate(value)}
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