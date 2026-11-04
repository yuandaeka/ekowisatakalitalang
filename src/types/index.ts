// 1. Live Status & Konfigurasi Desa Wisata (Diupdate harian oleh Admin)
export interface ParkStatusConfig {
  isOpen: boolean; // Buka / Tutup Sementara
  statusLabel: 'Normal - Aman Dikunjungi' | 'Waspada Kabut / Hujan' | 'Tutup Sementara';
  merapiVisibility: 'Terlihat Jelas (Cerah)' | 'Tertutup Kabut Tipis' | 'Tertutup Awan Tebal';
  temperatureC: number; // contoh: 20
  weatherCondition: string; // contoh: "Cerah Berawan"
  ticketPriceWNI: number; // contoh: 5000
  parkingMotor: number; // contoh: 2000
  parkingMobil: number; // contoh: 5000
  operatingHours: string; // contoh: "07.00 - 17.00 WIB"
  whatsappContact: string; // contoh: "6281234567890"
  heroVideoUrl: string;
  heroPosterUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  updatedAt: string;
}

// 2. Model Jalur Trekking & Sepeda (Komoot Style)
export interface TrailWaypoint {
  name: string;
  distanceFromStartKm: number;
  description: string;
  imageUrl: string;
}

export interface TrailRoute {
  id: string;
  slug: string;
  title: string;
  category: 'Trekking' | 'Fun Trail' | 'Downhill / MTB';
  difficulty: 'Mudah (Family)' | 'Menengah' | 'Menantang';
  distanceKm: number; // contoh: 2.8
  durationEstimate: string; // contoh: "1 - 1.5 Jam"
  elevationGainM: number; // contoh: 140
  maxAltitudeMdpl: number; // contoh: 1180
  summary: string;
  coverImage: string;
  galleryImages: string[];
  elevationProfilePoints: number[]; // Array angka 0-100 untuk digambar menjadi grafik SVG
  waypoints: TrailWaypoint[];
  safetyNotes: string[];
}

// 3. Model Event & Pendaftaran (Termasuk Kali Talang Fun Trekking)
export interface EventRundownItem {
  time: string;
  activity: string;
}

export interface EcoEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string; // ISO Date (contoh: "2026-12-12")
  timeRange: string; // contoh: "06.30 - 12.00 WIB"
  locationPoint: string; // contoh: "Titik Kumpul: Gerbang Utama Ekowisata Kali Talang, Balerante"
  priceLabel: string; // contoh: "Rp 35.000 / Peserta (Early Bird)"
  quotaLabel: string; // contoh: "Terbatas 150 Peserta"
  isFeatured: boolean; // Tampil paling menonjol di Home
  status: 'Registration Open' | 'Coming Soon' | 'Sold Out' | 'Completed';
  bannerImage: string;
  description: string;
  highlights: string[]; // Benefit peserta: Jersey/Bib, Snack Lokal Balerante, Medali, Pemandu
  rundown: EventRundownItem[];
  googleFormUrl: string; // Admin cukup input link GForm biasa atau link singkat
}

// 4. Model Galeri & Spot Wisata
export interface GalleryItem {
  id: string;
  title: string;
  category: 'Merapi View' | 'Trekking & Hutan' | 'UMKM & Budaya Balerante' | 'Event';
  imageUrl: string;
  caption: string;
}

// 5. Auth & Admin Types
export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

