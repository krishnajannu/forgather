import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BookingCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [bookedDates] = useState<number[]>(() => {
    // Randomly book 5-8 days in the month
    const booked = new Set<number>();
    const count = Math.floor(Math.random() * 4) + 5;
    while(booked.size < count) {
      booked.add(Math.floor(Math.random() * 28) + 1);
    }
    return Array.from(booked);
  });

  const daysInMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  }, [currentDate]);

  const startDayOffset = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  }, [currentDate]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-primary">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <div className="flex space-x-1">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-1 hover:bg-tertiary/30 rounded-full text-primary/60"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-1 hover:bg-tertiary/30 rounded-full text-primary/60"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-xs font-medium text-secondary py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isBooked = bookedDates.includes(day);
          const isSelected = selectedDate === day;
          
          return (
            <button
              key={day}
              disabled={isBooked}
              onClick={() => setSelectedDate(day)}
              className={`
                h-9 w-9 rounded-full text-sm flex items-center justify-center transition-all
                ${isBooked 
                  ? 'bg-tertiary/40 text-secondary cursor-not-allowed line-through' 
                  : isSelected
                    ? 'bg-brand text-white shadow-md scale-110'
                    : 'hover:bg-brand/10 text-primary'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-brand/5 border border-brand/10 rounded-lg flex justify-between items-center animate-fade-in">
            <span className="text-sm text-primary font-medium">Selected: {monthNames[currentDate.getMonth()]} {selectedDate}</span>
            <span className="text-xs text-brand font-bold uppercase tracking-wide">Available</span>
        </div>
      )}
    </div>
  );
};