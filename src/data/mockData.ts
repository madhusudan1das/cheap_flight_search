import type { Airport, FlightOption, FareProvider, DatePrice } from '../types/index';
import { addDays, format, subDays } from 'date-fns';

export const mockAirports: Airport[] = [
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose Airport', city: 'Kolkata' },
  { code: 'DMU', name: 'Dimapur Airport', city: 'Dimapur' },
  { code: 'DEL', name: 'Indira Gandhi International', city: 'Delhi' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai' },
  { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi', city: 'Guwahati' },
  { code: 'IMF', name: 'Imphal International', city: 'Imphal' },
];

export const mockProviders: FareProvider[] = [
  {
    id: 'p1',
    name: 'IndiGo',
    price: 11681,
    rating: 4.9,
    reviews: 42694,
    support247: false,
  },
  {
    id: 'p2',
    name: 'Cleartrip',
    price: 11781,
    rating: 4.9,
    reviews: 24285,
    support247: true,
    discounts: 'Additional discounts of up to 20% locally.',
  },
  {
    id: 'p3',
    name: 'MakeMyTrip',
    price: 11781,
    rating: 4.7,
    reviews: 29168,
    support247: true,
    recommended: true,
    discounts: 'Additional discounts with MMTSKYSUPER code.',
  },
  {
    id: 'p4',
    name: 'Goibibo',
    price: 11800,
    rating: 4.5,
    reviews: 45872,
    support247: false,
  }
];

export const mockFlights: FlightOption[] = [
  {
    id: 'f1',
    segments: [
      {
        id: 's1',
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNumber: '6E-8339',
        departureTime: '13:40',
        arrivalTime: '15:10',
        departureAirport: 'CCU',
        arrivalAirport: 'DMU',
        duration: '1h 30m'
      }
    ],
    price: 11681,
    totalDuration: '1h 30m',
    stops: 0,
    tags: ['Best', 'Cheapest', 'Fastest']
  },
  {
    id: 'f2',
    segments: [
      {
        id: 's2',
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNumber: '6E-454',
        departureTime: '06:05',
        arrivalTime: '07:35',
        departureAirport: 'CCU',
        arrivalAirport: 'GAU',
        duration: '1h 30m'
      },
      {
        id: 's3',
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNumber: '6E-202',
        departureTime: '10:45',
        arrivalTime: '11:30',
        departureAirport: 'GAU',
        arrivalAirport: 'DMU',
        duration: '0h 45m'
      }
    ],
    price: 17765,
    totalDuration: '5h 25m',
    stops: 1,
    layovers: ['GAU']
  },
  {
    id: 'f3',
    segments: [
      {
        id: 's4',
        airline: 'Air India Express',
        airlineCode: 'IX',
        flightNumber: 'IX-332',
        departureTime: '07:20',
        arrivalTime: '08:50',
        departureAirport: 'CCU',
        arrivalAirport: 'GAU',
        duration: '1h 30m'
      },
      {
        id: 's5',
        airline: 'Air India Express',
        airlineCode: 'IX',
        flightNumber: 'IX-114',
        departureTime: '13:10',
        arrivalTime: '14:00',
        departureAirport: 'GAU',
        arrivalAirport: 'DMU',
        duration: '0h 50m'
      }
    ],
    price: 17191,
    totalDuration: '6h 40m',
    stops: 1,
    layovers: ['GAU']
  },
  {
    id: 'f4',
    segments: [
      {
        id: 's6',
        airline: 'Air India',
        airlineCode: 'AI',
        flightNumber: 'AI-201',
        departureTime: '21:00',
        arrivalTime: '23:30',
        departureAirport: 'CCU',
        arrivalAirport: 'DEL',
        duration: '2h 30m'
      },
      {
        id: 's7',
        airline: 'Air India',
        airlineCode: 'AI',
        flightNumber: 'AI-848',
        departureTime: '11:00',
        arrivalTime: '14:00',
        departureAirport: 'DEL',
        arrivalAirport: 'DMU',
        duration: '3h 00m'
      }
    ],
    price: 19743,
    totalDuration: '17h 00m',
    stops: 1,
    layovers: ['DEL']
  }
];

export const generateDatePrices = (baseDate: Date): DatePrice[] => {
  const prices = [];
  for (let i = -3; i <= 3; i++) {
    const targetDate = i < 0 ? subDays(baseDate, Math.abs(i)) : addDays(baseDate, i);
    const basePrice = 11681;
    const offset = Math.floor(Math.random() * 5000) - 2000;
    prices.push({
      date: format(targetDate, 'yyyy-MM-dd'),
      price: basePrice + offset
    });
  }
  return prices;
};
