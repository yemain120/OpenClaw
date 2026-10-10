import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Terminal, 
  Sparkles, 
  Bot, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Code2, 
  RefreshCw, 
  Cpu, 
  Flame,
  Radio,
  FileText,
  Rocket
} from 'lucide-react';
import { ChatMessage, ToolCall, OpenClawConfigState } from '../types/openclaw';
import { PRESET_PROMPTS } from '../data/initialData';

interface ChatConsoleProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  config: OpenClawConfigState;
  onNavigateToDeploy: () => void;
}

export const ChatConsole: React.FC<ChatConsoleProps> = ({
  messages,
  setMessages,
  config,
  onNavigateToDeploy,
}) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedReasonings, setExpandedReasonings] = useState<Record<string, boolean>>({
    'msg-welcome': false,
    'msg-sample-agent': true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const toggleReasoning = (id: string) => {
    setExpandedReasonings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || isGenerating) return;

    const userMsgId = 'msg-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: 'web',
    };

    setMessages(prev => [...prev, newUserMsg]);
    if (!customPrompt) setInput('');
    setIsGenerating(true);

    const agentMsgId = 'msg-agent-' + Date.now();

    // Determine autonomous workflow based on intent
    const lower = textToSend.toLowerCase();
    const isDeployOrAudit = lower.includes('deploy') || lower.includes('vercel') || lower.includes('audit') || lower.includes('git') || lower.includes('build');
    const isResearch = lower.includes('search') || lower.includes('research') || lower.includes('openclaw') || lower.includes('news');
    const isChannel = lower.includes('telegram') || lower.includes('discord') || lower.includes('whatsapp') || lower.includes('slack');
    const isCron = lower.includes('cron') || lower.includes('schedule') || lower.includes('task');

    // Simulate Agent Step-by-Step execution
    setTimeout(() => {
      let simulatedToolCalls: ToolCall[] = [];
      let reasoning = '';
      let replyContent = '';

      if (isDeployOrAudit) {
        reasoning = `Analyzing repository readiness for Vercel deployment and GitHub push. Checking vercel.json configuration, build scripts in package.json, and environment secrets.`;
        simulatedToolCalls = [
          {
            id: 'tc-' + Date.now() + '-1',
            toolName: 'filesystem.readFile',
            arguments: { filePath: './vercel.json' },
            output: '{\n  "framework": "vite",\n  "buildCommand": "npm run build",\n  "outputDirectory": "dist"\n}',
            status: 'completed',
            executionTimeMs: 12,
            timestamp: new Date().toLocaleTimeString(),
          },
          {
            id: 'tc-' + Date.now() + '-2',
            toolName: 'terminal.exec',
            arguments: { command: 'npm run build' },
            output: '> vite build\nvite v8.3.0 building for production...\n✓ 42 modules transformed.\ndist/index.html                   0.82 kB\ndist/assets/index-D7bH9.css      14.20 kB\ndist/assets/index-A4mN2.js      188.42 kB\n✓ built in 340ms',
            status: 'completed',
            executionTimeMs: 340,
            timestamp: new Date().toLocaleTimeString(),
          },
          {
            id: 'tc-' + Date.now() + '-3',
            toolName: 'gateway.verifyVercelReadiness',
            arguments: { target: 'vercel.com', gitBranch: 'main' },
            output: 'PASS: Framework Vite detected. dist output confirmed. rewrites configured.',
            status: 'completed',
            executionTimeMs: 65,
            timestamp: new Date().toLocaleTimeString(),
          }
        ];
        replyContent = `### ✅ Deployment & Environment Audit Passed!\n\n1. **Vercel Config**: \`vercel.json\` exists with standard Vite SPA routing (\`dist/\` output and \`index.html\` rewrites).\n2. **Build Test**: Tested \`npm run build\` successfully (Exit code: 0).\n3. **Environment Setup**: \`.env.example\` is complete with model keys and Gateway secret token.\n\n👉 **Next Action**: Click the **Deploy to Vercel** button above or use the guided tab to push your repo to GitHub and go live in seconds!`;
      } else if (isResearch) {
        reasoning = `Performing web query for OpenClaw autonomous agent framework capabilities, architecture, and recent news.`;
        simulatedToolCalls = [
          {
            id: 'tc-' + Date.now() + '-1',
            toolName: 'web_search.google',
            arguments: { query: 'openclaw ai agent framework github features' },
            output: 'Found 4 authoritative results from openclaw.ai, github.com/openclaw/openclaw, and documentation.',
            status: 'completed',
            executionTimeMs: 210,
            timestamp: new Date().toLocaleTimeString(),
          },
          {
            id: 'tc-' + Date.now() + '-2',
            toolName: 'browser.scrape',
            arguments: { url: 'https://openclaw.ai', extract: ['overview', 'skills', 'gateways'] },
            output: 'Extracted: OpenClaw is an open-source autonomous agent runtime supporting WhatsApp, Telegram, Discord, Slack, bash skills, and local/remote gateways.',
            status: 'completed',
            executionTimeMs: 390,
            timestamp: new Date().toLocaleTimeString(),
          }
        ];
        replyContent = `### 🦞 OpenClaw Framework Key Findings\n\n- **Autonomous Runtime**: OpenClaw acts as an extensible gateway connecting LLMs (Gemini, Claude, GPT-4o) directly to real-world execution environments.\n- **Multi-Channel**: Native adapters for Telegram, Discord, WhatsApp (Baileys), and Slack.\n- **Skills Engine**: Built-in bash execution, headless browser scraping, file operations, and scheduled cron jobs.\n- **Vercel & Edge Deployment**: Lightweight control plane deployable to Vercel with seamless WebSocket/REST gateway proxies.`;
      } else if (isChannel) {
        reasoning = `Simulating incoming channel payload and testing OpenClaw message dispatcher.`;
        simulatedToolCalls = [
          {
            id: 'tc-' + Date.now() + '-1',
            toolName: 'channel_relay.receive',
            arguments: { channel: 'telegram', from: '@admin_dev', text: textToSend },
            output: 'Received encrypted message payload. Verified sender in TELEGRAM_ALLOWED_USERS.',
            status: 'completed',
            executionTimeMs: 18,
            timestamp: new Date().toLocaleTimeString(),
          },
          {
            id: 'tc-' + Date.now() + '-2',
            toolName: 'channel_relay.dispatch',
            arguments: { channel: 'telegram', to: '@admin_dev', message: 'Task received and routed to gateway node.' },
            output: 'Dispatched response through Telegram Bot API (HTTP 200 OK).',
            status: 'completed',
            executionTimeMs: 110,
            timestamp: new Date().toLocaleTimeString(),
          }
        ];
        replyContent = `📨 **Channel Message Processed Successfully!**\n\n- **Inbound Channel**: Telegram Bot (\`@OpenClawBot\`)\n- **Routing**: Passed through Gateway Security Filter\n- **Dispatched Response**: Sent status update back to client.\n\nYou can test more channels or configure your API keys in the **Channels** tab!`;
      } else if (isCron) {
        reasoning = `Registering new autonomous Cron schedule in OpenClaw Task Engine.`;
        simulatedToolCalls = [
          {
            id: 'tc-' + Date.now() + '-1',
            toolName: 'cron.registerJob',
            arguments: { schedule: '0 */6 * * *', task: textToSend },
            output: 'Job registered with ID `cron-auto-99`. Next scheduled run calculated: in 6 hours.',
            status: 'completed',
            executionTimeMs: 15,
            timestamp: new Date().toLocaleTimeString(),
          }
        ];
        replyContent = `⏰ **Cron Job Configured!**\n\nThe scheduler has registered your automated routine. It will wake up on interval, invoke the necessary skills, and record logs to the Gateway audit stream.`;
      } else {
        reasoning = `Processing user instruction using model ${config.selectedModel}. Checking available skills to fulfill request.`;
        simulatedToolCalls = [
          {
            id: 'tc-' + Date.now() + '-1',
            toolName: 'terminal.exec',
            arguments: { command: `echo "Processing: ${textToSend.slice(0, 30)}..."` },
            output: 'Execution verified inside OpenClaw workspace environment.',
            status: 'completed',
            executionTimeMs: 40,
            timestamp: new Date().toLocaleTimeString(),
          }
        ];
        replyContent = `I processed your request using **${config.selectedModel}** within OpenClaw.\n\nAll tools are active and responsive:\n- 💻 Terminal: Shell execution enabled\n- 🌐 Web: Browsing & Google Grounding active\n- 📁 Filesystem: Workspace accessible\n- 🚀 Vercel: Ready for live deployment\n\nFeel free to execute terminal commands, test channels, or inspect \`openclaw.json\` configuration.`;
      }

      const newAgentMsg: ChatMessage = {
        id: agentMsgId,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: 'web',
        reasoning,
        toolCalls: simulatedToolCalls,
        tokenStats: {
          promptTokens: Math.floor(Math.random() * 200) + 300,
          completionTokens: Math.floor(Math.random() * 150) + 120,
          totalTokens: Math.floor(Math.random() * 350) + 420,
        }
      };

      setMessages(prev => [...prev, newAgentMsg]);
      setExpandedReasonings(prev => ({ ...prev, [agentMsgId]: true }));
      setIsGenerating(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Banner Alert for Vercel Deployment readiness */}
      <div className="mb-4 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <Rocket className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white flex items-center gap-2">
              Ready for GitHub Push & Vercel Deployment
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                vercel.json ready
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Environment configuration (.env.example) and build scripts are set up. Push to GitHub and deploy to Vercel in 1 click.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToDeploy}
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>View Deploy Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Message Card */}
            <div
              className={`max-w-3xl w-full rounded-xl p-4 transition-all ${
                msg.role === 'user'
                  ? 'bg-emerald-950/40 border border-emerald-600/30 text-emerald-50 ml-auto'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-lg'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  {msg.role === 'user' ? (
                    <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-300">
                    {msg.role === 'user' ? 'You' : 'OpenClaw Agent'}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {msg.timestamp}
                  </span>
                  {msg.channel && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      #{msg.channel}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="p-1 text-slate-400 hover:text-slate-200 rounded transition-colors"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Agent Reasoning Section (Collapsible) */}
              {msg.reasoning && (
                <div className="mb-3 rounded-lg border border-slate-800 bg-slate-950/60 overflow-hidden">
                  <button
                    onClick={() => toggleReasoning(msg.id)}
                    className="w-full px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-cyan-400 hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Agent Reasoning & Thought Process
                    </span>
                    {expandedReasonings[msg.id] ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                  {expandedReasonings[msg.id] && (
                    <div className="px-3 py-2 text-xs text-slate-400 font-mono border-t border-slate-800/80 bg-slate-950/90 whitespace-pre-line leading-relaxed">
                      {msg.reasoning}
                    </div>
                  )}
                </div>
              )}

              {/* Tool Execution Steps */}
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <div className="mb-3 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    Autonomous Tool Executions ({msg.toolCalls.length})
                  </div>
                  {msg.toolCalls.map((tc) => (
                    <div
                      key={tc.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-300 pb-1.5 mb-1.5 border-b border-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="font-bold text-emerald-400">{tc.toolName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {tc.executionTimeMs}ms • {tc.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-1">
                        <span className="text-slate-500">args: </span>
                        {JSON.stringify(tc.arguments)}
                      </div>
                      {tc.output && (
                        <div className="mt-1 p-2 bg-slate-950 rounded border border-slate-900 text-[11px] text-emerald-300 whitespace-pre-wrap max-h-36 overflow-y-auto">
                          {tc.output}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Message Content */}
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {msg.content}
              </div>

              {/* Token Stats Footer */}
              {msg.tokenStats && (
                <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Tokens: {msg.tokenStats.totalTokens} (Prompt: {msg.tokenStats.promptTokens}, Resp: {msg.tokenStats.completionTokens})</span>
                  <span>Model: {config.selectedModel}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-start">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-spin">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
                <span>OpenClaw thinking & selecting skills...</span>
                <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Prompts Shelf */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[11px] text-slate-500 whitespace-nowrap font-medium flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-400" /> Presets:
        </span>
        {PRESET_PROMPTS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset.prompt)}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white whitespace-nowrap text-xs transition-colors"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 shadow-xl relative backdrop-blur-sm">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or question for OpenClaw (e.g., 'Check vercel.json build readiness' or 'Search latest AI trends')..."
            rows={2}
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none resize-none px-2 py-1 leading-relaxed"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isGenerating}
            className="p-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center shadow-md shadow-emerald-500/20"
            title="Send to OpenClaw"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Gateway: Port 18789
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Model: {config.selectedModel}</span>
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Press Enter to execute • Shift+Enter for newline
          </span>
        </div>
      </div>
    </div>
  );
};
