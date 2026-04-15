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

       <div className="md:w-[300px] flex flex-col pl-0 md:pl-6 pt-4 md:pt-0 gap-2">
          <div className="flex justify-between items-start mb-2">
            <div>
              {flight.tags && flight.tags.length > 0 && (
                 <div className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200 uppercase tracking-widest">{flight.tags[0]}</div>
              )}
            </div>
            <button onClick={() => toggleFavorite(flightId)} className={`${isFav ? 'text-red-500' : 'text-gray-300 hover:text-red-500'} transition-colors`}>
              <Heart className="w-5 h-5" fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            {flight.providers?.map((provider, i) => (
              <div key={provider.id} className={`flex justify-between items-center p-2.5 rounded-lg border transition-all ${i === 0 ? 'bg-green-50/50 border-green-300 shadow-sm' : 'border-gray-100 hover:border-gray-300 hover:shadow-sm'}`}>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{provider.name}</div>
                    {i === 0 && <div className="text-[10px] text-green-600 font-bold">Cheapest Route</div>}
                  </div>
                  <div className="flex items-center gap-3">
                      <span className={`font-black tracking-tight ${i===0 ? 'text-green-700 text-lg' : 'text-gray-900'}`}>₹{provider.price.toLocaleString('en-IN')}</span>
                      <button className="text-white bg-brand-blue hover:bg-primary-hover px-3 py-1.5 rounded-md text-xs font-bold transition-transform active:scale-95 shadow-sm">Book</button>
                  </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};
