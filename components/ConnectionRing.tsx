import React from 'react';
import { ConnectionState } from '../types';
import { RefreshCw, Power, Globe, Activity, ShieldCheck, MapPin, Zap } from 'lucide-react';

interface ConnectionRingProps {
  status: ConnectionState;
  duration: number;
  onToggle: () => void;
  ipAddress?: string;
  ping?: number;
  locationName?: string;
}

const ConnectionRing: React.FC<ConnectionRingProps> = ({ 
  status, 
  duration, 
  onToggle, 
  ipAddress = '---.---.---.---', 
  ping = 0,
  locationName = 'Select Server'
}) => {
  const isConnected = status === 'connected';

  return (
    <div className="relative flex flex-col items-center justify-center my-4">
      {/* Background Ambience */}
      <div className={`absolute w-[120%] h-[120%] rounded-full transition-all duration-1000 opacity-20 blur-[80px] pointer-events-none ${
        status === 'connected' ? 'bg-emerald-500/40' : 
        status === 'connecting' ? 'bg-amber-500/30' : 'bg-transparent'
      }`} />

      {/* Main Interactive Core */}
      <div className="relative w-64 h-64 z-10 flex items-center justify-center">
        {/* SVG Ring System */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
          {/* Base Track */}
          <circle
            cx="128"
            cy="128"
            r="118"
            stroke="currentColor"
            strokeWidth="1"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Progress Indicator */}
          <circle
            cx="128"
            cy="128"
            r="118"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={741}
            strokeDashoffset={status === 'connected' ? 0 : 741}
            strokeLinecap="round"
            className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
              status === 'connected' ? 'text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
              status === 'connecting' ? 'text-amber-500' : 'text-slate-700'
            }`}
          />
        </svg>

        {/* Floating Particles/Decorations (CSS) */}
        {isConnected && (
            <div className="absolute inset-0 rounded-full animate-pulse border border-emerald-500/20 scale-110"></div>
        )}

        {/* Central Button */}
        <button
          onClick={onToggle}
          disabled={status === 'connecting' || status === 'disconnecting'}
          className={`w-44 h-44 rounded-full flex items-center justify-center transition-all duration-500 relative z-20 group outline-none ${
            status === 'connected' 
              ? 'bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.2)]' 
              : 'bg-slate-800/30 hover:bg-slate-800/50'
          }`}
        >
            {/* Button Inner Border */}
            <div className={`absolute inset-0 rounded-full border transition-colors duration-500 ${
                isConnected ? 'border-emerald-500/50' : 'border-slate-700'
            }`} />
            
            {/* Button Inner Glow */}
            <div className={`absolute inset-2 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden ${
                status === 'connected' 
                 ? 'bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-inner' 
                 : status === 'connecting'
                 ? 'bg-gradient-to-tr from-amber-600 to-amber-400 animate-pulse'
                 : 'bg-gradient-to-b from-slate-800 to-slate-950 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]'
            }`}>
                 {/* Icon */}
                 <div className={`transition-all duration-500 transform ${isConnected ? 'scale-110' : 'group-hover:scale-105'} ${status === 'connecting' ? 'animate-spin' : ''}`}>
                    {status === 'connecting' || status === 'disconnecting' ? (
                        <RefreshCw size={48} className="text-white/90" />
                    ) : (
                        <Power size={52} className={`${isConnected ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    )}
                 </div>
            </div>
        </button>
      </div>

      {/* Status Readout */}
      <div className="mt-6 flex flex-col items-center">
        <div className={`flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
            status === 'connected' ? 'text-emerald-400' : 
            status === 'connecting' ? 'text-amber-400' : 
            status === 'disconnecting' ? 'text-rose-400' : 'text-slate-500'
        }`}>
            {status === 'connected' && <ShieldCheck size={14} />}
            {status === 'connected' ? 'Secure Connection' : 
             status === 'connecting' ? 'Establishing...' : 
             status === 'disconnecting' ? 'Disconnecting...' : 'Disconnected'}
        </div>

        <div className={`text-6xl font-light tracking-tighter tabular-nums mt-2 transition-all duration-500 ${
            isConnected ? 'text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'text-slate-700'
        }`}>
            {duration > 0 ? new Date(duration * 1000).toISOString().substr(11, 8) : '00:00:00'}
        </div>

        {/* Minimal Stats Row */}
        <div className={`flex items-center gap-6 mt-8 transition-all duration-500 ${isConnected ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4 grayscale'}`}>
            <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5">
                    <Globe size={14} className="text-violet-400" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">{isConnected ? ipAddress : '---'}</span>
            </div>
             <div className="w-px h-8 bg-slate-800"></div>
            <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5">
                    <Activity size={14} className="text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">{isConnected ? `${ping} ms` : '--'}</span>
            </div>
             <div className="w-px h-8 bg-slate-800"></div>
            <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5">
                    <Zap size={14} className="text-amber-400" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">Stable</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRing;