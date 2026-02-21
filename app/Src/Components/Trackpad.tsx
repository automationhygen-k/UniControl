import React, { useRef } from 'react';

const Trackpad = () => {
  const lastTouch = useRef({ x: 0, y: 0 });

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    const touch = e.touches[0];
    
    // Calculate movement
    const dx = Math.round(touch.clientX - lastTouch.current.x);
    const dy = Math.round(touch.clientY - lastTouch.current.y);

    // This data structure [buttons, x, y] is the standard HID report for a mouse
    if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
      console.log(`HID_MOVE: ${dx}, ${dy}`);
      // The native BLE plugin handles the transmission to the iPad/PC
    }

    lastTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  return (
    <div 
      style={{ width: '100%', height: '100%', backgroundColor: '#000', touchAction: 'none' }}
      onTouchStart={(e) => { lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchMove={handleTouchMove}
    />
  );
};

export default Trackpad;
