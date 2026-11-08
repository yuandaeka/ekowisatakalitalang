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
  Tag,
  CheckCircle
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
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center font-mono text-sm text-gray-500">
        Memuat detail event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 font-sans">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Tidak Ditemukan</h2>
        <p className="text-sm text-gray-600 mb-6">Agenda yang Anda cari mungkin telah berakhir atau dinonaktifkan.</p>
        <Link
          to="/events"
          className="px-5 py-2.5 rounded-xl bg-komoot-green text-white text-sm font-bold hover:bg-komoot-green-hover transition-colors shadow-sm"
        >
          Kembali ke Daftar Event
        </Link>
      </div>
    );
  }

  const embedUrl = formatGoogleFormUrl(event.googleFormUrl);
  const directUrl = event.googleFormUrl.replace('?embedded=true', '').replace('&embedded=true', '');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-komoot-bg font-sans">
      
      {/* Breadcrumb & Navigation */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-komoot-green transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Agenda</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-komoot-green" />
              <span>{copied ? 'Tersalin!' : 'Bagikan Event'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-komoot-green text-white">
              {event.status}
            </span>
            {event.isFeatured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200">
                AGENDA UNGGULAN 2026
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {event.title}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600 font-medium max-w-3xl">
            {event.subtitle}
          </p>

          {/* Quick Meta Bar */}
          <div className="mt-6 bg-gray-50 rounded-2xl border border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div className="p-2 sm:px-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-komoot-green shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Tanggal Pelaksanaan</span>
                <span className="text-sm font-bold text-gray-900">{event.date}</span>
              </div>
            </div>

            <div className="p-2 sm:px-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Waktu Kegiatan</span>
                <span className="text-sm font-bold text-gray-900">{event.timeRange}</span>
              </div>
            </div>

            <div className="p-2 sm:px-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Titik Kumpul</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 truncate block max-w-xs">
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
            
            {/* Event Banner */}
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-gray-900 shadow-sm border border-gray-200">
              <img
                src={event.bannerImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-gray-900">
                Tentang Kegiatan
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Highlights & Benefits */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-komoot-green" />
                <h3 className="text-xl font-bold text-gray-900">
                  Fasilitas & Keuntungan Peserta
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {event.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-komoot-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-800 font-semibold">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rundown Timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-gray-900">
                Susunan Acara (Rundown)
              </h3>
              
              <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 py-2">
                {event.rundown.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-komoot-green shadow-sm" />
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-gray-100 text-[11px] font-mono font-bold text-gray-700 mb-1">
                      {item.time}
                    </span>
                    <p className="text-sm font-semibold text-gray-800">
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
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                  TIKET PENDAFTARAN
                </span>
                <span className="text-xs font-mono font-semibold bg-gray-100 px-2.5 py-1 rounded-full text-gray-700">
                  {event.quotaLabel}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-komoot-green font-mono">
                {event.priceLabel}
              </div>
              <p className="text-xs text-gray-500">
                Termasuk tiket kawasan ekowisata, race pack jersey/bib, konsumsi lokal, dan asuransi.
              </p>

              <button
                onClick={() => openRegistrationModal(event)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-komoot-green hover:bg-komoot-green-hover transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Buka Formulir Pendaftaran Penuh</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-gray-700 hover:bg-gray-100 bg-gray-50 border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Buka Google Form di Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Form Section on Page */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h4 className="font-bold text-base text-gray-900">
                  Formulir Langsung (GForm)
                </h4>
                <span className="text-[11px] font-mono text-komoot-green bg-komoot-green/10 px-2 py-0.5 rounded font-bold">
                  Live Iframe
                </span>
              </div>

              <div className="relative min-h-[480px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 text-gray-500">
                    <Loader2 className="w-7 h-7 text-komoot-green animate-spin mb-2" />
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
                <p className="text-[11px] text-gray-500">
                  Kendala saat mengisi form di atas?{' '}
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-komoot-green underline font-bold"
                  >
                    Buka form langsung di Google
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
