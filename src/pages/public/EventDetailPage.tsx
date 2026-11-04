import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Share2,
  Tag
} from 'lucide-react';
import { getEventBySlug, formatGoogleFormUrl } from '../../services/dataService';
import { EcoEvent } from '../../types';
import { useApp } from '../../context/AppContext';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EcoEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { openRegistrationModal } = useApp();

  useEffect(() => {
    if (slug) {
      const fetchEvent = () => {
        getEventBySlug(slug).then((data) => {
          setEvent(data);
          setLoading(false);
        });
      };
      fetchEvent();

      const handleUpdate = () => fetchEvent();
      window.addEventListener('kalitalang_data_updated', handleUpdate);
      return () => window.removeEventListener('kalitalang_data_updated', handleUpdate);
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Ikuti event ${event?.title} di Ekowisata Kali Talang Balerante:`,
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
        Memuat detail event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <h2 className="font-serif text-2xl font-bold text-basalt-900 mb-2">Event Tidak Ditemukan</h2>
        <p className="text-sm text-basalt-600 mb-6">Agenda yang Anda cari mungkin telah berakhir atau dinonaktifkan.</p>
        <Link
          to="/events"
          className="px-5 py-2.5 rounded-xl bg-canopy-950 text-white text-sm font-semibold hover:bg-canopy-900 transition-colors"
        >
          Kembali ke Daftar Event
        </Link>
      </div>
    );
  }

  const embedUrl = formatGoogleFormUrl(event.googleFormUrl);
  const directUrl = event.googleFormUrl.replace('?embedded=true', '').replace('&embedded=true', '');

  return (
    <div className="min-h-screen pt-24 pb-24 bg-mist-50">
      
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-basalt-600 hover:text-ember-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Agenda</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-mist-200 text-xs font-mono text-basalt-700 hover:bg-mist-100 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-ember-600" />
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Bagikan Event'}</span>
          </button>
        </div>
      </div>

      {/* Hero Section of the Event */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-3xl border border-mist-200 overflow-hidden shadow-sm">
          
          <div className="relative aspect-[21/9] min-h-[300px] sm:min-h-[400px] bg-basalt-900">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canopy-950 via-canopy-950/50 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-ember-600 text-white">
                  {event.status}
                </span>
                {event.isFeatured && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/20 backdrop-blur-md text-white border border-white/20">
                    FEATURED AGENDA 2026
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {event.title}
              </h1>
              <p className="mt-2 text-sm sm:text-lg text-mist-100/90 font-sans max-w-3xl">
                {event.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Meta Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-mist-200 bg-white border-t border-mist-200 p-4 sm:p-5">
            <div className="p-2 sm:px-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-ember-600 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-basalt-400 block uppercase">Tanggal Pelaksanaan</span>
                <span className="text-sm font-semibold text-basalt-900">{event.date}</span>
              </div>
            </div>

            <div className="p-2 sm:px-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-basalt-400 block uppercase">Waktu Kegiatan</span>
                <span className="text-sm font-semibold text-basalt-900">{event.timeRange}</span>
              </div>
            </div>

            <div className="p-2 sm:px-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-canopy-800 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-basalt-400 block uppercase">Titik Kumpul</span>
                <span className="text-xs sm:text-sm font-semibold text-basalt-900 truncate block max-w-xs">
                  {event.locationPoint}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Left Details & Rundown | Right Registration & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Description Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-basalt-900">
                Tentang Kegiatan
              </h2>
              <p className="text-basalt-600 font-sans leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Highlights & Benefits */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-ember-600" />
                <h3 className="font-serif text-xl font-bold text-basalt-900">
                  Fasilitas & Keuntungan Peserta
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {event.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-mist-50 border border-mist-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-basalt-800 font-sans font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rundown Timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-bold text-basalt-900">
                Susunan Acara (Rundown)
              </h3>
              
              <div className="relative border-l-2 border-mist-200 ml-3 space-y-6 py-2">
                {event.rundown.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Bullet marker */}
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-ember-600 shadow-sm" />
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-mist-100 text-[11px] font-mono font-bold text-basalt-700 mb-1">
                      {item.time}
                    </span>
                    <p className="text-sm font-sans font-medium text-basalt-800">
                      {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Registration & Embed Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Pricing Card */}
            <div className="bg-canopy-950 text-white p-6 sm:p-7 rounded-3xl border border-canopy-800 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-ember-400">
                  TIKET PENDAFTARAN
                </span>
                <span className="text-xs font-mono bg-canopy-800 px-2.5 py-1 rounded-full text-mist-200">
                  {event.quotaLabel}
                </span>
              </div>

              <div className="text-3xl font-serif font-bold text-white mb-1">
                {event.priceLabel}
              </div>
              <p className="text-xs text-mist-200/70 font-sans mb-6">
                Termasuk tiket masuk kawasan ekowisata, race pack, asuransi dan konsumsi.
              </p>

              <button
                onClick={() => openRegistrationModal(event)}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-ember-600 hover:bg-ember-500 shadow-elevated transition-all flex items-center justify-center gap-2 mb-3"
              >
                <span>Buka Formulir Pendaftaran Penuh</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-mist-200 hover:text-white bg-white/10 hover:bg-white/15 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Buka Google Form di Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Form Section on Page */}
            <div className="bg-white p-6 rounded-3xl border border-mist-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-mist-200 mb-4">
                <h4 className="font-serif text-lg font-bold text-basalt-900">
                  Formulir Langsung (GForm)
                </h4>
                <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Live Iframe
                </span>
              </div>

              <div className="relative min-h-[480px] bg-mist-50 rounded-2xl overflow-hidden border border-mist-200">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-mist-50 z-10 text-basalt-500">
                    <Loader2 className="w-7 h-7 text-ember-600 animate-spin mb-2" />
                    <span className="text-xs font-mono">Memuat Google Form...</span>
                  </div>
                )}
                <iframe
                  src={embedUrl}
                  title={`Formulir ${event.title}`}
                  className="w-full h-full min-h-[500px] border-0"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>

              <div className="mt-3 text-center">
                <p className="text-[11px] text-basalt-500 font-sans">
                  Ada kendala saat mengisi di atas?{' '}
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ember-600 underline font-semibold hover:text-ember-700"
                  >
                    Klik untuk membuka form langsung di Google
                  </a>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
