import React, { useState } from 'react';
import { Activity, X, Zap } from 'lucide-react';

interface AutoPingDialogProps {
  onClose: () => void;
}

const AutoPingDialog: React.FC<AutoPingDialogProps> = ({ onClose }) => {
  const [host, setHost] = useState('www.google.com');
  const [timeout, setTimeout] = useState('10');
  const [threads, setThreads] = useState('3');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-[#e2e8f0] dark:bg-[#1e293b] rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#7c3aed] p-6 pb-8 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
           <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20 shadow-inner">
               <Activity size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Auto Ping</h2>
            <p className="text-purple-200 text-xs mt-1 font-medium">Configure Connection Keep-Alive</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 pt-8 bg-[#1e293b]">
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-1">Ping destination (host)</label>
            <input 
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600/50 focus:border-violet-500 rounded-2xl px-4 py-3.5 outline-none transition-all text-white text-sm font-mono focus:ring-2 focus:ring-violet-500/20 shadow-inner"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-1">Timeout (s)</label>
                <input 
                type="number"
                value={timeout}
                onChange={(e) => setTimeout(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600/50 focus:border-violet-500 rounded-2xl px-4 py-3.5 outline-none transition-all text-white text-sm font-mono focus:ring-2 focus:ring-violet-500/20 shadow-inner"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-1">Threads</label>
                <input 
                type="number"
                value={threads}
                onChange={(e) => setThreads(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600/50 focus:border-violet-500 rounded-2xl px-4 py-3.5 outline-none transition-all text-white text-sm font-mono focus:ring-2 focus:ring-violet-500/20 shadow-inner"
                />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 pt-0 bg-[#1e293b]">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#7c3aed] text-white font-bold text-sm rounded-2xl hover:bg-[#6d28d9] shadow-lg shadow-purple-500/20 transition-all uppercase active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Zap size={18} fill="currentColor" />
            Start Auto Ping
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoPingDialog;