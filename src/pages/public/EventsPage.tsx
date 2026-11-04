import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen pt-28 pb-24 bg-mist-50">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-canopy-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-canopy-800">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-ember-600/30 text-ember-400 border border-ember-600/40 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AGENDA & EVENT RESMI KALI TALANG</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Event Ekowisata & Fun Trekking
            </h1>
            <p className="mt-3 text-sm sm:text-base text-mist-200/80 font-sans leading-relaxed">
              Ikuti ajang jalan sehat lereng Merapi, sunrise coffee morning, dan kegiatan edukasi konservasi bersama warga Desa Balerante dan inisiatif Aksara Mahasiswa Berdampak.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['Semua', 'Registration Open', 'Coming Soon', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-canopy-950 text-white'
                  : 'bg-white text-basalt-600 hover:bg-mist-200 border border-mist-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-basalt-400 font-mono text-sm">
            Memuat daftar event...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-mist-200 max-w-lg mx-auto">
            <p className="font-serif text-lg text-basalt-900 font-semibold">Tidak ada event untuk filter ini</p>
            <p className="text-sm text-basalt-600 mt-1">Coba pilih filter status pendaftaran lainnya.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl border border-mist-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Event Image (5 Cols) */}
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-basalt-800">
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {evt.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-ember-600 text-white shadow-md">
                        FEATURED EVENT
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-canopy-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                      {evt.status}
                    </span>
                  </div>
                </div>

                {/* Event Information (7 Cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-basalt-500 mb-2">
                      <span className="flex items-center gap-1.5 text-ember-600 font-semibold">
                        <Calendar className="w-4 h-4" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {evt.timeRange}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-basalt-900 leading-tight">
                      <Link to={`/events/${evt.slug}`} className="hover:text-ember-600 transition-colors">
                        {evt.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm font-sans text-basalt-600 font-medium">
                      {evt.subtitle}
                    </p>

                    <p className="mt-4 text-sm text-basalt-600 font-sans leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    {/* Quick Highlights */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-basalt-700 font-sans">
                      {evt.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="mt-6 pt-5 border-t border-mist-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-basalt-400 block">Biaya Pendaftaran:</span>
                      <span className="text-lg font-serif font-bold text-ember-600">
                        {evt.priceLabel}
                      </span>
                      <span className="text-xs text-basalt-500 font-mono block">
                        {evt.quotaLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openRegistrationModal(evt)}
                        className="px-5 py-2.5 rounded-xl bg-ember-600 hover:bg-ember-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md"
                      >
                        Daftar via Modal
                      </button>
                      <Link
                        to={`/events/${evt.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-mist-100 hover:bg-mist-200 text-basalt-800 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
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
