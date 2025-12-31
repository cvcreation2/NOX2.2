import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ServerLocation, NetworkPayload, ConnectionState, TrafficStats, AppSettings, AdminConfig } from './types';
import ConnectionRing from './components/ConnectionRing';
import Selectors from './components/Selectors';
import StatsStrip from './components/StatsStrip';
import StatsGraph from './components/StatsGraph';
import CredentialsInput from './components/CredentialsInput';
import SettingsView from './components/SettingsView';
import WifiTetheringView from './components/WifiTetheringView';
import Sidebar from './components/Sidebar';
import AutoPingDialog from './components/AutoPingDialog';
import IpHunterDialog from './components/IpHunterDialog';
import AdminPanelDialog from './components/AdminPanelDialog';
import SelectionModal from './components/SelectionModal';
import { Menu, AlertCircle } from 'lucide-react';

const MOCK_SERVERS: ServerLocation[] = [
  { id: 'us-vip', name: 'United States VIP', flag: '🇺🇸', protocol: 'Websocket Ovpn', ping: 45 },
  { id: 'sg-gaming', name: 'Singapore Gaming', flag: '🇸🇬', protocol: 'SSH / SSL', ping: 12 },
  { id: 'jp-private', name: 'Japan Private', flag: '🇯🇵', protocol: 'V2Ray', ping: 89 },
  { id: 'ph-local', name: 'Philippines DITO', flag: '🇵🇭', protocol: 'Websocket Ovpn', ping: 5 },
  { id: 'uk-server', name: 'UK London', flag: '🇬🇧', protocol: 'OpenVPN', ping: 120 },
  { id: 'de-frankfurt', name: 'DE Frankfurt', flag: '🇩🇪', protocol: 'SSH', ping: 140 },
  { id: 'au-sydney', name: 'Australia Sydney', flag: '🇦🇺', protocol: 'WireGuard', ping: 155 },
  { id: 'br-saopaulo', name: 'Brazil São Paulo', flag: '🇧🇷', protocol: 'OpenVPN UDP', ping: 210 },
  { id: 'kr-seoul', name: 'South Korea Seoul', flag: '🇰🇷', protocol: 'Shadowsocks', ping: 62 },
  { id: 'ca-toronto', name: 'Canada Toronto', flag: '🇨🇦', protocol: 'V2Ray', ping: 115 },
  { id: 'in-mumbai', name: 'India Mumbai', flag: '🇮🇳', protocol: 'SSH / SSL', ping: 58 },
  { id: 'fr-paris', name: 'France Paris', flag: '🇫🇷', protocol: 'Trojan', ping: 132 },
  { id: 'hk-fast', name: 'Hong Kong Fast', flag: '🇭🇰', protocol: 'VLESS', ping: 28 },
  { id: 'nl-ams', name: 'Netherlands Amsterdam', flag: '🇳🇱', protocol: 'OpenVPN TCP', ping: 148 },
  { id: 'tw-taipei', name: 'Taiwan Taipei', flag: '🇹🇼', protocol: 'Hysteria 2', ping: 38 },
];

const MOCK_PAYLOADS: NetworkPayload[] = [
  { id: 'tiktok-promo', name: 'TIKTOK FREEBIES', icon: '🎵', tags: ['TcpV4', 'Http', 'Proxy'] },
  { id: 'ml-gaming', name: 'MLBB GAMING LOW PING', icon: '🎮', tags: ['UDP', 'Direct'] },
  { id: 'fb-bypass', name: 'FB/IG STORY BYPASS', icon: '📱', tags: ['SSL', 'Sni'] },
  { id: 'giga-stories', name: 'GIGA STORIES FIRST', icon: '⚡', tags: ['OpenVPN', 'TCP'] },
  { id: 'fun-aliw', name: 'FUN ALIW UNLI DATA', icon: '📺', tags: ['SSH', 'Direct'] },
  { id: 'remote-access', name: 'REMOTE ACCESS', icon: '💻', tags: ['TCP', 'HTTP', 'Proxy'] },
];

const DEFAULT_SETTINGS: AppSettings = {
  batterySaver: false,
  seamlessTunnel: false,
  reconnectOnReboot: false,
  autoReconnect: true,
  proxyAddress: '127.0.0.1:8989',
  vpnProtocol: 'adaptive',
  ipv6: 'no-preference',
  connectionTimeout: '15 seconds',
  compression: 'full',
  forceAesCbc: false,
  useInsecureAlgorithms: false
};

