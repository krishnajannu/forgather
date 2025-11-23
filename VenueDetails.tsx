import React, { useState } from 'react';
import { ArrowLeft, MapPin, Users, Check, Star, X, Share2, Heart, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { Venue } from '../types';
import { BookingCalendar } from './BookingCalendar';

interface VenueDetailsProps {
  venue: Venue;
  onBack: () => void;
}

// Mock reviews data
const REVIEWS = [
  {
    id: 1,
    author: "Ananya Patel",
    date: "October 15, 2023",
    rating: 5,
    content: "Absolutely stunning venue! The staff was incredibly helpful throughout the planning process. The lighting in the evening was magical."
  },
  {
    id: 2,
    author: "Rohan Mehta",
    date: "September 2, 2023",
    rating: 4,
    content: "Great location and amenities. The food catering service they recommended was delicious. Parking was a bit tight for our guest count, but the valets handled it well."
  },
  {
    id: 3,
    author: "Siddharth Verma",
    date: "August 20, 2023",
    rating: 5,
    content: "Hosted my daughter's wedding here. It was a dream come true. Highly recommended for large gatherings."
  }
];

export const VenueDetails: React.FC<VenueDetailsProps> = ({ venue, onBack }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [bookingState, setBookingState] = useState<'IDLE' | 'SUCCESS'>('IDLE');
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image and gallery for the carousel
  const allImages = [venue.imageUrl, ...venue.gallery];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingState('SUCCESS');
    setTimeout(() => setBookingState('IDLE'), 3000);
  };

  const handleShare = () => {
    // In a real application, this would use the Web Share API or copy to clipboard
    alert(`Link to ${venue.name} copied to clipboard!`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="animate-fade-in">
      {/* Header Controls */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-secondary/30 px-4 py-3 flex items-center justify-between md:hidden">
        <button onClick={onBack} className="flex items-center text-primary/70 font-medium">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <span className="font-semibold text-primary truncate max-w-[200px]">{venue.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Desktop Back Button */}
        <button 
          onClick={onBack} 
          className="hidden md:flex items-center text-primary/60 hover:text-brand transition-colors mb-6 group"
        >
          <div className="p-2 rounded-full bg-white border border-secondary/30 group-hover:border-brand/30 mr-2 shadow-sm">
             <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to results</span>
        </button>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{venue.name}</h1>
            <div className="flex items-center text-primary/60">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span className="mr-4">{venue.address}</span>
              <div className="flex items-center bg-tertiary/30 px-2 py-1 rounded-md border border-secondary/20">
                <Star className="w-4 h-4 text-brand fill-brand mr-1.5" />
                <span className="font-bold text-primary mr-1">{venue.rating}</span>
                <span className="text-primary/60 text-sm">({venue.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
             <button 
                onClick={handleShare}
                className="flex items-center justify-center px-4 py-2 border border-secondary/30 rounded-lg text-primary/70 font-medium hover:bg-tertiary/30 transition-colors"
             >
                <Share2 className="w-4 h-4 mr-2" /> Share
             </button>
             <button 
                onClick={handleSave}
                className={`flex items-center justify-center px-4 py-2 border rounded-lg font-medium transition-colors ${
                  isSaved 
                    ? 'border-danger/20 bg-danger/5 text-danger' 
                    : 'border-secondary/30 text-primary/70 hover:bg-danger/5 hover:text-danger'
                }`}
             >
                <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} /> 
                {isSaved ? 'Saved' : 'Save'}
             </button>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-8 group bg-tertiary/20 select-none">
           {/* Main Image */}
           <img 
             src={allImages[currentImageIndex]} 
             alt={`Venue view ${currentImageIndex + 1}`} 
             className="w-full h-full object-cover transition-opacity duration-300 cursor-pointer"
             onClick={() => setShowGallery(true)}
           />
           
           {/* Navigation Arrows */}
           <button 
             onClick={handlePrevImage}
             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
             aria-label="Previous image"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           
           <button 
             onClick={handleNextImage}
             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
             aria-label="Next image"
           >
             <ChevronRight className="w-6 h-6" />
           </button>

           {/* Image Counter / Dots */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
             {allImages.map((_, idx) => (
               <button
                 key={idx}
                 onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                 className={`h-2 rounded-full transition-all shadow-sm ${
                   idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80 w-2'
                 }`}
                 aria-label={`Go to image ${idx + 1}`}
               />
             ))}
           </div>
           
           {/* View All Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}
             className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-primary px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm flex items-center transition-colors shadow-sm z-10"
           >
             <Grid className="w-3.5 h-3.5 mr-1.5" />
             View Gallery
           </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            {/* Overview Cards */}
            <div className="flex flex-wrap gap-4 mb-8">
               <div className="flex-1 min-w-[140px] bg-brand/5 border border-brand/10 p-4 rounded-xl">
                  <p className="text-primary/60 text-sm mb-1">Price per Event</p>
                  <p className="text-xl font-bold text-primary">₹{venue.pricePerEvent.toLocaleString()}</p>
               </div>
               <div className="flex-1 min-w-[140px] bg-tertiary/30 border border-secondary/20 p-4 rounded-xl">
                  <p className="text-primary/60 text-sm mb-1">Guest Capacity</p>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary/80 mr-2" />
                    <p className="text-xl font-bold text-primary">{venue.guestCapacity}</p>
                  </div>
               </div>
               <div className="flex-1 min-w-[140px] bg-tertiary/30 border border-secondary/20 p-4 rounded-xl">
                  <p className="text-primary/60 text-sm mb-1">Venue Type</p>
                  <p className="text-lg font-bold text-primary">{venue.type}</p>
               </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-3">About this venue</h2>
              <p className="text-primary/80 leading-relaxed">{venue.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center text-primary/80">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3 text-primary">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="mb-8">
               <h2 className="text-xl font-bold text-primary mb-4">Location</h2>
               <div className="h-64 bg-tertiary/20 rounded-xl w-full relative overflow-hidden border border-secondary/20 flex items-center justify-center group">
                  {/* Simulated Map */}
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_New_York_City_%281898%29.jpg')] bg-cover opacity-30"></div>
                  <div className="relative z-10 flex flex-col items-center">
                      <MapPin className="w-10 h-10 text-brand drop-shadow-md mb-2 animate-bounce" />
                      <button className="bg-white px-4 py-2 rounded-lg shadow-md font-semibold text-primary text-sm hover:bg-tertiary/30">
                        Open in Google Maps
                      </button>
                  </div>
               </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-secondary/20 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary">User Reviews</h2>
                <div className="flex items-center">
                   <Star className="w-5 h-5 text-brand fill-brand mr-1" />
                   <span className="text-lg font-bold text-primary mr-1">{venue.rating}</span>
                   <span className="text-primary/60">({venue.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-secondary/10 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                         <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold mr-3 text-sm">
                            {review.author.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div>
                            <p className="font-semibold text-primary text-sm">{review.author}</p>
                            <p className="text-xs text-primary/60">{review.date}</p>
                         </div>
                      </div>
                      <div className="flex items-center bg-tertiary/30 px-2 py-1 rounded">
                         <Star className="w-3.5 h-3.5 text-brand fill-brand mr-1" />
                         <span className="text-sm font-bold text-primary">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-primary/80 text-sm leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-secondary/30 shadow-xl shadow-primary/5 p-6">
                <div className="flex justify-between items-end mb-6 pb-4 border-b border-secondary/20">
                  <div>
                    <span className="text-primary/60 text-sm">Starting from</span>
                    <div className="text-2xl font-bold text-primary">₹{venue.pricePerEvent.toLocaleString()}</div>
                  </div>
                  <span className="px-2 py-1 bg-secondary/30 text-primary text-xs font-bold rounded uppercase">Available</span>
                </div>

                <form onSubmit={handleBook}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-primary mb-1.5">Select Date</label>
                    <BookingCalendar />
                  </div>

                  <div className="mb-6">
                     <label className="block text-sm font-medium text-primary mb-1.5">Guests (Approx.)</label>
                     <input 
                       type="number" 
                       min="1" 
                       max={venue.guestCapacity} 
                       placeholder={`Max ${venue.guestCapacity}`} 
                       className="w-full px-3 py-2 bg-tertiary/20 border border-secondary/30 rounded-lg text-primary focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all placeholder:text-primary/40" 
                       required 
                     />
                  </div>

                  <button 
                    type="submit" 
                    className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] shadow-lg ${
                      bookingState === 'SUCCESS' 
                        ? 'bg-secondary hover:bg-secondary/90 shadow-secondary/30' 
                        : 'bg-brand hover:bg-brand/90 shadow-brand/30'
                    }`}
                  >
                    {bookingState === 'SUCCESS' ? 'Booking Pending Review' : 'Request Booking'}
                  </button>
                  <p className="text-xs text-primary/40 text-center mt-3">You won't be charged yet.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <button 
            onClick={() => setShowGallery(false)} 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-5xl h-[80vh] overflow-y-auto no-scrollbar">
             <div className="grid gap-4">
                {allImages.map((img, i) => (
                  <img key={i} src={img} alt={`Gallery ${i}`} className="w-full rounded-lg" />
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};