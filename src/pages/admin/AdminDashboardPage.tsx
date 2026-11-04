import React, { useState, useEffect } from 'react';
import {
  Save,
  Calendar,
  Compass,
  Image as ImageIcon,
  Activity,
  Video,
  Ticket,
  ShieldAlert,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { getParkStatus, updateParkStatus, getEvents, getTrails, getGallery } from '../../services/dataService';
import { ParkStatusConfig } from '../../types';
import { useToast } from '../../components/admin/Toast';

export const AdminDashboardPage: React.FC = () => {
  const [config, setConfig] = useState<ParkStatusConfig | null>(null);
  const [stats, setStats] = useState({ events: 0, trails: 0, gallery: 0 });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([getParkStatus(), getEvents(), getTrails(), getGallery()]).then(
      ([statusData, eventsData, trailsData, galleryData]) => {
        setConfig(statusData);
        setStats({
          events: eventsData.length,
          trails: trailsData.length,
          gallery: galleryData.length,
        });
      }
    );
  }, []);

  const handleChange = (field: keyof ParkStatusConfig, value: any) => {
    if (!config) return;
    setConfig({
      ...config,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    try {
      await updateParkStatus(config);
      showToast('Status Ekowisata & Hero berhasil diperbarui!', 'success');
    } catch {
      showToast('Gagal menyimpan perubahan status', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!config) {
    return <div className="text-center py-12 font-mono text-xs text-basalt-500">Memuat data dashboard...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-basalt-900 tracking-tight">
          Status & Konten Beranda
        </h1>
        <p className="mt-1 text-sm text-basalt-600 font-sans">
          Kelola telemetri cuaca harian, status buka/tutup kawasan, harga tiket, dan narasi Hero publik.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-mist-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-basalt-400 block">Total Agenda Event</span>
            <span className="text-2xl font-serif font-bold text-basalt-900 mt-1 block">{stats.events} Event</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-ember-50 text-ember-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-mist-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-basalt-400 block">Rute Trekking / MTB</span>
            <span className="text-2xl font-serif font-bold text-basalt-900 mt-1 block">{stats.trails} Jalur</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-mist-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-basalt-400 block">Foto Galeri Terbit</span>
            <span className="text-2xl font-serif font-bold text-basalt-900 mt-1 block">{stats.gallery} Foto</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-canopy-100 text-canopy-900 flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Live Status & Telemetri Harian */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-mist-200">
            <Activity className="w-5 h-5 text-ember-600" />
            <h2 className="font-serif text-xl font-bold text-basalt-900">
              Kondisi Harian Kali Talang (Live Telemetry)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Toggle Status Buka/Tutup */}
            <div className="p-4 rounded-2xl bg-mist-50 border border-mist-200 flex flex-col justify-between">
              <div>
                <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1">
                  Status Buka Kawasan
                </label>
                <p className="text-xs text-basalt-500 font-sans mb-3">
                  Ubah saat terjadi erupsi, hujan lebat, atau pemeliharaan jalur.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('isOpen', true)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    config.isOpen
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-basalt-700 border border-mist-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Buka</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('isOpen', false)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    !config.isOpen
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-basalt-700 border border-mist-200'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Tutup</span>
                </button>
              </div>
            </div>

            {/* Label Status Resmi */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Label Status Resmi
              </label>
              <select
                value={config.statusLabel}
                onChange={(e) => handleChange('statusLabel', e.target.value)}
                className="w-full py-2.5 px-3 bg-mist-50 rounded-xl border border-mist-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-ember-600 text-basalt-900"
              >
                <option value="Normal - Aman Dikunjungi">Normal - Aman Dikunjungi</option>
                <option value="Waspada Kabut / Hujan">Waspada Kabut / Hujan</option>
                <option value="Tutup Sementara">Tutup Sementara</option>
              </select>
              <span className="text-[11px] text-basalt-400 mt-1 block">Muncul pada badge status di Navbar.</span>
            </div>

            {/* Jarak Pandang Merapi */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Jarak Pandang Merapi
              </label>
              <select
                value={config.merapiVisibility}
                onChange={(e) => handleChange('merapiVisibility', e.target.value)}
                className="w-full py-2.5 px-3 bg-mist-50 rounded-xl border border-mist-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-ember-600 text-basalt-900"
              >
                <option value="Terlihat Jelas (Cerah)">Terlihat Jelas (Cerah)</option>
                <option value="Tertutup Kabut Tipis">Tertutup Kabut Tipis</option>
                <option value="Tertutup Awan Tebal">Tertutup Awan Tebal</option>
              </select>
              <span className="text-[11px] text-basalt-400 mt-1 block">Berdasarkan pantauan pos Balerante.</span>
            </div>

            {/* Suhu Udara (°C) */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Suhu Udara (°C)
              </label>
              <input
                type="number"
                value={config.temperatureC}
                onChange={(e) => handleChange('temperatureC', parseInt(e.target.value) || 0)}
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            {/* Kondisi Cuaca */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Kondisi Cuaca
              </label>
              <input
                type="text"
                value={config.weatherCondition}
                onChange={(e) => handleChange('weatherCondition', e.target.value)}
                placeholder="misal: Cerah Berawan"
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-sans focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            {/* Jam Operasional */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Jam Operasional
              </label>
              <input
                type="text"
                value={config.operatingHours}
                onChange={(e) => handleChange('operatingHours', e.target.value)}
                placeholder="07.00 - 17.00 WIB"
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-sans focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Tarif Retribusi & Kontak */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-mist-200">
            <Ticket className="w-5 h-5 text-emerald-600" />
            <h2 className="font-serif text-xl font-bold text-basalt-900">
              Tarif Tiket Retribusi & Kontak WhatsApp
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Tiket Masuk (Rp)
              </label>
              <input
                type="number"
                value={config.ticketPriceWNI}
                onChange={(e) => handleChange('ticketPriceWNI', parseInt(e.target.value) || 0)}
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Parkir Sepeda Motor (Rp)
              </label>
              <input
                type="number"
                value={config.parkingMotor}
                onChange={(e) => handleChange('parkingMotor', parseInt(e.target.value) || 0)}
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Parkir Mobil (Rp)
              </label>
              <input
                type="number"
                value={config.parkingMobil}
                onChange={(e) => handleChange('parkingMobil', parseInt(e.target.value) || 0)}
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Nomor WhatsApp Pokdarwis
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-basalt-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={config.whatsappContact}
                  onChange={(e) => handleChange('whatsappContact', e.target.value)}
                  placeholder="628123456789"
                  className="w-full pl-9 pr-3 py-2 bg-mist-50 rounded-xl border border-mist-200 text-sm font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Hero Banner Media & Headlines */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-mist-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-mist-200">
            <Video className="w-5 h-5 text-canopy-800" />
            <h2 className="font-serif text-xl font-bold text-basalt-900">
              Media & Teks Hero Beranda
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Headline Utama (Serif Display)
              </label>
              <input
                type="text"
                value={config.heroHeadline}
                onChange={(e) => handleChange('heroHeadline', e.target.value)}
                className="w-full py-2.5 px-3 bg-mist-50 rounded-xl border border-mist-200 text-base font-serif font-bold focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                Subheadline (Lead Description)
              </label>
              <textarea
                rows={2}
                value={config.heroSubheadline}
                onChange={(e) => handleChange('heroSubheadline', e.target.value)}
                className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-sm font-sans focus:outline-none focus:border-ember-600 text-basalt-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                  URL Video Hero (MP4)
                </label>
                <input
                  type="text"
                  value={config.heroVideoUrl}
                  onChange={(e) => handleChange('heroVideoUrl', e.target.value)}
                  className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-xs font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold uppercase text-basalt-700 block mb-1.5">
                  URL Poster Fallback Image
                </label>
                <input
                  type="text"
                  value={config.heroPosterUrl}
                  onChange={(e) => handleChange('heroPosterUrl', e.target.value)}
                  className="w-full py-2 px-3 bg-mist-50 rounded-xl border border-mist-200 text-xs font-mono focus:outline-none focus:border-ember-600 text-basalt-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4 sticky bottom-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-mist-200 shadow-xl">
          <span className="text-xs text-basalt-500 font-mono hidden sm:inline">
            Terakhir disimpan: {new Date(config.updatedAt).toLocaleTimeString('id-ID')}
          </span>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl font-semibold text-white bg-canopy-950 hover:bg-canopy-900 shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
