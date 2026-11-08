import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Calendar, Info, Mountain, ArrowUpRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { parkStatus, featuredEvent, openRegistrationModal } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Rute Trekking', path: '/trails', icon: Compass },
    { label: 'Event & Trekking', path: '/events', icon: Calendar },
    { label: 'Tentang & Galeri', path: '/about', icon: Info },
  ];

  const handleCtaClick = () => {
    if (featuredEvent) {
      openRegistrationModal(featuredEvent);
    }
  };

  const statusColorClass = parkStatus?.isOpen
    ? 'bg-emerald-500'
    : 'bg-rose-500';

  const statusBorderClass = parkStatus?.isOpen
    ? 'border-emerald-500/30 text-emerald-300'
    : 'border-rose-500/30 text-rose-300';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-canopy-950/95 backdrop-blur-md shadow-lg py-3.5 border-b border-white/10'
            : 'bg-gradient-to-b from-canopy-950/80 via-canopy-950/40 to-transparent py-5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-600 to-canopy-800 p-2 flex items-center justify-center shadow-md border border-white/10 group-hover:scale-105 transition-transform">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white leading-none">
                  KALI TALANG
                </span>
                <span className="text-[11px] font-sans uppercase tracking-widest text-mist-200/70 mt-1">
                  Desa Balerante • 4 KM Merapi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-mist-200/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Live Status Pill & CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Status Pill */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-canopy-900/80 border ${statusBorderClass}`}
                title={`Status: ${parkStatus?.statusLabel || 'Memuat...'} | Suhu: ${parkStatus?.temperatureC ?? 20}°C`}
              >
                <span className={`w-2 h-2 rounded-full ${statusColorClass} animate-pulse`} />
                <span>
                  {parkStatus?.isOpen ? 'JALUR BUKA' : 'JALUR TUTUP'} • {parkStatus?.temperatureC ?? 20}°C
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-ember-600 hover:bg-ember-500 transition-all shadow-md hover:shadow-glow-ember transform active:scale-95"
              >
                <span>Daftar Fun Trekking</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Actions: Status Indicator + Menu Trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-canopy-900/90 border ${statusBorderClass}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusColorClass} animate-pulse`} />
                <span>{parkStatus?.temperatureC ?? 20}°C</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-mist-200 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div 
            className="fixed inset-0 bg-canopy-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-canopy-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-ember-500" />
                  <span className="font-serif font-bold text-white text-lg">Ekowisata Kali Talang</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-mist-200 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Info Card */}
              <div className="my-5 p-3.5 rounded-xl bg-canopy-900/90 border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-mist-200/70">KONDISI HARI INI</span>
                  <span className={`flex items-center gap-1 font-semibold ${parkStatus?.isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {parkStatus?.isOpen ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    {parkStatus?.isOpen ? 'Buka Normal' : 'Tutup Sementara'}
                  </span>
                </div>
                <p className="text-sm font-sans text-white font-medium">
                  {parkStatus?.merapiVisibility ?? 'Puncak Cerah'}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-mist-200/60 pt-2 border-t border-white/10">
                  <span>Suhu: {parkStatus?.temperatureC ?? 20}°C</span>
                  <span>Tiket: Rp {(parkStatus?.ticketPriceWNI ?? 5000).toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1.5">
                {navLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'bg-white/15 text-white font-semibold'
                          : 'text-mist-200/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5 text-ember-400" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* CTA in mobile menu */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleCtaClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold bg-ember-600 hover:bg-ember-500 shadow-md transition-colors"
                >
                  <span>Daftar Kali Talang Fun Trekking</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Footer Link to Admin */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-mist-200/60">
              <span>Balerante, Kemalang, Klaten</span>
              <Link
                to="/admin/login"
                className="hover:text-white transition-colors underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portal Admin CMS
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

