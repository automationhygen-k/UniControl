import React from 'react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKey = (key: string) => {
    onKeyPress(key);
    if (navigator.vibrate) navigator.vibrate(5);
  };

  return (
    <div className="flex flex-col h-full p-4 pb-12 bg-black">
      <div className="mt-auto space-y-3">
        {keys.map((row, i) => (
          <div key={i} className="flex justify-center gap-1.5">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className="h-12 w-8 flex-1 rounded-lg bg-zinc-900 text-white text-lg font-light active:bg-white active:text-black transition-colors duration-100"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        
        <div className="flex gap-2 px-1">
             <button onClick={() => handleKey('SPACE')} className="h-12 flex-grow-[2] rounded-lg bg-zinc-900 text-xs text-zinc-500 font-medium active:bg-zinc-800">SPACE</button>
             <button onClick={() => handleKey('BACKSPACE')} className="h-12 w-16 rounded-lg bg-zinc-900 text-white flex items-center justify-center active:bg-red-900/40">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <button onClick={() => handleKey('ENTER')} className="h-12 w-16 rounded-lg bg-white text-black text-xs font-bold active:bg-zinc-200">RET</button>
        </div>
      </div>
    </div>
  );
};
