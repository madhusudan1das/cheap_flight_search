import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DatePrice } from '../types/index';
import { format, parseISO } from 'date-fns';

interface Props {
  prices: DatePrice[];
  selectedDate: string;
}

export const DatePriceScroller = ({ prices, selectedDate }: Props) => {
  return (
    <div className="flex bg-white rounded-lg p-2 shadow-sm items-center justify-between gap-2 mb-4 mt-0 w-full overflow-hidden">
      <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0 text-text-gray"><ChevronLeft className="w-5 h-5"/></button>
      <div className="flex gap-2 overflow-x-auto flex-1 no-scrollbar pt-1 pb-1">
        {prices.map((p) => {
          const dateObj = parseISO(p.date);
          const isSelected = p.date === selectedDate;
          return (
            <div key={p.date} className={`flex flex-col items-center justify-center p-3 px-6 rounded cursor-pointer flex-shrink-0 transition-colors font-semibold shadow-sm ${isSelected ? 'bg-primary-blue text-white ring-1 ring-primary-blue' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}>
              <div className={`text-xs ${isSelected ? 'text-gray-300 font-medium' : 'text-text-gray font-normal'}`}>{format(dateObj, 'd MMM')}</div>
              <div className={`text-sm mt-1 whitespace-nowrap`}>₹{(p.price / 1000).toFixed(1)}K</div>
            </div>
          )
        })}
      </div>
      <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0 text-text-gray"><ChevronRight className="w-5 h-5"/></button>
    </div>
  );
};
