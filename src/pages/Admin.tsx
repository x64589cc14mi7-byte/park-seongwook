import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, LogOut, ChevronRight, Briefcase, Award, Image as ImageIcon, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getProjects, saveProjects, 
  getExperiences, saveExperiences, 
  getAwards, saveAwards, 
  getMedia, saveMedia 
} from '../lib/data';
import { Project, Experience, Award as AwardType, Media } from '../types';

type Tab = 'projects' | 'experiences' | 'awards' | 'media';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    setProjects(getProjects());
    setExperiences(getExperiences());
    setAwards(getAwards());
    setMedia(getMedia());
  }, []);

  const handleSave = () => {
    saveProjects(projects);
    saveExperiences(experiences);
    saveAwards(awards);
    saveMedia(media);
    alert('저장되었습니다.');
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      titleEn: 'New Project',
      summary: '',
      summaryEn: '',
      insight: '',
      insightEn: '',
      strategy: '',
      strategyEn: '',
      execution: '',
      executionEn: '',
      result: '',
      resultEn: '',
      reflection: '',
      reflectionEn: '',
      imageUrl: 'https://picsum.photos/seed/new/800/600',
      date: new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString().padStart(2, '0')
    };
    setProjects([newProject, ...projects]);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // Similar functions for other tabs...
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: 'New Experience',
      titleEn: 'New Experience',
      role: '',
      roleEn: '',
      period: '',
      description: '',
      descriptionEn: ''
    };
    setExperiences([newExp, ...experiences]);
  };

  const addAward = () => {
    const newAward: AwardType = {
      id: Date.now().toString(),
      title: 'New Award',
      titleEn: 'New Award',
      host: '',
      hostEn: '',
      year: new Date().getFullYear().toString(),
      description: '',
      descriptionEn: ''
    };
    setAwards([newAward, ...awards]);
  };

  const addMedia = () => {
    const newItem: Media = {
      id: Date.now().toString(),
      type: 'image',
      url: 'https://picsum.photos/seed/media/800/600',
      title: 'New Media',
      titleEn: 'New Media'
    };
    setMedia([newItem, ...media]);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">포트폴리오 내용을 관리하고 수정하세요.</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-blue-600 transition-all shadow-lg shadow-accent/20"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'projects', label: 'Projects', icon: Layout },
              { id: 'experiences', label: 'Experiences', icon: Briefcase },
              { id: 'awards', label: 'Awards', icon: Award },
              { id: 'media', label: 'Media', icon: ImageIcon },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-brand text-white shadow-lg' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon size={20} />
                  <span className="font-bold">{tab.label}</span>
                </div>
                <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
                <button 
                  onClick={() => {
                    if (activeTab === 'projects') addProject();
                    if (activeTab === 'experiences') addExperience();
                    if (activeTab === 'awards') addAward();
                    if (activeTab === 'media') addMedia();
                  }}
                  className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-brand"
                >
                  <Plus size={24} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  {activeTab === 'projects' && projects.map(p => (
                    <div key={p.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 relative group">
                      <button 
                        onClick={() => deleteProject(p.id)}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (KO)</label>
                          <input 
                            value={p.title} 
                            onChange={e => updateProject(p.id, 'title', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                          />
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (EN)</label>
                          <input 
                            value={p.titleEn || ''} 
                            onChange={e => updateProject(p.id, 'titleEn', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                          />
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date</label>
                          <input 
                            value={p.date} 
                            onChange={e => updateProject(p.id, 'date', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                          />
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                          <input 
                            value={p.imageUrl} 
                            onChange={e => updateProject(p.id, 'imageUrl', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Summary (KO)</label>
                          <textarea 
                            value={p.summary} 
                            onChange={e => updateProject(p.id, 'summary', e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                          />
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Summary (EN)</label>
                          <textarea 
                            value={p.summaryEn || ''} 
                            onChange={e => updateProject(p.id, 'summaryEn', e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Insight (KO)</label>
                            <textarea value={p.insight} onChange={e => updateProject(p.id, 'insight', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Insight (EN)</label>
                            <textarea value={p.insightEn || ''} onChange={e => updateProject(p.id, 'insightEn', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Strategy (KO)</label>
                            <textarea value={p.strategy} onChange={e => updateProject(p.id, 'strategy', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Strategy (EN)</label>
                            <textarea value={p.strategyEn || ''} onChange={e => updateProject(p.id, 'strategyEn', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Execution (KO)</label>
                            <textarea value={p.execution || ''} onChange={e => updateProject(p.id, 'execution', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Execution (EN)</label>
                            <textarea value={p.executionEn || ''} onChange={e => updateProject(p.id, 'executionEn', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Result (KO)</label>
                            <textarea value={p.result} onChange={e => updateProject(p.id, 'result', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Result (EN)</label>
                            <textarea value={p.resultEn || ''} onChange={e => updateProject(p.id, 'resultEn', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                          </div>
                          <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Reflection (KO)</label>
                            <textarea value={p.reflection} onChange={e => updateProject(p.id, 'reflection', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Reflection (EN)</label>
                            <textarea value={p.reflectionEn || ''} onChange={e => updateProject(p.id, 'reflectionEn', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'experiences' && experiences.map(exp => (
                    <div key={exp.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 relative">
                      <button onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (KO)</label>
                          <input value={exp.title} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, title: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (EN)</label>
                          <input value={exp.titleEn || ''} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, titleEn: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Role (KO)</label>
                          <input value={exp.role} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, role: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Role (EN)</label>
                          <input value={exp.roleEn || ''} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, roleEn: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Period</label>
                          <input value={exp.period} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, period: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description (KO)</label>
                          <textarea value={exp.description} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, description: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description (EN)</label>
                          <textarea value={exp.descriptionEn || ''} onChange={e => setExperiences(experiences.map(ex => ex.id === exp.id ? {...ex, descriptionEn: e.target.value} : ex))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'awards' && awards.map(award => (
                    <div key={award.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 relative">
                      <button onClick={() => setAwards(awards.filter(a => a.id !== award.id))} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (KO)</label>
                          <input value={award.title} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, title: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (EN)</label>
                          <input value={award.titleEn || ''} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, titleEn: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Host (KO)</label>
                          <input value={award.host} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, host: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Host (EN)</label>
                          <input value={award.hostEn || ''} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, hostEn: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Year</label>
                          <input value={award.year} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, year: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description (KO)</label>
                          <textarea value={award.description} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, description: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description (EN)</label>
                          <textarea value={award.descriptionEn || ''} onChange={e => setAwards(awards.map(a => a.id === award.id ? {...a, descriptionEn: e.target.value} : a))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {activeTab === 'media' && media.map(item => (
                    <div key={item.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 relative">
                      <button onClick={() => setMedia(media.filter(m => m.id !== item.id))} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Type</label>
                          <select 
                            value={item.type} 
                            onChange={e => setMedia(media.map(m => m.id === item.id ? {...m, type: e.target.value as 'image' | 'video'} : m))}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (KO)</label>
                          <input value={item.title} onChange={e => setMedia(media.map(m => m.id === item.id ? {...m, title: e.target.value} : m))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title (EN)</label>
                          <input value={item.titleEn || ''} onChange={e => setMedia(media.map(m => m.id === item.id ? {...m, titleEn: e.target.value} : m))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">URL</label>
                          <input value={item.url} onChange={e => setMedia(media.map(m => m.id === item.id ? {...m, url: e.target.value} : m))} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
