import React, { useState } from 'react';
import { 
  Wrench, 
  Terminal, 
  Globe, 
  FolderTree, 
  Search, 
  Database, 
  Clock, 
  Send, 
  ShieldCheck, 
  Plus, 
  Check, 
  ToggleLeft, 
  ToggleRight,
  Code2
} from 'lucide-react';
import { SkillItem } from '../types/openclaw';

interface SkillsRegistryProps {
  skills: SkillItem[];
  setSkills: React.Dispatch<React.SetStateAction<SkillItem[]>>;
}

export const SkillsRegistry: React.FC<SkillsRegistryProps> = ({
  skills,
  setSkills,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillDesc, setNewSkillDesc] = useState('');

  const toggleSkill = (id: string) => {
    setSkills(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, enabled: !s.enabled };
      }
      return s;
    }));
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'FolderTree': return <FolderTree className="w-5 h-5 text-amber-400" />;
      case 'Search': return <Search className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-rose-400" />;
      case 'Send': return <Send className="w-5 h-5 text-teal-400" />;
      default: return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(s => s.category === filter);

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: SkillItem = {
      id: 'custom-' + Date.now(),
      name: newSkillName.trim(),
      category: 'automation',
      description: newSkillDesc.trim() || 'Custom user-defined OpenClaw skill tool.',
      iconName: 'Wrench',
      enabled: true,
      version: '1.0.0',
      author: 'Custom User',
      parameters: [
        { name: 'input', type: 'string', description: 'Input parameter for skill execution', required: true }
      ],
      permissions: ['custom.execute'],
    };

    setSkills(prev => [...prev, newSkill]);
    setNewSkillName('');
    setNewSkillDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            Skills & Tool Registry
          </h2>
          <p className="text-xs text-slate-400">
            OpenClaw modular capabilities. Enable or disable individual skills to control the agent's tool access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            {['all', 'system', 'web', 'developer', 'automation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded capitalize transition-colors ${
                  filter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className={`rounded-xl border p-5 transition-all ${
              skill.enabled
                ? 'bg-slate-900 border-slate-800 shadow-md'
                : 'bg-slate-950/60 border-slate-800/60 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                {getSkillIcon(skill.iconName)}
              </div>
              <button
                onClick={() => toggleSkill(skill.id)}
                className="text-slate-400 hover:text-white transition-colors"
                title={skill.enabled ? 'Disable Skill' : 'Enable Skill'}
              >
                {skill.enabled ? (
                  <ToggleRight className="w-7 h-7 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-600" />
                )}
              </button>
            </div>

            <h3 className="text-sm font-bold text-white mb-1">{skill.name}</h3>
            <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
              {skill.description}
            </p>

            {/* Parameters & Permissions */}
            <div className="space-y-2 pt-3 border-t border-slate-800/80 text-[11px]">
              <div className="flex items-center justify-between text-slate-500">
                <span>Category:</span>
                <span className="font-mono uppercase text-slate-300">{skill.category}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Author:</span>
                <span className="text-slate-300">{skill.author}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {skill.permissions.map((perm, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-emerald-400/80"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              Register New Custom Skill
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a new tool function definition to the OpenClaw agent runtime.
            </p>

            <form onSubmit={handleAddCustomSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Postgres DB Query Runner"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain what this skill does and when the agent should call it..."
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
