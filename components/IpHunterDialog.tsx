import React, { useState } from 'react';
import { Ban, RotateCw, Globe, X } from 'lucide-react';

interface IpHunterDialogProps {
  onClose: () => void;
}

const IpHunterDialog: React.FC<IpHunterDialogProps> = ({ onClose }) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = () => {
    setIsChecking(true);
    setTimeout(() => {
        setIsChecking(false);
    }, 1500);
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
                 <Globe size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">IP Hunter</h2>
              <p className="text-purple-200 text-xs mt-1 font-medium">GTM Network Tools</p>
          </div>
          
           <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center pt-10">
            <div className="mb-6 relative p-6 bg-slate-800/50 rounded-full border border-slate-700/50 shadow-inner">
                 <Ban size={48} className="text-red-500 drop-shadow-lg" strokeWidth={2} />
            </div>
            
            <p className="text-base font-medium text-slate-200 mb-8 leading-relaxed px-4">
                Disconnected. <br/>
                <span className="text-slate-400 text-xs mt-2 block">Please toggle Airplane Mode On/Off and Try Again.</span>
            </p>

            <button 
                onClick={handleCheck}
                className="w-full py-4 bg-[#7c3aed] text-white font-bold text-sm rounded-2xl hover:bg-[#6d28d9] shadow-lg shadow-purple-500/20 transition-all uppercase flex items-center justify-center gap-2 active:scale-[0.98]"
            >
                {isChecking ? <RotateCw size={18} className="animate-spin"/> : 'Check Again'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default IpHunterDialog;