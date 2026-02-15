import React, { useState } from 'react';
import { AppMode, Device } from './types';
import { ConnectionManager } from './components/ConnectionManager';
import { Trackpad } from './components/Trackpad';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { AiVoiceControl } from './components/AiVoiceControl';
import { nativeBridge } from './services/nativeBridge';

export default function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.CONNECTING);
  const [device, setDevice] = useState<Device | null>(null);
  const [ai, setAi] = useState(false);

  const move = (dx: number, dy: number) => nativeBridge.sendHidCommand({ type: 'MOUSE_MOVE', data: { dx, dy }});
  const click = (type: 'left'|'right') => nativeBridge.sendHidCommand({ type: 'MOUSE_CLICK', data: { type }});
  const scroll = (dy: number) => nativeBridge.sendHidCommand({ type: 'SCROLL', data: { dy }});
  const key = (key: string) => nativeBridge.sendHidCommand({ type: 'KEY_PRESS', data: { key }});

  if (mode === AppMode.CONNECTING) return <ConnectionManager onConnect={(d) => { setDevice(d); setMode(AppMode.MOUSE); }} />;

  return (
    <div className="h-screen bg-black text-white flex flex-col pb-safe-bottom">
      <div className="h-14 flex items-center justify-between px-6">
          <span className="text-xs text-zinc-500">{device?.name}</span>
          <button onClick={() => setMode(AppMode.CONNECTING)} className="text-zinc-500">DISCONNECT</button>
      </div>
      <div className="flex-1 relative">
        {mode === AppMode.MOUSE && <Trackpad onMove={move} onClick={click} onScroll={scroll} />}
        {mode === AppMode.KEYBOARD && <VirtualKeyboard onKeyPress={key} />}
        <button onClick={() => setAi(true)} className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full text-black shadow-lg">MIC</button>
      </div>
      <div className="h-20 border-t border-zinc-900 flex items-center justify-center gap-12">
         <button onClick={() => setMode(AppMode.MOUSE)} className={mode === AppMode.MOUSE ? 'text-white' : 'text-zinc-700'}>MOUSE</button>
         <button onClick={() => setMode(AppMode.KEYBOARD)} className={mode === AppMode.KEYBOARD ? 'text-white' : 'text-zinc-700'}>KEYBOARD</button>
      </div>
      {ai && <AiVoiceControl onCommand={(a, t) => { if(a==='TYPE') key(t||''); }} onClose={() => setAi(false)} />}
    </div>
  );
}
