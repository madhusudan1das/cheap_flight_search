import { Plane, HelpCircle, Heart, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-primary-blue/95 backdrop-blur-md sticky top-0 z-50 text-white px-8 py-4 flex items-center justify-between shadow-md border-b border-white/10">
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="bg-white p-1.5 rounded-full transform group-hover:rotate-12 transition-transform duration-300">
           <Plane className="w-6 h-6 text-brand-blue -rotate-45" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">FlyGo<span className="text-brand-blue translate-y-2">.</span></span>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 hover:text-blue-200 font-medium transition-colors text-sm">
          <HelpCircle className="w-4 h-4" /> Support
        </button>
        <button className="flex items-center gap-2 hover:text-red-400 font-medium transition-colors text-sm">
          <Heart className="w-4 h-4" /> Saved
        </button>
        <button className="flex items-center gap-2 bg-brand-blue hover:bg-primary-hover px-5 py-2 rounded-full font-bold transition-all shadow-sm text-sm border border-brand-blue hover:border-blue-300">
          <User className="w-4 h-4" /> Log in
        </button>
      </div>
    </header>
  );
};
