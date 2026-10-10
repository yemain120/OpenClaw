export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface ToolCall {
  id: string;
  toolName: string;
  arguments: Record<string, any>;
  output?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  executionTimeMs?: number;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  channel?: 'web' | 'telegram' | 'discord' | 'slack' | 'whatsapp' | 'cron';
  reasoning?: string;
  toolCalls?: ToolCall[];
  tokenStats?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'system' | 'web' | 'developer' | 'automation' | 'communication';
  description: string;
  iconName: string;
  enabled: boolean;
  version: string;
  author: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
  permissions: string[];
}

export interface ChannelItem {
  id: string;
  type: 'telegram' | 'discord' | 'slack' | 'whatsapp' | 'webhook';
  name: string;
  accountOrBot: string;
  status: 'connected' | 'disconnected' | 'syncing';
  activeChatsCount: number;
  lastActive: string;
  config: {
    tokenOrId: string;
    webhookUrl?: string;
    allowedUsers?: string;
    autoReply: boolean;
  };
}

export interface GatewayNode {
  id: string;
  name: string;
  type: 'local' | 'vercel-sandbox' | 'e2b-cloud' | 'docker';
  status: 'online' | 'standby' | 'offline';
  latencyMs: number;
  location: string;
  ip: string;
  cpuUsage: number;
  memoryUsage: number;
  uptime: string;
}

export interface CronTask {
  id: string;
  title: string;
  cronExpr: string;
  description: string;
  targetSkill: string;
  payload: string;
  enabled: boolean;
  lastRun?: string;
  nextRun: string;
  lastStatus?: 'success' | 'failed';
}

export interface OpenClawConfigState {
  modelProvider: 'gemini' | 'openai' | 'anthropic' | 'groq' | 'ollama';
  selectedModel: string;
  temperature: number;
  maxTokens: number;
  autonomousMode: boolean;
  gatewayHost: string;
  gatewayPort: number;
  gatewayToken: string;
  adminPassword?: string;
}
