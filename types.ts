
export interface ServerLocation {
  id: string;
  name: string;
  flag: string;
  protocol: string;
  ping: number;
}

export interface NetworkPayload {
  id: string;
  name: string;
  icon: string;
  tags: string[];
}

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export interface TrafficStats {
  upload: number; // in KB/s
  download: number; // in KB/s
  totalUpload: number; // in KB
  totalDownload: number; // in KB
  history: { time: number; upload: number; download: number }[];
}

export interface AppSettings {
  batterySaver: boolean;
  seamlessTunnel: boolean;
  reconnectOnReboot: boolean;
  autoReconnect: boolean;
  proxyAddress: string;
  vpnProtocol: string;
  ipv6: string;
  connectionTimeout: string;
  compression: string;
  forceAesCbc: boolean;
  useInsecureAlgorithms: boolean;
}

export interface AdminConfig {
  adminUrl: string;
  apiKey: string;
  lastSync: number | null;
}
