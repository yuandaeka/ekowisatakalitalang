import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Mountain,
  LayoutDashboard,
  Calendar,
  Compass,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { getAdminAuthSession, setAdminAuthSession, resetAllDataToSeed } from '../../services/dataService';
import { useToast } from '../../components/admin/Toast';

export const AdminLayout: React.FC = () => {
  const isAuthenticated = getAdminAuthSession();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    setAdminAuthSession(false);
    showToast('Berhasil keluar dari sesi admin.', 'success');
    navigate('/admin/login');
  };

  const handleResetData = async () => {
    setIsResetting(true);
    try {
      await resetAllDataToSeed();
      showToast('Semua data berhasil direset ke Seed Awal!', 'success');
      setResetModalOpen(false);
    } catch {
      showToast('Gagal mereset data', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  const navItems = [
    { label: 'Status & Beranda', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Kelola Event & GForm', path: '/admin/events', icon: Calendar },
    { label: 'Kelola Rute Trekking', path: '/admin/trails', icon: Compass },
    { label: 'Kelola Galeri', path: '/admin/gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-mist-50 flex flex-col md:flex-row font-sans">
      
      {/* Desktop Sidebar (Left) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-canopy-950 text-white flex-col justify-between p-6 border-r border-canopy-800 shrink-0 select-none">
        
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 pb-6 border-b border-canopy-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-600 to-canopy-800 p-2 flex items-center justify-center border border-white/10 shadow-sm">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white leading-none">
                CMS KALI TALANG
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mt-1 block">
                ADMIN PANEL • BALERANTE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-ember-600 text-white font-semibold shadow-md'
                      : 'text-mist-200/80 hover:bg-canopy-900 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div className="pt-6 border-t border-canopy-800 space-y-3">
          
          {/* Quick Seed Reset Button */}
          <button
            onClick={() => setResetModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono text-mist-200/70 hover:text-white hover:bg-canopy-900 border border-canopy-800/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-ember-400" />
            <span>Reset ke Seed Data Awal</span>
          </button>

          {/* Back to Public Web */}
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-mist-200/70 hover:text-white hover:bg-canopy-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lihat Web Publik</span>
            </span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-rose-300 hover:text-white hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Sesi</span>
          </button>
        </div>

      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-canopy-950 text-white p-4 flex items-center justify-between border-b border-canopy-800">
        <div className="flex items-center gap-2.5">
          <Mountain className="w-5 h-5 text-ember-500" />
          <span className="font-serif font-bold text-base">CMS Kali Talang</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-canopy-900 text-mist-200 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-canopy-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 bottom-0 left-0 w-4/5 max-w-xs bg-canopy-950 p-6 flex flex-col justify-between text-white border-r border-canopy-800 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-canopy-800">
                <span className="font-serif font-bold text-lg">Menu Admin</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-mist-200 hover:bg-canopy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                        isActive
                          ? 'bg-ember-600 text-white font-semibold'
                          : 'text-mist-200/80 hover:bg-canopy-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-canopy-800 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResetModalOpen(true);
                }}
                className="w-full flex items-center gap-2 text-xs text-mist-200/80 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-ember-400" />
                <span>Reset ke Data Awal</span>
              </button>
              <Link
                to="/"
                target="_blank"
                className="w-full flex items-center gap-2 text-xs text-mist-200/80 py-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Buka Web Publik</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-xs text-rose-300 py-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Topbar */}
        <header className="bg-white border-b border-mist-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-basalt-600">
              SISTEM CMS AKTIF • Mode VPS-Ready Storage
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-sans text-basalt-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Admin Pokdarwis</span>
            </div>
          </div>
        </header>

        {/* Page Outlet */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>

      </main>

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canopy-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-mist-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-basalt-900">
              Reset Semua Data ke Seed Awal?
            </h3>
            <p className="text-sm text-basalt-600 font-sans leading-relaxed">
              Tindakan ini akan mengembalikan konfigurasi status taman, event, rute, dan galeri ke data bawaan awal Balerante. Seluruh perubahan kustom akan diganti.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-basalt-700 bg-mist-100 hover:bg-mist-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleResetData}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors disabled:opacity-50"
              >
                {isResetting ? 'Mereset Data...' : 'Ya, Reset Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

