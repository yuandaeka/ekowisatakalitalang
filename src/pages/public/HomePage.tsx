import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Navigation,
  ExternalLink,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTrails } from '../../services/dataService';
import { TrailRoute } from '../../types';
import { TrailCard } from '../../components/trails/TrailCard';

export const HomePage: React.FC = () => {
  const { parkStatus, featuredEvent, openRegistrationModal } = useApp();
  const [trails, setTrails] = useState<TrailRoute[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
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

    const handleUpdate = () => {
      loadTrails();
    };

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

  const filteredTrails = activeCategory === 'Semua'
    ? trails
    : trails.filter((t) => t.category === activeCategory);

  return (
    <div className="relative w-full">
      
      {/* ======================================================== */}
      {/* 1. FULL-SCREEN VIDEO HERO (BUNAKEN OASIS VIBE)           */}
      {/* ======================================================== */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Video with Poster Fallback */}
        <div className="absolute inset-0 z-0 bg-canopy-950">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={parkStatus?.heroPosterUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80'}
            className="w-full h-full object-cover scale-105 transform motion-safe:transition-transform duration-1000"
          >
            <source
              src={parkStatus?.heroVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-over-a-mountain-range-29472-large.mp4'}
              type="video/mp4"
            />
          </video>
          {/* Hero Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-canopy-950/70 via-canopy-950/45 to-canopy-950/95" />
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-44 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-mono text-white mb-6">
              <span className="w-2 h-2 rounded-full bg-ember-500 animate-ping" />
              <span>DESA BALERANTE • 4 KM DARI PUNCAK MERAPI</span>
            </div>

            {/* Headline Serif Dramatis */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] text-balance drop-shadow-md">
              {parkStatus?.heroHeadline || 'Harmoni Alam di Bawah Puncak Merapi'}
            </h1>

            {/* Subheadline Lead */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-mist-100/90 font-sans font-normal leading-relaxed max-w-2xl text-balance">
              {parkStatus?.heroSubheadline ||
                'Menyaksikan kemegahan gunung berapi paling aktif di dunia dari jarak 4 kilometer dalam dekapan hutan pinus dan kearifan Desa Balerante.'}
            </p>

            {/* Dual CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {featuredEvent && (
                <button
                  onClick={() => openRegistrationModal(featuredEvent)}
                  className="px-7 py-3.5 rounded-xl font-semibold text-white bg-ember-600 hover:bg-ember-500 shadow-elevated hover:shadow-glow-ember transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>Daftar Kali Talang Fun Trekking</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <Link
                to="/trails"
                className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all text-center flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Jelajahi Rute (Komoot View)</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Live Telemetry Bar (Bottom of Hero) */}
        <div className="relative z-10 w-full bg-canopy-950/85 backdrop-blur-md border-t border-white/10 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* Status Jalur */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-mist-200/60 block">
                  STATUS KAWASAN
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-sans">
                  {parkStatus?.isOpen ? 'Jalur Buka Normal' : 'Tutup Sementara'}
                </span>
              </div>
            </div>

            {/* Jarak Pandang Merapi */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-ember-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-mist-200/60 block">
                  JARAK PANDANG MERAPI
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-sans">
                  {parkStatus?.merapiVisibility || 'Terlihat Jelas (Cerah)'}
                </span>
              </div>
            </div>

            {/* Suhu & Cuaca */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-mist-200/60 block">
                  SUHU & KONDISI
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-sans">
                  {parkStatus?.temperatureC ?? 20}°C • {parkStatus?.weatherCondition || 'Cerah Sejuk'}
                </span>
              </div>
            </div>

            {/* Tiket Masuk */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5 text-ember-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-mist-200/60 block">
                  TIKET RETRIBUSI
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-sans">
                  Rp {(parkStatus?.ticketPriceWNI || 5000).toLocaleString('id-ID')} / orang
                </span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. SCROLL STORYTELLING SECTION (EDITORIAL SPLIT)         */}
      {/* ======================================================== */}
      <section className="py-24 bg-mist-50 text-basalt-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

          {/* Babak 1: 4 KM Dari Puncak Merapi (5 Col Text : 7 Col Visual) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-ember-600 font-semibold">
                <span className="w-6 h-px bg-ember-600" />
                BABAK 01 • KEDEKATAN MAGIS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-basalt-900 tracking-tight leading-tight">
                Berdiri Hanya 4 Kilometer dari Kawah Gunung Merapi
              </h2>
              <p className="text-basalt-600 font-sans leading-relaxed text-base sm:text-lg">
                Tidak ada tempat lain di mana Anda bisa memandang kubah lava aktif, tebing aliran piroklastik purba, dan kepulan asap solfatara dengan mata telanjang sedekat ini tanpa harus mendaki berjam-jam ke puncak.
              </p>
              <div className="pt-2 border-l-2 border-ember-600 pl-4 italic text-sm text-basalt-700 font-serif">
                "Gardu pandang bambu Kali Talang adalah balkon terbaik di Jawa Tengah untuk menghormati dan mengagumi denyut nadi Merapi."
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-mist-200 group">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80"
                  alt="Puncak Merapi dari Kali Talang Balerante"
                  className="w-full aspect-[16/11] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-canopy-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-ember-400 block uppercase">Spot Tertinggi</span>
                    <span className="text-sm font-semibold font-serif">Gardu Pandang Utama Kali Talang</span>
                  </div>
                  <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-lg">1.180 MDPL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Babak 2: Harmoni Alam & Ketangguhan Warga Balerante (7 Col Visual : 5 Col Text Inverted) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-mist-200">
                  <img
                    src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80"
                    alt="Jembatan Bambu Balerante"
                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-mist-200 mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                    alt="Kopi Lereng Merapi"
                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-trail-green font-semibold">
                <span className="w-6 h-px bg-trail-green" />
                BABAK 02 • KETANGGUHAN MASYARAKAT
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-basalt-900 tracking-tight leading-tight">
                Harmoni Hidup Berdampingan Bersama Sang Gunung
              </h2>
              <p className="text-basalt-600 font-sans leading-relaxed text-base sm:text-lg">
                Balerante bukan sekadar desa di batas bahaya; ia adalah teladan ketangguhan mitigasi bencana berbasis komunitas. Warga lokal menyulap jalur aliran lahar menjadi ruang ekowisata mandiri yang menghidupkan UMKM kopi lereng, pemandu trekking, dan peternakan sapi perah.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-basalt-700 bg-white p-3.5 rounded-xl border border-mist-200">
                <Users className="w-5 h-5 text-ember-600 shrink-0" />
                <span>100% Retribusi Dikelola Pokdarwis Balerante untuk Pemeliharaan Jalur & Konservasi Hutan.</span>
              </div>
            </div>

          </div>

          {/* Babak 3: Jalur Petualangan & Hutan Pinus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-ember-600 font-semibold">
                <span className="w-6 h-px bg-ember-600" />
                BABAK 03 • NAFAS PETUALANGAN
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-basalt-900 tracking-tight leading-tight">
                Dari Trekking Santai Keluarga hingga Adrenalin Downhill
              </h2>
              <p className="text-basalt-600 font-sans leading-relaxed text-base sm:text-lg">
                Di bawah rindangnya kanopi pinus lereng Merapi, hirup oksigen terbersih di Jawa Tengah. Temukan pilihan rute yang dirancang presisi dengan elevasi terukur, titik pos istirahat beratap rumbia, dan pemandangan jurang lahar yang memesona.
              </p>
              <div>
                <Link
                  to="/trails"
                  className="inline-flex items-center gap-2 font-semibold text-ember-600 hover:text-ember-700 font-sans group"
                >
                  <span>Pilih Jalur Sesuai Tingkat Kemampuanmu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-mist-200">
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80"
                  alt="Jalur Hutan Pinus Kali Talang"
                  className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED EVENT SPOTLIGHT (DARK CANOPY THEME)          */}
      {/* ======================================================== */}
      {featuredEvent && (
        <section className="py-24 bg-canopy-950 text-white relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-ember-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="bg-canopy-900/90 rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Event Details (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-ember-600 text-white">
                      AGENDA UNGGULAN 2026
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                      {featuredEvent.status}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                      {featuredEvent.title}
                    </h2>
                    <p className="mt-2 text-base sm:text-lg text-mist-200/80 font-sans">
                      {featuredEvent.subtitle}
                    </p>
                  </div>

                  {/* Countdown Timer Widget (JetBrains Mono) */}
                  <div className="p-5 rounded-2xl bg-canopy-950/80 border border-white/10 max-w-xl">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-mist-200/60 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-ember-400" />
                      <span>HITUNG MUNDUR HARI PELAKSANAAN</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                      <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xl sm:text-3xl font-mono font-bold text-ember-400 block">
                          {countdown.days}
                        </span>
                        <span className="text-[10px] sm:text-xs font-sans text-mist-200/60">Hari</span>
                      </div>
                      <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xl sm:text-3xl font-mono font-bold text-white block">
                          {String(countdown.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] sm:text-xs font-sans text-mist-200/60">Jam</span>
                      </div>
                      <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xl sm:text-3xl font-mono font-bold text-white block">
                          {String(countdown.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] sm:text-xs font-sans text-mist-200/60">Menit</span>
                      </div>
                      <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xl sm:text-3xl font-mono font-bold text-ember-400 block">
                          {String(countdown.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] sm:text-xs font-sans text-mist-200/60">Detik</span>
                      </div>
                    </div>
                  </div>

                  {/* Benefit Checklist */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-mist-200/60 block">
                      Fasilitas & Keuntungan Peserta:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-mist-200/90 font-sans">
                      {featuredEvent.highlights.slice(0, 4).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Event CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => openRegistrationModal(featuredEvent)}
                      className="px-6 py-3.5 rounded-xl font-semibold text-white bg-ember-600 hover:bg-ember-500 shadow-elevated hover:shadow-glow-ember transition-all text-center flex items-center justify-center gap-2 group"
                    >
                      <span>Daftar Sekarang via Google Form</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      to={`/events/${featuredEvent.slug}`}
                      className="px-5 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-center"
                    >
                      Lihat Rundown & Detail
                    </Link>
                  </div>

                </div>

                {/* Event Poster Card (5 Cols) */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
                    <img
                      src={featuredEvent.bannerImage}
                      alt={featuredEvent.title}
                      className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canopy-950 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-5 left-5 right-5 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-ember-400">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredEvent.date} • {featuredEvent.timeRange}</span>
                      </div>
                      <p className="font-semibold text-white text-base">
                        {featuredEvent.priceLabel}
                      </p>
                      <p className="text-xs text-mist-200/70 font-mono">
                        {featuredEvent.quotaLabel}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. KOMOOT-STYLE TRAIL PREVIEW SECTION                    */}
      {/* ======================================================== */}
      <section className="py-24 bg-white text-basalt-900 border-b border-mist-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-ember-600 font-semibold mb-2">
                <Compass className="w-4 h-4" />
                KOMOOT-STYLE OUTDOOR TRACKS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-basalt-900 tracking-tight">
                Pilihan Rute & Profil Elevasi
              </h2>
              <p className="mt-2 text-basalt-600 font-sans max-w-xl text-base sm:text-lg">
                Data teknis jalur trekking dan downhill dengan ketinggian terukur, estimasi waktu tempuh, dan titik pandang kawah Merapi.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {['Semua', 'Fun Trail', 'Trekking', 'Downhill / MTB'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-canopy-950 text-white'
                      : 'bg-mist-100 text-basalt-600 hover:bg-mist-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Trail Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrails.slice(0, 3).map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>

          {/* View All Trails Link */}
          <div className="mt-12 text-center">
            <Link
              to="/trails"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mist-100 hover:bg-mist-200 text-basalt-900 font-semibold text-sm transition-colors border border-mist-200 group"
            >
              <span>Jelajahi Seluruh Katalog Rute & Unduh GPX</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-ember-600" />
            </Link>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. VISITOR PRACTICAL GUIDE & MAP                         */}
      {/* ======================================================== */}
      <section className="py-24 bg-mist-50 text-basalt-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-ember-600 font-semibold block mb-2">
              PANDUAN KUNJUNGAN LENGKAP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-basalt-900 tracking-tight">
              Rencanakan Perjalanan ke Balerante
            </h2>
            <p className="mt-3 text-basalt-600 font-sans text-base sm:text-lg">
              Semua informasi praktis yang Anda perlukan sebelum berkunjung ke Ekowisata Kali Talang.
            </p>
          </div>

          {/* Practical Grid (Asymmetric) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Box 1: Jam Buka & Waktu Terbaik */}
            <div className="p-6 rounded-2xl bg-white border border-mist-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-basalt-900 mb-2">
                  Jam Buka & Waktu Terbaik
                </h3>
                <p className="text-sm text-basalt-600 leading-relaxed font-sans">
                  Kawasan buka setiap hari pukul <strong>{parkStatus?.operatingHours || '07.00 - 17.00 WIB'}</strong>.
                </p>
                <div className="mt-4 p-3 bg-mist-50 rounded-xl border border-mist-200 text-xs text-basalt-700">
                  <span className="font-semibold text-ember-600 block mb-1">Tips Waktu Emas:</span>
                  Tiba antara pukul <strong>06.00 - 08.30 WIB</strong> untuk menyaksikan puncak Merapi bebas dari kabut tebal dan menikmati udara sejuk 18-20°C.
                </div>
              </div>
            </div>

            {/* Box 2: Rincian Tiket & Parkir */}
            <div className="p-6 rounded-2xl bg-white border border-mist-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-ember-50 text-ember-700 flex items-center justify-center mb-4">
                  <Ticket className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-basalt-900 mb-2">
                  Retribusi & Parkir Resmi
                </h3>
                <ul className="space-y-2.5 text-sm text-basalt-600 font-sans">
                  <li className="flex items-center justify-between py-1 border-b border-mist-100">
                    <span>Tiket Masuk Wisatawan</span>
                    <strong className="font-mono text-basalt-900">
                      Rp {(parkStatus?.ticketPriceWNI || 5000).toLocaleString('id-ID')}
                    </strong>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-mist-100">
                    <span>Parkir Sepeda Motor</span>
                    <strong className="font-mono text-basalt-900">
                      Rp {(parkStatus?.parkingMotor || 2000).toLocaleString('id-ID')}
                    </strong>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-mist-100">
                    <span>Parkir Mobil Pribadi</span>
                    <strong className="font-mono text-basalt-900">
                      Rp {(parkStatus?.parkingMobil || 5000).toLocaleString('id-ID')}
                    </strong>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] text-basalt-400 mt-4 italic">
                *Pembayaran tunai langsung di pos tiket gerbang swadaya Pokdarwis Balerante.
              </p>
            </div>

            {/* Box 3: Rute & Navigasi */}
            <div className="p-6 rounded-2xl bg-white border border-mist-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-canopy-100 text-canopy-900 flex items-center justify-center mb-4">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-basalt-900 mb-2">
                  Akses Menuju Balerante
                </h3>
                <p className="text-sm text-basalt-600 leading-relaxed font-sans">
                  Berjarak ±32 km dari Kota Klaten atau ±35 km dari Yogyakarta via Manisrenggo - Deles Indah. Jalan beraspal mulus dapat dilalui motor dan mobil keluarga.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-mist-200">
                <a
                  href="https://maps.google.com/?q=Ekowisata+Kali+Talang+Balerante+Klaten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-canopy-950 hover:bg-canopy-900 text-white text-xs font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-ember-400" />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
