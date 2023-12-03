export default interface Venue {
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: Owner;
  bookings: Booking[];
  email?: string;
  avatar?: string;
}

export interface ExtendedVenue extends Venue {
  email?: string;
  avatar?: string;
}

export interface Owner {
  name: string;
  email: string;
  avatar: string;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Booking {
  id: string;
  dateFrom: string | Date;
  dateTo: string | Date;
  guests: number;
  created: string;
  updated: string;
}
