import React, { useState } from 'react';
import Trackpad from './Components/Trackpad';
import Controller from './Components/Controller';

function App() {
  const [connectionMode, setConnectionMode] = useState<null | 'PC' | 'iPad'>(null);

  if (!connectionMode) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Connect UniControl To:</h1>
        <button 
          onClick={() => setConnectionMode('PC')}
          className="w-full max-w-xs mb-4 p-6 bg-blue-600 rounded-xl text-xl font-semibold shadow-lg active:scale-95 transition-transform"
        >
          💻 Connect to PC
        </button>
        <button 
          onClick={() => setConnectionMode('iPad')}
          className="w-full max-w-xs p-6 bg-purple-600 rounded-xl text-xl font-semibold shadow-lg active:scale-95 transition-transform"
        >
          📱 Connect to iPad
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <button 
        onClick={() => setConnectionMode(null)}
        className="absolute top-4 left-4 z-50 bg-white/20 p-2 rounded text-sm text-white"
      >
        ← Back
      </button>
      
      {/* This renders the actual trackpad/controller logic */}
      <Trackpad mode={connectionMode} />
    </div>
  );
}

export default App;
