import React, { useState, useEffect } from 'react';
import Trackpad from './Components/Trackpad';

const App = () => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState<'mouse' | 'keyboard'>('mouse');

  if (!deviceConnected) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-white/5 backdrop-blur-2xl rounded-[35px] p-10 w-[85%] border border-white/10 text-center">
          <h2 className="text-white/40 text-[10px] tracking-[0.5em] mb-10 uppercase">Hardware Link</h2>
          <div className="animate-pulse text-white text-sm mb-8">Pairing Mode Active...</div>
          <button 
            onClick={() => setDeviceConnected(true)}
            className="text-white/20 text-[9px] uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full"
          >
            Tap once paired in BT Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black select-none touch-none overflow-hidden">
      {/* The Aesthetic Dot (Top Right) */}
      <div 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute top-10 right-10 z-50 flex items-center justify-center transition-all duration-300 ease-out"
        style={{ 
          width: isMenuOpen ? '28px' : '8px', 
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
            className="w-full h-full flex items-center justify-center cursor-pointer"
          >
             {/* Minimalist Grid Icon */}
             <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1 h-1 bg-black rounded-full" />
                <div className="w-1 h-1 bg-black rounded-full" />
                <div className="w-1 h-1 bg-black rounded-full" />
                <div className="w-1 h-1 bg-black rounded-full" />
             </div>
          </div>
        )}
      </div>

      {mode === 'mouse' ? (
        <Trackpad /> 
      ) : (
        <div className="h-full w-full flex flex-col pt-32 px-10">
           <textarea 
            autoFocus 
            className="w-full h-full bg-black text-white text-xl focus:outline-none caret-white resize-none font-light"
            placeholder="Keyboard ready..."
          />
        </div>
      )}
    </div>
  );
};

export default App;
