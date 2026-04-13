import { ChevronDown } from 'lucide-react';

export const FilterSidebar = () => {
  return (
    <div className="w-64 flex-shrink-0 hidden lg:block pr-6">
       <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center cursor-pointer border border-border-light hover:shadow-md transition-shadow">
         <div className="flex gap-2 items-center">
            <span className="font-bold flex items-center">Get Price Alerts</span>
         </div>
       </div>

       <div className="mb-6 border-b border-border-light pb-6">
         <div className="flex justify-between items-center mb-3">
           <h4 className="font-bold text-sm">Stops</h4>
           <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
         </div>
         <label className="flex items-center gap-3 mb-3 cursor-pointer group">
           <input type="checkbox" className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" defaultChecked />
           <span className="text-sm group-hover:text-brand-blue transition-colors">Direct</span>
           <span className="ml-auto text-xs text-text-gray">from ₹11,681</span>
         </label>
         <label className="flex items-center gap-3 mb-3 cursor-pointer group">
           <input type="checkbox" className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" defaultChecked />
           <span className="text-sm group-hover:text-brand-blue transition-colors">1 stop</span>
           <span className="ml-auto text-xs text-text-gray">from ₹17,191</span>
         </label>
         <label className="flex items-center gap-3 mb-1 cursor-pointer group">
           <input type="checkbox" className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" defaultChecked />
           <span className="text-sm group-hover:text-brand-blue transition-colors">2+ stops</span>
           <span className="ml-auto text-xs text-text-gray">from ₹13,705</span>
         </label>
       </div>
       
       <div className="mb-6 border-b border-border-light pb-6">
         <div className="flex justify-between items-center mb-3">
           <h4 className="font-bold text-sm">Baggage</h4>
           <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
         </div>
         <div className="flex gap-3 text-xs text-brand-blue mb-4 font-medium">
           <button className="hover:underline">Select all</button>
           <button className="hover:underline text-text-gray">Clear all</button>
         </div>
         <label className="flex items-center gap-3 mb-3 cursor-pointer text-sm group">
           <input type="checkbox" className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" /> 
           <span className="group-hover:text-brand-blue transition-colors">Cabin bag</span>
         </label>
         <label className="flex items-center gap-3 mb-1 cursor-pointer text-sm group">
           <input type="checkbox" className="w-4 h-4 rounded text-brand-blue border-gray-300 focus:ring-brand-blue" /> 
           <span className="group-hover:text-brand-blue transition-colors">Checked bag</span>
         </label>
       </div>

       <div className="mb-6 border-b border-border-light pb-6">
         <div className="flex justify-between items-center mb-3">
           <h4 className="font-bold text-sm">Departure times</h4>
           <ChevronDown className="w-4 h-4 text-gray-500 cursor-pointer" />
         </div>
         <div className="mb-2">
           <div className="text-xs font-semibold mb-1">Outbound</div>
           <div className="text-xs text-text-gray mb-3">00:00 - 23:59</div>
           <input type="range" className="w-full accent-brand-blue" min="0" max="24" defaultValue="24" />
         </div>
       </div>

    </div>
  );
};
