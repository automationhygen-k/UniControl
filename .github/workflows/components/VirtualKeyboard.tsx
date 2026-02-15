import React, { useState } from 'react';
import { generateSmartTypeContent } from '../services/geminiService';

export const VirtualKeyboard: React.FC<{ onKeyPress: (k: string) => void }> = ({ onKeyPress }) => {
  const [text, setText] = useState('');
  const keys = [['Q','W','E','R','T','Y','U','I','O','P'], ['A','S','D','F','G','H','J','K','L'], ['Z','X','C','V','B','N','M']];

  const send = () => { text.split('').forEach(c => onKeyPress(c)); onKeyPress('ENTER'); setText(''); };
  const refine = async () => { const r = await generateSmartTypeContent(text); if(r) setText(r); };

  return (
    <div className="flex flex-col h-full p-4 pb-8">
      <div className="bg-ios-gray rounded-2xl p-4 mb-4 border border-zinc-800">
         <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full bg-transparent text-white h-16 resize-none" placeholder="Type..." />
         <div className="flex justify-between pt-2">
             <button onClick={refine} className="text-blue-400 text-xs">AI REFINE</button>
             <button onClick={send} className="text-white text-xs font-bold bg-zinc-700 px-3 py-1 rounded-full">SEND</button>
         </div>
      </div>
      <div className="mt-auto space-y-2">
        {keys.map((row, i) => (
          <div key={i} className="flex justify-center gap-1">{row.map(k => (
              <button key={k} onClick={() => onKeyPress(k)} className="h-12 flex-1 rounded bg-zinc-800 text-white">{k}</button>
          ))}</div>
        ))}
        <div className="flex gap-2">
             <button onClick={() => onKeyPress('SPACE')} className="h-12 flex-grow rounded bg-zinc-800 text-white">SPACE</button>
             <button onClick={() => onKeyPress('BACKSPACE')} className="h-12 w-16 rounded bg-zinc-800 text-red-400">DEL</button>
        </div>
      </div>
    </div>
  );
};
