import React from 'react';
import { MapPin, CalendarRange, Search } from 'lucide-react';
import { City, ViewState } from '../types';

interface NavbarProps {
  selectedCity: City | null;
  onCityChange: (city: City) => void;
  currentView: ViewState;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ selectedCity, onCityChange, currentView, onNavigateHome }) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-secondary/30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={onNavigateHome}
          >
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center mr-2 group-hover:bg-brand/90 transition-colors">
              <CalendarRange className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Gather</span>
          </div>

          {/* City Selector - Only show if we have passed the landing page or on list view */}
          {currentView !== 'LANDING' && (
            <div className="hidden md:flex items-center bg-tertiary/40 rounded-full px-1 py-1 border border-secondary/20">
              {(Object.values(City) as City[]).map((city) => (
                <button
                  key={city}
                  onClick={() => onCityChange(city)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCity === city
                      ? 'bg-white text-brand shadow-sm ring-1 ring-black/5'
                      : 'text-primary/60 hover:text-primary'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}

          {/* Mobile City Selector (Simplified) */}
          {currentView !== 'LANDING' && (
             <div className="md:hidden flex items-center">
               <MapPin className="w-4 h-4 text-primary/60 mr-1"/>
               <select 
                 value={selectedCity || ''} 
                 onChange={(e) => onCityChange(e.target.value as City)}
                 className="bg-transparent text-sm font-medium text-primary focus:outline-none"
               >
                  <option value={City.Pune}>Pune</option>
                  <option value={City.Bangalore}>Bangalore</option>
                  <option value={City.Mumbai}>Mumbai</option>
               </select>
             </div>
          )}
          
          {currentView === 'LANDING' && (
             <div className="flex items-center space-x-4">
                <button className="text-primary/80 text-sm font-medium hover:text-brand transition-colors">Log In</button>
                <button className="bg-brand text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-brand/90 transition-colors shadow-sm hover:shadow-md">
                  Sign Up
                </button>
             </div>
          )}
           
           {currentView !== 'LANDING' && (
             <div className="hidden md:flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-xs font-bold text-primary/70 border border-secondary/30">
                  JD
                </div>
             </div>
           )}
        </div>
      </div>
    </nav>
  );
};