import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const CredentialsInput: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="glass-panel p-1 rounded-xl flex items-center justify-between mb-6 border-slate-700/50 bg-slate-900/40">
      <div className="flex-1 flex items-center border-r border-slate-700 pr-2">
        <div className="pl-3 text-slate-400">
            <User size={18} />
        </div>
        <input 
            type="text" 
            placeholder="Username" 
            className="w-full bg-transparent border-none text-sm text-white px-3 py-3 outline-none focus:ring-0 placeholder-slate-500"
        />
      </div>
      <div className="flex-1 flex items-center pl-2">
        <div className="pl-1 text-slate-400">
            <Lock size={18} />
        </div>
        <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full bg-transparent border-none text-sm text-white px-3 py-3 outline-none focus:ring-0 placeholder-slate-500"
        />
        <button 
            onClick={() => setShowPassword(!showPassword)}
            className="pr-3 text-slate-500 hover:text-white transition-colors"
        >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default CredentialsInput;