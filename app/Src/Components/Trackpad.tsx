import React, { useRef } from 'react';
import { TouchPoint } from '../types';

interface TrackpadProps {
  onMove: (deltaX: number, deltaY: number) => void;
  onClick: (type: 'left' | 'right') => void;
  onScroll: (deltaY: number) => void;
}

export const Trackpad: React.FC<TrackpadProps> = ({ onMove, onClick }) => {
  const touchRef = useRef<TouchPoint | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
    if (navigator.vibrate) navigator.vibrate(5);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    if(e.cancelable) e.preventDefault(); 

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.x;
    const deltaY = touch.clientY - touchRef.current.y;

    onMove(deltaX * 1.5, deltaY * 1.5);
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    touchRef.current = null;
  };

  const handleSingleTap = () => {
    onClick('left');
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full bg-transparent z-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleSingleTap}
    />
  );
};
