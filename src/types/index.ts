export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface FlightSegment {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departureTime: string; 
  arrivalTime: string;
  departureAirport: string; 
  arrivalAirport: string;
  duration: string;
}

export interface FlightOption {
  id?: string;
  _id?: string;
  segments: FlightSegment[];
  price: number;
  totalDuration: string;
  stops: number;
  tags?: string[];
  layovers?: string[];
}

export interface FareProvider {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  reviewCount?: number;
  support247: boolean;
  discounts?: string;
  recommended?: boolean;
}

export interface DatePrice {
  date: string; // YYYY-MM-DD
  price: number;
}
