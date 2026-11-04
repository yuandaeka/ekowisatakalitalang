import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mountain, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { setAdminAuthSession } from '../../services/dataService';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo authentication check
    setTimeout(() => {
      if (
        (email === 'admin@kalitalang.id' || email === 'admin') &&
        (password === 'balerante2026' || password === 'admin')
      ) {
        setAdminAuthSession(true);
        navigate('/admin/dashboard');
      } else {
        setError('Email atau kata sandi tidak valid. Gunakan tombol kredensial demo.');
      }
      setLoading(false);
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@kalitalang.id');
    setPassword('balerante2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-canopy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Merapi backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-canopy-950/80" />
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ember-600 to-canopy-800 p-2.5 flex items-center justify-center shadow-lg border border-white/20">
              <Mountain className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h2 className="mt-4 text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Portal CMS Pengelola
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-mono text-mist-200/70 uppercase tracking-widest">
            EKOWISATA KALI TALANG BALERANTE
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-mist-200">
          
          {/* Demo Hint Banner with 1-Click Auto Fill */}
          <div className="mb-6 p-3.5 rounded-2xl bg-mist-50 border border-mist-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono font-bold text-canopy-950 block">Kredensial Demo:</span>
              <span className="text-basalt-600 font-mono text-[11px]">admin@kalitalang.id / balerante2026</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ember-600 hover:bg-ember-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Isi Kredensial Demo</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-basalt-700 mb-1.5">
                Email Pengelola
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-basalt-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kalitalang.id"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:ring-2 focus:ring-ember-500/20 focus:border-ember-600 text-basalt-900 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-basalt-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-basalt-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:ring-2 focus:ring-ember-500/20 focus:border-ember-600 text-basalt-900 font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-canopy-950 hover:bg-canopy-900 shadow-elevated transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              <span>{loading ? 'Memeriksa Akses...' : 'Masuk ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-mist-200 text-center">
            <Link
              to="/"
              className="text-xs text-basalt-500 hover:text-ember-600 font-sans transition-colors"
            >
              &larr; Kembali ke Website Publik
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
