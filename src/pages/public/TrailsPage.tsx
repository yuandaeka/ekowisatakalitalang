import React, { useState, useEffect } from 'react';
import { Compass, Search, Filter, Mountain } from 'lucide-react';
import { getTrails } from '../../services/dataService';
import { TrailRoute } from '../../types';
import { TrailCard } from '../../components/trails/TrailCard';

export const TrailsPage: React.FC = () => {
  const [trails, setTrails] = useState<TrailRoute[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrails = () => {
      getTrails().then((data) => {
        setTrails(data);
        setLoading(false);
      });
    };
    fetchTrails();

    const handleUpdate = () => fetchTrails();
    window.addEventListener('kalitalang_data_updated', handleUpdate);
    return () => window.removeEventListener('kalitalang_data_updated', handleUpdate);
  }, []);

  const categories = ['Semua', 'Fun Trail', 'Trekking', 'Downhill / MTB'];
  const difficulties = ['Semua', 'Mudah (Family)', 'Menengah', 'Menantang'];

  const filteredTrails = trails.filter((trail) => {
    const matchesSearch =
      trail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trail.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || trail.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'Semua' || trail.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 bg-mist-50">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-canopy-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-canopy-800">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>KATALOG JALUR RESMI BALERANTE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Eksplorasi Rute Trekking Komoot-Style
            </h1>
            <p className="mt-3 text-sm sm:text-base text-mist-200/80 font-sans leading-relaxed">
              Jelajahi keindahan lereng Gunung Merapi melalui jalur ramah keluarga, jalur jurang lahar andesit, hingga trek downhill legendaris dengan profil elevasi presisi.
            </p>
          </div>

          <Mountain className="absolute -right-10 -bottom-10 w-72 h-72 text-canopy-900/40 pointer-events-none" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-mist-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-basalt-400" />
            <input
              type="text"
              placeholder="Cari rute, pos, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:ring-2 focus:ring-ember-500/20 focus:border-ember-600 transition-all text-basalt-900"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-basalt-600">
              <Filter className="w-3.5 h-3.5 text-ember-600" />
              <span>Kategori:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-sans py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-basalt-900 focus:outline-none focus:border-ember-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs font-mono text-basalt-600 ml-1">
              <span>Kesulitan:</span>
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs font-sans py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-basalt-900 focus:outline-none focus:border-ember-600"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Trail Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-basalt-400 font-mono text-sm">
            Memuat data rute...
          </div>
        ) : filteredTrails.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-mist-200 max-w-lg mx-auto">
            <p className="font-serif text-lg text-basalt-900 font-semibold">Tidak ada rute yang cocok</p>
            <p className="text-sm text-basalt-600 mt-1">Coba ubah kata kunci pencarian atau reset filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedDifficulty('Semua');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-mist-100 hover:bg-mist-200 text-xs font-semibold text-basalt-900 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
