import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass,
  TrendingUp,
  Clock,
  Mountain,
  ShieldCheck,
  ChevronLeft,
  MapPin,
  CheckCircle2,
  Share2,
  Phone,
  Layers,
  ArrowRight
} from 'lucide-react';
import { getTrailBySlug } from '../../services/dataService';
import { TrailRoute } from '../../types';
import { ElevationProfile } from '../../components/trails/ElevationProfile';
import { useApp } from '../../context/AppContext';

export const TrailDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [trail, setTrail] = useState<TrailRoute | null>(null);
  const [activeWaypointIndex, setActiveWaypointIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { parkStatus } = useApp();

  useEffect(() => {
    if (slug) {
      const fetchTrail = () => {
        getTrailBySlug(slug).then((data) => {
          setTrail(data);
          setLoading(false);
        });
      };
      fetchTrail();

      const handleUpdate = () => fetchTrail();
      window.addEventListener('kalitalang_data_updated', handleUpdate);
      return () => window.removeEventListener('kalitalang_data_updated', handleUpdate);
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trail?.title,
        text: `Lihat rute trekking ${trail?.title} di Ekowisata Kali Talang Balerante:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center font-mono text-sm text-basalt-500">
        Memuat detail rute...
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <h2 className="font-serif text-2xl font-bold text-basalt-900 mb-2">Rute Tidak Ditemukan</h2>
        <p className="text-sm text-basalt-600 mb-6">Jalur yang Anda cari mungkin telah dipindahkan atau dinonaktifkan.</p>
        <Link
          to="/trails"
          className="px-5 py-2.5 rounded-xl bg-canopy-950 text-white text-sm font-semibold hover:bg-canopy-900 transition-colors"
        >
          Kembali ke Daftar Rute
        </Link>
      </div>
    );
  }

  const activeWaypoint = trail.waypoints[activeWaypointIndex] || trail.waypoints[0];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-mist-50">
      
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/trails"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-basalt-600 hover:text-ember-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Semua Rute</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-mist-200 text-xs font-mono text-basalt-700 hover:bg-mist-100 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-ember-600" />
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Bagikan Rute'}</span>
          </button>
        </div>
      </div>

      {/* Main Detail Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-3xl border border-mist-200 overflow-hidden shadow-sm">
          
          {/* Cover Hero with Badges */}
          <div className="relative aspect-[21/9] min-h-[280px] sm:min-h-[380px] bg-basalt-900 overflow-hidden">
            <img
              src={trail.coverImage}
              alt={trail.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canopy-950/90 via-canopy-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-canopy-950/80 backdrop-blur-md text-white border border-white/20">
                  {trail.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/80 text-emerald-300 border border-emerald-500/30">
                  {trail.difficulty}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {trail.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-mist-100/90 font-sans max-w-3xl line-clamp-2">
                {trail.summary}
              </p>
            </div>
          </div>

          {/* Tactical Telemetry Header (Komoot Style 4-Column Bar) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-mist-200 bg-white border-t border-mist-200 p-4 sm:p-6 text-center">
            
            <div className="p-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-basalt-400 block mb-1">
                Panjang Rute
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-basalt-900 flex items-center justify-center gap-1.5">
                <Compass className="w-5 h-5 text-ember-600" />
                {trail.distanceKm} KM
              </span>
            </div>

            <div className="p-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-basalt-400 block mb-1">
                Kenaikan Elevasi
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-basalt-900 flex items-center justify-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                +{trail.elevationGainM} M
              </span>
            </div>

            <div className="p-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-basalt-400 block mb-1">
                Titik Tertinggi
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-basalt-900 flex items-center justify-center gap-1.5">
                <Mountain className="w-5 h-5 text-canopy-700" />
                {trail.maxAltitudeMdpl} MDPL
              </span>
            </div>

            <div className="p-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-basalt-400 block mb-1">
                Estimasi Durasi
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-basalt-900 flex items-center justify-center gap-1.5">
                <Clock className="w-5 h-5 text-basalt-600" />
                {trail.durationEstimate}
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Content Layout: Left Waypoints & Elevation | Right Safety & Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Elevation Profile Section */}
            <div className="bg-white p-6 rounded-3xl border border-mist-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-basalt-900">
                    Profil Kontur Elevasi Jalur
                  </h3>
                  <p className="text-xs text-basalt-500 font-sans mt-0.5">
                    Grafik kemiringan elevasi dari titik start hingga finish
                  </p>
                </div>
                <span className="text-xs font-mono bg-mist-100 text-basalt-700 px-3 py-1 rounded-full border border-mist-200">
                  Total +{trail.elevationGainM}m
                </span>
              </div>

              <div className="bg-mist-50/70 p-4 rounded-2xl border border-mist-200/80">
                <ElevationProfile
                  points={trail.elevationProfilePoints}
                  height={120}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-[11px] font-mono text-basalt-400 mt-2 px-1">
                  <span>Start (0.0 km)</span>
                  <span>Puncak Tanjakan (+{trail.elevationGainM}m)</span>
                  <span>Finish ({trail.distanceKm} km)</span>
                </div>
              </div>
            </div>

            {/* Interactive Waypoints Stepper */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-ember-600 font-semibold mb-1">
                    INTERACTIVE WAYPOINTS
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-basalt-900">
                    Titik Singgah & Pos Pantau
                  </h3>
                </div>
                <span className="text-xs font-mono text-basalt-500">
                  {trail.waypoints.length} Waypoints
                </span>
              </div>

              {/* Waypoints Tab Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
                {trail.waypoints.map((wp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWaypointIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium shrink-0 flex items-center gap-2 transition-all ${
                      activeWaypointIndex === idx
                        ? 'bg-canopy-950 text-white shadow-sm'
                        : 'bg-mist-100 text-basalt-600 hover:bg-mist-200'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-ember-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{wp.name.split(' ')[0]} {wp.distanceFromStartKm}km</span>
                  </button>
                ))}
              </div>

              {/* Active Waypoint Card Display */}
              {activeWaypoint && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-mist-50 p-5 rounded-2xl border border-mist-200">
                  <div className="md:col-span-5 rounded-xl overflow-hidden aspect-[4/3] bg-basalt-800">
                    <img
                      src={activeWaypoint.imageUrl}
                      alt={activeWaypoint.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-ember-600 font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Waypoint {activeWaypointIndex + 1} • KM {activeWaypoint.distanceFromStartKm.toFixed(1)}</span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-basalt-900">
                        {activeWaypoint.name}
                      </h4>
                      <p className="mt-2 text-sm text-basalt-600 font-sans leading-relaxed">
                        {activeWaypoint.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-mist-200 flex items-center justify-between text-xs text-basalt-500 font-mono">
                      <span>Jarak dari titik awal: {activeWaypoint.distanceFromStartKm} km</span>
                      <button
                        onClick={() => setActiveWaypointIndex((prev) => (prev + 1) % trail.waypoints.length)}
                        className="inline-flex items-center gap-1 text-ember-600 font-semibold hover:underline"
                      >
                        <span>Pos Berikutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Images for this Trail */}
            {trail.galleryImages && trail.galleryImages.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-mist-200 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-basalt-900 mb-4">
                  Dokumentasi Jalur
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {trail.galleryImages.map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden bg-basalt-800">
                      <img
                        src={img}
                        alt={`${trail.title} ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Column: Safety & Local Pokdarwis Guide (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Safety Checklist Card */}
            <div className="bg-white p-6 rounded-3xl border border-mist-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-basalt-900">
                  Panduan Keamanan
                </h3>
              </div>
              <ul className="space-y-3">
                {trail.safetyNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-basalt-600 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Guide Assistance */}
            <div className="bg-canopy-950 text-white p-6 rounded-3xl border border-canopy-800 shadow-md">
              <span className="text-[10px] font-mono tracking-widest text-ember-400 uppercase block mb-1">
                PEMANDU LOKAL BALERANTE
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Butuh Pemandu Jalur?
              </h3>
              <p className="text-xs sm:text-sm text-mist-200/80 font-sans leading-relaxed mb-5">
                Pengunjung rombongan atau pemula dapat didampingi pemandu resmi Pokdarwis Balerante yang memahami karakteristik lereng dan mitigasi Merapi.
              </p>
              <a
                href={`https://wa.me/${parkStatus?.whatsappContact || '6285743219080'}?text=${encodeURIComponent(
                  `Halo Pokdarwis Kali Talang, saya tertarik untuk trekking di "${trail.title}" dan ingin menanyakan jasa pemandu lokal.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-xs sm:text-sm text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi Pokdarwis via WA</span>
              </a>
            </div>

            {/* Back to Trails link */}
            <div className="p-4 bg-mist-100 rounded-2xl border border-mist-200 text-center">
              <Link
                to="/trails"
                className="text-xs font-semibold text-basalt-700 hover:text-ember-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <Layers className="w-4 h-4" />
                <span>Bandingkan dengan Rute Lainnya</span>
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
