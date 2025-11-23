export enum City {
  Pune = 'Pune',
  Bangalore = 'Bangalore',
  Mumbai = 'Mumbai'
}

export enum VenueType {
  BanquetHall = 'Banquet Hall',
  Lounge = 'Lounge',
  Resort = 'Resort',
  PartyLawn = 'Party Lawn'
}

export interface Venue {
  id: string;
  name: string;
  city: City;
  address: string;
  pricePerEvent: number;
  guestCapacity: number;
  type: VenueType;
  amenities: string[];
  description: string;
  imageUrl: string;
  gallery: string[];
  rating: number;
  reviews: number;
  coordinates: { lat: number; lng: number };
}

export type ViewState = 'LANDING' | 'LISTING' | 'DETAILS' | 'CONTACT' | 'PRIVACY' | 'TERMS';

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  minGuests: number;
  types: VenueType[];
}