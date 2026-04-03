import { Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: 'ko' | 'en';
}

export default function Footer({ lang }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0502] text-white py-20 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">PARK SEONG WOOK<span className="text-accent">.</span></h2>
            <p className="text-white/40 max-w-md font-light">
              {lang === 'ko' 
                ? '생각을 결과로 바꾸는 마케터. 아이디어를 증명하는 포트폴리오입니다.' 
                : 'A marketer who turns thoughts into results. A portfolio that proves ideas.'}
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="mt-8 md:mt-0 p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
          >
            <ArrowUp size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-white/30">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:x64589cc14mi7@gmail.com" className="flex items-center space-x-2 hover:text-accent transition-colors text-white/60">
                <Mail size={18} />
                <span className="font-light">x64589cc14mi7@gmail.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-white/30">Social</h4>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/puchaiseongwwwk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white/60 hover:text-accent transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-white/30">Legal</h4>
            <p className="text-xs text-white/30 font-light">
              © 2026 Park Seong-wook. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
