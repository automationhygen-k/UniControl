import React, { useState, useEffect } from 'react';
import { AppMode, Device } from './types';
import { Trackpad } from './components/Trackpad';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { nativeBridge } from './services/nativeBridge';

export default function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.MOUSE);
  const [isConnected, setIsConnected] = useState(false);
  const [wasConnected, setWasConnected] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    nativeBridge.broadcastSignal();
    const listener = nativeBridge.onConnectionChange((connected) => {
      setIsConnected(connected);
      if (navigator.vibrate) navigator.vibrate(connected ? [10, 50, 10] : 20);
    });
    return () => { listener.then(h => h.remove()); };
  }, []);

  useEffect(() => {
    if (isConnected) {
      setShowGreen(true);
      setWasConnected(true);
      const timer = setTimeout(() => setShowGreen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  const handleMouseMove = (dx: number, dy: number) => {
    if (!isConnected) return;
    nativeBridge.sendHidCommand({ type: 'MOUSE_MOVE', data: { dx, dy }});
  };

  const handleMouseClick = (type: 'left' | 'right') => {
    if (!isConnected) return;
    nativeBridge.sendHidCommand({ type: 'MOUSE_CLICK', data: { type }});
  };

  const handleScroll = (dy: number) => {
    if (!isConnected) return;
    nativeBridge.sendHidCommand({ type: 'SCROLL', data: { dy }});
  };

  const handleKeyPress = (key: string) => {
    if (!isConnected) return;
    nativeBridge.sendHidCommand({ type: 'KEY_PRESS', data: { key }});
  };

  const getDotStyle = () => {
    if (isExpanded) return 'w-[64px] h-[64px] rounded-full bg-zinc-900 border border-zinc-800 shadow-2xl';
    if (isConnected) {
      if (showGreen) return 'w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]';
      return 'w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]';
    } else {
      if (wasConnected) return 'w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center';
      return 'w-3.5 h-3.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.5)]';
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        {mode === AppMode.MOUSE ? (
          <Trackpad onMove={handleMouseMove} onClick={handleMouseClick} onScroll={handleScroll} />
        ) : (
          <div className="h-full w-full flex flex-col">
            <div className="flex-1" onClick={() => setMode(AppMode.MOUSE)} />
            <VirtualKeyboard onKeyPress={handleKeyPress} />
          </div>
        )}
      </div>

      <div className="absolute top-safe-top left-4 pt-4 z-50">
        <div className="relative">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 flex items-center justify-center active:scale-95 transition-transform"
          >
            <div className={`transition-all duration-500 ease-in-out flex items-center justify-center overflow-hidden ${getDotStyle()}`}>
              {isExpanded ? (
                <div onClick={(e) => {
                  e.stopPropagation();
                  setMode(mode === AppMode.MOUSE ? AppMode.KEYBOARD : AppMode.MOUSE);
                  setIsExpanded(false);
                }} className="w-full h-full flex items-center justify-center active:scale-90 transition-transform">
                  {mode === AppMode.MOUSE ? (
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  ) : (
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="6" y="3" width="12" height="18" rx="6" strokeWidth={1.5} /><line x1="12" y1="7" x2="12" y2="11" strokeWidth={1.5} /></svg>
                  )}
                </div>
              ) : (
                !isConnected && wasConnected && <div className="w-1.5 h-1.5 bg-black rounded-full" />
              )}
            </div>
          </button>
        </div>
      </div>

      {isExpanded && <div className="absolute inset-0 bg-transparent z-40" onClick={() => setIsExpanded(false)} />}
    </div>
  );
}
