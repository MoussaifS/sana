'use client';

type PriceSummaryProps = {
  basePrice: number;
  shrinkType?: 'Steel' | 'Aluminum' | 'Orthopedic';
  frequency: 'One-time' | 'Annual';
  horseCount: number;
  totalPrice: string;
};

export default function PriceSummary({ basePrice, shrinkType, frequency, horseCount, totalPrice }: PriceSummaryProps) {
  // Calculate individual discounts for display
  const annualDiscount = frequency === 'Annual' ? 10 : 0;
  const volumeDiscount = horseCount >= 10 ? 10 : 0;
  
  // Calculate shrink type price adjustment
  let typeAdjustment = 0;
  if (shrinkType === 'Aluminum') typeAdjustment = 20;
  if (shrinkType === 'Orthopedic') typeAdjustment = 50;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Summary</h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Base price:</span>
          <span className="font-medium">{basePrice.toFixed(2)} SAR</span>
        </div>
        
        {shrinkType && shrinkType !== 'Steel' && (
          <div className="flex justify-between">
            <span className="text-gray-600">{shrinkType} type adjustment:</span>
            <span className="font-medium">+{typeAdjustment}%</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Number of horses:</span>
          <span className="font-medium">x{horseCount}</span>
        </div>
        
        {annualDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Annual plan discount:</span>
            <span>-{annualDiscount}%</span>
          </div>
        )}
        
        {volumeDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Volume discount:</span>
            <span>-{volumeDiscount}%</span>
          </div>
        )}
      </div>
      
      <div className="border-t pt-3 flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-xl font-bold text-sana-primary">{totalPrice} SAR</span>
      </div>
    </div>
  );
}