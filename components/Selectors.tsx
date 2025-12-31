import React from 'react';
import { ServerLocation, NetworkPayload } from '../types';
import { MapPin, Globe, Radio, ChevronRight, Signal } from 'lucide-react';

interface SelectorsProps {
  selectedServer: ServerLocation;
  selectedPayload: NetworkPayload;
  onOpenServerSelector: () => void;
  onOpenPayloadSelector: () => void;
  disabled: boolean;
}

const Selectors: React.FC<SelectorsProps> = ({
  selectedServer,
  selectedPayload,
  onOpenServerSelector,
  onOpenPayloadSelector,
  disabled
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 w-full mb-4">
      {/* Server Card */}
      <button
        onClick={onOpenServerSelector}
        disabled={disabled}
        className="w-full relative group overflow-hidden rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800/40 hover:border-white/10"
      >
        <div className="flex items-center p-3">
            {/* Icon Box */}
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-slate-700/50 flex-shrink-0 group-hover:scale-105 transition-transform">
                {selectedServer.flag}
            </div>
            
            {/* Content */}
            <div className="ml-3 flex-1 text-left min-w-0">
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5 flex items-center gap-1">
                    <Globe size={10} /> Location
                </div>
                <div className="text-sm font-bold text-white truncate">
                    {selectedServer.name}
                </div>
            </div>

            {/* Right Side */}
            <div className="text-right flex flex-col items-end pl-2">
                <div className="flex items-center gap-1 mb-1">
                    <Signal size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-mono font-medium text-emerald-400">{selectedServer.ping}ms</span>
                </div>
                <div className="text-[9px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
                    {selectedServer.protocol}
                </div>
            </div>
        </div>
      </button>

      {/* Payload Card */}
      <button
        onClick={onOpenPayloadSelector}
        disabled={disabled}
        className="w-full relative group overflow-hidden rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800/40 hover:border-white/10"
      >
        <div className="flex items-center p-3">
            {/* Icon Box */}
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg shadow-inner border border-slate-700/50 flex-shrink-0 group-hover:scale-105 transition-transform text-slate-300">
                {selectedPayload.icon}
            </div>
            
            {/* Content */}
            <div className="ml-3 flex-1 text-left min-w-0">
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5 flex items-center gap-1">
                    <Radio size={10} /> Tweak
                </div>
                <div className="text-sm font-bold text-white truncate">
                    {selectedPayload.name}
                </div>
            </div>

            {/* Right Side */}
            <div className="pl-2">
                <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>
        </div>
      </button>
    </div>
  );
};

export default Selectors;