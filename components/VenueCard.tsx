import React, { useState } from 'react';
import { MapPin, Users, Star, ArrowRight, Eye, X, Check } from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onClick: (venue: Venue) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleCloseQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickView(false);
  };

  const handleFullDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickView(false);
    onClick(venue);
  };

  return (
    <>
      <div 
        className="group bg-white rounded-2xl border border-secondary/30 overflow-hidden hover:shadow-xl hover:border-brand/30 transition-all duration-300 cursor-pointer flex flex-col h-full relative"
        onClick={() => onClick(venue)}
      >
        {/* Image Area */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={venue.imageUrl} 
            alt={venue.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center">
            <Star className="w-3.5 h-3.5 text-secondary fill-secondary mr-1" />
            <span className="text-xs font-bold text-primary">{venue.rating}</span>
          </div>
          <div className="absolute bottom-3 left-3 bg-brand/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
             <span className="text-xs font-semibold text-white uppercase tracking-wider">{venue.type}</span>
          </div>
          
          {/* Quick View Trigger */}
          <button
            onClick={handleQuickViewClick}
            className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-primary hover:text-brand hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 z-10"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-lg font-bold text-primary line-clamp-1 group-hover:text-brand transition-colors">{venue.name}</h3>
          </div>
          
          <div className="flex items-center text-primary/60 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{venue.address}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="bg-tertiary/30 p-2 rounded-lg">
                <p className="text-xs text-primary/60 mb-0.5">Capacity</p>
                <div className="flex items-center text-primary font-medium">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-brand" />
                  {venue.guestCapacity}
                </div>
             </div>
             <div className="bg-tertiary/30 p-2 rounded-lg">
                <p className="text-xs text-primary/60 mb-0.5">Price / Event</p>
                <div className="text-primary font-medium">
                  ₹{venue.pricePerEvent.toLocaleString('en-IN')}
                </div>
             </div>
          </div>
          
          <div className="mt-auto pt-3 border-t border-secondary/20 flex items-center text-brand text-sm font-semibold group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in" onClick={handleCloseQuickView}>
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[80vh] md:max-h-none animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-48 md:h-auto relative">
              <img 
                src={venue.imageUrl} 
                alt={venue.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-brand/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {venue.type}
              </div>
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-6 flex flex-col relative">
              <button 
                onClick={handleCloseQuickView}
                className="absolute top-4 right-4 p-2 hover:bg-tertiary/50 rounded-full text-primary/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-primary mb-2 pr-8">{venue.name}</h2>
              
              <div className="flex items-center text-primary/60 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {venue.address}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                 <div className="flex items-center bg-tertiary/40 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 text-secondary fill-secondary mr-1.5" />
                    <span className="font-bold text-primary">{venue.rating}</span>
                 </div>
                 <div className="text-lg font-bold text-brand">
                    ₹{venue.pricePerEvent.toLocaleString('en-IN')}
                 </div>
              </div>

              <p className="text-primary/70 text-sm leading-relaxed mb-6 line-clamp-3">
                {venue.description}
              </p>

              <div className="space-y-2 mb-8">
                <p className="text-xs font-bold text-primary/50 uppercase tracking-wider">Key Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md bg-tertiary/50 text-primary/80 text-xs font-medium border border-secondary/10">
                      <Check className="w-3 h-3 mr-1 text-brand" /> {amenity}
                    </span>
                  ))}
                  {venue.amenities.length > 4 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 text-primary/60 text-xs font-medium">
                      +{venue.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <button 
                onClick={handleFullDetailsClick}
                className="w-full py-3 bg-brand hover:bg-brand/90 text-white rounded-xl font-bold shadow-lg shadow-brand/20 transition-all flex items-center justify-center group"
              >
                View Full Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
