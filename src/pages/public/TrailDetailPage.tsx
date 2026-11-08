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
  ArrowRight,
  CheckCircle,
  ExternalLink
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
        text: `Lihat rute ${trail?.title} di Ekowisata Kali Talang Balerante:`,
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
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center font-mono text-sm text-gray-500">
        Memuat detail rute...
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 font-sans">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rute Tidak Ditemukan</h2>
        <p className="text-sm text-gray-600 mb-6">Jalur yang Anda cari mungkin telah dipindahkan atau dinonaktifkan.</p>
        <Link
          to="/trails"
          className="px-5 py-2.5 rounded-xl bg-komoot-green text-white text-sm font-bold hover:bg-komoot-green-hover transition-colors shadow-sm"
        >
          Kembali ke Daftar Rute
        </Link>
      </div>
    );
  }

  const activeWaypoint = trail.waypoints[activeWaypointIndex] || trail.waypoints[0];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-komoot-bg font-sans">
      
      {/* Top Header & Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/trails"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-komoot-green transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Semua Rute</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-komoot-green" />
              <span>{copied ? 'Tersalin!' : 'Bagikan Rute'}</span>
            </button>
          </div>

          {/* Title & Metadata Strip */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-komoot-green/10 text-komoot-green">
                  {trail.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                  {trail.difficulty}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-mono text-gray-500">Max {trail.maxAltitudeMdpl} mdpl</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {trail.title}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <div className="w-5 h-5 rounded-full bg-komoot-green/20 text-komoot-green flex items-center justify-center font-bold text-[10px]">
                  KT
                </div>
                <span className="font-semibold text-gray-800">Dikelola oleh Pokdarwis Desa Balerante</span>
                <CheckCircle className="w-4 h-4 text-komoot-green fill-komoot-green/20" />
              </div>
            </div>
          </div>

          {/* THE SIGNATURE KOMOOT METRICS TELEMETRY BAR */}
          <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-4 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-left">
            
            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Jarak Rute</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 font-mono mt-0.5 block flex items-center gap-1.5">
                <Compass className="w-5 h-5 text-komoot-green" />
                {trail.distanceKm} km
              </span>
            </div>

            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Waktu Tempuh</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 font-mono mt-0.5 block flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-gray-400" />
                {trail.durationEstimate}
              </span>
            </div>

            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Kenaikan Elevasi</span>
              <span className="text-xl sm:text-2xl font-bold text-komoot-green font-mono mt-0.5 block flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5" />
                +{trail.elevationGainM} m
              </span>
            </div>

            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Titik Tertinggi</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 font-mono mt-0.5 block flex items-center gap-1.5">
                <Mountain className="w-5 h-5 text-gray-600" />
                {trail.maxAltitudeMdpl} mdpl
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tour Hero Photo */}
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-gray-900 shadow-sm border border-gray-200">
              <img
                src={trail.coverImage}
                alt={trail.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tour Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-gray-900">Deskripsi Rute</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {trail.summary}
              </p>
            </div>

            {/* Signature Komoot Elevation Profile Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Profil Kontur Ketinggian Jalur
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Grafik elevasi tanjakan dan turunan dari titik start hingga pos finish.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-komoot-green/10 text-komoot-green px-3 py-1 rounded-full">
                  +{trail.elevationGainM}m
                </span>
              </div>

              <div className="bg-komoot-bg p-5 rounded-2xl border border-gray-100">
                <ElevationProfile
                  points={trail.elevationProfilePoints}
                  height={120}
                  strokeColor="#72A422"
                  className="w-full"
                />
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mt-3 px-1 border-t border-gray-200/60 pt-2">
                  <span>Start (0.0 km)</span>
                  <span>Tanjakan Maksimal (+{trail.elevationGainM}m)</span>
                  <span>Finish ({trail.distanceKm} km)</span>
                </div>
              </div>
            </div>

            {/* Highlights On Route / Waypoints (Komoot Stepper Style) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-komoot-green block mb-1">
                    HIGHLIGHTS DI SEPANJANG JALUR
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Pos Pantau & Titik Singgah
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-gray-500">
                  {trail.waypoints.length} Titik
                </span>
              </div>

              {/* Waypoint Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {trail.waypoints.map((wp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWaypointIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 transition-all ${
                      activeWaypointIndex === idx
                        ? 'bg-komoot-green text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white/30 text-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{wp.name}</span>
                  </button>
                ))}
              </div>

              {/* Active Waypoint Card */}
              {activeWaypoint && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <div className="md:col-span-5 rounded-xl overflow-hidden aspect-[4/3] bg-gray-900">
                    <img
                      src={activeWaypoint.imageUrl}
                      alt={activeWaypoint.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-komoot-green mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Pos {activeWaypointIndex + 1} • KM {activeWaypoint.distanceFromStartKm.toFixed(1)}</span>
                      </span>
                      <h4 className="text-xl font-bold text-gray-900">
                        {activeWaypoint.name}
                      </h4>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {activeWaypoint.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-mono">
                      <span>Jarak dari gerbang: {activeWaypoint.distanceFromStartKm} km</span>
                      <button
                        onClick={() => setActiveWaypointIndex((prev) => (prev + 1) % trail.waypoints.length)}
                        className="inline-flex items-center gap-1 text-komoot-green font-bold hover:underline"
                      >
                        <span>Pos Berikutnya</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tour Gallery */}
            {trail.galleryImages && trail.galleryImages.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Dokumentasi Jalur</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {trail.galleryImages.map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden bg-gray-900">
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

          {/* Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Safety & Gear Checklist */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-komoot-green/10 text-komoot-green flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Perlengkapan & Keamanan</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-600">
                {trail.safetyNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-komoot-green shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Guide Pokdarwis Assistance */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-komoot-green block">
                PEMANDU RESMI BALERANTE
              </span>
              <h3 className="font-bold text-lg text-gray-900">Butuh Pemandu Jalur?</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Rombongan atau pemula dapat didampingi pemandu resmi Pokdarwis Balerante yang memahami jalur evakuasi dan karakteristik lereng Merapi.
              </p>
              <a
                href={`https://wa.me/${parkStatus?.whatsappContact || '6285743219080'}?text=${encodeURIComponent(
                  `Halo Pokdarwis Kali Talang, saya ingin bertanya jasa pemandu untuk "${trail.title}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-komoot-green hover:bg-komoot-green-hover font-bold text-xs sm:text-sm text-white transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Chat Pokdarwis via WhatsApp</span>
              </a>
            </div>

            {/* Compare with other trails */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 text-center">
              <Link
                to="/trails"
                className="text-xs font-bold text-gray-700 hover:text-komoot-green transition-colors flex items-center justify-center gap-1.5"
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
