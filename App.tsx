import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VenueCard } from './components/VenueCard';
import { VenueDetails } from './components/VenueDetails';
import { ContactUs } from './components/ContactUs';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { VENUES } from './constants';
import { City, Venue, ViewState, VenueType } from './types';
import { Search, SlidersHorizontal, X, ArrowRight, Sparkles, Calendar, IndianRupee, PartyPopper, MapPin, Star } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  
  // Landing Page Interaction State
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  
  // Landing Search State
  const [landingEventType, setLandingEventType] = useState('');
  const [landingCity, setLandingCity] = useState<City | ''>('');
  const [landingDate, setLandingDate] = useState('');
  const [landingBudget, setLandingBudget] = useState('');

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedTypes, setSelectedTypes] = useState<VenueType[]>([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  // Mobile Interaction State
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Initialize scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedVenue]);

  // Derived State: Filtered Venues
  const filteredVenues = useMemo(() => {
    if (!selectedCity) return [];
    
    return VENUES.filter(venue => {
      if (venue.city !== selectedCity) return false;
      if (searchTerm && !venue.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (venue.pricePerEvent < priceRange[0] || venue.pricePerEvent > priceRange[1]) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(venue.type)) return false;
      return true;
    });
  }, [selectedCity, searchTerm, priceRange, selectedTypes]);

  // Handlers
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCurrentView('LISTING');
  };

  const handleVenueClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setCurrentView('DETAILS');
  };

  const handleBackToResults = () => {
    setSelectedVenue(null);
    setCurrentView('LISTING');
  };

  const handleHome = () => {
    setCurrentView('LANDING');
    setSelectedCity(null);
    setSelectedVenue(null);
    // Reset landing search state optional
  };

  const toggleVenueType = (type: VenueType) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleLandingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!landingCity) {
      // If no city selected, default to Pune or show error. For now, alert small validation.
      const cityInput = document.getElementById('landing-city-select');
      cityInput?.focus();
      return;
    }

    // 1. Set City
    setSelectedCity(landingCity);

    // 2. Map Event Type to Venue Type Filters
    if (landingEventType) {
      let mappedTypes: VenueType[] = [];
      switch (landingEventType) {
        case 'Wedding':
          mappedTypes = [VenueType.BanquetHall, VenueType.Resort, VenueType.PartyLawn];
          break;
        case 'Birthday':
          mappedTypes = [VenueType.BanquetHall, VenueType.Lounge, VenueType.PartyLawn];
          break;
        case 'Corporate':
          mappedTypes = [VenueType.BanquetHall, VenueType.Lounge, VenueType.Resort];
          break;
        case 'Social':
          mappedTypes = [VenueType.Lounge, VenueType.PartyLawn];
          break;
        default:
          mappedTypes = [];
      }
      setSelectedTypes(mappedTypes);
    } else {
      setSelectedTypes([]);
    }

    // 3. Set Budget Filter
    if (landingBudget) {
      const maxBudget = parseInt(landingBudget);
      setPriceRange([0, maxBudget]);
    } else {
      setPriceRange([0, 200000]);
    }
    
    // 4. Navigate
    setCurrentView('LISTING');
  };

  // --- RENDER HELPERS ---

  const renderLanding = () => (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col pt-16">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
         <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-danger/10 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
         <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-tertiary/50 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>
  
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
         
         {/* Minimal Header Text */}
         <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-secondary/40 bg-white/50 backdrop-blur-sm text-xs font-medium text-primary/70 mb-4 animate-fade-in-up">
              <Sparkles className="w-3 h-3 mr-2 text-brand" />
              Premium Venue Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tighter leading-[1.1] animate-fade-in-up delay-100">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-danger">unforgettable</span><br className="hidden md:block" /> moments.
            </h1>
            <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200 mb-8">
              Discover and book the finest banquet halls, lounges, and resorts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300 pt-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-tertiary/50 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-brand/10 text-brand font-bold flex items-center justify-center text-xs">
                    2k+
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary/80">
                  Trusted by happy customers
                  <div className="flex text-brand mt-0.5 justify-center sm:justify-start">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
            </div>
         </div>
  
         {/* Interactive City Grid (Secondary Navigation) */}
         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[350px] animate-fade-in-up delay-500">
            {[
              { 
                city: City.Pune, 
                img: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1000&auto=format&fit=crop',
                label: 'Cultural Capital'
              },
              { 
                city: City.Bangalore, 
                img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop',
                label: 'Garden City'
              },
              { 
                city: City.Mumbai, 
                img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1000&auto=format&fit=crop',
                label: 'City of Dreams'
              }
            ].map((item) => (
              <div 
                key={item.city}
                onMouseEnter={() => setHoveredCity(item.city)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => handleCitySelect(item.city)}
                className={`
                  relative group cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-out
                  ${hoveredCity && hoveredCity !== item.city ? 'md:w-full md:opacity-50 md:scale-95 grayscale' : 'md:w-full md:opacity-100 grayscale-0'}
                  h-64 md:h-full shadow-lg hover:shadow-2xl border border-white/20
                `}
              >
                {/* Image */}
                <img 
                  src={item.img} 
                  alt={item.city} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay - Darkened for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 group-hover:via-black/40 group-hover:to-brand/80 transition-all duration-700 z-10" />

                {/* Card Content */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/20">
                        {item.label}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                         <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                   </div>
  
                   <div>
                      <h3 className="text-3xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-lg">
                        {item.city}
                      </h3>
                      <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-500">
                        <p className="text-tertiary text-sm font-medium flex items-center mt-1">
                          Explore Venues <ArrowRight className="w-4 h-4 ml-2" />
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            ))}
         </div>
         
         {/* Minimal Stats */}
         <div className="mt-12 py-8 border-t border-secondary/20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-500">
            {[
              { label: 'Curated Venues', value: '50+' },
              { label: 'Happy Customers', value: '2k+' },
              { label: 'Cities Covered', value: '3' },
              { label: 'Avg Rating', value: '4.8' },
            ].map((stat, i) => (
               <div key={i} className="text-center md:text-left flex flex-col md:block items-center md:items-start">
                  <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-xs text-primary/60 font-bold uppercase tracking-widest opacity-70">{stat.label}</p>
               </div>
            ))}
         </div>
  
      </div>
    </div>
  );

  const renderListing = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white p-5 rounded-xl border border-secondary/30 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-primary">Filters</h2>
              <button 
                onClick={() => {setPriceRange([0, 200000]); setSelectedTypes([]); setSearchTerm('');}}
                className="text-xs font-medium text-brand hover:text-brand/80"
              >
                Reset
              </button>
            </div>
            
            {/* Type Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-primary mb-3">Venue Type</h3>
              <div className="space-y-2">
                {Object.values(VenueType).map(type => (
                  <label key={type} className="flex items-center cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${selectedTypes.includes(type) ? 'bg-brand border-brand' : 'border-secondary/50 bg-white group-hover:border-brand/50'}`}>
                       {selectedTypes.includes(type) && <CheckIcon className="w-3 h-3 text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleVenueType(type)}
                    />
                    <span className={`text-sm ${selectedTypes.includes(type) ? 'text-primary font-medium' : 'text-primary/70'}`}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
               <h3 className="text-sm font-semibold text-primary mb-3">Price Range (₹)</h3>
               <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-tertiary/60 rounded-lg appearance-none cursor-pointer accent-brand"
               />
               <div className="flex justify-between mt-2 text-xs text-primary/60 font-medium">
                 <span>₹0</span>
                 <span>Up to ₹{priceRange[1].toLocaleString()}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showFiltersMobile && (
           <div className="fixed inset-0 z-50 bg-primary/50 backdrop-blur-sm lg:hidden flex justify-end">
              <div className="w-4/5 max-w-sm bg-white h-full p-6 overflow-y-auto">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary">Filters</h2>
                    <button onClick={() => setShowFiltersMobile(false)} className="p-2 bg-tertiary/30 rounded-full"><X className="w-5 h-5"/></button>
                 </div>
                 {/* Reused Logic for Mobile UI - Simplified */}
                 <div className="space-y-6">
                    <div>
                       <h3 className="font-semibold mb-2 text-primary">Type</h3>
                       {Object.values(VenueType).map(type => (
                          <div key={type} onClick={() => toggleVenueType(type)} className={`p-3 mb-2 rounded-lg border ${selectedTypes.includes(type) ? 'border-brand bg-brand/5 text-brand' : 'border-secondary/30'}`}>
                             {type}
                          </div>
                       ))}
                    </div>
                    <div>
                       <h3 className="font-semibold mb-2 text-primary">Max Price: ₹{priceRange[1].toLocaleString()}</h3>
                       <input 
                          type="range" 
                          min="0" max="200000" step="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                          className="w-full accent-brand h-3 bg-tertiary/60 rounded-lg"
                       />
                    </div>
                    <button 
                       onClick={() => setShowFiltersMobile(false)}
                       className="w-full py-3 bg-brand text-white font-bold rounded-xl"
                    >
                       Show Results
                    </button>
                 </div>
              </div>
           </div>
        )}

        {/* Results Area */}
        <div className="flex-1">
          
          {/* Mobile Header: Title + Actions */}
          <div className="lg:hidden flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-primary">
               {filteredVenues.length} Result{filteredVenues.length !== 1 ? 's' : ''}
             </h2>
             <div className="flex gap-3">
                <button 
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    showMobileSearch 
                      ? 'bg-brand border-brand text-white shadow-md' 
                      : 'bg-white border-secondary/30 text-primary/70 hover:bg-tertiary/20'
                  }`}
                  aria-label="Toggle search"
                >
                   <Search className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowFiltersMobile(true)}
                  className="p-2.5 bg-white border border-secondary/30 rounded-xl text-primary/70 hover:bg-tertiary/20"
                  aria-label="Filters"
                >
                   <SlidersHorizontal className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Search Bar: Conditional on mobile, always on desktop */}
          <div className={`mb-6 ${showMobileSearch ? 'block animate-fade-in' : 'hidden'} lg:block`}>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={selectedCity ? `Search venues in ${selectedCity}...` : 'Search venues...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 text-slate-900 rounded-xl border border-secondary/30 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-shadow placeholder:text-slate-500"
                  autoFocus={showMobileSearch}
                />
             </div>
          </div>

          {/* Desktop Title */}
          <div className="hidden lg:block mb-4">
             <h2 className="text-xl font-bold text-primary">{filteredVenues.length} venues found {selectedCity ? `in ${selectedCity}` : ''}</h2>
          </div>
          
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVenues.map(venue => (
                <VenueCard key={venue.id} venue={venue} onClick={handleVenueClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-secondary/30 border-dashed">
               <div className="inline-flex p-4 rounded-full bg-tertiary/30 mb-4">
                  <Search className="w-8 h-8 text-secondary" />
               </div>
               <h3 className="text-lg font-medium text-primary">No venues found</h3>
               <p className="text-primary/60">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar 
        selectedCity={selectedCity} 
        onCityChange={handleCitySelect} 
        currentView={currentView}
        onNavigateHome={handleHome}
      />
      
      <main>
        {currentView === 'LANDING' && renderLanding()}
        {currentView === 'LISTING' && renderListing()}
        {currentView === 'DETAILS' && selectedVenue && (
          <VenueDetails venue={selectedVenue} onBack={handleBackToResults} />
        )}
        {currentView === 'CONTACT' && <ContactUs />}
        {currentView === 'PRIVACY' && <PrivacyPolicy />}
        {currentView === 'TERMS' && <TermsOfService />}
      </main>
      
      {currentView !== 'DETAILS' && (
        <footer className="bg-white border-t border-secondary/20 py-12 mt-auto">
           <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-primary/50 mb-4">&copy; 2024 Gather Venues. All rights reserved.</p>
              <div className="flex justify-center space-x-6 text-sm text-primary/60">
                 <a 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setCurrentView('PRIVACY'); }} 
                   className="hover:text-brand"
                 >
                   Privacy
                 </a>
                 <a 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setCurrentView('TERMS'); }} 
                   className="hover:text-brand"
                 >
                   Terms
                 </a>
                 <a 
                   href="#" 
                   onClick={(e) => { e.preventDefault(); setCurrentView('CONTACT'); }} 
                   className="hover:text-brand"
                 >
                   Contact
                 </a>
              </div>
           </div>
        </footer>
      )}
    </div>
  );
}

// Helper Icon for checkbox
const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default App;