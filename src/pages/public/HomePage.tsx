import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Ticket,
  Eye,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Search,
  Navigation,
  ExternalLink,
  ChevronRight,
  Footprints,
  Bike,
  Sun,
  Flame,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTrails } from '../../services/dataService';
import { TrailRoute } from '../../types';
import { TrailCard } from '../../components/trails/TrailCard';

export const HomePage: React.FC = () => {
  const { parkStatus, featuredEvent, openRegistrationModal } = useApp();
  const [trails, setTrails] = useState<TrailRoute[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const loadTrails = () => {
      getTrails().then((data) => setTrails(data));
    };
    loadTrails();

    const handleUpdate = () => loadTrails();
    window.addEventListener('kalitalang_data_updated', handleUpdate);
    return () => window.removeEventListener('kalitalang_data_updated', handleUpdate);
  }, []);

  // Countdown timer calculation for Featured Event
  useEffect(() => {
    if (!featuredEvent?.date) return;

    const targetDate = new Date(`${featuredEvent.date}T06:00:00+07:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [featuredEvent]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/trails?q=${encodeURIComponent(searchQuery)}`);
  };

  const sports = [
    { label: 'Semua Aktivitas', id: 'Semua', icon: Compass },
    { label: 'Hiking & Trekking', id: 'Fun Trail', icon: Footprints },
    { label: 'Sepeda & MTB', id: 'Downhill / MTB', icon: Bike },
    { label: 'Jelajah Lahar', id: 'Trekking', icon: Flame },
  ];

  const filteredTrails = selectedSport === 'Semua'
    ? trails
    : trails.filter((t) => t.category === selectedSport);

  return (
    <div className="relative w-full bg-komoot-bg text-gray-900 font-sans">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (KOMOOT ADVENTURE FINDER STYLE)          */}
      {/* ======================================================== */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white border-b border-gray-200">
        
        {/* Background Visual Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={parkStatus?.heroPosterUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80'}
            alt="Puncak Merapi dari Balerante"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-6 pb-4">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-xs font-semibold text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-komoot-green animate-pulse" />
            <span>DESA BALERANTE • 4 KM DARI PUNCAK GUNUNG MERAPI</span>
          </div>

          {/* Main Komoot-Style Bold Sans Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto drop-shadow-sm">
            {parkStatus?.heroHeadline || 'Temukan Petualangan Luar Ruang di Kali Talang'}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
            {parkStatus?.heroSubheadline ||
              'Jelajahi rute hiking, panorama kawah Merapi 4 KM, dan segarnya hutan pinus lereng Balerante dengan profil elevasi terukur.'}
          </p>

          {/* THE SIGNATURE KOMOOT ADVENTURE SEARCH WIDGET */}
          <div className="mt-8 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl shadow-komoot-lg border border-gray-100 p-3 sm:p-5 max-w-3xl mx-auto text-gray-900 text-left">
            
            {/* Sport Switcher Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-3 border-b border-gray-100 no-scrollbar">
              {sports.map((sport) => {
                const Icon = sport.icon;
                const isSelected = selectedSport === sport.id;
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => setSelectedSport(sport.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                      isSelected
                        ? 'bg-komoot-green text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{sport.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari rute, pos pantau, atau titik foto di Kali Talang..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-komoot-green/20 focus:border-komoot-green transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-white bg-komoot-green hover:bg-komoot-green-hover transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <span>Cari Rute</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Popular Chips */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Populer:</span>
              {[
                { name: 'Gardu Pandang 4KM', cat: 'Fun Trail' },
                { name: 'Jembatan Bambu', cat: 'Fun Trail' },
                { name: 'Sabo Dam Kali Woro', cat: 'Trekking' },
                { name: 'Downhill Track', cat: 'Downhill / MTB' },
              ].map((chip) => (
                <button
                  key={chip.name}
                  type="button"
                  onClick={() => {
                    setSelectedSport(chip.cat);
                    setSearchQuery(chip.name);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                >
                  {chip.name}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Live Telemetry Bar (Bottom of Hero) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 mt-8 sm:mt-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 text-left">
            
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <div className="w-9 h-9 rounded-xl bg-komoot-green/10 text-komoot-green flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Status Kawasan</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {parkStatus?.isOpen ? 'Buka Normal' : 'Tutup Sementara'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Puncak Merapi</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block max-w-[150px]">
                  {parkStatus?.merapiVisibility || 'Terlihat Jelas'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Suhu Lereng</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {parkStatus?.temperatureC ?? 20}°C • {parkStatus?.weatherCondition || 'Cerah'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
              <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5 text-komoot-green" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Tiket Masuk</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  Rp {(parkStatus?.ticketPriceWNI || 5000).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. DISCOVER POPULAR TOURS (KOMOOT TOURS FEED)            */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-komoot-green mb-1.5">
              <Compass className="w-4 h-4" />
              <span>JELAJAHI RUTE TERBAIK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Rute & Jalur Resmi Kali Talang
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Dilengkapi profil ketinggian, estimasi waktu tempuh, dan titik pandang kawah Merapi.
            </p>
          </div>

          <Link
            to="/trails"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-komoot-green hover:text-komoot-green-hover transition-colors shrink-0 group"
          >
            <span>Lihat Semua Rute</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trail Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTrails.slice(0, 3).map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>

      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED EVENT SPOTLIGHT (KOMOOT CHALLENGE CARD)      */}
      {/* ======================================================== */}
      {featuredEvent && (
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-canopy-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden shadow-komoot-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Event Left Info */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-komoot-green text-white">
                      AGENDA UNGGULAN 2026
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                      {featuredEvent.status}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                      {featuredEvent.title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                      {featuredEvent.subtitle}
                    </p>
                  </div>

                  {/* Countdown Timer Widget (JetBrains Mono) */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-lg">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                      HITUNG MUNDUR HARI PELAKSANAAN
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center font-mono">
                      <div className="p-2 rounded-xl bg-white/5">
                        <span className="text-xl sm:text-2xl font-bold text-komoot-green block">{countdown.days}</span>
                        <span className="text-[10px] text-gray-400">Hari</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5">
                        <span className="text-xl sm:text-2xl font-bold text-white block">{String(countdown.hours).padStart(2, '0')}</span>
                        <span className="text-[10px] text-gray-400">Jam</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5">
                        <span className="text-xl sm:text-2xl font-bold text-white block">{String(countdown.minutes).padStart(2, '0')}</span>
                        <span className="text-[10px] text-gray-400">Menit</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5">
                        <span className="text-xl sm:text-2xl font-bold text-komoot-green block">{String(countdown.seconds).padStart(2, '0')}</span>
                        <span className="text-[10px] text-gray-400">Detik</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-200">
                    {featuredEvent.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-komoot-green shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => openRegistrationModal(featuredEvent)}
                      className="px-6 py-3.5 rounded-xl font-bold text-white bg-komoot-green hover:bg-komoot-green-hover transition-all text-center flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Daftar via Google Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/events/${featuredEvent.slug}`}
                      className="px-5 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-center"
                    >
                      Lihat Rundown Lengkap
                    </Link>
                  </div>
                </div>

                {/* Event Poster Card */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-gray-800 shadow-xl border border-white/10">
                    <img
                      src={featuredEvent.bannerImage}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                        <Calendar className="w-4 h-4 text-komoot-green" />
                        <span>{featuredEvent.date} ({featuredEvent.timeRange})</span>
                      </div>
                      <p className="font-bold text-lg">{featuredEvent.priceLabel}</p>
                      <span className="text-xs text-gray-300 font-mono">{featuredEvent.quotaLabel}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. THEMED COLLECTIONS (KOMOOT COLLECTIONS CAROUSEL)      */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-komoot-green block mb-1">
            KOLEKSI PILIHAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Inspirasi Rute Sesuai Minatmu
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Jelajahi keunikan alam lereng Merapi berdasarkan tema petualangan favorit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Collection 1 */}
          <Link
            to="/trails/jalur-utama-kali-talang-fun-trekking"
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 shadow-sm hover:shadow-komoot-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
              alt="Hutan Pinus"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-komoot-green text-white mb-2 inline-block">
                Ramah Keluarga
              </span>
              <h3 className="font-bold text-lg text-white group-hover:text-komoot-green-light transition-colors">
                Jalur Pinus & Gardu Pandang
              </h3>
              <p className="text-xs text-gray-300 mt-1">Rute teduh 2.8 km dengan panorama kawah puncak Merapi.</p>
            </div>
          </Link>

          {/* Collection 2 */}
          <Link
            to="/trails/jalur-eksplorasi-jurang-lahar-savana"
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 shadow-sm hover:shadow-komoot-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Jurang Lahar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-600 text-white mb-2 inline-block">
                Petualangan Menengah
              </span>
              <h3 className="font-bold text-lg text-white group-hover:text-komoot-green-light transition-colors">
                Eksplorasi Jurang Lahar & Savana
              </h3>
              <p className="text-xs text-gray-300 mt-1">Menyusuri tepian Kali Woro dan batuan vulkanik purba 4.5 km.</p>
            </div>
          </Link>

          {/* Collection 3 */}
          <Link
            to="/trails/jalur-kali-talang-downhill-track"
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 shadow-sm hover:shadow-komoot-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
              alt="Downhill MTB"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-600 text-white mb-2 inline-block">
                Tantangan Adrenalin
              </span>
              <h3 className="font-bold text-lg text-white group-hover:text-komoot-green-light transition-colors">
                Downhill & Rock Garden Track
              </h3>
              <p className="text-xs text-gray-300 mt-1">Trek teknikal legendaris favorit komunitas sepeda MTB.</p>
            </div>
          </Link>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 5. EVERYTHING YOU NEED TO GET OUTSIDE (KOMOOT FEATURES)  */}
      {/* ======================================================== */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-komoot-green block mb-1">
              FITUR JALUR PRESISI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Semua yang Kamu Butuhkan Sebelum Melangkah
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-komoot-bg border border-gray-200/80">
              <div className="w-10 h-10 rounded-xl bg-komoot-green text-white flex items-center justify-center mb-4 shadow-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1.5">Profil Elevasi Terukur</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Ketahui kenaikan kontur dan turunan secara presisi agar tenaga dan ritme langkahmu dapat diatur optimal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-komoot-bg border border-gray-200/80">
              <div className="w-10 h-10 rounded-xl bg-komoot-green text-white flex items-center justify-center mb-4 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1.5">Pos Pantau & Waypoints</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Setiap jalur dilengkapi penanda titik istirahat, jembatan bambu, dan gardu pandang foto terbaik.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-komoot-bg border border-gray-200/80">
              <div className="w-10 h-10 rounded-xl bg-komoot-green text-white flex items-center justify-center mb-4 shadow-sm">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1.5">Kondisi Cuaca Real-Time</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Update harian jarak pandang kawah Merapi dan suhu udara langsung dari pos pemantauan Desa Balerante.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-komoot-bg border border-gray-200/80">
              <div className="w-10 h-10 rounded-xl bg-komoot-green text-white flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1.5">Pemandu Komunitas Lokal</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Didukung pemandu resmi Pokdarwis Balerante yang memahami jalur evakuasi dan kearifan lereng Merapi.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. VISITOR PRACTICAL GUIDE & MAP ACCESS                  */}
      {/* ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-komoot-green block">
                PANDUAN PRAKTIS WISATAWAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Rencanakan Kunjunganmu ke Balerante
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ekowisata Kali Talang berjarak ±32 km dari Kota Klaten atau ±35 km dari Yogyakarta via Manisrenggo - Deles Indah. Akses jalan beraspal mulus dapat dilalui kendaraan roda dua maupun roda empat keluarga.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-400 block font-semibold">JAM BUKA</span>
                  <span className="text-sm font-bold text-gray-900 mt-0.5 block">{parkStatus?.operatingHours || '07.00 - 17.00 WIB'}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-400 block font-semibold">WAKTU TERBAIK</span>
                  <span className="text-sm font-bold text-gray-900 mt-0.5 block">06.00 - 08.30 WIB</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-gray-400 block font-semibold">RETRIBUSI</span>
                  <span className="text-sm font-bold text-gray-900 mt-0.5 block">Rp {(parkStatus?.ticketPriceWNI || 5000).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Ekowisata+Kali+Talang+Balerante+Klaten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-komoot-green hover:bg-komoot-green-hover text-xs transition-colors shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80"
                alt="Jembatan Kali Talang"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>

      </section>

    </div>
  );
};
