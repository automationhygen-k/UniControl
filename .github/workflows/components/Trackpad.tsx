import React, { useRef } from 'react';

export const Trackpad: React.FC<{ onMove: (x:number, y:number)=>void, onClick: (t:any)=>void, onScroll: (y:number)=>void }> = ({ onMove, onClick, onScroll }) => {
  const touchRef = useRef<{x:number, y:number} | null>(null);

  const handleStart = (e: React.TouchEvent) => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const handleMove = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.touches[0].clientX - touchRef.current.x;
    const dy = e.touches[0].clientY - touchRef.current.y;
    onMove(dx * 1.5, dy * 1.5);
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div className="flex flex-col h-full w-full p-6 gap-6">
      <div className="flex-1 rounded-[2.5rem] bg-ios-gray border border-zinc-800" onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={() => touchRef.current = null}></div>
      <div className="h-20 flex gap-4">
         <button onClick={() => onClick('left')} className="flex-1 rounded-3xl bg-ios-gray border border-zinc-800"></button>
         <button onClick={() => onClick('right')} className="w-20 rounded-3xl bg-ios-gray border border-zinc-800"></button>
      </div>
    </div>
  );
};
