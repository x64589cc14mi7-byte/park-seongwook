/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') setIsLoggedIn(true);
    
    const savedLang = localStorage.getItem('lang') as 'ko' | 'en';
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'ko' ? 'en' : 'ko';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <div className="atmosphere" />
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          lang={lang} 
          toggleLang={toggleLang} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route 
              path="/login" 
              element={<Login setIsLoggedIn={setIsLoggedIn} />} 
            />
            <Route 
              path="/admin" 
              element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        <Footer lang={lang} />
      </div>
    </Router>
  );
}
