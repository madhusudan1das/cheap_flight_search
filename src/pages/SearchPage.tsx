import { SearchHero } from '../components/SearchHero';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const destinations = [
  { id: 1, name: 'Goa', code: 'GOI', price: '₹4,500', img: '/images/goa_beach_1775209996686.png' },
  { id: 2, name: 'Dubai', code: 'DXB', price: '₹14,200', img: '/images/dubai_skyline_1775210013130.png' },
  { id: 3, name: 'Paris', code: 'CDG', price: '₹34,000', img: '/images/paris_tower_1775210031045.png' },
  { id: 4, name: 'Bali', code: 'DPS', price: '₹18,500', img: '/images/bali_resort_1775210058467.png' }
];

export const SearchPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-bg-light min-h-screen">
      <SearchHero />
      <div className="max-w-6xl mx-auto py-16 px-8 relative -top-10 z-20">
        <h2 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Popular destinations leaving from your area</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {destinations.map(dest => (
             <div 
               key={dest.id} 
               onClick={() => navigate(`/results?from=DEL&to=${dest.code}&date=${format(new Date(), 'yyyy-MM-dd')}`)}
               className="rounded-2xl overflow-hidden relative h-[280px] cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 bg-white"
             >
               <div className="absolute inset-0 bg-gray-300 group-hover:scale-110 transition-transform duration-700 bg-center bg-cover" style={{backgroundImage: `url("${dest.img}")`}}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#02122c]/90 via-[#02122c]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
               <div className="absolute bottom-6 left-6 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
                 <div className="font-black text-2xl mb-1 shadow-sm">{dest.name}</div>
                 <div className="text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded inline-block">Flights from {dest.price}</div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
