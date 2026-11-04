# DESIGN SYSTEM & AESTHETIC DIRECTION: Ekowisata Kali Talang (Balerante)

## 1. Core Aesthetic Philosophy (Bunaken Oasis x Komoot)
Website ini menggabungkan dua filosofi desain kelas dunia:
1. **Immersive Editorial Storytelling (Bunaken Oasis Vibe):** Mengandalkan video dan fotografi *full-bleed* (100vw/100vh), tipografi *serif* berkelas untuk *headline*, ruang kosong (*whitespace*) yang lega, dan transisi *smooth-scrolling* yang dramatis seperti majalah alam premium.
2. **Tactical Outdoor Utility (Komoot Vibe):** Menampilkan informasi jalur trekking, elevasi, jarak, cuaca, dan status gunung dengan kartu *widget* yang presisi, bersih, berorientasi data, dan sangat mudah dipindai di bawah sinar matahari (*high contrast*).

---

## 2. STRICT ANTI-AI-SLOP GUARDRAILS (WAJIB DIIKUTI AGENT)
- **DILARANG KERAS** menggunakan warna *default* Tailwind seperti `indigo-*`, `purple-*`, `blue-500`, atau `emerald-500` mentah.
- **DILARANG** membuat tombol dengan gradasi neon/pelangi (`bg-gradient-to-r from-blue-500 to-purple-600`).
- **DILARANG** meletakkan 3 kartu identik berjejer dengan ikon di tengah lingkaran di setiap section. Gunakan *Bento Grid*, *Asymmetric Editorial Split* (5 kolom teks : 7 kolom gambar), atau *Horizontal Snap Carousel*.
- **DILARANG** menampilkan *raw JSON* atau form input tanpa *label* dan *focus ring* yang jelas di halaman Admin.
- Semua gambar/video dari Unsplash atau aset lokal **WAJIB** memiliki *fallback state* dan *overlay gradient* tipis jika di atasnya terdapat teks putih.

---

## 3. Color Palette (Volcanic Pine & Morning Mist Theme)
Konfigurasi warna wajib dimasukkan ke dalam `tailwind.config.js` atau variabel CSS:

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `canopy-950` | `#0F2419` | Primary Dark Background, Hero Overlay Base, Footer |
| `canopy-800` | `#1B3B2B` | Secondary Dark Surface, Admin Sidebar, Active States |
| `basalt-900` | `#1C1E1D` | Primary Body Text (di atas background terang), Dark Cards |
| `basalt-600` | `#525856` | Muted Text, Captions, Metadata Rute |
| `mist-50` | `#F6F7F4` | Primary Light Background (Warm Alabaster, bukan `#FFFFFF` murni) |
| `mist-200` | `#E4E7E0` | Subtle Borders, Dividers, Card Outlines (`1px solid`) |
| `ember-600` | `#D95D39` | Primary Accent / CTA Button (Merapi Lava / Adventure Orange) |
| `ember-500` | `#E87250` | CTA Hover State, Active Trail Highlights |
| `trail-green` | `#2E6F40` | Komoot-style Status Badge (Status: Buka / Easy Trail) |
| `status-warn` | `#D97706` | Status Waspada / Kabut Tebal |
| `status-danger`| `#DC2626` | Status Jalur Tutup |

---

## 4. Typography System
Import dari Google Fonts di `index.html`:
- **Heading / Editorial Font (`font-serif`):** `'Playfair Display'`, serif (Weight: 500, 600, 700, Italic). Digunakan untuk Hero Title, Section Headers, dan Pull Quotes ala Bunaken Oasis.
- **UI & Body Font (`font-sans`):** `'Plus Jakarta Sans'`, sans-serif (Weight: 400, 500, 600, 700). Digunakan untuk navigasi, deskripsi, tombol, dan seluruh halaman Admin.
- **Technical / Telemetry Font (`font-mono`):** `'JetBrains Mono'`, monospace (Weight: 500). Digunakan khusus untuk metrik Komoot: angka jarak (`2.4 KM`), elevasi (`1,180 MDPL`), koordinat, dan *countdown timer* event.

### Typographic Scale:
- **Hero Display:** `text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.08]`
- **Section Title:** `text-3xl md:text-5xl font-serif tracking-tight leading-[1.15]`
- **Sub-headline / Lead:** `text-lg md:text-xl font-sans font-normal leading-relaxed text-basalt-600`
- **Telemetry Badge:** `text-xs font-mono uppercase tracking-widest`

---

## 5. Layout, Spacing & Component Specifications

### A. Navbar (Adaptive Glassmorphism)
- Posisi `fixed top-0 inset-x-0 z-50 transition-all duration-500`.
- **State 1 (Top of Hero):** `bg-transparent text-white border-b border-white/10 py-5`.
- **State 2 (Scrolled > 60px):** `bg-canopy-950/90 backdrop-blur-md text-white shadow-lg py-3.5`.
- Dilengkapi indikator kecil di kanan: **Live Status Pill** (titik hijau berkedip `animate-pulse` + teks `Jalur Buka • 19°C`).

### B. Full-Screen Video Hero & Scroll Storytelling (Bunaken Style)
- Ukuran: `relative h-screen w-full overflow-hidden`.
- Elemen `<video autoPlay muted loop playsInline poster="...">` dengan `object-cover w-full h-full scale-105`.
- **Overlay Wajib:** `bg-gradient-to-b from-canopy-950/60 via-canopy-950/30 to-canopy-950/90`.
- **Scroll Storytelling Section:** Gunakan *sticky container* atau *scroll-triggered parallax* di mana gambar latar gunung bergeser perlahan (`y: [-20, 20]`) saat blok narasi tentang kearifan lokal Desa Balerante muncul secara bertahap (`opacity: 0 -> 1`, `y: 30 -> 0`).

### C. Komoot-Style Trail Cards & Elevation Profile
- Desain kartu *tactical* dengan `bg-white rounded-2xl border border-mist-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`.
- **Telemetry Grid di dalam Card:** Baris metrik berisi 3 kolom dengan garis pemisah vertikal tipis (`divide-x divide-mist-200`):
  1. `Jarak` (misal: `3.2 km`)
  2. `Elevasi` (misal: `+185 m`)
  3. `Durasi` (misal: `1j 30m`)
- **Difficulty Pill:** Badge warna (`Mudah / Family` = Hijau, `Menengah` = Amber, `Menantang` = Merah).
- **SVG Elevation Visual:** Sertakan grafik garis SVG sederhana di bawah kartu yang menggambarkan profil kemiringan jalur.

### D. Event & Google Form Embed Experience
- Jangan pernah melempar user keluar dari website secara tiba-tiba.
- Tombol **"Daftar Fun Trekking"** akan membuka halaman detail `/events/:slug` atau **Slide-Over Drawer / Modal** berukuran lebar (`max-w-3xl`).
- Di bagian *Embed Google Form*, tampilkan *skeleton loader* terlebih dahulu, gunakan `iframe` yang responsif (`w-full min-h-[650px] rounded-xl border border-mist-200 bg-white`), ditambah tombol cadangan *"Buka Form di Tab Baru"* jika browser user memblokir *iframe*.

### E. Admin Dashboard UI
- Gunakan layout `Sidebar (Kiri) + Topbar + Main Content Area (Kanan)` dengan tema terang yang bersih (`bg-mist-50`) dan *sidebar* `bg-canopy-950 text-white`.
- **PENTING:** Saat berada di route `/admin/*`, matikan efek *smooth scroll* Lenis agar tabel dan form *input* admin terasa instan dan *snappy*.