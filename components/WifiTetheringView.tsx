import React, { useState } from 'react';
import { ArrowLeft, Wifi, Smartphone, Lock, Share2 } from 'lucide-react';

interface WifiTetheringViewProps {
  onClose: () => void;
}

const WifiTetheringView: React.FC<WifiTetheringViewProps> = ({ onClose }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center gap-4 mb-4 pt-2">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="font-bold text-lg leading-none tracking-tight">WI-FI Tethering</h1>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Hotspot Proxy</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center">
        
        {/* Illustration Area */}
        <div className="w-full h-64 relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent rounded-full blur-3xl" />
            
            {/* Composition */}
            <div className="relative z-10 flex items-center gap-8">
                {/* Device 1 */}
                <div className="relative flex flex-col items-center">
                    <div className="w-16 h-32 border-4 border-slate-600 rounded-2xl bg-slate-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-4 bg-slate-700 border-b border-slate-600 rounded-t-lg mx-auto w-8 rounded-b-lg"></div>
                         <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/50">
                             <Wifi size={20} className="text-white" />
                         </div>
                    </div>
                    <div className="absolute -bottom-3 w-20 h-2 bg-black/50 blur-md rounded-full"></div>
                </div>

                {/* Connection Line */}
                <div className={`h-1 w-24 rounded-full transition-all duration-500 relative overflow-hidden ${isEnabled ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}>
                    {isEnabled && (
                        <div className="absolute inset-0 bg-white/50 w-full animate-pulse"></div>
                    )}
                </div>

                {/* Device 2 */}
                <div className="relative flex flex-col items-center">
                    <div className="w-16 h-32 border-4 border-slate-600 rounded-2xl bg-slate-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-4 bg-slate-700 border-b border-slate-600 rounded-t-lg mx-auto w-8 rounded-b-lg"></div>
                         <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                             <Share2 size={20} className="text-slate-300" />
                         </div>
                    </div>
                    <div className="absolute -bottom-3 w-20 h-2 bg-black/50 blur-md rounded-full"></div>
                </div>
            </div>
        </div>

        {/* Big Toggle */}
        <button 
            onClick={() => setIsEnabled(!isEnabled)}
            className={`w-48 h-16 rounded-full flex items-center justify-center transition-all duration-500 mb-10 border-2 ${
                isEnabled 
                ? 'bg-violet-600 border-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.4)]' 
                : 'bg-slate-800 border-slate-600 shadow-none'
            }`}
        >
            <span className={`text-xl font-bold tracking-widest ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                {isEnabled ? 'ON' : 'OFF'}
            </span>
        </button>

        {/* Instructions */}
        <div className="w-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
                How to Connect
            </h3>
            <ol className="space-y-4">
                <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold border border-violet-500/30">1</span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Power on the Button above, then proceed to Step 2.
                    </p>
                </li>
                <li className="flex gap-4">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold border border-violet-500/30">2</span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Connect another device to the WiFi network using the Password shown in your hotspot settings.
                    </p>
                </li>
                <li className="flex gap-4">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold border border-violet-500/30">3</span>
                    <div className="space-y-2">
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Set up proxy on the connected device.
                        </p>
                        <p className="text-xs text-slate-500 italic">
                            (Search online on how to set up proxy on your device)
                        </p>
                    </div>
                </li>
            </ol>
            
            <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
                <p className="text-xs text-emerald-400 font-medium">
                    You do not need to install this app on the other device.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default WifiTetheringView;