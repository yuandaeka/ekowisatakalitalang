import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { getGallery, saveGalleryItem, deleteGalleryItem } from '../../services/dataService';
import { GalleryItem } from '../../types';
import { useToast } from '../../components/admin/Toast';

export const AdminGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const loadGallery = async () => {
    const data = await getGallery();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleOpenAdd = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: '',
      category: 'Merapi View',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      caption: '',
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.title.trim()) {
      showToast('Judul foto wajib diisi', 'error');
      return;
    }
    if (!editingItem.imageUrl.trim()) {
      showToast('URL foto wajib diisi', 'error');
      return;
    }

    try {
      await saveGalleryItem(editingItem);
      showToast(`Foto "${editingItem.title}" berhasil disimpan!`, 'success');
      setIsModalOpen(false);
      setEditingItem(null);
      loadGallery();
    } catch {
      showToast('Gagal menyimpan foto galeri', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteGalleryItem(deleteId);
      showToast('Foto berhasil dihapus dari galeri', 'success');
      setDeleteId(null);
      loadGallery();
    } catch {
      showToast('Gagal menghapus foto', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-basalt-900 tracking-tight">
            Kelola Galeri Foto
          </h1>
          <p className="mt-1 text-sm text-basalt-600 font-sans">
            Kurasi foto pemandangan Merapi, jalur hutan, aktivitas UMKM dan dokumentasi event Balerante.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ember-600 hover:bg-ember-500 text-white font-semibold text-sm transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Foto Baru</span>
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-basalt-400">Memuat galeri...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-mist-200">
          <p className="font-serif text-lg text-basalt-900 font-semibold">Belum ada foto galeri.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-mist-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-basalt-900 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-canopy-950/80 backdrop-blur-sm text-mist-50 border border-white/20">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <h4 className="font-serif font-bold text-basalt-900 text-base leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-basalt-600 font-sans line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-mist-50/80 border-t border-mist-200 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg bg-white hover:bg-mist-100 text-basalt-700 border border-mist-200 transition-colors"
                  title="Edit Foto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                  title="Hapus Foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-canopy-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-mist-200 overflow-hidden">
            
            <div className="bg-canopy-950 text-white px-6 py-4 flex items-center justify-between border-b border-canopy-800">
              <h3 className="font-serif font-bold text-lg">
                {editingItem.title ? `Edit Foto: ${editingItem.title}` : 'Tambah Foto Galeri Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-mist-200 hover:text-white hover:bg-canopy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  Judul Foto *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="misal: Kubah Puncak Merapi 4 KM"
                  className="w-full py-2 px-3 text-sm bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  Kategori
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900"
                >
                  <option value="Merapi View">Merapi View</option>
                  <option value="Trekking & Hutan">Trekking & Hutan</option>
                  <option value="UMKM & Budaya Balerante">UMKM & Budaya Balerante</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  URL Gambar (Unsplash / CDN) *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-mono"
                />
              </div>

              {/* Image Preview */}
              {editingItem.imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-video bg-basalt-900 border border-mist-200">
                  <img
                    src={editingItem.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase font-semibold text-basalt-700 mb-1">
                  Keterangan / Caption
                </label>
                <textarea
                  rows={2}
                  value={editingItem.caption}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  placeholder="Tuliskan latar belakang foto, waktu pengambilan, atau kisah warga..."
                  className="w-full py-2 px-3 text-xs bg-mist-50 rounded-xl border border-mist-200 focus:outline-none focus:border-ember-600 text-basalt-900 font-sans"
                />
              </div>

              <div className="pt-3 border-t border-mist-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-basalt-700 bg-mist-100 hover:bg-mist-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-semibold text-white bg-canopy-950 hover:bg-canopy-900 flex items-center gap-1.5 shadow-sm text-xs"
                >
                  <Save className="w-4 h-4 text-emerald-400" />
                  <span>Simpan Foto</span>
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
              Hapus Foto Ini?
            </h3>
            <p className="text-xs text-basalt-600 font-sans">
              Foto ini akan dihapus dari album galeri ekowisata.
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
