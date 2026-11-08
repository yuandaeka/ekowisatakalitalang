import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { getTrails, saveTrail, deleteTrail } from '../../services/dataService';
import { TrailRoute, TrailWaypoint } from '../../types';
import { useToast } from '../../components/admin/Toast';

export const AdminTrailsPage: React.FC = () => {
  const [trails, setTrails] = useState<TrailRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrail, setEditingTrail] = useState<TrailRoute | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pointsString, setPointsString] = useState('');
  const { showToast } = useToast();

  const loadTrails = async () => {
    const data = await getTrails();
    setTrails(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTrails();
  }, []);

  const handleOpenAdd = () => {
    const newTrail: TrailRoute = {
      id: `trail-${Date.now()}`,
      slug: `jalur-${Date.now().toString().slice(-4)}`,
      title: '',
      category: 'Trekking',
      difficulty: 'Mudah (Family)',
      distanceKm: 2.5,
      durationEstimate: '1 - 1.5 Jam',
      elevationGainM: 120,
      maxAltitudeMdpl: 1150,
      summary: '',
      coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [],
      elevationProfilePoints: [10, 20, 35, 55, 75, 90, 100, 85, 60, 40, 20],
      waypoints: [
        {
          name: 'Pos 1 - Gerbang Awal',
          distanceFromStartKm: 0.0,
          description: 'Pintu masuk kawasan dan loket perizinan.',
          imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80'
        }
      ],
      safetyNotes: ['Kenakan sepatu beralas karet anti-selip', 'Bawa air minum sendiri']
    };
    setEditingTrail(newTrail);
    setPointsString(newTrail.elevationProfilePoints.join(', '));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (trail: TrailRoute) => {
    setEditingTrail({ ...trail });
    setPointsString(trail.elevationProfilePoints.join(', '));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrail) return;
    if (!editingTrail.title.trim()) {
      showToast('Judul rute wajib diisi', 'error');
      return;
    }

    // Parse elevation points
    const parsedPoints = pointsString
      .split(',')
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p));

    const finalTrail: TrailRoute = {
      ...editingTrail,
      elevationProfilePoints: parsedPoints.length > 0 ? parsedPoints : [10, 50, 100, 50, 10],
    };

    try {
      await saveTrail(finalTrail);
      showToast(`Rute "${finalTrail.title}" berhasil disimpan!`, 'success');
      setIsModalOpen(false);
      setEditingTrail(null);
      loadTrails();
    } catch {
      showToast('Gagal menyimpan rute', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTrail(deleteId);
      showToast('Rute berhasil dihapus', 'success');
      setDeleteId(null);
      loadTrails();
    } catch {
      showToast('Gagal menghapus rute', 'error');
    }
  };

  // Dynamic Waypoint Helpers
  const addWaypoint = () => {
    if (!editingTrail) return;
    const newWp: TrailWaypoint = {
      name: `Pos ${editingTrail.waypoints.length + 1}`,
      distanceFromStartKm: Number((editingTrail.distanceKm * 0.5).toFixed(1)),
      description: 'Deskripsi spot pos pantau atau rest area.',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    };
    setEditingTrail({
      ...editingTrail,
      waypoints: [...editingTrail.waypoints, newWp],
    });
  };

  const updateWaypoint = (index: number, field: keyof TrailWaypoint, val: any) => {
    if (!editingTrail) return;
    const updated = [...editingTrail.waypoints];
    updated[index] = { ...updated[index], [field]: val };
    setEditingTrail({ ...editingTrail, waypoints: updated });
  };

  const removeWaypoint = (index: number) => {
    if (!editingTrail) return;
    setEditingTrail({
      ...editingTrail,
      waypoints: editingTrail.waypoints.filter((_, i) => i !== index),
    });
  };

  // Dynamic Safety Notes Helpers
  const addSafetyNote = () => {
    if (!editingTrail) return;
    setEditingTrail({
      ...editingTrail,
      safetyNotes: [...editingTrail.safetyNotes, 'Catatan keselamatan baru'],
    });
  };

  const updateSafetyNote = (index: number, val: string) => {
    if (!editingTrail) return;
    const updated = [...editingTrail.safetyNotes];
    updated[index] = val;
    setEditingTrail({ ...editingTrail, safetyNotes: updated });
  };

  const removeSafetyNote = (index: number) => {
    if (!editingTrail) return;
    setEditingTrail({
      ...editingTrail,
      safetyNotes: editingTrail.safetyNotes.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-basalt-900 tracking-tight">
            Kelola Rute & Jalur Trekking
          </h1>
          <p className="mt-1 text-sm text-basalt-600 font-sans">
            Konfigurasi metrik jarak, elevasi gain, waypoints pos pantau, dan profil kemiringan lereng.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ember-600 hover:bg-ember-500 text-white font-semibold text-sm transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Rute Baru</span>
        </button>
      </div>

      {/* Trails Table */}
      <div className="bg-white rounded-3xl border border-mist-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-basalt-400">Memuat rute...</div>
        ) : trails.length === 0 ? (
          <div className="p-12 text-center text-sm text-basalt-600">Belum ada data rute.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans">
              <thead className="bg-mist-50 border-b border-mist-200 text-xs font-mono text-basalt-600 uppercase">
                <tr>
                  <th className="py-3.5 px-6">Nama Jalur</th>
                  <th className="py-3.5 px-6">Kategori & Kesulitan</th>
                  <th className="py-3.5 px-6">Telemetri (Jarak/Elevasi)</th>
                  <th className="py-3.5 px-6">Waypoints</th>
                  <th className="py-3.5 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200 text-basalt-800">
                {trails.map((trail) => (
                  <tr key={trail.id} className="hover:bg-mist-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={trail.coverImage}
                          alt={trail.title}
                          className="w-12 h-12 rounded-xl object-cover border border-mist-200 shrink-0"
                        />
                        <div>
                          <span className="font-serif font-bold text-basalt-900 text-base block">{trail.title}</span>
                          <span className="text-xs text-basalt-500 font-mono">/{trail.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono bg-mist-100 text-basalt-700 border border-mist-200 mb-1">
                        {trail.category}
                      </span>
                      <span className="block text-xs font-medium text-basalt-600">
                        {trail.difficulty}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono">
                      <span className="font-bold text-basalt-900 block">{trail.distanceKm} KM • +{trail.elevationGainM}m</span>
                      <span className="text-basalt-500">{trail.durationEstimate}</span>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono text-basalt-600">
                      {trail.waypoints.length} Pos Pantau
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(trail)}
                          title="Edit Rute"
                          className="p-2 rounded-lg bg-mist-100 hover:bg-mist-200 text-basalt-700 border border-mist-200 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(trail.id)}
                          title="Hapus Rute"
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
      {isModalOpen && editingTrail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-canopy-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-mist-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-canopy-950 text-white px-6 py-4 flex items-center justify-between border-b border-canopy-800">
              <div>
                <h3 className="font-serif font-bold text-xl">
                  {editingTrail.title ? `Edit Rute: ${editingTrail.title}` : 'Buat Rute Baru'}
                </h3>
                <span className="text-xs font-mono text-mist-200/70">
                  Parameter Teknis, Waypoint & Profil Elevasi
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-mist-200 hover:text-white hover:bg-canopy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Nama Jalur *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTrail.title}
                    onChange={(e) => setEditingTrail({ ...editingTrail, title: e.target.value })}
                    placeholder="misal: Jalur Utama Kali Talang Fun Trekking"
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
                    value={editingTrail.slug}
                    onChange={(e) => setEditingTrail({ ...editingTrail, slug: e.target.value })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                  />
                </div>
              </div>

              {/* Category, Difficulty & Telemetry */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={editingTrail.category}
                    onChange={(e) => setEditingTrail({ ...editingTrail, category: e.target.value as any })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900"
                  >
                    <option value="Fun Trail">Fun Trail</option>
                    <option value="Trekking">Trekking</option>
                    <option value="Downhill / MTB">Downhill / MTB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Tingkat Kesulitan
                  </label>
                  <select
                    value={editingTrail.difficulty}
                    onChange={(e) => setEditingTrail({ ...editingTrail, difficulty: e.target.value as any })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900"
                  >
                    <option value="Mudah (Family)">Mudah (Family)</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Menantang">Menantang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Panjang Rute (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingTrail.distanceKm}
                    onChange={(e) => setEditingTrail({ ...editingTrail, distanceKm: parseFloat(e.target.value) || 0 })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 font-mono text-basalt-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Kenaikan Elevasi (+m)
                  </label>
                  <input
                    type="number"
                    value={editingTrail.elevationGainM}
                    onChange={(e) => setEditingTrail({ ...editingTrail, elevationGainM: parseInt(e.target.value) || 0 })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 font-mono text-basalt-900"
                  />
                </div>
              </div>

              {/* Alt & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Ketinggian Puncak (MDPL)
                  </label>
                  <input
                    type="number"
                    value={editingTrail.maxAltitudeMdpl}
                    onChange={(e) => setEditingTrail({ ...editingTrail, maxAltitudeMdpl: parseInt(e.target.value) || 0 })}
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 font-mono text-basalt-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                    Estimasi Durasi
                  </label>
                  <input
                    type="text"
                    value={editingTrail.durationEstimate}
                    onChange={(e) => setEditingTrail({ ...editingTrail, durationEstimate: e.target.value })}
                    placeholder="misal: 1 - 1.5 Jam"
                    className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 font-mono text-basalt-900"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  URL Cover Image
                </label>
                <input
                  type="text"
                  value={editingTrail.coverImage}
                  onChange={(e) => setEditingTrail({ ...editingTrail, coverImage: e.target.value })}
                  className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 font-mono text-basalt-900"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  Ringkasan Rute
                </label>
                <textarea
                  rows={2}
                  value={editingTrail.summary}
                  onChange={(e) => setEditingTrail({ ...editingTrail, summary: e.target.value })}
                  className="w-full py-2 px-3 text-sm bg-mist-50 rounded-xl border border-mist-200 font-sans text-basalt-900"
                />
              </div>

              {/* Elevation Profile Points (SVG Generator) */}
              <div className="p-4 rounded-2xl bg-mist-50 border border-mist-200 space-y-2">
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700">
                  Data Titik Profil Elevasi (Angka 0-100 Dipisah Koma)
                </label>
                <p className="text-[11px] text-basalt-500 font-sans">
                  Digunakan untuk menggambar grafik profil elevasi SVG di kartu dan halaman rute.
                </p>
                <input
                  type="text"
                  value={pointsString}
                  onChange={(e) => setPointsString(e.target.value)}
                  placeholder="20, 35, 50, 75, 90, 100, 85, 40, 20"
                  className="w-full py-2 px-3 text-xs bg-white rounded-xl border border-mist-200 font-mono text-basalt-900"
                />
              </div>

              {/* Waypoints Manager */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-semibold text-basalt-700">
                    Titik Singgah / Waypoints ({editingTrail.waypoints.length} Pos)
                  </span>
                  <button
                    type="button"
                    onClick={addWaypoint}
                    className="text-xs font-mono text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    + Tambah Waypoint
                  </button>
                </div>

                <div className="space-y-3">
                  {editingTrail.waypoints.map((wp, idx) => (
                    <div key={idx} className="p-3 bg-mist-50 rounded-xl border border-mist-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-ember-600">Pos #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeWaypoint(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Nama Pos"
                          value={wp.name}
                          onChange={(e) => updateWaypoint(idx, 'name', e.target.value)}
                          className="py-1.5 px-2.5 text-xs bg-white rounded-lg border border-mist-200 text-basalt-900 font-medium"
                        />
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Jarak dari start (km)"
                          value={wp.distanceFromStartKm}
                          onChange={(e) => updateWaypoint(idx, 'distanceFromStartKm', parseFloat(e.target.value) || 0)}
                          className="py-1.5 px-2.5 text-xs bg-white rounded-lg border border-mist-200 text-basalt-900 font-mono"
                        />
                        <input
                          type="text"
                          placeholder="URL Foto Pos"
                          value={wp.imageUrl}
                          onChange={(e) => updateWaypoint(idx, 'imageUrl', e.target.value)}
                          className="py-1.5 px-2.5 text-xs bg-white rounded-lg border border-mist-200 text-basalt-900 font-mono"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Deskripsi singkat pos"
                        value={wp.description}
                        onChange={(e) => updateWaypoint(idx, 'description', e.target.value)}
                        className="w-full py-1.5 px-2.5 text-xs bg-white rounded-lg border border-mist-200 text-basalt-900 font-sans"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Notes Manager */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-semibold text-basalt-700">
                    Catatan Keamanan
                  </span>
                  <button
                    type="button"
                    onClick={addSafetyNote}
                    className="text-xs font-mono text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    + Tambah Catatan
                  </button>
                </div>

                <div className="space-y-2">
                  {editingTrail.safetyNotes.map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => updateSafetyNote(idx, e.target.value)}
                        className="flex-1 py-1.5 px-3 text-xs bg-mist-50 rounded-lg border border-mist-200 text-basalt-900 font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => removeSafetyNote(idx)}
                        className="p-1.5 text-rose-500 hover:text-rose-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
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
                  <span>Simpan Rute</span>
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
              Hapus Rute Ini?
            </h3>
            <p className="text-xs text-basalt-600 font-sans">
              Rute ini akan dihapus dari sistem navigasi dan tidak lagi dapat diakses pengunjung.
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
