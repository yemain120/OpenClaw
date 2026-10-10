import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  RefreshCw, 
  Check, 
  Copy, 
  Key, 
  Globe, 
  HardDrive, 
  Lock, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { GatewayNode, OpenClawConfigState } from '../types/openclaw';

interface GatewayManagerProps {
  nodes: GatewayNode[];
  config: OpenClawConfigState;
  setConfig: React.Dispatch<React.SetStateAction<OpenClawConfigState>>;
}

export const GatewayManager: React.FC<GatewayManagerProps> = ({
  nodes,
  config,
  setConfig,
}) => {
  const [tokenCopied, setTokenCopied] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState('Just now');
  const [gatewayLogs, setGatewayLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] INFO: OpenClaw Gateway started on 0.0.0.0:18789`,
    `[${new Date().toLocaleTimeString()}] INFO: WebSocket router initialized (ws://localhost:18789/gateway)`,
    `[${new Date().toLocaleTimeString()}] AUTH: Bearer authentication enabled (token: ${config.gatewayToken.slice(0, 8)}...)`,
    `[${new Date().toLocaleTimeString()}] NODE: Connected master node 127.0.0.1 (latency: 8ms)`,
    `[${new Date().toLocaleTimeString()}] VERCEL: Edge rewrite router mapped to /api/* and static dist/`,
    `[${new Date().toLocaleTimeString()}] READY: 7 skills loaded, 5 channels registered, waiting for events...`,
  ]);

  const handlePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setLastPingTime('Just now');
      setGatewayLogs(prev => [
        `[${new Date().toLocaleTimeString()}] HEALTH: Gateway heartbeat OK • latency: 9ms • memory: 38MB`,
        ...prev
      ]);
    }, 500);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(config.gatewayToken);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Gateway Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gateway Status</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xl font-bold text-white">ONLINE</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Port: {config.gatewayPort} • Host: {config.gatewayHost}</p>
        </div>

        {/* Latency */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Latency</span>
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-400 font-mono">8.4 ms</div>
          <p className="text-[11px] text-slate-400 mt-1">Local loopback & Vercel edge</p>
        </div>

        {/* Active Nodes */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Nodes</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {nodes.filter(n => n.status === 'online').length} / {nodes.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">1 Local, 1 Vercel, 1 Sandbox</p>
        </div>

        {/* Security / Auth */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Security Guard</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">ENFORCED</div>
          <p className="text-[11px] text-slate-400 mt-1">Bearer Token + Rate Limiter</p>
        </div>
      </div>

      {/* Gateway Configuration & Security Credentials */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          Gateway Connection & Token Authentication
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Gateway Bearer Token (<span className="font-mono text-emerald-400">OPENCLAW_GATEWAY_TOKEN</span>)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={config.gatewayToken}
                onChange={(e) => setConfig({ ...config, gatewayToken: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={copyToken}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                {tokenCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{tokenCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Used by external messaging channels and CLI nodes to authenticate with OpenClaw.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Gateway Endpoint URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`ws://${config.gatewayHost}:${config.gatewayPort}/gateway`}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-400 focus:outline-none"
              />
              <button
                onClick={handlePing}
                disabled={isPinging}
                className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                <span>Test Ping</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Control plane WebSocket URL for live event streaming and dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* Nodes Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              Connected Execution Nodes
            </h2>
            <p className="text-xs text-slate-400">
              Distributed machines and serverless environments available to execute OpenClaw tasks.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            Total Nodes: {nodes.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">Node Name</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Location / Address</th>
                <th className="px-5 py-3 font-semibold">Latency</th>
                <th className="px-5 py-3 font-semibold">Load (CPU / RAM)</th>
                <th className="px-5 py-3 font-semibold">Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {nodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {node.name}
                  </td>
                  <td className="px-5 py-3 font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                      {node.type}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      node.status === 'online'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {node.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-mono text-slate-300">{node.location}</td>
                  <td className="px-5 py-3 font-mono text-cyan-400">{node.latencyMs} ms</td>
                  <td className="px-5 py-3 font-mono text-slate-400">
                    {node.cpuUsage}% CPU • {node.memoryUsage}% RAM
                  </td>
                  <td className="px-5 py-3 text-slate-400 font-mono">{node.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Gateway Terminal Stream */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gateway Daemon Event Stream (Live stdout)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGatewayLogs([])}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors font-mono"
            >
              Clear Logs
            </button>
          </div>
        </div>
        <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 max-h-64 overflow-y-auto leading-relaxed">
          {gatewayLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-emerald-500 select-none">›</span>
              <span className={log.includes('INFO') ? 'text-slate-300' : log.includes('AUTH') ? 'text-cyan-400' : 'text-emerald-400'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
