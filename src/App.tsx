/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatConsole } from './components/ChatConsole';
import { GatewayManager } from './components/GatewayManager';
import { ChannelsHub } from './components/ChannelsHub';
import { SkillsRegistry } from './components/SkillsRegistry';
import { ConfigEditor } from './components/ConfigEditor';
import { VercelDeployGuide } from './components/VercelDeployGuide';
import { 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_SKILLS, 
  INITIAL_CHANNELS, 
  INITIAL_NODES 
} from './data/initialData';
import { 
  ChatMessage, 
  SkillItem, 
  ChannelItem, 
  GatewayNode, 
  OpenClawConfigState 
} from './types/openclaw';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'gateway' | 'channels' | 'skills' | 'config' | 'deploy'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('openclaw_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CHAT_MESSAGES;
      }
    }
    return INITIAL_CHAT_MESSAGES;
  });

  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [channels, setChannels] = useState<ChannelItem[]>(INITIAL_CHANNELS);
  const [nodes, setNodes] = useState<GatewayNode[]>(INITIAL_NODES);

  const [config, setConfig] = useState<OpenClawConfigState>({
    modelProvider: 'gemini',
    selectedModel: 'gemini-2.5-flash',
    temperature: 0.4,
    maxTokens: 4096,
    autonomousMode: true,
    gatewayHost: '0.0.0.0',
    gatewayPort: 18789,
    gatewayToken: 'claw_sec_994a37b60e82c5f10ad948b2',
    adminPassword: 'admin_change_this_password',
  });

  // Sync messages to localStorage
  useEffect(() => {
    localStorage.setItem('openclaw_chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Handle incoming message simulation from Channels tab
  const handleSimulateChannelMessage = (channelName: string, text: string) => {
    const channelKey = channelName.toLowerCase().includes('telegram') 
      ? 'telegram' 
      : channelName.toLowerCase().includes('discord') 
      ? 'discord' 
      : channelName.toLowerCase().includes('whatsapp') 
      ? 'whatsapp' 
      : 'slack';

    const newMsg: ChatMessage = {
      id: 'msg-sim-' + Date.now(),
      role: 'user',
      content: `[Inbound via ${channelName}]: ${text}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: channelKey as any,
    };

    setMessages(prev => [...prev, newMsg]);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        setConfig={setConfig}
        onOpenQuickDeploy={() => setActiveTab('deploy')}
      />

      {/* Main View Area */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'chat' && (
          <ChatConsole
            messages={messages}
            setMessages={setMessages}
            config={config}
            onNavigateToDeploy={() => setActiveTab('deploy')}
          />
        )}

        {activeTab === 'gateway' && (
          <GatewayManager
            nodes={nodes}
            config={config}
            setConfig={setConfig}
          />
        )}

        {activeTab === 'channels' && (
          <ChannelsHub
            channels={channels}
            setChannels={setChannels}
            onSimulateChannelMessage={handleSimulateChannelMessage}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsRegistry
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {activeTab === 'config' && (
          <ConfigEditor
            config={config}
            setConfig={setConfig}
          />
        )}

        {activeTab === 'deploy' && (
          <VercelDeployGuide />
        )}
      </main>
    </div>
  );
}
