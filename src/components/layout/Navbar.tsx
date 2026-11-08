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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Jelajahi', path: '/' },
    { label: 'Rute Trekking', path: '/trails', icon: Compass },
    { label: 'Agenda Event', path: '/events', icon: Calendar },
    { label: 'Profil & Galeri', path: '/about', icon: Info },
  ];

  const handleCtaClick = () => {
    if (featuredEvent) {
      openRegistrationModal(featuredEvent);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/90 py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Komoot Style Brand Logo & Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-komoot-green text-white p-2 flex items-center justify-center shadow-sm group-hover:bg-komoot-green-hover transition-colors">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-gray-900 leading-none">
                  KALI TALANG
                </span>
                <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-gray-500 mt-0.5">
                  Balerante • 4 KM Merapi
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
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Live Status Pill & CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Status Pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-semibold bg-gray-100 border border-gray-200/80 text-gray-700"
                title={`Kondisi: ${parkStatus?.statusLabel || 'Buka'} | Suhu: ${parkStatus?.temperatureC ?? 20}°C`}
              >
                <span className={`w-2 h-2 rounded-full ${parkStatus?.isOpen ? 'bg-komoot-green animate-pulse' : 'bg-rose-500'}`} />
                <span>
                  {parkStatus?.isOpen ? 'Jalur Buka' : 'Jalur Tutup'} • {parkStatus?.temperatureC ?? 20}°C
                </span>
              </div>

              {/* Primary Green CTA Button */}
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-komoot-green hover:bg-komoot-green-hover transition-all shadow-sm active:scale-95"
              >
                <span>Daftar Fun Trekking</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium bg-gray-100 text-gray-700 border border-gray-200">
                <span className={`w-2 h-2 rounded-full ${parkStatus?.isOpen ? 'bg-komoot-green animate-pulse' : 'bg-rose-500'}`} />
                <span>{parkStatus?.temperatureC ?? 20}°C</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white p-6 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-komoot-green text-white flex items-center justify-center">
                    <Mountain className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-bold text-gray-900 text-lg">Kali Talang</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Info Card */}
              <div className="my-5 p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between text-xs font-sans font-semibold mb-1">
                  <span className="text-gray-500">KONDISI HARI INI</span>
                  <span className={`flex items-center gap-1 ${parkStatus?.isOpen ? 'text-komoot-green' : 'text-rose-600'}`}>
                    {parkStatus?.isOpen ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                    {parkStatus?.isOpen ? 'Buka Normal' : 'Tutup Sementara'}
                  </span>
                </div>
                <p className="text-sm font-sans text-gray-900 font-bold">
                  {parkStatus?.merapiVisibility ?? 'Puncak Cerah'}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <span>Suhu: {parkStatus?.temperatureC ?? 20}°C</span>
                  <span>Tiket: Rp {(parkStatus?.ticketPriceWNI ?? 5000).toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1">
                {navLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-komoot-green/10 text-komoot-green'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5 text-komoot-green" />}
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
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold bg-komoot-green hover:bg-komoot-green-hover shadow-sm transition-colors"
                >
                  <span>Daftar Kali Talang Fun Trekking</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Footer Link to Admin */}
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Balerante, Kemalang, Klaten</span>
              <Link
                to="/admin/login"
                className="hover:text-gray-900 transition-colors underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portal Pengelola
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
