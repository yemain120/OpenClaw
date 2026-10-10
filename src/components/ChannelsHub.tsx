import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Settings2, 
  Shield, 
  Smartphone, 
  Terminal, 
  Bot,
  Zap,
  Globe
} from 'lucide-react';
import { ChannelItem } from '../types/openclaw';

interface ChannelsHubProps {
  channels: ChannelItem[];
  setChannels: React.Dispatch<React.SetStateAction<ChannelItem[]>>;
  onSimulateChannelMessage: (channelName: string, text: string) => void;
}

export const ChannelsHub: React.FC<ChannelsHubProps> = ({
  channels,
  setChannels,
  onSimulateChannelMessage,
}) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('telegram');
  const [testMessage, setTestMessage] = useState('Hey OpenClaw, what is the status of our deployment?');
  const [simulationSent, setSimulationSent] = useState(false);

  const selectedChannel = channels.find(c => c.id === selectedChannelId) || channels[0];

  const toggleChannelStatus = (id: string) => {
    setChannels(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'connected' ? 'disconnected' : 'connected';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleSimulate = () => {
    if (!testMessage.trim()) return;
    onSimulateChannelMessage(selectedChannel.name, testMessage);
    setSimulationSent(true);
    setTimeout(() => setSimulationSent(false), 2500);
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'telegram': return '✈️';
      case 'discord': return '👾';
      case 'whatsapp': return '💬';
      case 'slack': return '💼';
      default: return '🌐';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400" />
            Multi-Channel Messaging Gateway
          </h2>
          <p className="text-xs text-slate-400">
            Connect OpenClaw directly to WhatsApp, Telegram, Discord, and Slack via the Gateway message router.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Channels List */}
        <div className="lg:col-span-1 space-y-3">
          {channels.map((channel) => (
            <div
              key={channel.id}
              onClick={() => setSelectedChannelId(channel.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedChannelId === channel.id
                  ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl select-none">{getChannelIcon(channel.type)}</span>
                  <div>
                    <h3 className="text-xs font-bold text-white">{channel.name}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{channel.accountOrBot}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  channel.status === 'connected'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : channel.status === 'syncing'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {channel.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                <span>Active chats: {channel.activeChatsCount}</span>
                <span>Active: {channel.lastActive}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Channel Details & Simulator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Channel Configuration Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getChannelIcon(selectedChannel.type)}</span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {selectedChannel.name} Configuration
                    <span className="text-xs font-normal text-slate-400">({selectedChannel.accountOrBot})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Configured via environment variables and OpenClaw channel router.
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleChannelStatus(selectedChannel.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedChannel.status === 'connected'
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {selectedChannel.status === 'connected' ? 'Disconnect' : 'Connect Channel'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Channel Token / Key Secret
                </label>
                <input
                  type="password"
                  value={selectedChannel.config.tokenOrId || '••••••••••••••••••••••••'}
                  readOnly
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Stored securely in your environment variables (e.g. {selectedChannel.type.toUpperCase()}_BOT_TOKEN).
                </p>
              </div>

              {selectedChannel.config.webhookUrl && (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Vercel Webhook Endpoint
                  </label>
                  <input
                    type="text"
                    value={selectedChannel.config.webhookUrl}
                    readOnly
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-400"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="autoReply"
                  checked={selectedChannel.config.autoReply}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setChannels(prev => prev.map(c => c.id === selectedChannel.id ? { ...c, config: { ...c.config, autoReply: checked } } : c));
                  }}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="autoReply" className="text-xs text-slate-300 cursor-pointer">
                  Enable autonomous AI auto-reply for incoming messages on this channel
                </label>
              </div>
            </div>
          </div>

          {/* Inbound Message Testing Simulator */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                Live Inbound Simulator ({selectedChannel.name})
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Simulate an incoming user message from {selectedChannel.name} to verify how OpenClaw routes and answers it through the Gateway.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder={`Type a test message from ${selectedChannel.name}...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleSimulate}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Inbound</span>
                </button>
              </div>

              {simulationSent && (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Message simulated! OpenClaw Gateway received and routed payload to Agent Console.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
