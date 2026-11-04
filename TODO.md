# EXECUTION PLAN & TASK CHECKLIST (TODO.md)

Instruksi untuk Coding Agent: Kerjakan daftar tugas di bawah ini secara berurutan dari **Phase 1 hingga Phase 6**. Pastikan setiap komponen bebas dari *TypeScript error*, memiliki desain responsif (Mobile & Desktop), dan mematuhi panduan estetika di `DESIGN.md`.

---

## Phase 1: Project Setup, Design Tokens & Smooth Scroll Engine
- [x] **1.1. Dependencies Check & Installation:** Paket terinstal: `react-router-dom`, `lucide-react`, `framer-motion`, dan `lenis`.
- [x] **1.2. Typography & Tailwind Config:**
  - Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`) terpasang di `index.html`.
  - Konfigurasi warna kustom (`canopy`, `basalt`, `mist`, `ember`, `trail-green`) dan *font family* di `tailwind.config.js` dan `src/index.css`.
- [x] **1.3. Smooth Scroll Wrapper (`src/components/layout/SmoothScrollWrapper.tsx`):**
  - Implementasi *smooth scrolling* untuk seluruh *route* publik (`/`, `/trails/*`, `/events/*`, `/about`).
  - **CRITICAL:** Nonaktifkan Lenis dan lakukan `window.scrollTo(0, 0)` setiap kali berpindah *route* atau saat berada di dalam *route* `/admin/*`.

---

## Phase 2: Data Architecture & Realistic Kali Talang Seed Data
- [x] **2.1. TypeScript Interfaces (`src/types/index.ts`):** Terbuat seluruh *interface* sesuai spesifikasi `PRD.md` (`ParkStatusConfig`, `TrailRoute`, `EcoEvent`, `GalleryItem`).
- [x] **2.2. Rich Seed Data (`src/data/initialSeedData.ts`):**
  - Data awal otentik untuk **Ekowisata Kali Talang, Desa Balerante, Klaten**:
    - Status awal: Buka, Jarak Pandang Merapi: Terlihat Jelas (Cerah), Suhu 20°C, Tiket Rp 5.000.
    - **Featured Event:** *"Kali Talang Fun Trekking 2026"* (Lengkap dengan deskripsi, *benefit* jersey/medali/kuliner lokal, *rundown* 06.00 - 11.30 WIB, dan link Google Form pendaftaran).
    - **Event Kedua:** *"Merapi Golden Sunrise & Coffee Morning Balerante"*.
    - **3 Rute Komoot-Style:**
      1. *Jalur Utama Kali Talang Fun Trekking* (2.8 km, Elevasi +140m, Mudah/Family, 4 Waypoints: Gerbang Utama, Hutan Pinus Lereng, Jembatan Bambu, Gardu Pandang Merapi 4KM).
      2. *Jalur Eksplorasi Jurang Lahar & Savana* (4.5 km, Elevasi +260m, Menengah).
      3. *Jalur Kali Talang Downhill Track* (3.2 km, Elevasi -310m, Menantang - MTB).
    - **8 Item Galeri** foto pegunungan, jalur hutan, kabut pagi, dan aktivitas trekking.
- [x] **2.3. Asynchronous Service Layer (`src/services/dataService.ts`):**
  - Fungsi CRUD lengkap (`getParkStatus`, `updateParkStatus`, `getEvents`, `saveEvent`, `deleteEvent`, `getTrails`, `saveTrail`, `deleteTrail`, `getGallery`, `saveGalleryItem`, `deleteGalleryItem`, `resetAllDataToSeed`).
  - Helper utility `formatGoogleFormUrl(rawUrl: string)` yang otomatis memastikan parameter `embedded=true` terpasang aman.

---

## Phase 3: Global Public Components (Navbar, Footer, Modals)
- [x] **3.1. Adaptive Navbar (`src/components/layout/Navbar.tsx`):**
  - Transparan di atas Hero, berubah menjadi `bg-canopy-950/90 backdrop-blur-md` saat di-*scroll*.
  - Menampilkan *Live Status Badge* (Status Buka/Tutup & Suhu dari `ParkStatusConfig`), menu navigasi, tombol CTA `"Fun Trekking"`, dan drawer menu responsif.
- [x] **3.2. Editorial Footer (`src/components/layout/Footer.tsx`):**
  - Informasi Desa Balerante, Kecamatan Kemalang, Klaten, jam operasional, kontak WhatsApp dinamis, *credit badge* **"Pengabdian Masyarakat - Aksara Mahasiswa Berdampak"**, dan tombol menuju Portal Admin.
- [x] **3.3. Google Form Registration Modal (`src/components/events/RegistrationModal.tsx`):**
  - Modal/Drawer interaktif yang menampilkan ringkasan event di bagian atas, *embed iframe* Google Form di bagian tengah, *loading indicator*, dan tombol *"Buka Google Form di Tab Baru"*.

---

## Phase 4: Public Pages Implementation (Bunaken x Komoot Experience)
- [x] **4.1. Home Page (`src/pages/public/HomePage.tsx`):**
  - **Full-Screen Video Hero:** Video background *full-screen* dengan *fallback poster*, *headline serif* dramatis, tombol CTA, dan *Live Telemetry Bar* di bagian bawah.
  - **Scroll Storytelling Section:** 3 bagian narasi visual tentang keajaiban jarak 4 km dari puncak Merapi dan ketangguhan warga Desa Balerante dengan *asymmetric editorial split*.
  - **Featured Event Spotlight ("Kali Talang Fun Trekking"):** Dilengkapi *Live Countdown Timer*, *highlights*, dan tombol langsung membuka *Registration Modal* atau halaman detail.
  - **Komoot-Style Trail Preview:** Menampilkan 3 kartu rute dengan grafik elevasi SVG dan filter kategori.
  - **Visitor Practical Guide:** Informasi harga tiket, parkir, waktu kunjungan terbaik, dan panduan arah Google Maps.
- [x] **4.2. Trails Explorer & Detail Page (`src/pages/public/TrailsPage.tsx` & `TrailDetailPage.tsx`):**
  - Katalog rute dengan filter tingkat kesulitan & kategori.
  - Halaman detail rute bergaya Komoot: *Telemetry Header*, *Interactive SVG Elevation Profile*, *Interactive Waypoints Stepper* (klik pos untuk melihat foto & detail pos), serta *Safety Checklist*.
- [x] **4.3. Events & Fun Trekking Page (`src/pages/public/EventsPage.tsx` & `EventDetailPage.tsx`):**
  - Daftar agenda kegiatan di Kali Talang.
  - Halaman detail event dengan *sticky registration sidebar*, *rundown timeline*, daftar fasilitas peserta, dan *embedded Google Form* langsung di halaman.
- [x] **4.4. About & Gallery Page (`src/pages/public/AboutGalleryPage.tsx`):**
  - Cerita Ekowisata Kali Talang & Desa Balerante, filter galeri foto dengan *lightbox modal*, serta seksi kolaborasi **Aksara Mahasiswa Berdampak**.

---

## Phase 5: Admin CMS & CRUD Implementation (`/admin/*`)
- [x] **5.1. Admin Auth & Layout (`src/pages/admin/AdminLoginPage.tsx` & `AdminLayout.tsx`):**
  - Halaman login dengan kredensial demo sekali klik (*Auto-fill Demo Credentials*).
  - Layout dashboard dengan Sidebar navigasi (`Status & Beranda`, `Kelola Event & GForm`, `Kelola Rute Komoot`, `Kelola Galeri`, `Lihat Web Publik`, `Reset ke Seed Data`).
- [x] **5.2. Live Status & Hero Editor (`src/pages/admin/AdminDashboardPage.tsx`):**
  - Form interaktif untuk mengubah status Buka/Tutup Kali Talang, Jarak Pandang Merapi, Suhu, Harga Tiket, Nomor WhatsApp, dan Video/Teks Hero. Dilengkapi notifikasi *toast* saat berhasil disimpan.
- [x] **5.3. Event & GForm CRUD Manager (`src/pages/admin/AdminEventsPage.tsx`):**
  - Tabel daftar event + tombol Tambah/Edit/Hapus.
  - Form editor lengkap dengan input **Link Google Form** (dengan fitur Live Test Embed), editor *rundown* dinamis, editor *benefit*, dan tombol *Set Featured Event*.
- [x] **5.4. Trail Route CRUD Manager (`src/pages/admin/AdminTrailsPage.tsx`):**
  - Tabel daftar rute + form Tambah/Edit/Hapus rute (jarak, elevasi, kesulitan, deskripsi, profil SVG point, dan daftar *waypoint* interaktif).
- [x] **5.5. Gallery CRUD Manager (`src/pages/admin/AdminGalleryPage.tsx`):**
  - Tambah foto baru via URL gambar, pilih kategori, edit *caption*, dan hapus foto dengan *preview live*.

---

## Phase 6: Final Polish & Quality Assurance
- [x] **6.1. End-to-End CRUD Verification:** Perubahan status gunung, penambahan event baru, atau penggantian link Google Form tersimpan di service layer dan langsung tersinkronisasi ke seluruh halaman publik.
- [x] **6.2. Responsive & Contrast Audit:** Seluruh teks di atas video/gambar terbaca sempurna di layar HP maupun laptop, tidak ada horizontal overflow, dan mematuhi panduan Anti-AI-Slop di `DESIGN.md`.
