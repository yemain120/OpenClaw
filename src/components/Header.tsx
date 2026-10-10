import React from 'react';
import { 
  Bot, 
  Terminal, 
  Radio, 
  Wrench, 
  FileCode, 
  Rocket, 
  Cpu, 
  ExternalLink,
  Github,
  Zap
} from 'lucide-react';
import { OpenClawConfigState } from '../types/openclaw';

interface HeaderProps {
  activeTab: 'chat' | 'gateway' | 'channels' | 'skills' | 'config' | 'deploy';
  setActiveTab: (tab: 'chat' | 'gateway' | 'channels' | 'skills' | 'config' | 'deploy') => void;
  config: OpenClawConfigState;
  setConfig: React.Dispatch<React.SetStateAction<OpenClawConfigState>>;
  onOpenQuickDeploy: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  config,
  setConfig,
  onOpenQuickDeploy,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10">
              <span className="text-xl select-none font-bold">🦞</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                  OpenClaw <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">v1.4 Web</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Autonomous Multi-Channel AI Agent Runtime
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Agent Console
            </button>

            <button
              onClick={() => setActiveTab('gateway')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'gateway'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Gateway & Nodes
            </button>

            <button
              onClick={() => setActiveTab('channels')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'channels'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Channels
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'skills'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Skills & Tools
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'config'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              openclaw.json
            </button>
          </nav>

          {/* Right Controls & Vercel Deploy Button */}
          <div className="flex items-center space-x-2">
            {/* Model Selector */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={config.selectedModel}
                onChange={(e) => setConfig({ ...config, selectedModel: e.target.value })}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs pr-1 font-mono"
              >
                <option value="gemini-2.5-flash" className="bg-slate-900 text-slate-200">Gemini 2.5 Flash</option>
                <option value="gemini-2.5-pro" className="bg-slate-900 text-slate-200">Gemini 2.5 Pro</option>
                <option value="gpt-4o" className="bg-slate-900 text-slate-200">OpenAI GPT-4o</option>
                <option value="claude-3-7-sonnet" className="bg-slate-900 text-slate-200">Claude 3.7 Sonnet</option>
                <option value="llama-3.3-70b-versatile" className="bg-slate-900 text-slate-200">Groq Llama 3.3</option>
              </select>
            </div>

            {/* Quick Deploy to Vercel Action */}
            <button
              onClick={() => {
                setActiveTab('deploy');
                onOpenQuickDeploy();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-sm ${
                activeTab === 'deploy'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-500/40 shadow-emerald-600/20'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Deploy to Vercel</span>
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
              title="Official GitHub Repo"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-900">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'chat' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
            }`}
          >
            Console
          </button>
          <button
            onClick={() => setActiveTab('gateway')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'gateway' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
            }`}
          >
            Gateway
          </button>
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'channels' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
            }`}
          >
            Channels
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'skills' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'config' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
            }`}
          >
            openclaw.json
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-2.5 py-1 rounded text-xs whitespace-nowrap ${
              activeTab === 'deploy' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-400'
            }`}
          >
            Vercel Deploy
          </button>
        </div>
      </div>
    </header>
  );
};