const LOGO_URL = "https://file-service.main.prod.aws.magicschool.ai/feedback_images/2e0882e7-9d7a-42b7-a36c-2f92f2549a1d_1740626573752.png";

const App: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [duration, setDuration] = useState(0);
  const [selectedServer, setSelectedServer] = useState<ServerLocation>(() => {
    const saved = localStorage.getItem('nox-last-server');
    return saved ? JSON.parse(saved) : MOCK_SERVERS[1];
  });
  const [selectedPayload, setSelectedPayload] = useState(MOCK_PAYLOADS[0]);
  const [isAutoReconnecting, setIsAutoReconnecting] = useState(false);
  
  const [favoriteServers, setFavoriteServers] = useState<string[]>(() => {
    const saved = localStorage.getItem('nox-vpn-favorites');
    return saved ? JSON.parse(saved) : ['sg-gaming', 'ph-local'];
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'settings' | 'tethering'>('dashboard');
  const [activeDialog, setActiveDialog] = useState<null | 'autoping' | 'iphunter' | 'adminpanel'>(null);
  
  const [showServerModal, setShowServerModal] = useState(false);
  const [showPayloadModal, setShowPayloadModal] = useState(false);

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [adminConfig, setAdminConfig] = useState<AdminConfig>({ adminUrl: '', apiKey: '', lastSync: null });
  
  const [stats, setStats] = useState<TrafficStats>({
    upload: 0, download: 0, totalUpload: 0, totalDownload: 0,
    history: Array(20).fill({ time: 0, upload: 0, download: 0 })
  });

  const connectionAttemptRef = useRef<boolean>(false);

  useEffect(() => {
    localStorage.setItem('nox-vpn-favorites', JSON.stringify(favoriteServers));
  }, [favoriteServers]);

  useEffect(() => {
    localStorage.setItem('nox-last-server', JSON.stringify(selectedServer));
  }, [selectedServer]);

  const toggleFavorite = (id: string) => {
    setFavoriteServers(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const handleToggle = () => {
    if (connectionState === 'connected') stopConnection();
    else startConnection();
  };

  const startConnection = () => {
    connectionAttemptRef.current = true;
    setConnectionState('connecting');
    setTimeout(() => {
      if (connectionAttemptRef.current) {
        setConnectionState('connected');
        setIsAutoReconnecting(false);
      }
    }, 2000);
  };

  const stopConnection = () => {
    connectionAttemptRef.current = false;
    setConnectionState('disconnecting');
    setTimeout(() => {
      setConnectionState('disconnected');
      setDuration(0);
    }, 1000);
  };

  useEffect(() => {
    if (connectionState === 'disconnected' && settings.autoReconnect && connectionAttemptRef.current) {
      setIsAutoReconnecting(true);
      const timer = setTimeout(startConnection, 3000);
      return () => clearTimeout(timer);
    }
  }, [connectionState, settings.autoReconnect]);

  useEffect(() => {
    let interval: number;
    if (connectionState === 'connected') {
      interval = window.setInterval(() => {
        setDuration(prev => prev + 1);
        setStats(prev => {
          const up = Math.random() * 800 + 50;
          const down = Math.random() * 4500 + 200;
          return {
            upload: up, download: down,
            totalUpload: prev.totalUpload + up,
            totalDownload: prev.totalDownload + down,
            history: [...prev.history.slice(1), { time: Date.now(), upload: up, download: down }]
          };
        });
      }, 1000);
    } else {
        setStats(prev => ({ ...prev, upload: 0, download: 0, history: [...prev.history.slice(1), { time: Date.now(), upload: 0, download: 0 }] }));
    }
    return () => clearInterval(interval);
  }, [connectionState]);

  const protocols = useMemo(() => Array.from(new Set(MOCK_SERVERS.map(s => s.protocol))).sort(), []);

  return (
    <div className="h-full w-full bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center select-none font-sans">
      <div className="bg-noise"></div>
      
      {/* Dynamic Background Blobs */}
      <div className="fixed top-[-30%] left-[-20%] w-[100%] h-[80%] bg-violet-900/10 blur-[150px] rounded-full pointer-events-none animate-blob" />
      <div className="fixed bottom-[-30%] right-[-20%] w-[100%] h-[80%] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none animate-blob" style={{ animationDelay: '4s' }} />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={(v) => setCurrentView(v as any)} onOpenTool={(t) => setActiveDialog(t as any)} activeView={currentView} />

      {activeDialog === 'autoping' && <AutoPingDialog onClose={() => setActiveDialog(null)} />}
      {activeDialog === 'iphunter' && <IpHunterDialog onClose={() => setActiveDialog(null)} />}
      {activeDialog === 'adminpanel' && <AdminPanelDialog config={adminConfig} onSave={setAdminConfig} onClose={() => setActiveDialog(null)} />}

      {showServerModal && (
        <SelectionModal 
            title="Select Location" 
            items={MOCK_SERVERS.map(s => ({ 
                id: s.id, 
                title: s.name, 
                subtitle: s.protocol, 
                icon: <span className="text-2xl">{s.flag}</span>, 
                rightElement: <span className="text-emerald-500 font-bold text-xs">{s.ping}ms</span>, 
                tags: [s.protocol] 
            }))} 
            selectedId={selectedServer.id} 
            onSelect={(id) => setSelectedServer(MOCK_SERVERS.find(s => s.id === id)!)} 
            onClose={() => setShowServerModal(false)} 
            favorites={favoriteServers} 
            onToggleFavorite={toggleFavorite} 
            filterOptions={protocols} 
        />
      )}
      
      {showPayloadModal && (
        <SelectionModal 
            title="Network Tweak" 
            items={MOCK_PAYLOADS.map(p => ({ id: p.id, title: p.name, subtitle: 'Config', icon: <span className="text-xl">{p.icon}</span>, tags: p.tags }))} 
            selectedId={selectedPayload.id} 
            onSelect={(id) => setSelectedPayload(MOCK_PAYLOADS.find(p => p.id === id)!)} 
            onClose={() => setShowPayloadModal(false)} 
        />
      )}

      <main className="w-full max-w-md h-full flex flex-col p-5 pt-safe pb-safe relative z-10 glass-panel md:border-x border-t-0 border-b-0 shadow-2xl transition-all">
        {currentView === 'settings' ? (
          <SettingsView settings={settings} onUpdate={(k, v) => setSettings(s => ({...s, [k]: v}))} onClose={() => setCurrentView('dashboard')} />
        ) : currentView === 'tethering' ? (
           <WifiTetheringView onClose={() => setCurrentView('dashboard')} />
        ) : (
          <div className="flex-1 flex flex-col page-transition">
            <header className="flex justify-between items-center mb-6 pt-2">
              <button onClick={() => setSidebarOpen(true)} className="p-3 -ml-2 hover:bg-white/5 rounded-full transition-colors active:scale-95 text-slate-300">
                <Menu size={24} strokeWidth={1.5} />
              </button>
              <div className="flex items-center gap-2">
                 <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-violet-500/20 object-contain bg-black/20" />
                 <h1 className="font-black text-xl leading-none tracking-tight text-white">NOX<span className="text-violet-500">VPN</span></h1>
              </div>
              <div className="w-10"></div>
            </header>

            {isAutoReconnecting && (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 flex items-center justify-between animate-pulse backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest"><AlertCircle size={14} /> Reconnecting...</div>
              </div>
            )}

            <CredentialsInput />
            <Selectors selectedServer={selectedServer} selectedPayload={selectedPayload} onOpenServerSelector={() => setShowServerModal(true)} onOpenPayloadSelector={() => setShowPayloadModal(true)} disabled={connectionState !== 'disconnected'} />

            <div className="flex-1 flex flex-col justify-center py-2">
               <ConnectionRing 
                 status={connectionState} 
                 duration={duration} 
                 onToggle={handleToggle} 
                 ping={selectedServer.ping} 
                 locationName={selectedServer.name}
                 ipAddress="192.168.254.102"
               />
            </div>

            <div className="mt-auto pt-6">
                <StatsStrip upload={stats.upload} download={stats.download} totalUpload={stats.totalUpload} totalDownload={stats.totalDownload} isConnected={connectionState === 'connected'} />
                <StatsGraph data={stats.history} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;