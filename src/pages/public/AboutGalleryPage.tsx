import React, { useState, useEffect } from 'react';
import { Mountain, Heart, X, Award, MapPin, Users } from 'lucide-react';
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
    <div className="min-h-screen pt-24 pb-20 bg-komoot-bg font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-komoot-green mb-2">
              <Mountain className="w-4 h-4" />
              <span>PROFIL DESA & DOKUMENTASI VISUAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Kearifan di Tepi Jurang Merapi
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Mengenal lebih dekat Desa Balerante, masyarakat tangguh lereng Merapi, dan inisiatif pemuda dalam mengembangkan Ekowisata Kali Talang yang lestari.
            </p>
          </div>
        </div>
      </div>

      {/* About Story (Komoot Clean Split) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-komoot-green block">
                SEJARAH & PENGELOLAAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                Dari Alur Lahar Menjadi Ekowisata Mandiri Berbasis Masyarakat
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Ekowisata Kali Talang berada di Desa Balerante, Kecamatan Kemalang, Kabupaten Klaten — wilayah pemukiman yang berjarak hanya 4 kilometer dari puncak Gunung Merapi. Awalnya merupakan alur lahar alami, kawasan ini dikembangkan oleh warga secara swadaya bersama Pokdarwis menjadi surga panorama alam pegunungan.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Dengan menjaga keaslian vegetasi pinus dan bebatuan vulkanik andesit, Kali Talang menghadirkan ruang edukasi mitigasi kebencanaan sekaligus penggerak roda ekonomi warga melalui kedai kopi lereng, pemandu trekking lokal, dan penjualan hasil tani.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-2xl font-bold text-komoot-green font-mono block">4 KM</span>
                  <span className="text-xs text-gray-500">Jarak lurus dari kawah aktif Gunung Merapi</span>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-2xl font-bold text-gray-900 font-mono block">1.180 M</span>
                  <span className="text-xs text-gray-500">Ketinggian di atas permukaan laut (MDPL)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-900 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80"
                  alt="Jembatan Kali Talang"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold text-komoot-green-light uppercase tracking-wider block">Gotong Royong Warga</span>
                  <p className="font-bold text-base">Jembatan Bambu & Gardu Pandang Swadaya Balerante</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Program Aksara Mahasiswa Berdampak Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-komoot-green/10 text-komoot-green flex items-center justify-center shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-komoot-green mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>KOLABORASI PENGABDIAN MASYARAKAT</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Program Aksara Mahasiswa Berdampak
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              Website ini beserta digitalisasi sistem pendaftaran event Kali Talang Fun Trekking dan pemetaan rute jalur trekking interaktif merupakan wujud nyata kontribusi mahasiswa dalam memperluas jangkauan promosi Desa Wisata Balerante ke tingkat nasional dan internasional.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights / Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-komoot-green block mb-1">
              HIGHLIGHTS KOMUNITAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Potret Keindahan Kali Talang
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Klik pada foto untuk melihat ukuran penuh dan cerita di balik spot tersebut.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? 'bg-komoot-green text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20 font-mono text-sm text-gray-400">
            Memuat galeri foto...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="font-bold text-lg text-gray-900">Belum ada foto untuk kategori ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 cursor-pointer shadow-sm hover:shadow-komoot-lg transition-all duration-300 border border-gray-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold text-komoot-green-light uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedPhoto(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
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
            <div className="p-6 bg-white border-t border-gray-100 text-gray-900">
              <span className="text-xs font-bold text-komoot-green uppercase tracking-wider block mb-1">
                {selectedPhoto.category}
              </span>
              <h3 className="text-xl font-bold">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
