import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, MapPin, Tag, Loader2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatGoogleFormUrl } from '../../services/dataService';

export const RegistrationModal: React.FC = () => {
  const { activeRegistrationEvent, closeRegistrationModal } = useApp();
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (activeRegistrationEvent) {
      setIframeLoading(true);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeRegistrationModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [activeRegistrationEvent, closeRegistrationModal]);

  if (!activeRegistrationEvent) return null;

  const embedUrl = formatGoogleFormUrl(activeRegistrationEvent.googleFormUrl);
  const directUrl = activeRegistrationEvent.googleFormUrl.replace('?embedded=true', '').replace('&embedded=true', '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      {/* Backdrop click */}
      <div 
        className="absolute inset-0"
        onClick={closeRegistrationModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10">
        
        {/* Modal Header */}
        <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-start justify-between">
          <div className="pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-komoot-green/10 text-komoot-green mb-2">
              <Tag className="w-3 h-3" /> FORMULIR PENDAFTARAN RESMI
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {activeRegistrationEvent.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1 text-gray-700 font-medium">
                <Calendar className="w-3.5 h-3.5 text-komoot-green" />
                {activeRegistrationEvent.date} ({activeRegistrationEvent.timeRange})
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Kali Talang, Balerante
              </span>
              <span className="font-bold text-komoot-green font-mono">
                {activeRegistrationEvent.priceLabel}
              </span>
            </div>
          </div>

          <button
            onClick={closeRegistrationModal}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fallback Notice Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-2.5 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-komoot-green shrink-0" />
            <span>Formulir di bawah terhubung langsung ke Google Form panitia.</span>
          </div>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-komoot-green hover:underline shrink-0 ml-2"
          >
            <span>Buka di Tab Baru</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Iframe Body with Loading State */}
        <div className="relative flex-1 overflow-y-auto min-h-[460px] max-h-[65vh] bg-gray-50">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/90 z-10 text-gray-500">
              <Loader2 className="w-8 h-8 text-komoot-green animate-spin mb-3" />
              <p className="text-sm font-semibold">Memuat formulir pendaftaran...</p>
              <p className="text-xs text-gray-400 mt-1">Pastikan koneksi internet stabil</p>
            </div>
          )}

          <iframe
            src={embedUrl}
            title={`Formulir Pendaftaran ${activeRegistrationEvent.title}`}
            className="w-full h-full min-h-[500px] border-0"
            onLoad={() => setIframeLoading(false)}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>Panitia Pelaksana: Pokdarwis Ekowisata Kali Talang Desa Balerante</span>
          <button
            onClick={closeRegistrationModal}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-100 text-gray-800 font-bold hover:bg-gray-200 transition-colors"
          >
            Selesai / Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
