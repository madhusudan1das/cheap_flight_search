import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../components/FilterSidebar';
import { FlightCard } from '../components/FlightCard';
import { generateDatePrices } from '../data/mockData';
import { useFlightStore } from '../store/useFlightStore';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

export const ResultsPage = () => {
  const { flights, loading, error, fetchFlights } = useFlightStore();
  const [searchParams] = useSearchParams();
  
  const from = searchParams.get('from') || 'DEL';
  const to = searchParams.get('to') || 'BOM';
  const date = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  
  const prices = generateDatePrices(new Date(date));

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (date < today) {
      // Don't fetch flights for past dates, just let the UI handle the empty state, or redirect
      // You could also set an error in the store, but we'll just quietly block the backend call
      return;
    }
    fetchFlights(from, to, date);
  }, [from, to, date, fetchFlights]);

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6">

         <div className="flex gap-6 mt-6 relative">
            <FilterSidebar />
            <div className="flex-1 pb-16">
               <div className="flex justify-between items-center mb-6">
                 <div className="text-sm text-text-gray"><span className="font-bold text-black text-lg">{flights.length} results</span> <span className="ml-2 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50">sorted by Best</span></div>
               </div>
               
               {error && <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200 mb-4">{error}</div>}
               
               <div className="space-y-4">
                 {loading ? (
                   Array.from({ length: 3 }).map((_, i) => (
                     <div key={i} className="bg-white rounded-lg shadow-sm border border-border-light p-5 h-36 animate-pulse flex">
                        <div className="w-12 h-12 bg-gray-200 rounded shrink-0 mr-6"></div>
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                     </div>
                   ))
                 ) : flights.length > 0 ? (
                   flights.map((flight) => (
                     <FlightCard key={flight.id || flight._id} flight={flight} />
                   ))
                 ) : (
                   <div className="bg-white rounded-lg p-10 text-center border border-border-light shadow-sm">
                     <p className="text-gray-500 font-medium text-lg">No flights found for your search criteria.</p>
                     <p className="text-sm text-gray-400 mt-2">Try adjusting your dates or destinations.</p>
                   </div>
                 )}
               </div>
               
               {flights.length > 0 && (
                 <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-sm">
                   <Bell className="w-8 h-8 text-brand-blue mb-4" />
                   <h3 className="text-lg font-bold mb-2 text-gray-900">Track prices for this trip</h3>
                   <p className="text-sm text-text-gray mb-6 max-w-md">Be the first to know when prices change. We'll send you an email alert.</p>
                   <button className="bg-white border border-gray-300 px-6 py-2.5 rounded-md font-bold text-sm shadow-sm hover:bg-gray-50 transition-colors text-brand-blue">Get Price Alerts</button>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
