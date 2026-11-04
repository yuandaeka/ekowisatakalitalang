import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, MapPin, Clock, Phone, ExternalLink, Heart, Compass, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { parkStatus } = useApp();

  const whatsappNumber = parkStatus?.whatsappContact || '6285743219080';
  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    'Halo Pengelola Ekowisata Kali Talang Balerante, saya ingin bertanya seputar kunjungan dan event trekking.'
  )}`;

  return (
    <footer className="bg-canopy-950 text-white border-t border-canopy-800">
      {/* Upper Footer: Village & Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Identity & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-600 to-canopy-800 p-2 flex items-center justify-center border border-white/10 shadow-sm">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                  EKOWISATA KALI TALANG
                </h3>
                <p className="text-xs font-mono text-ember-400 tracking-wider">
                  DESA BALERANTE • KEMALANG • KLATEN
                </p>
              </div>
            </div>

            <p className="text-sm text-mist-200/80 leading-relaxed font-sans max-w-md">
              Destinasi ekowisata alam berjarak 4 kilometer dari kubah kawah Gunung Merapi. Dikelola langsung secara lestari dan berbasis masyarakat oleh Kelompok Sadar Wisata (Pokdarwis) Desa Balerante.
            </p>

            {/* Program Impact Badge */}
            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-canopy-900 border border-canopy-800 text-xs text-mist-200/90">
              <Heart className="w-4 h-4 text-ember-400 shrink-0" />
              <span>
                Program Pengabdian Masyarakat: <strong className="text-white">Aksara Mahasiswa Berdampak</strong>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-mist-200/60">
              Eksplorasi
            </h4>
            <ul className="space-y-2 text-sm text-mist-200/80 font-sans">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/trails" className="hover:text-white transition-colors">
                  Rute Komoot & Trekking
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Agenda & Fun Trekking
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Profil Desa & Galeri
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Info (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-mist-200/60">
              Informasi Kunjungan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-mist-200/80 font-sans">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-ember-400 shrink-0 mt-0.5" />
                <span>Buka: {parkStatus?.operatingHours || '07.00 - 17.00 WIB'}</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tiket: Rp {(parkStatus?.ticketPriceWNI || 5000).toLocaleString('id-ID')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-ember-400 shrink-0 mt-0.5" />
                <span>Elevasi: 1.180 MDPL</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-mist-200/60">
              Lokasi & Kontak Pokdarwis
            </h4>
            <div className="text-xs sm:text-sm text-mist-200/80 font-sans space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-ember-400 shrink-0 mt-0.5" />
                <span>Dusun Sambungrejo, Desa Balerante, Kec. Kemalang, Kab. Klaten, Jawa Tengah 57484</span>
              </p>
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors border border-emerald-500/30"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp Pokdarwis</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer: Copyright & Admin Entry */}
      <div className="border-t border-canopy-900 bg-canopy-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist-200/60 font-sans">
          <p>
            &copy; {new Date().getFullYear()} Ekowisata Kali Talang Desa Balerante. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">•</span>
            <Link
              to="/admin/login"
              className="hover:text-mist-50 transition-colors flex items-center gap-1 text-mist-200/70 hover:underline"
            >
              <span>Portal CMS Pengelola</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

