import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Sliders,
  Shield,
  Bot
} from 'lucide-react';
import { OpenClawConfigState } from '../types/openclaw';

interface ConfigEditorProps {
  config: OpenClawConfigState;
  setConfig: React.Dispatch<React.SetStateAction<OpenClawConfigState>>;
}

export const ConfigEditor: React.FC<ConfigEditorProps> = ({
  config,
  setConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Generate full openclaw.json representation
  const jsonContent = JSON.stringify({
    $schema: "https://openclaw.ai/schema/openclaw.v1.json",
    version: "1.0.0",
    name: "OpenClaw Assistant",
    gateway: {
      host: config.gatewayHost,
      port: config.gatewayPort,
      auth: {
        type: "bearer",
        tokenEnv: "OPENCLAW_GATEWAY_TOKEN"
      },
      cors: ["*"],
      rateLimit: {
        windowMs: 60000,
        maxRequests: 120
      }
    },
    models: {
      default: config.selectedModel,
      fallback: "gpt-4o-mini",
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      autonomousMode: config.autonomousMode
    },
    skills: {
      terminal: { enabled: true, allowDangerousCommands: false, timeoutSeconds: 30 },
      browser: { enabled: true, headless: true, timeoutSeconds: 45 },
      filesystem: { enabled: true, workspaceRoot: "./workspace" },
      webSearch: { enabled: true, provider: "google-grounding" },
      cron: { enabled: true, timezone: "UTC" },
      memory: { enabled: true, vectorPersistence: true }
    },
    channels: {
      telegram: { enabled: true, polling: true },
      discord: { enabled: true },
      whatsapp: { enabled: true, qrAuth: true },
      slack: { enabled: false },
      webhook: { enabled: true, path: "/api/webhook/claw" }
    }
  }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openclaw.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    setConfig({
      modelProvider: 'gemini',
      selectedModel: 'gemini-2.5-flash',
      temperature: 0.4,
      maxTokens: 4096,
      autonomousMode: true,
      gatewayHost: '0.0.0.0',
      gatewayPort: 18789,
      gatewayToken: 'claw_sec_994a37b60e82c5f10ad948b2',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-400" />
            OpenClaw Configuration (<span className="font-mono text-emerald-400">openclaw.json</span>)
          </h2>
          <p className="text-xs text-slate-400">
            Customize agent autonomous execution limits, gateway networking parameters, and default model routes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Apply Config</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Configuration updated successfully in memory and ready for deployment export.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Visual Settings Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Visual Settings
          </h3>

          <div className="space-y-4">
            {/* Primary Model */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Default LLM Model Route
              </label>
              <select
                value={config.selectedModel}
                onChange={(e) => setConfig({ ...config, selectedModel: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="gemini-2.5-flash">Google Gemini 2.5 Flash (Recommended)</option>
                <option value="gemini-2.5-pro">Google Gemini 2.5 Pro (Deep Reasoning)</option>
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="gpt-4o-mini">OpenAI GPT-4o-mini</option>
                <option value="claude-3-7-sonnet">Anthropic Claude 3.7 Sonnet</option>
                <option value="llama-3.3-70b-versatile">Groq Llama 3.3 70B</option>
              </select>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Model Temperature: {config.temperature}</span>
                <span className="text-slate-500 font-mono text-[11px]">
                  {config.temperature < 0.3 ? 'Deterministic / Coding' : 'Balanced & Creative'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Max Output Tokens */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Max Output Tokens ({config.maxTokens})
              </label>
              <select
                value={config.maxTokens}
                onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value={2048}>2,048 Tokens</option>
                <option value={4096}>4,096 Tokens</option>
                <option value={8192}>8,192 Tokens</option>
              </select>
            </div>

            {/* Autonomous Execution Mode */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    Autonomous Multi-Step Execution
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Allow agent to chain up to 10 tool calls sequentially without pausing for confirmation.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.autonomousMode}
                  onChange={(e) => setConfig({ ...config, autonomousMode: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Gateway Networking */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                Gateway Networking
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Gateway Host</label>
                  <input
                    type="text"
                    value={config.gatewayHost}
                    onChange={(e) => setConfig({ ...config, gatewayHost: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Gateway Port</label>
                  <input
                    type="number"
                    value={config.gatewayPort}
                    onChange={(e) => setConfig({ ...config, gatewayPort: parseInt(e.target.value) || 18789 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Raw JSON Preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              openclaw.json (Preview)
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
              title="Copy JSON"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-mono text-[10px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-slate-400 font-mono text-[10px]">Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 flex-1 overflow-auto bg-slate-950 font-mono text-xs text-emerald-400/90 leading-relaxed max-h-[500px]">
            <pre>{jsonContent}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
