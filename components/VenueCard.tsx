import React from 'react';
import { MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onClick: (venue: Venue) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-2xl border border-secondary/30 overflow-hidden hover:shadow-xl hover:border-brand/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
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
          <Star className="w-3.5 h-3.5 text-brand fill-brand mr-1" />
          <span className="text-xs font-bold text-primary">{venue.rating}</span>
        </div>
        <div className="absolute bottom-3 left-3 bg-brand/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
           <span className="text-xs font-semibold text-white uppercase tracking-wider">{venue.type}</span>
        </div>
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
  );
};