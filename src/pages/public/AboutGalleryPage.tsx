import React, { useState, useEffect } from 'react';
import { Mountain, Heart, X, Award } from 'lucide-react';
import { getGallery } from '../../services/dataService';
import { GalleryItem } from '../../types';

export const AboutGalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = () => {
      getGallery().then((data) => {
        setGalleryItems(data);
        setLoading(false);
      });
    };
    fetchGallery();

    const handleUpdate = () => fetchGallery();
    window.addEventListener('kalitalang_data_updated', handleUpdate);
    return () => window.removeEventListener('kalitalang_data_updated', handleUpdate);
  }, []);

  const categories = ['Semua', 'Merapi View', 'Trekking & Hutan', 'UMKM & Budaya Balerante', 'Event'];

  const filteredItems = activeCategory === 'Semua'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-mist-50">
      
      {/* Header Editorial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-canopy-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-canopy-800 shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-ember-600/30 text-ember-400 border border-ember-600/40 mb-4">
              <Mountain className="w-3.5 h-3.5" />
              <span>PROFIL DESA & DOKUMENTASI VISUAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Kearifan di Tepi Jurang Merapi
            </h1>
            <p className="mt-4 text-base sm:text-lg text-mist-200/90 font-sans leading-relaxed">
              Mengenal lebih dekat Desa Balerante, masyarakat tangguh lereng Merapi, dan inisiatif pemuda dalam mengembangkan Ekowisata Kali Talang yang berdaya dan lestari.
            </p>
          </div>
        </div>
      </div>

      {/* About Story (Asymmetric Editorial Section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-ember-600 font-semibold block">
              SEJARAH & PENGELOLAAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-basalt-900 leading-tight">
              Dari Jalur Lahar Menjadi Destinasi Wisata Berbasis Komunitas
            </h2>
            <p className="text-basalt-600 font-sans leading-relaxed text-base">
              Ekowisata Kali Talang berada di Desa Balerante, Kecamatan Kemalang, Kabupaten Klaten — wilayah pemukiman yang berjarak hanya 4 kilometer dari puncak Gunung Merapi. Awalnya merupakan alur lahar alami, kawasan ini dikembangkan oleh warga secara swadaya bersama Kelompok Sadar Wisata (Pokdarwis) menjadi surga panorama alam pegunungan.
            </p>
            <p className="text-basalt-600 font-sans leading-relaxed text-base">
              Dengan menjaga keaslian vegetasi pinus dan bebatuan vulkanik andesit, Kali Talang menghadirkan ruang edukasi mitigasi kebencanaan sekaligus penggerak roda ekonomi warga melalui kedai kopi lereng, pemandu trekking lokal, dan penjualan hasil tani.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-mist-200 shadow-sm">
                <span className="text-2xl font-serif font-bold text-canopy-950 block">4 KM</span>
                <span className="text-xs text-basalt-500 font-sans">Jarak lurus dari kawah aktif Gunung Merapi</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-mist-200 shadow-sm">
                <span className="text-2xl font-serif font-bold text-emerald-700 block">1.180 M</span>
                <span className="text-xs text-basalt-500 font-sans">Ketinggian di atas permukaan laut (MDPL)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-mist-200">
              <img
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80"
                alt="Jembatan Kali Talang"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canopy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-mono text-ember-400 block uppercase">Gotong Royong Warga</span>
                <p className="font-serif text-lg font-bold">Jembatan Bambu & Gardu Pandang Swadaya Balerante</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Program Pengabdian Masyarakat: Aksara Mahasiswa Berdampak */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-mist-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="w-28 h-28 rounded-3xl bg-canopy-950 p-6 flex flex-col items-center justify-center text-center shadow-lg border border-canopy-800">
                <Award className="w-10 h-10 text-ember-500 mb-1" />
                <span className="text-[10px] font-mono text-mist-200 font-bold uppercase">AKID 2026</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span>KOLABORASI PENGABDIAN MASYARAKAT</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-basalt-900">
                Program Aksara Mahasiswa Berdampak
              </h3>
              <p className="text-sm sm:text-base text-basalt-600 font-sans leading-relaxed">
                Website ini beserta digitalisasi sistem pendaftaran event Kali Talang Fun Trekking dan pemetaan rute interaktif Komoot merupakan wujud nyata kontribusi mahasiswa dalam memperluas jangkauan promosi Desa Wisata Balerante ke tingkat nasional dan internasional.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Gallery Section with Category Tabs & Lightbox */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-ember-600 font-semibold block mb-1">
              GALERI DOKUMENTASI
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-basalt-900 tracking-tight">
              Potret Keindahan Kali Talang
            </h2>
            <p className="mt-1 text-sm text-basalt-600 font-sans">
              Klik pada foto untuk melihat ukuran penuh dan cerita di balik gambar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-canopy-950 text-white'
                    : 'bg-white text-basalt-600 hover:bg-mist-200 border border-mist-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20 font-mono text-sm text-basalt-400">
            Memuat galeri foto...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-mist-200">
            <p className="font-serif text-lg text-basalt-900 font-semibold">Belum ada foto untuk kategori ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-basalt-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-mist-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canopy-950/85 via-canopy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-mono text-ember-400 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-mist-200/80 font-sans mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canopy-950/90 backdrop-blur-md animate-fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedPhoto(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl w-full bg-basalt-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Container */}
            <div className="relative aspect-[16/10] max-h-[70vh] bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Photo Caption Footer */}
            <div className="p-6 bg-canopy-950 text-white border-t border-white/10">
              <span className="text-xs font-mono text-ember-400 uppercase tracking-wider block mb-1">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-mist-200/90 font-sans mt-2 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
