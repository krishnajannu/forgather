import React, { useState } from 'react';
import { ArrowLeft, MapPin, Users, Check, Star, X, Share2, Heart, ChevronLeft, ChevronRight, Grid, Clock, Calendar, Info } from 'lucide-react';
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

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '9:00 AM - 1:00 PM' },
  { id: 'afternoon', label: 'Afternoon', time: '2:00 PM - 6:00 PM' },
  { id: 'evening', label: 'Evening', time: '7:00 PM - 11:00 PM' }
];

export const VenueDetails: React.FC<VenueDetailsProps> = ({ venue, onBack }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Booking Flow State
  const [bookingStep, setBookingStep] = useState<'SELECTION' | 'CONFIRMATION' | 'SUCCESS'>('SELECTION');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<string>('');

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

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTimeSlot && guestCount) {
      setBookingStep('CONFIRMATION');
    }
  };

  const handleConfirmBooking = () => {
    // Simulate API call
    setTimeout(() => {
      // Save booking to localStorage
      try {
        const newBooking = {
          id: Date.now().toString(),
          venueId: venue.id,
          venueName: venue.name,
          venueImage: venue.imageUrl,
          date: selectedDate ? selectedDate.toISOString() : null,
          timeSlotId: selectedTimeSlot,
          timeSlotLabel: TIME_SLOTS.find(t => t.id === selectedTimeSlot)?.time,
          guests: guestCount,
          price: venue.pricePerEvent,
          createdAt: new Date().toISOString()
        };

        const existingBookings = JSON.parse(localStorage.getItem('gather_bookings') || '[]');
        localStorage.setItem('gather_bookings', JSON.stringify([...existingBookings, newBooking]));
      } catch (error) {
        console.error('Failed to save booking:', error);
      }

      setBookingStep('SUCCESS');
    }, 800);
  };

  const handleShare = () => {
    alert(`Link to ${venue.name} copied to clipboard!`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
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
                <Star className="w-4 h-4 text-gold fill-gold mr-1.5" />
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
           <img 
             src={allImages[currentImageIndex]} 
             alt={`Venue view ${currentImageIndex + 1}`} 
             className="w-full h-full object-cover transition-opacity duration-300 cursor-pointer"
             onClick={() => setShowGallery(true)}
           />
           
           <button 
             onClick={handlePrevImage}
             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           
           <button 
             onClick={handleNextImage}
             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
           >
             <ChevronRight className="w-6 h-6" />
           </button>

           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
             {allImages.map((_, idx) => (
               <button
                 key={idx}
                 onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                 className={`h-2 rounded-full transition-all shadow-sm ${
                   idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80 w-2'
                 }`}
               />
             ))}
           </div>
           
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
                   <Star className="w-5 h-5 text-gold fill-gold mr-1" />
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
                         <Star className="w-3.5 h-3.5 text-gold fill-gold mr-1" />
                         <span className="text-sm font-bold text-primary">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-primary/80 text-sm leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Flow */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-secondary/30 shadow-xl shadow-primary/5 p-6 overflow-hidden relative">
                
                {bookingStep === 'SELECTION' && (
                  <form onSubmit={handleProceedToConfirm} className="animate-fade-in">
                    <div className="flex justify-between items-end mb-6 pb-4 border-b border-secondary/20">
                      <div>
                        <span className="text-primary/60 text-sm">Starting from</span>
                        <div className="text-2xl font-bold text-primary">₹{venue.pricePerEvent.toLocaleString()}</div>
                      </div>
                      <span className="px-2 py-1 bg-secondary/30 text-primary text-xs font-bold rounded uppercase">Available</span>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-5">
                      <label className="block text-sm font-bold text-primary mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-brand" /> Select Date
                      </label>
                      <BookingCalendar onDateSelect={setSelectedDate} />
                    </div>

                    {/* Time Selection (Conditional) */}
                    {selectedDate && (
                      <div className="mb-5 animate-fade-in">
                        <label className="block text-sm font-bold text-primary mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-brand" /> Select Time Slot
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot.id)}
                              className={`px-4 py-3 rounded-xl border text-left transition-all ${
                                selectedTimeSlot === slot.id 
                                  ? 'border-brand bg-brand/5 text-brand font-semibold shadow-sm' 
                                  : 'border-secondary/20 hover:border-secondary/50 text-primary/70'
                              }`}
                            >
                              <span className="block text-sm">{slot.label}</span>
                              <span className="block text-xs opacity-70">{slot.time}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guest Count */}
                    <div className="mb-6">
                       <label className="block text-sm font-bold text-primary mb-2 flex items-center">
                         <Users className="w-4 h-4 mr-1.5 text-brand" /> Guests (Approx.)
                       </label>
                       <input 
                         type="number" 
                         min="1" 
                         max={venue.guestCapacity} 
                         value={guestCount}
                         onChange={(e) => setGuestCount(e.target.value)}
                         placeholder={`Max ${venue.guestCapacity}`} 
                         className="w-full px-4 py-3 bg-tertiary/20 border border-secondary/30 rounded-xl text-primary focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all placeholder:text-primary/40 font-medium" 
                         required 
                       />
                    </div>

                    <button 
                      type="submit" 
                      disabled={!selectedDate || !selectedTimeSlot || !guestCount}
                      className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] shadow-lg bg-brand hover:bg-brand/90 shadow-brand/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed to Confirm
                    </button>
                    <p className="text-xs text-primary/40 text-center mt-3">You won't be charged yet.</p>
                  </form>
                )}

                {bookingStep === 'CONFIRMATION' && (
                  <div className="animate-fade-in">
                    <button 
                      onClick={() => setBookingStep('SELECTION')}
                      className="text-sm text-primary/60 hover:text-brand flex items-center mb-4 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Edit Details
                    </button>
                    
                    <h3 className="text-xl font-bold text-primary mb-6">Confirm Request</h3>
                    
                    <div className="space-y-4 mb-8 bg-tertiary/30 p-5 rounded-xl border border-secondary/20">
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">Venue</span>
                        <span className="text-primary font-semibold text-sm text-right">{venue.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">Date</span>
                        <span className="text-primary font-semibold text-sm text-right">{selectedDate ? formatDate(selectedDate) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">Time</span>
                        <span className="text-primary font-semibold text-sm text-right">
                          {TIME_SLOTS.find(t => t.id === selectedTimeSlot)?.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary/60 text-sm">Guests</span>
                        <span className="text-primary font-semibold text-sm text-right">{guestCount}</span>
                      </div>
                      <div className="border-t border-secondary/10 pt-3 mt-2 flex justify-between items-center">
                        <span className="text-primary font-bold">Total Estimate</span>
                        <span className="text-brand font-bold text-lg">₹{venue.pricePerEvent.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg flex items-start mb-6">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-xs text-blue-700 leading-relaxed">
                        This is a booking request. The venue manager will review availability and confirm your slot within 24 hours.
                      </p>
                    </div>

                    <button 
                      onClick={handleConfirmBooking}
                      className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] shadow-lg bg-brand hover:bg-brand/90 shadow-brand/30"
                    >
                      Confirm Booking Request
                    </button>
                  </div>
                )}

                {bookingStep === 'SUCCESS' && (
                  <div className="animate-fade-in text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-blob">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h3>
                    <p className="text-primary/60 text-sm mb-6">
                      Your request has been successfully submitted.
                    </p>

                    {/* Summary Card */}
                    <div className="bg-tertiary/20 rounded-xl p-4 mb-8 text-left border border-secondary/20">
                        <div className="flex justify-between mb-2">
                            <span className="text-primary/60 text-sm">Venue</span>
                            <span className="text-primary font-bold text-sm">{venue.name}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-primary/60 text-sm">Date</span>
                            <span className="text-primary font-bold text-sm">{selectedDate ? formatDate(selectedDate) : '-'}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-primary/60 text-sm">Time</span>
                            <span className="text-primary font-bold text-sm">
                                {TIME_SLOTS.find(t => t.id === selectedTimeSlot)?.time || selectedTimeSlot}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-primary/60 text-sm">Guests</span>
                            <span className="text-primary font-bold text-sm">{guestCount}</span>
                        </div>
                    </div>

                    <button 
                      onClick={() => {
                        // Reset for demo purposes, or navigate to a hypothetical bookings page
                        setBookingStep('SELECTION');
                        setSelectedDate(null);
                        setSelectedTimeSlot(null);
                        setGuestCount('');
                      }}
                      className="w-full px-6 py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20 mb-3"
                    >
                      View My Bookings
                    </button>
                    
                    <button 
                        onClick={() => {
                        setBookingStep('SELECTION');
                        setSelectedDate(null);
                        setSelectedTimeSlot(null);
                        setGuestCount('');
                        }}
                        className="text-brand text-sm font-medium hover:underline"
                    >
                        Make Another Booking
                    </button>
                  </div>
                )}

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