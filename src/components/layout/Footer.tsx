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
    <footer className="bg-white border-t border-gray-200 text-gray-700 font-sans">
      
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Identity & About (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-komoot-green text-white p-2 flex items-center justify-center shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight text-gray-900 leading-none">
                  EKOWISATA KALI TALANG
                </h3>
                <span className="text-[11px] font-bold text-komoot-green uppercase tracking-wider block mt-0.5">
                  Desa Balerante • Kemalang • Klaten
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              Destinasi ekowisata alam berjarak 4 kilometer dari puncak Gunung Merapi. Dikelola langsung secara swadaya dan lestari oleh Kelompok Sadar Wisata (Pokdarwis) Desa Balerante.
            </p>

            {/* Impact Badge */}
            <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-komoot-bg border border-gray-200 text-xs text-gray-700">
              <Heart className="w-4 h-4 text-komoot-green shrink-0" />
              <span>
                Pengabdian Masyarakat: <strong>Aksara Mahasiswa Berdampak</strong>
              </span>
            </div>
          </div>

          {/* Nav Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Aktivitas Jalur
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 font-medium">
              <li>
                <Link to="/" className="hover:text-komoot-green transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/trails" className="hover:text-komoot-green transition-colors">
                  Rute & Jalur Trekking
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-komoot-green transition-colors">
                  Agenda & Fun Trekking
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-komoot-green transition-colors">
                  Profil Desa & Galeri
                </Link>
              </li>
            </ul>
          </div>

          {/* Practical Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Kunjungan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-komoot-green shrink-0 mt-0.5" />
                <span>Buka: {parkStatus?.operatingHours || '07.00 - 17.00 WIB'}</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-komoot-green shrink-0 mt-0.5" />
                <span>Tiket: Rp {(parkStatus?.ticketPriceWNI || 5000).toLocaleString('id-ID')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Compass className="w-4 h-4 text-komoot-green shrink-0 mt-0.5" />
                <span>Elevasi: 1.180 mdpl</span>
              </li>
            </ul>
          </div>

          {/* Contact (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Lokasi & WhatsApp
            </h4>
            <div className="text-xs sm:text-sm text-gray-600 space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-komoot-green shrink-0 mt-0.5" />
                <span>Dusun Sambungrejo, Balerante, Kemalang, Klaten, Jawa Tengah</span>
              </p>
              <div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-komoot-green hover:bg-komoot-green-hover text-white transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp Pokdarwis</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Ekowisata Kali Talang Desa Balerante. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="text-gray-500 hover:text-gray-900 transition-colors underline"
            >
              Portal Pengelola CMS
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};
