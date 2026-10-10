# OpenClaw Web Control UI & Gateway

> 🦞 **OpenClaw** is the autonomous, multi-channel AI agent runtime and control plane. Connect your AI assistant to WhatsApp, Telegram, Discord, Slack, and webhooks while executing terminal commands, browser actions, filesystem operations, and cron tasks.

This repository is optimized for **Web execution** and **1-Click Deployment to Vercel**.

---

## 🚀 Quick GitHub Push & Vercel Deploy Guide / গিটহাব পুশ ও ভার্সেল ডিপ্লয় গাইড

### ধাপ ১: গিট রিপোজিটরি ইনিশিয়ালাইজ ও কমিট (Step 1: Init Git & Commit)

আপনার টার্মিনালে নিচের কমান্ডগুলো চালান:

```bash
# ১. গিট ইনিশিয়ালাইজ করুন
git init

# ২. সমস্ত ফাইল অ্যাড করুন
git add .

# ৩. প্রথম কমিট করুন
git commit -m "feat: setup OpenClaw Web runtime with Vercel deployment support"

# ৪. মেইন ব্রাঞ্চ সিলেক্ট করুন
git branch -M main
```

### ধাপ ২: গিটহাবে রিপোজিটরি তৈরি ও পুশ (Step 2: Push to GitHub)

GitHub-এ একটি নতুন রিপোজিটরি তৈরি করুন (যেমন: `openclaw-web`):

```bash
# আপনার গিটহাব রিপোজিটরির লিঙ্ক যোগ করুন (USERNAME এবং REPO_NAME পরিবর্তন করুন)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/openclaw-web.git

# গিটহাবে পুশ করুন
git push -u origin main
```

*(অথবা GitHub CLI দিয়ে এক কমান্ডে করতে পারেন: `gh repo create openclaw-web --public --source=. --push`)*

---

### ধাপ ৩: ভার্সেলে ডিপ্লয় (Step 3: Deploy to Vercel)

#### অপশন A: Vercel Web Dashboard (প্রস্তাবিত / Recommended)

1. [Vercel Dashboard](https://vercel.com/new)-এ যান।
2. **Import Git Repository** থেকে আপনার তৈরি করা `openclaw-web` সিলেক্ট করুন।
3. **Framework Preset**: Vercel স্বয়ংক্রিয়ভাবে `Vite` সনাক্ত করবে।
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables** সেকশনে নিচের কীগুলো যোগ করুন (কমপক্ষে একটি AI মডেল কী প্রয়োজন):
   - `GEMINI_API_KEY` (অথবা `VITE_GEMINI_API_KEY`)
   - `OPENCLAW_GATEWAY_TOKEN` (যেমন: `claw_sec_production_secret`)
7. **Deploy** বাটনে ক্লিক করুন! ২ মিনিটের মধ্যে আপনার OpenClaw Web লাইভ হয়ে যাবে।

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### অপশন B: Vercel CLI দিয়ে সরাসরি ডিপ্লয়

```bash
# Vercel CLI ইনস্টল না থাকলে:
npm i -g vercel

# প্রোডাকশনে সরাসরি ডিপ্লয় করতে:
vercel --prod
```

---

## ⚙️ Environment Variables (.env)

আপনার প্রজেক্টের `.env.example` ফাইলের অনুকরণে `.env` তৈরি করুন:

```env
# AI Model Providers
GEMINI_API_KEY="AIzaSy..."
VITE_GEMINI_API_KEY="AIzaSy..."
OPENAI_API_KEY="sk-proj-..."
ANTHROPIC_API_KEY="sk-ant-..."

# OpenClaw Gateway Settings
OPENCLAW_GATEWAY_PORT="18789"
OPENCLAW_GATEWAY_TOKEN="claw_sec_example_token_replace_me"
OPENCLAW_ADMIN_PASSWORD="admin_change_this_password"

# Optional Messaging Channels
TELEGRAM_BOT_TOKEN=""
DISCORD_BOT_TOKEN=""
SLACK_BOT_TOKEN=""
WHATSAPP_SESSION_NAME="openclaw-session"

# Execution Sandboxes & Tools
E2B_API_KEY=""
BROWSERLESS_API_KEY=""
```

---

## 🛠️ Local Development / লোকাল ডেভেলপমেন্ট

```bash
# ডিপেন্ডেন্সি ইন্সটল
npm install

# লোকাল ডেভ সার্ভার চালু
npm run dev

# প্রোডাকশন বিল্ড টেস্ট
npm run build
```

---

## 📂 Project Structure

```
├── vercel.json           # Vercel deployment configuration & routing
├── openclaw.json         # OpenClaw agent, skills & channels specification
├── .env.example          # Sample environment variables
├── package.json          # Build scripts & dependencies
├── src/
│   ├── types/            # OpenClaw TypeScript interfaces
│   ├── components/       # Agent Console, Gateway, Channels, Skills, Vercel Guide
│   ├── App.tsx           # Main application entry & dashboard tabs
│   └── main.tsx          # React 19 root
└── dist/                 # Production static output (built via `npm run build`)
```

---

## 🛡️ License

Apache-2.0 License. OpenClaw is an open-source project.
