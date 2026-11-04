import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  Save,
  Link as LinkIcon,
  Eye
} from 'lucide-react';
import { getEvents, saveEvent, deleteEvent, formatGoogleFormUrl } from '../../services/dataService';
import { EcoEvent, EventRundownItem } from '../../types';
import { useToast } from '../../components/admin/Toast';

export const AdminEventsPage: React.FC = () => {
  const [events, setEvents] = useState<EcoEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EcoEvent | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showPreviewGForm, setShowPreviewGForm] = useState(false);
  const { showToast } = useToast();

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenAdd = () => {
    const newEvent: EcoEvent = {
      id: `evt-${Date.now()}`,
      slug: `event-kali-talang-${Date.now().toString().slice(-4)}`,
      title: '',
      subtitle: '',
      date: new Date().toISOString().split('T')[0],
      timeRange: '06.00 - 11.00 WIB',
      locationPoint: 'Gerbang Utama Ekowisata Kali Talang, Balerante, Kemalang, Klaten',
      priceLabel: 'Rp 35.000 / Peserta',
      quotaLabel: 'Terbatas 100 Peserta',
      isFeatured: false,
      status: 'Registration Open',
      bannerImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80',
      description: '',
      highlights: ['Jersey Eksklusif', 'Medali Kayu Finisher Balerante', 'Snack & Teh Rempah Hangat'],
      rundown: [
        { time: '06.00 - 06.30 WIB', activity: 'Registrasi Ulang & Pembagian Race Pack' },
        { time: '06.30 - 09.30 WIB', activity: 'Pelepasan & Trekking Menuju Gardu Pandang' }
      ],
      googleFormUrl: '',
    };
    setEditingEvent(newEvent);
    setIsModalOpen(true);
    setShowPreviewGForm(false);
  };

  const handleOpenEdit = (evt: EcoEvent) => {
    setEditingEvent({ ...evt });
    setIsModalOpen(true);
    setShowPreviewGForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    if (!editingEvent.title.trim()) {
      showToast('Judul event wajib diisi', 'error');
      return;
    }

    try {
      await saveEvent(editingEvent);
      showToast(`Event "${editingEvent.title}" berhasil disimpan!`, 'success');
      setIsModalOpen(false);
      setEditingEvent(null);
      loadEvents();
    } catch {
      showToast('Gagal menyimpan event', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteEvent(deleteId);
      showToast('Event berhasil dihapus', 'success');
      setDeleteId(null);
      loadEvents();
    } catch {
      showToast('Gagal menghapus event', 'error');
    }
  };

  const handleToggleFeatured = async (evt: EcoEvent) => {
    try {
      await saveEvent({ ...evt, isFeatured: !evt.isFeatured });
      showToast(
        !evt.isFeatured
          ? `"${evt.title}" disetel sebagai Featured Spotlight di Beranda!`
          : `Featured spotlight dinonaktifkan untuk "${evt.title}".`,
        'success'
      );
      loadEvents();
    } catch {
      showToast('Gagal mengubah status featured', 'error');
    }
  };

  // Dynamic Highlight Helpers
  const addHighlight = () => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      highlights: [...editingEvent.highlights, 'Fasilitas Baru'],
    });
  };

  const updateHighlight = (index: number, val: string) => {
    if (!editingEvent) return;
    const updated = [...editingEvent.highlights];
    updated[index] = val;
    setEditingEvent({ ...editingEvent, highlights: updated });
  };

  const removeHighlight = (index: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      highlights: editingEvent.highlights.filter((_, i) => i !== index),
    });
  };

  // Dynamic Rundown Helpers
  const addRundownItem = () => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      rundown: [...editingEvent.rundown, { time: '09.30 - 10.30 WIB', activity: 'Aktivitas Baru' }],
    });
  };

  const updateRundown = (index: number, field: keyof EventRundownItem, val: string) => {
    if (!editingEvent) return;
    const updated = [...editingEvent.rundown];
    updated[index] = { ...updated[index], [field]: val };
    setEditingEvent({ ...editingEvent, rundown: updated });
  };

  const removeRundown = (index: number) => {
    if (!editingEvent) return;
    setEditingEvent({
      ...editingEvent,
      rundown: editingEvent.rundown.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-basalt-900 tracking-tight">
            Kelola Event & Google Form
          </h1>
          <p className="mt-1 text-sm text-basalt-600 font-sans">
            Tambahkan agenda, sesuaikan kuota, rundown, dan hubungkan formulir pendaftaran Google Form.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ember-600 hover:bg-ember-500 text-white font-semibold text-sm transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Event Baru</span>
        </button>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-3xl border border-mist-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-basalt-400">Memuat data event...</div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-sm text-basalt-600">Belum ada agenda kegiatan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans">
              <thead className="bg-mist-50 border-b border-mist-200 text-xs font-mono text-basalt-600 uppercase">
                <tr>
                  <th className="py-3.5 px-6">Event</th>
                  <th className="py-3.5 px-6">Tanggal & Waktu</th>
                  <th className="py-3.5 px-6">Tarif & Kuota</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200 text-basalt-800">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-mist-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.bannerImage}
                          alt={evt.title}
                          className="w-12 h-12 rounded-xl object-cover border border-mist-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-basalt-900 text-base">{evt.title}</span>
                            {evt.isFeatured && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-ember-600 text-white font-semibold">
                                <Star className="w-3 h-3 fill-white" /> Featured
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-basalt-500 font-mono block mt-0.5">/{evt.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono">
                      <span className="font-semibold text-basalt-900 block">{evt.date}</span>
                      <span className="text-basalt-500">{evt.timeRange}</span>
                    </td>

                    <td className="py-4 px-6 text-xs">
                      <span className="font-bold text-ember-600 block">{evt.priceLabel}</span>
                      <span className="text-basalt-500 font-mono text-[11px]">{evt.quotaLabel}</span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {evt.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleFeatured(evt)}
                          title={evt.isFeatured ? 'Batalkan Featured' : 'Jadikan Featured Spotlight di Home'}
                          className={`p-2 rounded-lg border transition-colors ${
                            evt.isFeatured
                              ? 'bg-amber-100 text-amber-700 border-amber-300'
                              : 'bg-mist-100 text-basalt-500 hover:text-amber-600 border-mist-200'
                          }`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          title="Edit Event"
                          className="p-2 rounded-lg bg-mist-100 hover:bg-mist-200 text-basalt-700 border border-mist-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(evt.id)}
                          title="Hapus Event"
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-canopy-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-mist-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-canopy-950 text-white px-6 py-4 flex items-center justify-between border-b border-canopy-800">
              <div>
                <h3 className="font-serif font-bold text-xl">
                  {editingEvent.title ? `Edit Event: ${editingEvent.title}` : 'Buat Event Baru'}
                </h3>
                <span className="text-xs font-mono text-mist-200/70">
                  Konfigurasi Agenda & Formulir Pendaftaran Google
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-mist-200 hover:text-white hover:bg-canopy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scroll */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Judul Event *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    placeholder="misal: Kali Talang Fun Trekking 2026"
                    className="w-full py-2 px-3 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.slug}
                    onChange={(e) => setEditingEvent({ ...editingEvent, slug: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={editingEvent.subtitle}
                    onChange={(e) => setEditingEvent({ ...editingEvent, subtitle: e.target.value })}
                    placeholder="misal: Jelajah Alam 4 KM dari Puncak Gunung Merapi bersama Warga Balerante"
                    className="w-full py-2 px-3 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900"
                  />
                </div>
              </div>

              {/* Date, Time, Location & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Rentang Waktu
                  </label>
                  <input
                    type="text"
                    value={editingEvent.timeRange}
                    onChange={(e) => setEditingEvent({ ...editingEvent, timeRange: e.target.value })}
                    placeholder="06.00 - 11.30 WIB"
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Tarif Pendaftaran
                  </label>
                  <input
                    type="text"
                    value={editingEvent.priceLabel}
                    onChange={(e) => setEditingEvent({ ...editingEvent, priceLabel: e.target.value })}
                    placeholder="Rp 35.000 / Peserta"
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Status Pendaftaran
                  </label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900"
                  >
                    <option value="Registration Open">Registration Open</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Location & Quota */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Titik Kumpul / Lokasi
                  </label>
                  <input
                    type="text"
                    value={editingEvent.locationPoint}
                    onChange={(e) => setEditingEvent({ ...editingEvent, locationPoint: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Label Kuota Peserta
                  </label>
                  <input
                    type="text"
                    value={editingEvent.quotaLabel}
                    onChange={(e) => setEditingEvent({ ...editingEvent, quotaLabel: e.target.value })}
                    placeholder="misal: Terbatas 150 Peserta"
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                  />
                </div>
              </div>

              {/* Banner Image URL */}
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  URL Poster Banner
                </label>
                <input
                  type="text"
                  value={editingEvent.bannerImage}
                  onChange={(e) => setEditingEvent({ ...editingEvent, bannerImage: e.target.value })}
                  className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  Deskripsi Lengkap
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full py-2 px-3 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-sans"
                />
              </div>

              {/* GOOGLE FORM INTEGRATION & EMBED PREVIEW */}
              <div className="p-5 rounded-2xl bg-mist-50 border border-mist-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-ember-600" />
                    <span className="text-xs font-mono uppercase font-bold text-basalt-900">
                      Integrasi Google Form Pendaftaran
                    </span>
                  </div>
                  {editingEvent.googleFormUrl && (
                    <button
                      type="button"
                      onClick={() => setShowPreviewGForm(!showPreviewGForm)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-ember-600 hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showPreviewGForm ? 'Tutup Preview' : 'Tes Live Embed'}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-basalt-500 font-sans">
                  Masukkan link Google Form biasa (contoh: <code>https://docs.google.com/forms/d/e/.../viewform</code>). Sistem otomatis mengonversinya menjadi format embed yang aman.
                </p>

                <input
                  type="text"
                  value={editingEvent.googleFormUrl}
                  onChange={(e) => setEditingEvent({ ...editingEvent, googleFormUrl: e.target.value })}
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  className="w-full py-2 px-3 text-xs bg-white rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                />

                {showPreviewGForm && editingEvent.googleFormUrl && (
                  <div className="mt-3 pt-3 border-t border-mist-200">
                    <span className="text-[11px] font-mono text-basalt-500 block mb-2">
                      Live Preview Hasil Embed (Iframe):
                    </span>
                    <div className="rounded-xl overflow-hidden border border-mist-200 bg-white min-h-[300px]">
                      <iframe
                        src={formatGoogleFormUrl(editingEvent.googleFormUrl)}
                        title="Preview GForm"
                        className="w-full h-[320px] border-0"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Highlights / Benefits */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-semibold text-basalt-700">
                    Daftar Fasilitas & Keuntungan Peserta
                  </span>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-xs font-mono text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    + Tambah Fasilitas
                  </button>
                </div>
                <div className="space-y-2">
                  {editingEvent.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => updateHighlight(i, e.target.value)}
                        className="flex-1 py-1.5 px-3 text-xs bg-mist-50 rounded-lg border border-mist-200 text-basalt-900 font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        className="p-1.5 text-rose-500 hover:text-rose-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Rundown Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-semibold text-basalt-700">
                    Susunan Acara (Rundown)
                  </span>
                  <button
                    type="button"
                    onClick={addRundownItem}
                    className="text-xs font-mono text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    + Tambah Sesi Acara
                  </button>
                </div>
                <div className="space-y-2">
                  {editingEvent.rundown.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="06.00 - 07.00 WIB"
                        value={item.time}
                        onChange={(e) => updateRundown(i, 'time', e.target.value)}
                        className="w-36 py-1.5 px-3 text-xs bg-mist-50 rounded-lg border border-mist-200 text-basalt-900 font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Nama kegiatan"
                        value={item.activity}
                        onChange={(e) => updateRundown(i, 'activity', e.target.value)}
                        className="flex-1 py-1.5 px-3 text-xs bg-mist-50 rounded-lg border border-mist-200 text-basalt-900 font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => removeRundown(i)}
                        className="p-1.5 text-rose-500 hover:text-rose-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Event Checkbox */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-mist-50 border border-mist-200">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={editingEvent.isFeatured}
                  onChange={(e) => setEditingEvent({ ...editingEvent, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-ember-600 rounded focus:ring-ember-500"
                />
                <label htmlFor="featuredToggle" className="text-xs font-sans text-basalt-800 cursor-pointer">
                  <strong>Jadikan Featured Spotlight di Beranda Utama</strong> (Menampilkan countdown timer & sorotan khusus).
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-mist-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-basalt-700 bg-mist-100 hover:bg-mist-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-canopy-950 hover:bg-canopy-900 flex items-center gap-2 shadow-sm text-xs"
                >
                  <Save className="w-4 h-4 text-emerald-400" />
                  <span>Simpan Event</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canopy-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-mist-200 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-basalt-900">
              Hapus Event Ini?
            </h3>
            <p className="text-xs text-basalt-600 font-sans">
              Event ini akan dihapus dari sistem dan tidak lagi muncul di halaman publik.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-basalt-700 bg-mist-100 hover:bg-mist-200"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
