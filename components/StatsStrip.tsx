import React from 'react';
import { ArrowUp, ArrowDown, Database, Zap } from 'lucide-react';
import { formatBytes } from '../utils/formatters';

interface StatsStripProps {
  upload: number; // KB/s
  download: number; // KB/s
  totalUpload: number; // KB
  totalDownload: number; // KB
  isConnected: boolean;
}

const StatsStrip: React.FC<StatsStripProps> = ({ upload, download, totalUpload, totalDownload, isConnected }) => {
  return (
    <div className="space-y-3 mb-4">
      {/* Real-time Speed */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-3 rounded-xl flex items-center justify-between group hover:bg-slate-800/40 transition-colors border-white/5">
          <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${isConnected ? 'bg-violet-500/10 text-violet-400' : 'bg-slate-800/50 text-slate-600'}`}>
                  <ArrowUp size={18} />
              </div>
              <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Upload</span>
                  <span className={`text-sm font-mono font-medium transition-colors ${isConnected ? 'text-white' : 'text-slate-600'}`}>
                      {isConnected ? formatBytes(upload * 1024) : '0 B'}/s
                  </span>
              </div>
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl flex items-center justify-between group hover:bg-slate-800/40 transition-colors border-white/5">
          <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${isConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800/50 text-slate-600'}`}>
                  <ArrowDown size={18} />
              </div>
              <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Download</span>
                  <span className={`text-sm font-mono font-medium transition-colors ${isConnected ? 'text-white' : 'text-slate-600'}`}>
                       {isConnected ? formatBytes(download * 1024) : '0 B'}/s
                  </span>
              </div>
          </div>
        </div>
      </div>

      {/* Total Session Data */}
      <div className="glass-panel px-4 py-2 rounded-xl flex items-center justify-between bg-slate-900/30 border-white/5">
        <div className="flex items-center gap-2">
          <Zap size={12} className={isConnected ? "text-amber-400 fill-amber-400" : "text-slate-600"} />
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Data Usage</span>
        </div>
        <div className="flex items-center gap-4 opacity-80">
          <div className="flex items-center gap-1.5">
            <div className={`w-1 h-1 rounded-full ${isConnected ? 'bg-violet-500' : 'bg-slate-600'}`}></div>
            <span className="text-[10px] font-mono text-slate-300">{formatBytes(totalUpload * 1024)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-1 h-1 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
            <span className="text-[10px] font-mono text-slate-300">{formatBytes(totalDownload * 1024)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsStrip;