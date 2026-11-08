import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Search, Filter, Footprints, Bike, Flame, CheckCircle } from 'lucide-react';
import { getTrails } from '../../services/dataService';
import { TrailRoute } from '../../types';
import { TrailCard } from '../../components/trails/TrailCard';

export const TrailsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [trails, setTrails] = useState<TrailRoute[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
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

  const sports = [
    { label: 'Semua Rute', id: 'Semua', icon: Compass },
    { label: 'Hiking & Family', id: 'Fun Trail', icon: Footprints },
    { label: 'Sepeda & MTB', id: 'Downhill / MTB', icon: Bike },
    { label: 'Jurang Lahar', id: 'Trekking', icon: Flame },
  ];

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
    <div className="min-h-screen pt-24 pb-20 bg-komoot-bg font-sans">
      
      {/* Catalog Header Bar */}
      <div className="bg-white border-b border-gray-200 py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-komoot-green mb-2">
              <Compass className="w-4 h-4" />
              <span>KATALOG JALUR RESMI BALERANTE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Eksplorasi Jalur Trekking & Sepeda
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Temukan rute terbaik dengan ketinggian terukur, estimasi waktu, profil tanjakan, dan titik pandang kawah Merapi.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar (Komoot Filter Bar Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari rute, pos pantau, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-komoot-green/20 focus:border-komoot-green transition-all text-gray-900"
            />
          </div>

          {/* Activity Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {sports.map((sport) => {
              const Icon = sport.icon;
              const isSelected = selectedCategory === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedCategory(sport.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-komoot-green text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sport.label}</span>
                </button>
              );
            })}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-gray-500">Tingkat:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs font-semibold py-2 px-3 bg-gray-100 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:border-komoot-green"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Results Count Meta */}
        <div className="flex items-center justify-between mt-4 px-1 text-xs text-gray-500">
          <span>Menampilkan <strong>{filteredTrails.length}</strong> rute terverifikasi</span>
          {(searchQuery || selectedCategory !== 'Semua' || selectedDifficulty !== 'Semua') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedDifficulty('Semua');
              }}
              className="font-bold text-komoot-green hover:underline"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      </div>

      {/* Trail Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-mono text-sm">
            Memuat data rute...
          </div>
        ) : filteredTrails.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto">
            <p className="font-bold text-lg text-gray-900">Tidak ada rute yang cocok</p>
            <p className="text-sm text-gray-600 mt-1">Coba ubah kata kunci pencarian atau reset filter kategori.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedDifficulty('Semua');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-komoot-green text-white text-xs font-bold shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
