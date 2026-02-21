import React, { useState } from 'react';
import Trackpad from './Components/Trackpad';

const App = () => {
  const [devicePaired, setDevicePaired] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState<'mouse' | 'keyboard'>('mouse');

  if (!devicePaired) {
    return (
      <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '40px', padding: '50px', width: '80%', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#fff', borderRadius: '50%', margin: '0 auto 20px', opacity: 0.5 }}></div>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '4px', marginBottom: '40px', textTransform: 'uppercase' }}>Hardware Link</h2>
          <button onClick={() => setDevicePaired(true)} style={{ width: '100%', padding: '15px', backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', fontSize: '12px', letterSpacing: '2px' }}>
            CONNECT DEVICE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 100, backgroundColor: '#fff', borderRadius: '50%', transition: 'all 0.3s ease', width: isMenuOpen ? '32px' : '8px', height: isMenuOpen ? '32px' : '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isMenuOpen ? 1 : 0.4 }}>
        {isMenuOpen && (
          <div onClick={(e) => { e.stopPropagation(); setMode(mode === 'mouse' ? 'keyboard' : 'mouse'); setIsMenuOpen(false); }} style={{ color: '#000', fontSize: '8px', fontWeight: 'bold' }}>
            {mode === 'mouse' ? 'KB' : 'MS'}
          </div>
        )}
      </div>
      {mode === 'mouse' ? <Trackpad /> : <textarea autoFocus style={{ width: '100%', height: '100%', backgroundColor: '#000', color: '#fff', border: 'none', outline: 'none', fontSize: '24px', padding: '150px 40px' }} placeholder="..." />}
    </div>
  );
};

export default App;
