'use client';

type BookingSummaryProps = {
  serviceName: string;
  shrinkType?: 'Steel' | 'Aluminum' | 'Orthopedic';
  frequency: 'One-time' | 'Annual';
  horseCount: number;
  selectedDate: Date | null;
  totalPrice: string;
  onBack: () => void;
};

export default function BookingSummary({ 
  serviceName, 
  shrinkType, 
  frequency, 
  horseCount, 
  selectedDate, 
  totalPrice,
  onBack 
}: BookingSummaryProps) {
  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate booking reference
  const bookingReference = `SANA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Booking Confirmed!</h2>
      <p className="text-gray-600 text-center">Your booking has been successfully created. Here&apos;s a summary of your booking details.</p>
      
      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{serviceName}</span>
          </div>
          
          {shrinkType && (
            <div className="flex justify-between">
              <span className="text-gray-600">Shrink Type:</span>
              <span className="font-medium">{shrinkType}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Frequency:</span>
            <span className="font-medium">{frequency}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Number of Horses:</span>
            <span className="font-medium">{horseCount}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Preferred Date:</span>
            <span className="font-medium">{formatDate(selectedDate)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Total Price:</span>
            <span className="font-bold text-sana-primary">{totalPrice} SAR</span>
          </div>
          
          <div className="flex justify-between border-t pt-4 mt-4">
            <span className="text-gray-600">Booking Reference:</span>
            <span className="font-bold">{bookingReference}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-3 mt-8">
        <button 
          className="w-full px-6 py-3 bg-sana-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          onClick={() => window.print()}
        >
          Print Invoice
        </button>
        
        <button 
          onClick={onBack}
          className="w-full px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Booking
        </button>
      </div>
    </div>
  );
}