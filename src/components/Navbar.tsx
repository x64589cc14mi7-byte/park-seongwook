import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  lang: 'ko' | 'en';
  toggleLang: () => void;
}

export default function Navbar({ isLoggedIn, setIsLoggedIn, lang, toggleLang }: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { name: lang === 'ko' ? '홈' : 'HOME', path: '/' },
    { name: lang === 'ko' ? '소개' : 'ABOUT', path: '/#about' },
    { name: lang === 'ko' ? '프로젝트' : 'PROJECT', path: '/#project' },
    { name: lang === 'ko' ? '경력' : 'EXPERIENCE', path: '/#experience' },
    { name: lang === 'ko' ? '수상' : 'AWARDS', path: '/#awards' },
    { name: lang === 'ko' ? '미디어' : 'MEDIA', path: '/#media' },
    { name: lang === 'ko' ? '연락처' : 'CONTACT', path: '/#contact' },
  ];

  const scrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={scrollToTop}
          className="text-xl font-bold tracking-tighter hover:text-accent transition-colors"
        >
          PARK SEONG WOOK<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-xs font-bold tracking-widest hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
            <button 
              onClick={toggleLang}
              className="text-xs font-bold tracking-widest hover:text-accent transition-colors px-2 py-1 rounded border border-white/20"
            >
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>
            {isLoggedIn ? (
              <>
                <Link to="/admin" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Settings size={18} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-red-400"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link to="/login" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <LogIn size={18} />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 glass-dark border-b border-white/5 p-8 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold tracking-tighter hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                <button 
                  onClick={() => {
                    toggleLang();
                    setIsMenuOpen(false);
                  }}
                  className="text-xs font-bold tracking-widest hover:text-accent transition-colors px-4 py-2 rounded border border-white/20"
                >
                  {lang === 'ko' ? 'ENGLISH' : 'KOREAN'}
                </button>
                <div className="flex items-center space-x-6">
                  {isLoggedIn ? (
                    <>
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Settings size={20} />
                      </Link>
                      <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors text-red-400">
                        <LogOut size={20} />
                      </button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <LogIn size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
