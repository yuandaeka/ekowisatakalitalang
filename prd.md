# PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project Name:** Website Resmi & Portal Event Ekowisata Kali Talang - Desa Balerante  
**Program Context:** Pengabdian Masyarakat - Aksara Mahasiswa Berdampak  
**Location:** Desa Balerante, Kec. Kemalang, Kab. Klaten, Jawa Tengah  
**Tech Stack:** React (Vite), TypeScript, Tailwind CSS, React Router v6, Framer Motion, Lenis Smooth Scroll, Lucide React.

---

## 1. Product Vision & Objectives
Membangun platform web *branding* dan informasi wisata kelas atas untuk **Ekowisata Kali Talang** yang mampu memukau pengunjung sejak detik pertama (melalui visual *full-screen video* dan *smooth scroll* ala Bunaken Oasis), menyajikan informasi rute *trekking* & sepeda secara presisi (ala Komoot), serta memfasilitasi pendaftaran event unggulan **"Kali Talang Fun Trekking"** melalui integrasi Google Form yang dapat dikelola penuh melalui halaman **Admin CMS**.

---

## 2. System Architecture & Data Layer (VPS-Ready Hybrid Architecture)
Karena keputusan pemilihan server/VPS dilakukan pada tahap berikutnya, arsitektur data **WAJIB** menggunakan **Repository / Service Layer Pattern**:
1. Semua komponen React memanggil fungsi asinkron dari `src/services/dataService.ts` (contoh: `await getEvents()`, `await updateParkStatus(payload)`).
2. Saat ini, `dataService.ts` membaca dan menyimpan perubahan ke `localStorage` dengan **Data Awal (Seed Data)** yang kaya dan realistis dari `src/data/initialSeedData.ts`.
3. Terdapat tombol **"Reset ke Data Awal"** di halaman Admin Settings untuk memudahkan pengujian dan demo.
4. Ketika nantinya VPS (Node/Go/Laravel API) sudah siap, developer hanya perlu mengganti isi `dataService.ts` dengan `fetch/axios` tanpa mengubah satu baris pun kode di komponen UI.

---

## 3. Data Models (TypeScript Interfaces)

