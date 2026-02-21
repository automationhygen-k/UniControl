import React, { useState } from 'react';
import Trackpad from './Components/Trackpad';

const App = () => {
  const [targetIP, setTargetIP] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState<'mouse' | 'keyboard'>('mouse');

  // Connection UI (The Square Box)
  if (!targetIP) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-white/5 backdrop-blur-2xl rounded-[35px] p-10 w-[85%] border border-white/10">
          <h2 className="text-white/30 text-center text-[10px] tracking-[0.5em] mb-10 uppercase font-light">Direct Link</h2>
          <input 
            type="text"
            placeholder="IP ADDRESS"
            className="w-full bg-transparent border-b border-white/20 py-4 text-white text-center focus:outline-none focus:border-white transition-all mb-8 font-mono"
            onKeyDown={(e) => {
              if (e.key === 'Enter') setTargetIP(e.currentTarget.value);
            }}
          />
          <p className="text-white/10 text-[8px] text-center tracking-widest uppercase">Input device IP to bridge</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black select-none touch-none overflow-hidden">
      {/* The Aesthetic Dot (Top Right) */}
      <div 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute top-10 right-10 z-50 flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
        style={{ 
          width: isMenuOpen ? '28px' : '8px',  // ~0.75cm expanded, 0.2cm base
          height: isMenuOpen ? '28px' : '8px',
          backgroundColor: 'white',
          borderRadius: '50%',
          opacity: isMenuOpen ? 1 : 0.4
        }}
      >
        {isMenuOpen && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setMode(mode === 'mouse' ? 'keyboard' : 'mouse');
              setIsMenuOpen(false);
            }}
            className="w-full h-full flex items-center justify-center"
          >
             {/* Minimalist icon representation */}
             <div className="w-3 h-3 border border-black/20 flex flex-wrap gap-0.5 p-0.5">
                {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 bg-black/80" />)}
             </div>
          </div>
        )}
      </div>

      {/* Main Interface Area */}
      {mode === 'mouse' ? (
        <Trackpad /> 
      ) : (
        <div className="h-full w-full flex flex-col pt-32 px-10">
           <textarea 
            autoFocus 
            className="w-full h-full bg-black text-white text-xl focus:outline-none caret-white resize-none font-light"
            placeholder="System Keyboard Active..."
          />
        </div>
      )}
    </div>
  );
};

export default App;
