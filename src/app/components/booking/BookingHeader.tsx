export default function BookingHeader({ 
  title, 
  description, 
  images = [] 
}: { 
  title: string; 
  description: string; 
  images?: string[] 
}) {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
      {/* Image gallery */}
      <div className="relative h-64 md:h-80">
        <div className="flex h-full">
          {images.length > 0 ? (
            images.map((src, index) => (
              <div key={index} className="flex-1 relative">
                <img 
                  src={src} 
                  alt={`${title} - Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="flex-1 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Service images</span>
            </div>
          )}
        </div>
      </div>

      {/* Service info */}
      <div className="p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}