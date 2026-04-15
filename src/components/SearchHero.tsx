import { useState, useEffect } from 'react';
import { Plane, Building, CarFront, ArrowRightLeft, MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';

export const SearchHero = () => {
  const [searchParams] = useSearchParams();
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState(searchParams.get('from') || '');
  const [to, setTo] = useState(searchParams.get('to') || '');
  const [date, setDate] = useState(searchParams.get('date') || format(new Date(), 'yyyy-MM-dd'));
  
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeInput !== 'from' || !from.trim()) {
      setFromSuggestions([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/airports/search?q=${from}`);
        const data = await res.json();
        setFromSuggestions(data);
      } catch (err) {}
    }, 300);
    return () => clearTimeout(handler);
  }, [from, activeInput]);

  useEffect(() => {
    if (activeInput !== 'to' || !to.trim()) {
      setToSuggestions([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/airports/search?q=${to}`);
        const data = await res.json();
        setToSuggestions(data);
      } catch (err) {}
    }, 300);
    return () => clearTimeout(handler);
  }, [to, activeInput]);

  const handleSearch = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (date < today) {
      alert("Please select a departure date from today onwards.");
      setDate(today);
      return;
    }
    navigate(`/results?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="bg-gradient-to-br from-[#010b1a] via-primary-blue to-[#002f82] text-white pb-24 px-8 flex flex-col items-center relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="w-full max-w-6xl mt-8 mb-12 flex gap-4 relative z-10">
         <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full font-bold shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all scale-105"><Plane className="w-5 h-5"/> Flights</button>
         <button className="flex items-center gap-2 px-6 py-2.5 hover:bg-white/10 rounded-full font-medium transition-all text-gray-300 hover:text-white"><Building className="w-5 h-5"/> Hotels</button>
         <button className="flex items-center gap-2 px-6 py-2.5 hover:bg-white/10 rounded-full font-medium transition-all text-gray-300 hover:text-white"><CarFront className="w-5 h-5"/> Cars</button>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          Where will your <br/> next journey take you?
        </h1>
        <div className="mb-6 flex gap-4">
          <select value={tripType} onChange={(e) => setTripType(e.target.value)} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-4 py-2 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm font-bold cursor-pointer transition-colors shadow-sm">
            <option className="text-black font-medium" value="one-way">One way</option>
            <option className="text-black font-medium" value="round-trip">Round trip</option>
          </select>
          <select className="bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-4 py-2 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm font-bold cursor-pointer transition-colors shadow-sm">
            <option className="text-black font-medium" value="1">1 Adult, Economy</option>
          </select>
        </div>
        
        <div className="flex bg-white/95 backdrop-blur-xl rounded-xl p-2 gap-2 w-full relative flex-col md:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
          <div className="flex-1 flex items-center bg-transparent border-2 border-transparent rounded-lg relative hover:bg-gray-50 focus-within:bg-gray-50 focus-within:border-brand-blue focus-within:shadow-inner transition-all group">
            <div className="px-5 py-3 w-full">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5 group-focus-within:text-brand-blue transition-colors">From</label>
              <input type="text" value={from} onChange={e => setFrom(e.target.value)} onFocus={() => setActiveInput('from')} onBlur={() => setTimeout(() => setActiveInput(null), 200)} placeholder="Country, city or airport" className="w-full text-gray-900 font-bold focus:outline-none text-xl bg-transparent placeholder-gray-300" />
              {activeInput === 'from' && fromSuggestions.length > 0 && (
                <div className="absolute top-[100%] left-0 w-full mt-2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-50">
                  {fromSuggestions.map(airport => (
                    <div 
                      key={airport.code} 
                      onMouseDown={() => { 
                        setFrom(airport.code); 
                        setActiveInput(null); 
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                           <span className="text-brand-blue bg-blue-50 px-1.5 py-0.5 rounded text-xs">{airport.code}</span>
                           {airport.city}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{airport.name}, {airport.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button className="hidden md:flex absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-gray-200 rounded-full p-2.5 hover:bg-gray-50 text-brand-blue shadow-md hover:shadow-lg hover:scale-110 transition-all">
            <ArrowRightLeft className="w-4 h-4" />
          </button>
          
          <div className="flex-1 flex items-center bg-transparent border-2 border-transparent rounded-lg relative hover:bg-gray-50 focus-within:bg-gray-50 focus-within:border-brand-blue focus-within:shadow-inner transition-all group pl-8">
            <div className="px-5 py-3 w-full">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5 group-focus-within:text-brand-blue transition-colors">To</label>
              <input type="text" value={to} onChange={e => setTo(e.target.value)} onFocus={() => setActiveInput('to')} onBlur={() => setTimeout(() => setActiveInput(null), 200)} placeholder="Country, city or airport" className="w-full text-gray-900 font-bold focus:outline-none text-xl bg-transparent placeholder-gray-300" />
              {activeInput === 'to' && toSuggestions.length > 0 && (
                <div className="absolute top-[100%] left-0 w-full mt-2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden z-50">
                  {toSuggestions.map(airport => (
                    <div 
                      key={airport.code} 
                      onMouseDown={() => { 
                        setTo(airport.code); 
                        setActiveInput(null); 
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                           <span className="text-brand-blue bg-blue-50 px-1.5 py-0.5 rounded text-xs">{airport.code}</span>
                           {airport.city}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{airport.name}, {airport.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-[2px] bg-gray-100 hidden md:block my-2"></div>

          <div className="flex-1 flex items-center bg-transparent border-2 border-transparent rounded-lg relative hover:bg-gray-50 focus-within:bg-gray-50 focus-within:border-brand-blue focus-within:shadow-inner transition-all group">
            <div className="px-5 py-3 w-full">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-0.5 group-focus-within:text-brand-blue transition-colors">Depart</label>
              <input type="date" min={format(new Date(), 'yyyy-MM-dd')} value={date} onChange={e => setDate(e.target.value)} className="w-full text-gray-900 font-bold focus:outline-none text-lg bg-transparent cursor-pointer" />
            </div>
          </div>
          
          <button onClick={handleSearch} className="bg-brand-blue hover:bg-primary-hover transition-all text-white font-bold text-xl px-12 py-4 md:py-0 rounded-lg shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5">
            Search
          </button>
        </div>

        <div className="flex gap-8 mt-5">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-sm">
            <input type="checkbox" className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300" />
            Add nearby airports
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-sm">
            <input type="checkbox" className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue border-gray-300" />
            Direct flights
          </label>
        </div>
      </div>
    </div>
  );
};