```typescript
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
  waypoints: {
    name: string;
    distanceFromStartKm: number;
    description: string;
    imageUrl: string;
  }[];
  safetyNotes: string[];
}

// 3. Model Event & Pendaftaran (Termasuk Kali Talang Fun Trekking)
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
  rundown: { time: string; activity: string }[];
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


4. Functional Requirements: Public Pages
4.1. Home Page (/)
Immersive Video Hero:

Menampilkan video looping berlatar lanskap pegunungan berkabut/hutan dengan fallback image.

Live Telemetry Bar (Bawah Hero): Menampilkan informasi real-time dari ParkStatusConfig (Status Buka/Tutup, Jarak Pandang Puncak Merapi, Suhu Udara, Harga Tiket Masuk Rp 5.000).

Dual CTA: Tombol primer "Daftar Kali Talang Fun Trekking" dan tombol sekunder "Jelajahi Rute (Komoot View)".

Scroll Storytelling Section (Bunaken Oasis Style):

Tiga babak narasi visual yang aktif saat di-scroll:

Babak 1: Berdiri Hanya 4 Kilometer dari Puncak Merapi (Keindahan gardu pandang & jurang aliran lahar).

Babak 2: Harmoni Alam & Ketangguhan Warga Desa Balerante (Kearifan hidup berdampingan dengan gunung berapi & ekowisata berbasis masyarakat).

Babak 3: Udara Segar Hutan Lereng & Jalur Petualangan (Pengantar menuju katalog rute).

Featured Event Spotlight ("Kali Talang Fun Trekking"):

Seksi khusus dengan latar gelap (canopy-950), dilengkapi Live Countdown Timer (Hari : Jam : Menit : Detik), daftar benefit peserta, dan tombol buka modal pendaftaran / halaman detail event.

Interactive Trail Explorer Preview (Komoot Style):

Menampilkan kartu rute dengan filter kategori (Semua, Trekking, Fun Trail, Downhill / MTB) lengkap dengan visualisasi grafik elevasi SVG dan waypoint singkat.

Visitor Guide & Map Section:

Jam buka, rincian tiket masuk & parkir, tips waktu terbaik berkunjung (06.30 - 09.00 WIB sebelum kabut turun), serta integrasi petunjuk arah Google Maps menuju Desa Balerante, Klaten.

4.2. Trails Page (/trails & /trails/:slug)
Halaman Katalog (/trails): Filter tingkat kesulitan dan jenis aktivitas.

Halaman Detail Rute (/trails/:slug):

Header spesifikasi teknis ala Komoot (Jarak, Elevasi, Ketinggian Mdpl, Durasi).

Interactive Elevation & Waypoint Viewer: Ketika user mengklik salah satu titik Waypoint (misal: Pos 1 Gerbang Hutan, Pos 2 Jembatan Bambu, Pos 3 Gardu Pandang Merapi), gambar dan deskripsi spot tersebut ter-highlight.

Daftar perlengkapan yang disarankan (sepatu anti-selip, jaket angin, air minum).

4.3. Events Page & Registration Flow (/events & /events/:slug)
Menampilkan event utama "Kali Talang Fun Trekking" dan agenda lainnya.

Halaman Detail Event (/events/:slug):

Menyajikan deskripsi lengkap, rundown acara, benefit, dan rincian biaya.

Smart Google Form Embedder:

Sistem wajib memiliki helper function formatGoogleFormEmbedUrl(url: string) yang otomatis mengubah URL Google Form standar (/viewform?usp=sf_link) menjadi URL embed (/viewform?embedded=true).

Menampilkan <iframe> pendaftaran langsung di dalam halaman (atau di dalam Modal Drawer), disertai tombol "Buka Formulir di Tab Baru" sebagai fallback aman bagi pengguna mobile browser yang membatasi iframe.

4.4. About & Gallery Page (/about)
Menampilkan profil Desa Wisata Balerante, sejarah singkat pengelolaan Ekowisata Kali Talang, galeri foto dengan filter kategori dan lightbox preview, serta profil inisiatif pengabdian Aksara Mahasiswa Berdampak.

5. Functional Requirements: Admin CMS Pages (/admin/*)
5.1. Authentication (/admin/login)
Sistem login berbasis session/token sederhana untuk tahap MVP (Default kredensial demo: admin@kalitalang.id / balerante2026, ditampilkan sebagai hint di halaman login untuk kemudahan pengujian).

Protected Route Wrapper: Pengguna yang belum login otomatis diarahkan ke /admin/login.

5.2. Quick Status & Settings Dashboard (/admin/dashboard)
Panel Cepat Kondisi Hari Ini: Admin dapat mengubah status Buka/Tutup, Jarak Pandang Merapi (Cerah/Berkabut), Suhu, Harga Tiket, dan URL Video Hero hanya dengan beberapa klik. Perubahan langsung tersimpan dan tampil di halaman depan.

Ringkasan statistik konten (Jumlah Event Aktif, Jumlah Rute Trekking, Jumlah Foto Galeri).

5.3. Event & GForm Manager (/admin/events)
Fitur Tambah, Edit, dan Hapus (CRUD) Event.

Form input mencakup: Judul Event, Slug, Tanggal, Waktu, Harga, Kuota, Status Pendaftaran, URL Poster, Daftar Highlight, Rundown Dinamis (bisa tambah/hapus baris jam & kegiatan), dan Input Link Google Form (dilengkapi fitur Live Preview Embed untuk memastikan link GForm valid).

Toggle Set as Featured Event untuk menentukan event mana yang muncul di spotlight halaman utama.

5.4. Trail Route Manager (/admin/trails)
Fitur Tambah, Edit, dan Hapus (CRUD) Rute Trekking/Sepeda.

Admin dapat mengubah jarak (km), elevasi (m), tingkat kesulitan, foto sampul, catatan keamanan, dan daftar titik waypoint.

5.5. Gallery Manager (/admin/gallery)
Tambah dan hapus foto galeri beserta kategori dan caption-nya.