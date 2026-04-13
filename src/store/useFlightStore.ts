import { create } from 'zustand';
import axios from 'axios';
import type { FlightOption } from '../types/index';

interface FlightState {
  flights: FlightOption[];
  loading: boolean;
  error: string | null;
  favorites: string[];
  fetchFlights: (from?: string, to?: string, date?: string) => Promise<void>;
  toggleFavorite: (flightId: string) => void;
  flightDetails: FlightOption | null;
  fetchFlightDetails: (id: string) => Promise<void>;
}

export const useFlightStore = create<FlightState>((set, get) => ({
  flights: [],
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
      // A small fake delay to showcase skeletons
      setTimeout(() => set({ flights: data, loading: false }), 800);
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
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
