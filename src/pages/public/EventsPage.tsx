import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle2, Tag } from 'lucide-react';
import { getEvents } from '../../services/dataService';
import { EcoEvent } from '../../types';
import { useApp } from '../../context/AppContext';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EcoEvent[]>([]);
  const [filter, setFilter] = useState<string>('Semua');
  const [loading, setLoading] = useState(true);
  const { openRegistrationModal } = useApp();

  useEffect(() => {
    const fetchEvents = () => {
      getEvents().then((data) => {
        setEvents(data);
        setLoading(false);
      });
    };
    fetchEvents();

    const handleUpdate = () => fetchEvents();
    window.addEventListener('kalitalang_data_updated', handleUpdate);
    return () => window.removeEventListener('kalitalang_data_updated', handleUpdate);
  }, []);

  const filteredEvents = filter === 'Semua'
    ? events
    : events.filter((e) => e.status === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-komoot-bg font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-komoot-green mb-2">
              <Calendar className="w-4 h-4" />
              <span>AGENDA & EVENT RESMI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Event Ekowisata & Fun Trekking
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Ikuti ajang jalan santai lereng Merapi, sunrise coffee morning, dan kegiatan edukasi konservasi bersama warga Desa Balerante.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['Semua', 'Registration Open', 'Coming Soon', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-komoot-green text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status === 'Registration Open' ? 'Pendaftaran Dibuka' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-mono text-sm">
            Memuat daftar event...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto">
            <p className="font-bold text-lg text-gray-900">Tidak ada event untuk filter ini</p>
            <p className="text-sm text-gray-600 mt-1">Coba pilih filter status pendaftaran lainnya.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-komoot-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Event Image (5 Cols) */}
                <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full bg-gray-900">
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {evt.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-komoot-green text-white shadow-sm">
                        FEATURED
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200">
                      {evt.status}
                    </span>
                  </div>
                </div>

                {/* Event Information (7 Cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mb-2">
                      <span className="flex items-center gap-1.5 text-komoot-green">
                        <Calendar className="w-4 h-4" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {evt.timeRange}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                      <Link to={`/events/${evt.slug}`} className="hover:text-komoot-green transition-colors">
                        {evt.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 font-medium">
                      {evt.subtitle}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    {/* Quick Highlights */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                      {evt.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-komoot-green shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-gray-400 block tracking-wider">Tarif Pendaftaran</span>
                      <span className="text-lg font-bold text-komoot-green font-mono">
                        {evt.priceLabel}
                      </span>
                      <span className="text-xs text-gray-500 font-mono block">
                        {evt.quotaLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openRegistrationModal(evt)}
                        className="px-5 py-2.5 rounded-xl bg-komoot-green hover:bg-komoot-green-hover text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
                      >
                        Daftar via Google Form
                      </button>
                      <Link
                        to={`/events/${evt.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                      >
                        <span>Lihat Rundown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
