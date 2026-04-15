import { create } from 'zustand';
import axios from 'axios';
import type { FlightOption } from '../types/index';

interface FlightFilters {
  stops: Record<string, boolean>;
  maxDepartureHour: number;
}

interface FlightState {
  flights: FlightOption[];
  filteredFlights: FlightOption[];
  filters: FlightFilters;
  loading: boolean;
  error: string | null;
  favorites: string[];
  fetchFlights: (from?: string, to?: string, date?: string) => Promise<void>;
  toggleFavorite: (flightId: string) => void;
  flightDetails: FlightOption | null;
  fetchFlightDetails: (id: string) => Promise<void>;
  toggleStopFilter: (stopType: string) => void;
  setMaxDepartureHour: (hour: number) => void;
  applyFilters: () => void;
}

export const useFlightStore = create<FlightState>((set, get) => ({
  flights: [],
  filteredFlights: [],
  filters: {
    stops: { '0': true, '1': true, '2+': true },
    maxDepartureHour: 24
  },
  loading: false,
  error: null,
  favorites: [],
  flightDetails: null,
  
  fetchFlights: async (from, to, date) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('http://localhost:5000/api/flights/search', {
        params: { from, to, date }
      });
      
      // Default sorting: absolute cheapest provider among all flights
      const sortedFlights = data.sort((a: any, b: any) => {
         const lowestA = a.providers && a.providers.length > 0 ? a.providers[0].price : a.price;
         const lowestB = b.providers && b.providers.length > 0 ? b.providers[0].price : b.price;
         return lowestA - lowestB;
      });

      // A small fake delay to showcase skeletons
      setTimeout(() => {
        set({ flights: sortedFlights, loading: false });
        get().applyFilters();
      }, 800);
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  applyFilters: () => {
    const { flights, filters } = get();
    const filtered = flights.filter(f => {
      // 1. Stops filter
      let stopType = f.stops === 0 ? '0' : f.stops === 1 ? '1' : '2+';
      if (!filters.stops[stopType]) return false;
      
      // 2. Departure time filter
      const deptTimeStr = f.segments[0].departureTime;
      const hour = parseInt(deptTimeStr.split(':')[0], 10);
      if (hour > filters.maxDepartureHour) return false;
      
      return true;
    });
    set({ filteredFlights: filtered });
  },

  toggleStopFilter: (stopType) => {
    const currentStops = get().filters.stops;
    set({ 
      filters: { 
        ...get().filters, 
        stops: { ...currentStops, [stopType]: !currentStops[stopType] } 
      } 
    });
    get().applyFilters();
  },

  setMaxDepartureHour: (hour) => {
    set({ filters: { ...get().filters, maxDepartureHour: hour } });
    get().applyFilters();
  },

  fetchFlightDetails: async (id) => {
    set({ loading: true, error: null });
    try {
       const { data } = await axios.get(`http://localhost:5000/api/flights/${id}`);
       setTimeout(() => set({ flightDetails: data, loading: false }), 400);
    } catch (err: any) {
       set({ error: err.message, loading: false });
    }
  },
  
  toggleFavorite: (flightId) => {
    const { favorites } = get();
    if (favorites.includes(flightId)) {
      set({ favorites: favorites.filter(id => id !== flightId) });
    } else {
      set({ favorites: [...favorites, flightId] });
    }
  }
}));
