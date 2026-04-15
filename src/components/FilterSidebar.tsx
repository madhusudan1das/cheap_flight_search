import { ChevronDown } from 'lucide-react';
import { useFlightStore } from '../store/useFlightStore';

export const FilterSidebar = () => {
  const { filters, toggleStopFilter, setMaxDepartureHour } = useFlightStore();

  return (
    <div className="w-64 flex-shrink-0 hidden lg:block pr-6">
       <div className="bg-white rounded-lg shadow-[0_2px_15px_rgba(0,0,0,0.06)] p-4 mb-4 flex justify-between items-center cursor-pointer border border-border-light hover:shadow-md transition-shadow">
         <div className="flex gap-2 items-center">
            <span className="font-black flex items-center text-brand-blue">ACTIVE FILTERS</span>
         </div>
       </div>

       <div className="mb-6 border-b border-border-light pb-6">
         <div className="flex justify-between items-center mb-3">
           <h4 className="font-bold text-sm text-gray-900">Stops</h4>
           <ChevronDown className="w-4 h-4 text-gray-500" />
         </div>
         <label className="flex items-center gap-3 mb-3 cursor-pointer group">
           <input type="checkbox" checked={filters.stops['0']} onChange={() => toggleStopFilter('0')} className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" />
           <span className="text-sm group-hover:text-brand-blue font-medium transition-colors">Non-stop (Direct)</span>
         </label>
         <label className="flex items-center gap-3 mb-3 cursor-pointer group">
           <input type="checkbox" checked={filters.stops['1']} onChange={() => toggleStopFilter('1')} className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" />
           <span className="text-sm group-hover:text-brand-blue font-medium transition-colors">1 stop</span>
         </label>
         <label className="flex items-center gap-3 mb-1 cursor-pointer group">
           <input type="checkbox" checked={filters.stops['2+']} onChange={() => toggleStopFilter('2+')} className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" />
           <span className="text-sm group-hover:text-brand-blue font-medium transition-colors">2+ stops</span>
         </label>
       </div>

       <div className="mb-6 border-b border-border-light pb-6">
         <div className="flex justify-between items-center mb-3">
           <h4 className="font-bold text-sm text-gray-900">Departure time</h4>
           <ChevronDown className="w-4 h-4 text-gray-500" />
         </div>
         <div className="mb-2">
           <div className="flex justify-between items-end mb-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Outbound</div>
              <div className="text-sm font-black text-brand-blue">Up to {filters.maxDepartureHour}:00</div>
           </div>
           <input 
             type="range" 
             value={filters.maxDepartureHour} 
             onChange={(e) => setMaxDepartureHour(Number(e.target.value))} 
             className="w-full accent-brand-blue cursor-pointer" 
             min="0" 
             max="24" 
             step="1"
           />
           <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
             <span>00:00</span>
             <span>12:00</span>
             <span>24:00</span>
           </div>
         </div>
       </div>

    </div>
  );
};
