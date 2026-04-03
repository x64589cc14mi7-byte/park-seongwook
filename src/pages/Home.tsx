import { motion } from 'motion/react';
import { ArrowRight, Mail, Instagram, Linkedin, Award, Briefcase, Play, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProjects, getExperiences, getAwards, getMedia } from '../lib/data';
import { Project, Experience, Award as AwardType, Media } from '../types';
import Modal from '../components/Modal';

interface HomeProps {
  lang: 'ko' | 'en';
}

export default function Home({ lang }: HomeProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedAward, setSelectedAward] = useState<AwardType | null>(null);

  useEffect(() => {
    setProjects(getProjects());
    setExperiences(getExperiences());
    setAwards(getAwards());
    setMedia(getMedia());
  }, []);

  const t = (ko: string, en: string) => lang === 'ko' ? ko : en;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-8 block opacity-70">
              {t('마케터 & 전략가', 'Marketer & Strategist')}
            </span>
            <h1 className="heading-xl">
              {t('데이터와 감성을 연결하는', 'Connecting Data')}<br />
              {t('마케터 ', 'with Emotion, ')}<span className="text-accent">{t('박성욱', 'Seongwook')}</span>{t('입니다.', '.')}
            </h1>
            <p className="text-xl text-white/40 max-w-2xl mb-16 font-light leading-relaxed">
              {t('단순한 광고가 아닌, 사람의 마음을 움직이는 스토리를 만듭니다.', 'I create stories that move hearts, not just advertisements.')}<br />
              {t('아이디어를 결과로 증명하는 과정을 기록합니다.', 'I record the process of proving ideas through results.')}
            </p>
            <div className="flex flex-wrap gap-8">
              <a href="#project" className="group flex items-center space-x-4 text-sm font-bold tracking-widest uppercase">
                <span className="border-b border-white/20 pb-1 group-hover:border-accent transition-colors">{t('프로젝트 보기', 'View Projects')}</span>
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-accent transition-colors">
                  <ArrowRight size={18} />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10" 
        />
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg">{t('브랜드 스토리', 'Brand Story')}</h2>
              <p className="text-lg text-white/60 mb-12 leading-relaxed font-light">
                {t('저는 마케팅을 "문제를 해결하는 예술"이라고 생각합니다.', 'I believe marketing is the "art of solving problems."')} 
                {t('데이터를 통해 시장의 빈틈을 찾고, 감성적인 스토리텔링으로 그 빈틈을 채웁니다.', 'I find gaps in the market through data and fill them with emotional storytelling.')}
                <br /><br />
                {t('단순히 트렌드를 쫓는 것이 아니라, 트렌드 속에서 변하지 않는 인간의 본질을 탐구합니다.', 'I don\'t just follow trends; I explore the unchanging essence of humans within trends.')}
                <br />
                <strong className="text-white font-medium">"{t('아이디어를 끝까지 실행하는 타입입니다.', 'I am the type who executes ideas to the end.')}"</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { ko: '기획력', en: 'Planning', descKo: '데이터 기반 전략', descEn: 'Data-driven Strategy' },
                  { ko: '트렌드 캐치', en: 'Trend Catch', descKo: 'MZ세대 감성 파악', descEn: 'MZ Generation Insight' },
                  { ko: '실행력', en: 'Execution', descKo: '결과를 만드는 추진력', descEn: 'Driving Results' }
                ].map(item => (
                  <div key={item.en} className="p-8 glass-dark rounded-3xl border border-white/5">
                    <h4 className="font-bold mb-2 text-sm tracking-tight">{t(item.ko, item.en)}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{t(item.descKo, item.descEn)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-white/5 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://picsum.photos/seed/profile/800/1000" 
                  alt="Profile" 
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="heading-lg">{t('핵심 프로젝트', 'Core Projects')}</h2>
            <p className="text-white/40 font-light">{t('왜 이걸 했고, 어떤 결과를 냈는지에 집중합니다.', 'Focusing on why I did it and what results I achieved.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] bg-white/5 rounded-[2rem] overflow-hidden mb-8 border border-white/10 relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="px-4">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-3 block">{project.date}</span>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-accent transition-colors">{t(project.title, project.titleEn)}</h3>
                  <p className="text-white/40 font-light line-clamp-2">{t(project.summary, project.summaryEn)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Awards Section */}
      <section id="experience" className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            {/* Experience */}
            <div>
              <div className="flex items-center space-x-6 mb-16">
                <div className="p-4 glass-dark rounded-2xl text-accent">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-4xl font-bold tracking-tighter">{t('활동 내역', 'Experience')}</h2>
              </div>
              <div className="space-y-6">
                {experiences.map(exp => (
                  <motion.div 
                    key={exp.id} 
                    onClick={() => setSelectedExperience(exp)}
                    className="p-8 glass-dark rounded-[2rem] border border-white/5 hover:border-white/20 transition-all cursor-pointer hover-scale"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{t(exp.title, exp.titleEn)}</h3>
                        <p className="text-accent text-sm font-medium">{t(exp.role, exp.roleEn)}</p>
                      </div>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{exp.period}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div id="awards">
              <div className="flex items-center space-x-6 mb-16">
                <div className="p-4 glass-dark rounded-2xl text-accent">
                  <Award size={24} />
                </div>
                <h2 className="text-4xl font-bold tracking-tighter">{t('수상 경력', 'Awards')}</h2>
              </div>
              <div className="space-y-6">
                {awards.map(award => (
                  <motion.div 
                    key={award.id} 
                    onClick={() => setSelectedAward(award)}
                    className="p-8 glass-dark rounded-[2rem] border border-white/5 hover:border-white/20 transition-all cursor-pointer hover-scale"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{t(award.title, award.titleEn)}</h3>
                        <p className="text-white/40 text-sm">{t(award.host, award.hostEn)}</p>
                      </div>
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{award.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="heading-lg">{t('미디어 & 콘텐츠', 'Media & Content')}</h2>
            <p className="text-white/40 font-light">{t('감성 + 증거 역할을 하는 활동 기록입니다.', 'Activity records that serve as emotion + evidence.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map(item => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="group relative aspect-[3/4] bg-white/5 rounded-[2rem] overflow-hidden cursor-pointer hover-scale border border-white/5"
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-2 text-white/40 mb-3">
                    {item.type === 'video' ? <Play size={14} /> : <ImageIcon size={14} />}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.type}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{t(item.title, item.titleEn)}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden border border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent/5 blur-[120px] -z-10" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
                {t('함께 새로운 가치를', 'Let\'s Create')}<br />
                {t('만들어볼까요?', 'New Value.')}
              </h2>
              <div className="flex flex-col items-center space-y-8">
                <a href="mailto:x64589cc14mi7@gmail.com" className="text-2xl md:text-4xl font-light hover:text-accent transition-colors border-b border-white/10 pb-2">
                  x64589cc14mi7@gmail.com
                </a>
                <div className="flex space-x-12">
                  <a 
                    href="https://www.instagram.com/puchaiseongwwwk/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold"
                  >
                    Instagram
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold">Linkedin</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white/5">
              <img src={selectedProject.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-accent font-bold tracking-widest text-xs mb-4 block">{selectedProject.date}</span>
              <h2 className="text-4xl font-bold mb-8 tracking-tight">{t(selectedProject.title, selectedProject.titleEn)}</h2>
              <p className="text-xl text-white/60 mb-12 font-light leading-relaxed">{t(selectedProject.summary, selectedProject.summaryEn)}</p>
              
              <div className="space-y-10">
                {[
                  { label: 'Insight', ko: selectedProject.insight, en: selectedProject.insightEn },
                  { label: 'Strategy', ko: selectedProject.strategy, en: selectedProject.strategyEn },
                  { label: 'Execution', ko: selectedProject.execution, en: selectedProject.executionEn },
                  { label: 'Result', ko: selectedProject.result, en: selectedProject.resultEn },
                  { label: 'Reflection', ko: selectedProject.reflection, en: selectedProject.reflectionEn }
                ].map(item => (
                  <div key={item.label}>
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3">{item.label}</h4>
                    <p className="text-white/80 font-light leading-relaxed">{t(item.ko, item.en)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
        {selectedMedia && (
          <div className="flex flex-col items-center">
            <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black mb-12">
              {selectedMedia.type === 'video' ? (
                <video src={selectedMedia.url} className="w-full h-full object-contain" controls autoPlay />
              ) : (
                <img src={selectedMedia.url} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              )}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t(selectedMedia.title, selectedMedia.titleEn)}</h2>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedExperience} onClose={() => setSelectedExperience(null)}>
        {selectedExperience && (
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-accent font-bold tracking-widest text-xs mb-4 block">{selectedExperience.period}</span>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{t(selectedExperience.title, selectedExperience.titleEn)}</h2>
            <p className="text-xl text-white/40 mb-12">{t(selectedExperience.role, selectedExperience.roleEn)}</p>
            <div className="h-px bg-white/10 mb-12" />
            <p className="text-xl text-white/80 font-light leading-relaxed">{t(selectedExperience.description, selectedExperience.descriptionEn)}</p>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedAward} onClose={() => setSelectedAward(null)}>
        {selectedAward && (
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-accent font-bold tracking-widest text-xs mb-4 block">{selectedAward.year}</span>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{t(selectedAward.title, selectedAward.titleEn)}</h2>
            <p className="text-xl text-white/40 mb-12">{t(selectedAward.host, selectedAward.hostEn)}</p>
            <div className="h-px bg-white/10 mb-12" />
            <p className="text-xl text-white/80 font-light leading-relaxed">{t(selectedAward.description, selectedAward.descriptionEn)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
