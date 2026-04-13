import { Heart, ArrowRight } from 'lucide-react';
import type { FlightOption } from '../types/index';
import { useNavigate } from 'react-router-dom';
import { useFlightStore } from '../store/useFlightStore';

interface Props {
  flight: FlightOption;
}

export const FlightCard = ({ flight }: Props) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFlightStore();
  const flightId = flight.id || flight._id || '';
  const isFav = favorites.includes(flightId);
  const deptSegment = flight.segments[0];
  const arrSegment = flight.segments[flight.segments.length - 1];

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 p-6 flex flex-col md:flex-row mb-6 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:border-brand-blue/30 transition-all duration-300 group overflow-hidden relative">
       <div className="flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-5 md:pb-0 pr-0 md:pr-8">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-primary-blue rounded flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm">
               {deptSegment.airlineCode}
            </div>
            <div className="flex-1 flex justify-between items-center">
               <div className="text-center w-20 flex-shrink-0">
                 <div className="font-bold text-xl">{deptSegment.departureTime}</div>
                 <div className="text-text-gray text-sm mt-0.5">{deptSegment.departureAirport}</div>
               </div>
               
               <div className="flex-1 flex flex-col items-center px-4 relative">
                 <div className="text-xs text-text-gray mb-2 font-medium">{flight.totalDuration}</div>
                 <div className="w-full flex items-center justify-center h-4 relative">
                   <div className="absolute w-full h-[1px] bg-gray-300"></div>
                   {flight.stops > 0 ? (
                      <div className="z-10 text-[10px] text-red-500 bg-white px-2 py-0.5 rounded-full border border-red-200 font-bold whitespace-nowrap">
                        {flight.stops} stop{flight.stops > 1 && 's'}
                      </div>
                   ) : (
                      <div className="z-10 text-[10px] text-green-600 bg-white px-2 py-0.5 rounded-full border border-green-200 font-bold">
                        Direct
                      </div>
                   )}
                   <ArrowRight className="absolute right-0 w-3 h-3 text-gray-400 translate-x-1" />
                 </div>
                 {flight.layovers && <div className="text-[10px] text-text-gray mt-2">{flight.layovers.join(', ')}</div>}
               </div>

               <div className="text-center w-20 flex-shrink-0">
                 <div className="font-bold text-xl">{arrSegment.arrivalTime}</div>
                 <div className="text-text-gray text-sm mt-0.5">{arrSegment.arrivalAirport}</div>
               </div>
            </div>
          </div>
       </div>

       <div className="md:w-[220px] flex flex-col items-end justify-center pl-0 md:pl-6 pt-4 md:pt-0">
          <button onClick={() => toggleFavorite(flightId)} className={`${isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} mb-2 transition-colors`}>
            <Heart className="w-5 h-5" fill={isFav ? "currentColor" : "none"} />
          </button>
          {flight.tags && flight.tags.length > 0 && (
             <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded mb-1">{flight.tags[0]}</div>
          )}
          <div className="flex items-center gap-1">
             <div className="text-xs text-text-gray">from</div>
             <div className="text-2xl font-bold text-gray-900 tracking-tight">₹{flight.price.toLocaleString('en-IN')}</div>
          </div>
          <button onClick={() => navigate(`/book/${flightId}`)} className="bg-brand-blue hover:bg-primary-hover active:scale-95 transition-all w-full py-3 mt-4 rounded-xl text-white font-bold flex justify-center items-center gap-2 shadow-md hover:shadow-lg text-sm">
            Select <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
       </div>
    </div>
  );
};
