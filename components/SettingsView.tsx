
import React from 'react';
import { ArrowLeft, Info, AlertTriangle, RefreshCw } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: any) => void;
  onClose: () => void;
}

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none flex-shrink-0 ${
      checked ? 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-slate-700'
    }`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

const SettingItem: React.FC<{
  title: string;
  description?: string;
  control: React.ReactNode;
  warning?: boolean;
}> = ({ title, description, control, warning }) => (
  <div className="flex items-start justify-between py-4 border-b border-slate-700/50 last:border-0">
    <div className="flex-1 pr-4">
      <div className="flex items-center gap-2">
        <h3 className={`text-sm font-medium ${warning ? 'text-amber-400' : 'text-slate-200'}`}>{title}</h3>
        {warning && <AlertTriangle size={12} className="text-amber-400" />}
      </div>
      {description && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>}
    </div>
    <div className="pt-1">{control}</div>
  </div>
);

const InputItem: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="py-4 border-b border-slate-700/50 last:border-0">
    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800/50 text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-violet-500 transition-all border border-slate-700/50 text-sm font-mono"
    />
  </div>
);

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate, onClose }) => {
  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center gap-4 mb-6 pt-2">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="font-bold text-lg leading-none tracking-tight">Settings</h1>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">OpenVPN Configuration</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-6">
        {/* General Toggles */}
        <div className="glass-panel rounded-xl p-4 mb-4">
          <SettingItem
            title="Auto-Reconnect"
            description="Automatically attempt to reconnect if the connection drops unexpectedly."
            control={
              <Toggle 
                checked={settings.autoReconnect} 
                onChange={(v) => onUpdate('autoReconnect', v)} 
              />
            }
          />
          <SettingItem
            title="Battery Saver"
            description="Pause VPN when screen is blanked to save energy."
            control={
              <Toggle 
                checked={settings.batterySaver} 
                onChange={(v) => onUpdate('batterySaver', v)} 
              />
            }
          />
          <SettingItem
            title="Seamless Tunnel"
            description="Block internet while VPN is paused or reconnecting. (Note: Android versions 4.4 to 4.4.2 have a known bug preventing this)."
            control={
              <Toggle 
                checked={settings.seamlessTunnel} 
                onChange={(v) => onUpdate('seamlessTunnel', v)} 
              />
            }
          />
          <SettingItem
            title="Reconnect on reboot"
            description="If a VPN connection is active on device shutdown, try to automatically reconnect on reboot."
            control={
              <Toggle 
                checked={settings.reconnectOnReboot} 
                onChange={(v) => onUpdate('reconnectOnReboot', v)} 
              />
            }
          />
        </div>

        {/* Configuration Section */}
        <div className="glass-panel rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-4 text-violet-400">
             <Info size={14} />
             <span className="text-xs font-bold uppercase tracking-wider">Advanced Config</span>
          </div>
          
          <InputItem 
            label="Proxy address" 
            value={settings.proxyAddress}
            onChange={(v) => onUpdate('proxyAddress', v)}
          />
          
          <div className="py-4 border-b border-slate-700/50">
             <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">VPN Protocol</label>
             <select 
                value={settings.vpnProtocol}
                onChange={(e) => onUpdate('vpnProtocol', e.target.value)}
                className="w-full bg-slate-800/50 text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-violet-500 transition-all border border-slate-700/50 text-sm appearance-none"
             >
                <option value="adaptive">Adaptive (Recommended)</option>
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
             </select>
          </div>

          <div className="py-4 border-b border-slate-700/50">
             <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">IPv6</label>
             <select 
                value={settings.ipv6}
                onChange={(e) => onUpdate('ipv6', e.target.value)}
                className="w-full bg-slate-800/50 text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-violet-500 transition-all border border-slate-700/50 text-sm appearance-none"
             >
                <option value="no-preference">No Preference</option>
                <option value="ipv4-only">IPv4 Only</option>
                <option value="ipv6-only">IPv6 Only</option>
             </select>
          </div>

          <InputItem 
            label="Connection Timeout" 
            value={settings.connectionTimeout}
            onChange={(v) => onUpdate('connectionTimeout', v)}
          />

          <div className="py-4 last:pb-0">
             <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Compression</label>
             <select 
                value={settings.compression}
                onChange={(e) => onUpdate('compression', e.target.value)}
                className="w-full bg-slate-800/50 text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-violet-500 transition-all border border-slate-700/50 text-sm appearance-none"
             >
                <option value="full">Full</option>
                <option value="adaptive">Adaptive</option>
                <option value="none">None</option>
             </select>
          </div>
        </div>

        {/* Legacy & Security Section */}
        <div className="glass-panel rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-4 text-amber-400">
             <AlertTriangle size={14} />
             <span className="text-xs font-bold uppercase tracking-wider">Legacy & Security</span>
          </div>

          <SettingItem
            title="Force AES-CBC ciphersuites"
            description="Enabling this option can sometimes help when connecting to legacy servers."
            control={
              <Toggle 
                checked={settings.forceAesCbc} 
                onChange={(v) => onUpdate('forceAesCbc', v)} 
              />
            }
          />
          
          <SettingItem
            title="Use insecure algorithms"
            description="Enable support for MD5 signatures of X509 certificates. Note that this reduces security."
            warning={true}
            control={
              <Toggle 
                checked={settings.useInsecureAlgorithms} 
                onChange={(v) => onUpdate('useInsecureAlgorithms', v)} 
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
