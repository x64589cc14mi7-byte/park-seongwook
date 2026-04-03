import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  setIsLoggedIn: (val: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === '0027') {
      localStorage.setItem('admin_auth', 'true');
      setIsLoggedIn(true);
      navigate('/admin');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-accent/10 rounded-full text-accent">
            <Lock size={32} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">Admin Login</h1>
        <p className="text-center text-gray-500 mb-8 font-light">관리자 비밀번호를 입력해주세요.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-black transition-colors"
          >
            <span>Login</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
