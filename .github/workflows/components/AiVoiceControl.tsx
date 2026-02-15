import React, { useState, useEffect, useRef } from 'react';
import { interpretVoiceCommand } from '../services/geminiService';

export const AiVoiceControl: React.FC<{ onCommand: (a: string, t?: string) => void, onClose: () => void }> = ({ onCommand, onClose }) => {
  const [listening, setListening] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      ref.current = new SR();
      ref.current.onresult = async (e: any) => {
        setListening(false);
        const res = await interpretVoiceCommand(e.results[0][0].transcript);
        if (res.action === "TYPE" && res.text) onCommand("TYPE", res.text);
        else if (res.action !== "ERROR") onCommand(res.action);
        onClose();
      };
      ref.current.start();
      setListening(true);
    }
  }, []);

  return (
    <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className={`w-20 h-20 rounded-full bg-white mb-4 ${listening ? 'animate-pulse' : ''}`}></div>
        <p className="text-white">Listening...</p>
        <button onClick={onClose} className="mt-8 text-zinc-500">CANCEL</button>
      </div>
    </div>
  );
};
