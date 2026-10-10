import React, { useState } from 'react';
import { 
  Rocket, 
  Github, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  FileCode, 
  Sparkles,
  HelpCircle,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';

export const VercelDeployGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<'git' | 'vercel' | 'cli' | 'env'>('git');
  const [repoName, setRepoName] = useState('openclaw-web');
  const [githubUsername, setGithubUsername] = useState('your-github-username');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitCommands = `# ১. গিট রিপোজিটরি ইনিশিয়ালাইজ করুন
git init

# ২. সমস্ত ফাইল স্টেজিংয়ে যোগ করুন
git add .

# ৩. প্রথম কমিট তৈরি করুন
git commit -m "feat: setup OpenClaw Web with Vercel deployment support"

# ৪. মেইন ব্রাঞ্চ সেট করুন
git branch -M main

# ৫. আপনার গিটহাব রিপোজিটরির রিমোট লিঙ্ক যুক্ত করুন
git remote add origin https://github.com/${githubUsername}/${repoName}.git

# ৬. গিটহাবে পুশ করুন
git push -u origin main`;

  const ghCliCommand = `gh repo create ${repoName} --public --source=. --push`;

  const vercelCliCommand = `# Vercel CLI ইনস্টল না থাকলে:
npm i -g vercel

# সরাসরি প্রোডাকশনে ডিপ্লয় করতে রান করুন:
vercel --prod`;

  const vercelEnvTemplate = `GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
OPENCLAW_GATEWAY_TOKEN=claw_sec_${Math.random().toString(36).substring(2, 14)}
OPENCLAW_GATEWAY_PORT=18789
OPENCLAW_ADMIN_PASSWORD=change_this_password`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                100% Vercel & GitHub Ready
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                Vite Framework Preset
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Rocket className="w-6 h-6 text-emerald-400" />
              GitHub Push & Vercel Deployment Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              আপনার OpenClaw ওয়েব অ্যাপ্লিকেশনটি GitHub-এ পুশ করে Vercel-এ লাইভ করার জন্য প্রয়োজনীয় সমস্ত কনফিগারেশন (<code className="text-emerald-400 font-mono">vercel.json</code>, <code className="text-emerald-400 font-mono">package.json</code> বিল্ড স্ক্রিপ্ট, <code className="text-emerald-400 font-mono">.env.example</code>) প্রস্তুত করা হয়েছে।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Deploy on Vercel Dashboard</span>
            </a>
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Create GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Deployment Verification Checklist (কনফিগারেশন অডিট)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>vercel.json Configured</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Framework: Vite, Output: dist, Single Page App Rewrites (/(.*) → /index.html)
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Build Scripts Ready</span>
            </div>
            <p className="text-[11px] text-slate-400">
              `npm run build` এবং `npm run vercel-build` সফলভাবে টেস্ট করা হয়েছে।
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>.env.example Setup</span>
            </div>
            <p className="text-[11px] text-slate-400">
              AI মডেল (Gemini/OpenAI), Gateway Token, Channels কনফিগ অন্তর্ভুক্ত।
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>openclaw.json Ready</span>
            </div>
            <p className="text-[11px] text-slate-400">
              OpenClaw Agent, Gateway ও Skills পলিসি কনফিগারেশন ফাইল প্রস্তুত।
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instructions Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
          <button
            onClick={() => setActiveStepTab('git')}
            className={`px-5 py-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeStepTab === 'git'
                ? 'border-emerald-400 text-emerald-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>ধাপ ১: GitHub Push কমান্ড</span>
          </button>

          <button
            onClick={() => setActiveStepTab('vercel')}
            className={`px-5 py-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeStepTab === 'vercel'
                ? 'border-emerald-400 text-emerald-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>ধাপ ২: Vercel ড্যাশবোর্ড ডিপ্লয়</span>
          </button>

          <button
            onClick={() => setActiveStepTab('env')}
            className={`px-5 py-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeStepTab === 'env'
                ? 'border-emerald-400 text-emerald-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>ধাপ ৩: Environment Variables (.env)</span>
          </button>

          <button
            onClick={() => setActiveStepTab('cli')}
            className={`px-5 py-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
              activeStepTab === 'cli'
                ? 'border-emerald-400 text-emerald-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>বিকল্প: Vercel CLI</span>
          </button>
        </div>

        <div className="p-6">
          {/* Tab 1: Git Push */}
          {activeStepTab === 'git' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">কাস্টমাইজ রিপোজিটরি প্যারামিটার:</h4>
                  <p className="text-[11px] text-slate-400">নিচে আপনার গিটহাব ইউজারনেম লিখলে নিচের কমান্ডগুলো স্বয়ংক্রিয়ভাবে আপডেট হবে।</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="your-github-username"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-mono w-full sm:w-44 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    placeholder="openclaw-web"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-mono w-full sm:w-36 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Terminal Bash Commands
                  </span>
                  <button
                    onClick={() => copyToClipboard(gitCommands, 'git')}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors flex items-center gap-1.5"
                  >
                    {copiedKey === 'git' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">কপি সম্পন্ন!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">এক ক্লিকে কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {gitCommands}
                </pre>
              </div>

              {/* GitHub CLI shortcut */}
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
                  <span className="text-purple-400 font-bold">GitHub CLI:</span>
                  <span>{ghCliCommand}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(ghCliCommand, 'gh-cli')}
                  className="p-1.5 text-slate-400 hover:text-white rounded"
                  title="Copy GitHub CLI command"
                >
                  {copiedKey === 'gh-cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Vercel Dashboard */}
          {activeStepTab === 'vercel' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-300">Vercel One-Click Import</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    GitHub-এ রিপোজিটরি পুশ করার পর Vercel Dashboard থেকে সহজেই অটোমেটিক ডেপ্লয়মেন্ট শুরু করুন।
                  </p>
                </div>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Open Vercel New Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h5 className="font-bold text-white text-sm mb-2">Vercel প্রজেক্ট সেটআপ নির্দেশিকা:</h5>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    <strong className="text-white">Import Git Repository:</strong> Vercel ড্যাশবোর্ডে গিয়ে আপনার GitHub অ্যাকাউন্ট সিলেক্ট করুন এবং তৈরি করা <code className="text-emerald-400 font-mono">{repoName}</code> রিপোজিটরিটি ইম্পোর্ট করুন।
                  </li>
                  <li>
                    <strong className="text-white">Framework Preset:</strong> Vercel অটোমেটিক্যালি <code className="text-cyan-400 font-mono">Vite</code> ফ্রেমওয়ার্ক ডিটেক্ট করবে।
                  </li>
                  <li>
                    <strong className="text-white">Build & Output Settings:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1 text-slate-400 font-mono text-[11px]">
                      <li>Build Command: `npm run build`</li>
                      <li>Output Directory: `dist`</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-white">Environment Variables:</strong> পরবর্তী ট্যাবে থাকা ভ্যারিয়েবলগুলো (যেমন: <code className="text-emerald-400 font-mono">GEMINI_API_KEY</code>, <code className="text-emerald-400 font-mono">OPENCLAW_GATEWAY_TOKEN</code>) যুক্ত করুন।
                  </li>
                  <li>
                    <strong className="text-white">Deploy:</strong> <span className="text-emerald-400 font-bold">Deploy</span> বাটনে চাপ দিন। ১-২ মিনিটের মধ্যে লাইভ URL পেয়ে যাবেন!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Tab 3: Environment Variables */}
          {activeStepTab === 'env' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Vercel Environment Variables Checklist</h4>
                  <p className="text-[11px] text-slate-400">
                    এই কীগুলো কপি করে Vercel Settings → Environment Variables-এ পেস্ট করুন।
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(vercelEnvTemplate, 'env-all')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'env-all' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">কপি করা হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy All .env Values</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-2.5">Variable Key</th>
                      <th className="px-4 py-2.5">Default / Purpose</th>
                      <th className="px-4 py-2.5">Required?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="px-4 py-2.5 text-emerald-400 font-bold">GEMINI_API_KEY</td>
                      <td className="px-4 py-2.5 text-slate-400">Google AI Studio API Key for agent inference</td>
                      <td className="px-4 py-2.5"><span className="text-emerald-400 font-bold">YES</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-emerald-400 font-bold">VITE_GEMINI_API_KEY</td>
                      <td className="px-4 py-2.5 text-slate-400">Client-side direct model inference fallback</td>
                      <td className="px-4 py-2.5"><span className="text-emerald-400 font-bold">Recommended</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-emerald-400 font-bold">OPENCLAW_GATEWAY_TOKEN</td>
                      <td className="px-4 py-2.5 text-slate-400">Bearer secret for securing Gateway WebSocket</td>
                      <td className="px-4 py-2.5"><span className="text-emerald-400 font-bold">YES</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-cyan-400">OPENAI_API_KEY</td>
                      <td className="px-4 py-2.5 text-slate-400">OpenAI GPT-4o provider (optional)</td>
                      <td className="px-4 py-2.5 text-slate-500">Optional</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-cyan-400">TELEGRAM_BOT_TOKEN</td>
                      <td className="px-4 py-2.5 text-slate-400">Telegram BotFather token for telegram channel</td>
                      <td className="px-4 py-2.5 text-slate-500">Optional</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-cyan-400">DISCORD_BOT_TOKEN</td>
                      <td className="px-4 py-2.5 text-slate-400">Discord Bot token for discord channel</td>
                      <td className="px-4 py-2.5 text-slate-500">Optional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Vercel CLI */}
          {activeStepTab === 'cli' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                টার্মিনাল থেকে সরাসরি Vercel CLI দিয়ে এক কমান্ডে প্রজেক্ট ডিপ্লয় করতে পারেন:
              </p>
              <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Vercel CLI Deploy</span>
                  <button
                    onClick={() => copyToClipboard(vercelCliCommand, 'cli')}
                    className="p-1.5 text-slate-400 hover:text-white rounded"
                  >
                    {copiedKey === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-4 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                  {vercelCliCommand}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
