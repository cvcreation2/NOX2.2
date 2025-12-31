import React, { useState } from 'react';
import { Server, Link, Save, RefreshCw, CheckCircle2, X } from 'lucide-react';
import { AdminConfig } from '../types';

interface AdminPanelDialogProps {
  config: AdminConfig;
  onSave: (config: AdminConfig) => void;
  onClose: () => void;
}

const AdminPanelDialog: React.FC<AdminPanelDialogProps> = ({ config, onSave, onClose }) => {
  const [url, setUrl] = useState(config.adminUrl);
  const [key, setKey] = useState(config.apiKey);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSync = () => {
    setIsSyncing(true);
    setSyncStatus('idle');
    
    // Simulate API Call
    setTimeout(() => {
        setIsSyncing(false);
        setSyncStatus('success');
        // Save automatically after successful sync
        onSave({
            adminUrl: url,
            apiKey: key,
            lastSync: Date.now()
        });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-[#1e293b] rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#7c3aed] p-6 pb-8 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20 shadow-inner">
               <Link size={32} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
                Admin Panel
            </h2>
            <p className="text-purple-200 text-xs font-medium">Remote Configuration Link</p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 pt-8">
          
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-1">Panel URL / JSON Config</label>
            <input 
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://panel.example.com/api/config"
              className="w-full bg-slate-800/50 border border-slate-600/50 focus:border-violet-500 rounded-2xl px-4 py-3.5 outline-none transition-all text-white text-sm font-mono placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/20 shadow-inner"
            />
          </div>

          <div className="space-y-2">
             <label className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-1">API Key (Optional)</label>
            <input 
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-800/50 border border-slate-600/50 focus:border-violet-500 rounded-2xl px-4 py-3.5 outline-none transition-all text-white text-sm font-mono placeholder:text-slate-600 focus:ring-2 focus:ring-violet-500/20 shadow-inner"
            />
          </div>

          <div className="bg-slate-800/30 rounded-2xl p-4 flex items-center justify-between border border-slate-700/50">
             <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Last Sync</div>
                <div className="text-xs text-slate-300 font-mono mt-0.5">
                    {config.lastSync ? new Date(config.lastSync).toLocaleString() : 'Never'}
                </div>
             </div>
             
             {syncStatus === 'success' && (
                 <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2.5 py-1.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 size={12} />
                    SYNCED
                 </div>
             )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button 
            onClick={handleSync}
            disabled={isSyncing || !url}
            className="w-full py-4 bg-[#7c3aed] text-white font-bold text-sm rounded-2xl hover:bg-[#6d28d9] shadow-lg shadow-purple-500/20 transition-all uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isSyncing ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            {isSyncing ? 'Syncing...' : 'Save & Sync'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelDialog;