import React, { useState, useEffect } from 'react';
import { Device } from '../types';
import { nativeBridge } from '../services/nativeBridge';

export const ConnectionManager: React.FC<{ onConnect: (device: Device) => void }> = ({ onConnect }) => {
  const [broadcasting, setBroadcasting] = useState(false);
  const [status, setStatus] = useState("Tap to Broadcast");

  useEffect(() => {
    const listener = nativeBridge.onConnectionChange((connected, name) => {
      if (connected) {
        setStatus("Connected!");
        setTimeout(() => onConnect({ id: 'pc', name: name || "PC", type: 'desktop', connected: true }), 500);
      } else {
        setStatus("Disconnected");
        setBroadcasting(true);
      }
    });
    return () => { listener.then(h => h.remove()); };
  }, [onConnect]);

  const start = async () => {
    setBroadcasting(true);
    setStatus("Waiting for PC...");
    await nativeBridge.broadcastSignal();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white">
      <button onClick={!broadcasting ? start : undefined} className="group relative">
        <div className={`w-64 h-64 rounded-full border border-zinc-800 flex items-center justify-center ${broadcasting ? 'animate-pulse' : ''}`}>
             <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center group-active:scale-95 transition-all">
                <div className={`w-3 h-3 rounded-full ${broadcasting ? 'bg-blue-500' : 'bg-white'}`} />
             </div>
        </div>
      </button>
      <p className="mt-8 text-zinc-500">{status}</p>
    </div>
  );
};
