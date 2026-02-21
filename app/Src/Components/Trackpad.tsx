import React, { useRef } from 'react';

// Simplified type definition to avoid needing a separate types file
interface TouchPoint {
  x: number;
  y: number;
}

interface TrackpadProps {
  mode: 'PC' | 'iPad';
}

const Trackpad: React.FC<TrackpadProps> = ({ mode }) => {
  const touchRef = useRef<TouchPoint | null>(null);

  // This is where you will later add your network logic (Fetch/WebSockets)
  const sendCommand = (action: string, data: any) => {
    console.log(`Sending to ${mode}:`, action, data);
    // TODO: Add your fetch(`http://YOUR_PC_IP:PORT/${action}`, ...) here
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
    if (navigator.vibrate) navigator.vibrate(5);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    // Prevent scrolling while using the trackpad
    if(e.cancelable) e.preventDefault(); 

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.x;
    const deltaY = touch.clientY - touchRef.current.y;

    // Send the movement to the target device
    sendCommand('move', { dx: deltaX * 1.5, dy: deltaY * 1.5 });

    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    touchRef.current = null;
  };

  const handleTap = () => {
    sendCommand('click', { type: 'left' });
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <div className="relative w-full h-full bg-slate-800 flex items-center justify-center">
      {/* Visual Indicator of Connection */}
      <div className="absolute top-10 text-white/50 uppercase tracking-widest text-sm">
        {mode} Mode Active
      </div>

      {/* The Actual Touch Area */}
      <div 
        className="w-[90%] h-[70%] bg-slate-700/50 border-2 border-white/10 rounded-3xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      />
      
      <p className="absolute bottom-10 text-white/30 text-xs">
        Slide to move cursor • Tap to click
      </p>
    </div>
  );
};

export default Trackpad;
