import React from 'react';
import { Settings, Wifi, Activity, Shield, X, Smartphone, Globe, Link, Home } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  onOpenTool: (tool: string) => void;
  activeView: string;
}

const LOGO_URL = "https://file-service.main.prod.aws.magicschool.ai/feedback_images/2e0882e7-9d7a-42b7-a36c-2f92f2549a1d_1740626573752.png";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onOpenTool, activeView }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-[#1e293b] z-50 shadow-2xl transform transition-transform duration-300 ease-out border-r border-slate-700/50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-44 bg-gradient-to-br from-violet-600 to-indigo-700 p-6 flex flex-col justify-end relative overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                <img src={LOGO_URL} className="w-64 h-64 grayscale contrast-125 object-contain" alt="" />
            </div>
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
            >
                <X size={20} />
            </button>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <img src={LOGO_URL} className="w-10 h-10 rounded-xl shadow-xl shadow-black/20 object-contain bg-black/20" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black text-white tracking-tight leading-none">NOX VPN</h2>
                        <p className="text-violet-200/70 text-[10px] font-mono tracking-[0.2em] uppercase mt-0.5">Professional</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-100 font-bold uppercase">System Operational</span>
                </div>
            </div>
        </div>

        {/* Menu Items */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-176px)] custom-scrollbar">
            
            <div className="px-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</div>
            <nav className="space-y-1 px-2">
                <button 
                    onClick={() => { onNavigate('dashboard'); onClose(); }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        activeView === 'dashboard' 
                        ? 'bg-violet-500/10 text-violet-400 font-bold' 
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    <Home size={20} className={activeView === 'dashboard' ? 'text-violet-400' : 'text-slate-400'} />
                    <span className="text-sm">Home Dashboard</span>
                </button>
                
                <button 
                    onClick={() => { onNavigate('settings'); onClose(); }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        activeView === 'settings' 
                        ? 'bg-violet-500/10 text-violet-400 font-bold' 
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    <Settings size={20} className={activeView === 'settings' ? 'text-violet-400' : 'text-slate-400'} />
                    <span className="text-sm">VPN Configuration</span>
                </button>
                
                <button 
                    onClick={() => { onNavigate('tethering'); onClose(); }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        activeView === 'tethering' 
                        ? 'bg-violet-500/10 text-violet-400 font-bold' 
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                    <Wifi size={20} className={activeView === 'tethering' ? 'text-violet-400' : 'text-slate-400'} />
                    <span className="text-sm">Wi-Fi Tethering</span>
                </button>
            </nav>

            <div className="px-6 mt-8 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Tools</div>
            <nav className="space-y-1 px-2">
                <button 
                    onClick={() => { onOpenTool('autoping'); onClose(); }}
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <Activity size={20} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                        <span className="text-sm">Auto Ping</span>
                    </div>
                </button>

                 <button 
                    onClick={() => { onOpenTool('iphunter'); onClose(); }}
                    className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <Globe size={20} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                        <span className="text-sm">IP Hunter</span>
                    </div>
                    <span className="text-[9px] bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/30 font-bold uppercase">GTM</span>
                </button>
                
                <button 
                    onClick={() => { onOpenTool('adminpanel'); onClose(); }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-all group"
                >
                    <Link size={20} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
                    <span className="text-sm">Admin Panel</span>
                </button>
            </nav>

            <div className="mt-auto px-6 pt-10 pb-4">
                <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 font-mono">App Version: 4.2.0-PRO</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">Developer: Cvcreation</p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;