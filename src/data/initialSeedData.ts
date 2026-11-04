import { ParkStatusConfig, TrailRoute, EcoEvent, GalleryItem } from '../types';

export const INITIAL_PARK_STATUS: ParkStatusConfig = {
  isOpen: true,
  statusLabel: 'Normal - Aman Dikunjungi',
  merapiVisibility: 'Terlihat Jelas (Cerah)',
  temperatureC: 20,
  weatherCondition: 'Cerah Sejuk Berangin',
  ticketPriceWNI: 5000,
  parkingMotor: 2000,
  parkingMobil: 5000,
  operatingHours: '07.00 - 17.00 WIB',
  whatsappContact: '6285743219080',
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-over-a-mountain-range-29472-large.mp4',
  heroPosterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
  heroHeadline: 'Harmoni Alam di Bawah Puncak Merapi',
  heroSubheadline: 'Menyaksikan kemegahan gunung berapi paling aktif di dunia dari jarak 4 kilometer dalam dekapan hutan pinus dan kearifan Desa Balerante.',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_EVENTS: EcoEvent[] = [
  {
    id: 'evt-fun-trekking-2026',
    slug: 'kali-talang-fun-trekking-2026',
    title: 'Kali Talang Fun Trekking 2026',
    subtitle: 'Jelajah Alam 4 KM dari Puncak Gunung Merapi bersama Warga Balerante',
    date: '2026-11-28',
    timeRange: '06.00 - 11.30 WIB',
    locationPoint: 'Gerbang Utama Ekowisata Kali Talang, Desa Balerante, Kec. Kemalang, Klaten',
    priceLabel: 'Rp 35.000 / Peserta (Early Bird)',
    quotaLabel: 'Sisa Kuota: 45 dari 150 Peserta',
    isFeatured: true,
    status: 'Registration Open',
    bannerImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80',
    description: 'Ajang jalan santai dan petualangan ramah keluarga yang melintasi jalur kanopi pinus lereng Merapi, menyusuri tebing jurang lahar Kali Talang, dan berakhir di Gardu Pandang dengan panorama kawah puncak Merapi yang spektakuler. Diinisiasi bersama Kelompok Sadar Wisata (Pokdarwis) Desa Balerante dan Program Aksara Mahasiswa Berdampak.',
    highlights: [
      'Jersey Eksklusif Kali Talang Fun Trekking 2026',
      'Medali Kayu Finisher Buatan Pengrajin Desa Balerante',
      'Snack Rebusan Tradisional & Teh Rempah Serai Hangat',
      'Asuransi Keselamatan & Tim Medis Berpengalaman',
      'Panduan Pemandu Jalur Lokal Balerante',
      'Tiket Masuk & Parkir Kawasan Wisata Gratis'
    ],
    rundown: [
      { time: '06.00 - 06.45 WIB', activity: 'Registrasi Ulang Peserta, Pembagian Race Pack & Welcome Drink' },
      { time: '06.45 - 07.00 WIB', activity: 'Pemanasan Bersama, Doa, dan Sambutan Kepala Desa Balerante' },
      { time: '07.00 - 07.15 WIB', activity: 'Flag-Off / Pelepasan Rombongan Trekking Jalur Pinus' },
      { time: '07.15 - 09.30 WIB', activity: 'Trekking Menyusuri 4 Waypoint Utama & Sesi Foto Gardu Pandang' },
      { time: '09.30 - 10.30 WIB', activity: 'Finisher Gathering, Pembagian Medali & Sarapan Kuliner Balerante' },
      { time: '10.30 - 11.30 WIB', activity: 'Live Musik Akustik Lokal, Doorprize & Penutupan Acara' }
    ],
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd974b7K-KaliTalangFunTrekkingSample/viewform?embedded=true',
  },
  {
    id: 'evt-merapi-sunrise-coffee',
    slug: 'merapi-golden-sunrise-coffee-morning',
    title: 'Merapi Golden Sunrise & Coffee Morning',
    subtitle: 'Menyapa Mentari Pagi bersama Seduhan Robusta Lereng Balerante',
    date: '2026-12-19',
    timeRange: '05.00 - 08.30 WIB',
    locationPoint: 'Deck Gardu Pandang Utama Kali Talang (Elevasi 1.180 MDPL)',
    priceLabel: 'Rp 25.000 / Peserta',
    quotaLabel: 'Terbatas 40 Peserta',
    isFeatured: false,
    status: 'Registration Open',
    bannerImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
    description: 'Sesi eksklusif menikmati momen matahari terbit yang menerpa dinding kawah Merapi, ditemani aroma seduhan kopi khas petani lereng Balerante dan obrolan hangat tentang kearifan mitigasi bencana masyarakat lereng.',
    highlights: [
      'Free Flow Kopi Robusta & Arabika Balerante',
      'Sesi Bincang Kearifan Merapi bersama Sesepuh Desa',
      'Spot Foto Prioritas Sunrise di Deck Bambu',
      'Gorengan Tempe Mendoan Hangat & Singkong Goreng'
    ],
    rundown: [
      { time: '05.00 - 05.20 WIB', activity: 'Berkumpul di Pos Registrasi & Briefing Jalur Pagi' },
      { time: '05.20 - 06.00 WIB', activity: 'Menyaksikan Golden Sunrise Merapi di Deck Bambu' },
      { time: '06.00 - 07.15 WIB', activity: 'Cupping Session Kopi Balerante & Edukasi Pascapanen' },
      { time: '07.15 - 08.30 WIB', activity: 'Diskusi Santai Kearifan Lokal & Selesai' }
    ],
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScSunriseCoffeeSample/viewform?embedded=true',
  }
];

export const INITIAL_TRAILS: TrailRoute[] = [
  {
    id: 'trail-utama-fun-trekking',
    slug: 'jalur-utama-kali-talang-fun-trekking',
    title: 'Jalur Utama Kali Talang Fun Trekking',
    category: 'Fun Trail',
    difficulty: 'Mudah (Family)',
    distanceKm: 2.8,
    durationEstimate: '1 - 1.5 Jam',
    elevationGainM: 140,
    maxAltitudeMdpl: 1180,
    summary: 'Rute paling ramah untuk keluarga dan pemula dengan naungan hutan pinus yang teduh, jembatan bambu artistik, dan pemandangan puncak Merapi yang megah.',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80'
    ],
    elevationProfilePoints: [20, 25, 30, 45, 60, 75, 82, 88, 92, 100, 95, 85, 70, 50, 30, 20],
    waypoints: [
      {
        name: 'Gerbang Utama & Pusat Informasi',
        distanceFromStartKm: 0.0,
        description: 'Titik awal perjalanan di mana pengunjung mengecek tiket, membaca peta jalur, dan mendapatkan briefing keamanan.',
        imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Lorong Hutan Pinus Lereng',
        distanceFromStartKm: 0.8,
        description: 'Kawasan hutan pinus beraroma khas dengan hembusan angin sejuk lereng gunung.',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Jembatan Bambu Jurang Talang',
        distanceFromStartKm: 1.7,
        description: 'Jembatan gantung bambu tradisional karya swadaya warga yang melintasi alur jurang aliran lahar.',
        imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Gardu Pandang Merapi 4KM (Spot Tertinggi)',
        distanceFromStartKm: 2.8,
        description: 'Deck kayu kokoh menghadap langsung ke kubah lava aktif puncak Merapi dengan sudut pandang 180 derajat tanpa halangan.',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    safetyNotes: [
      'Gunakan sepatu olahraga atau sandal gunung beralas karet anti-selip.',
      'Bawa botol minum pribadi (tersedia pengisian ulang di pos gerbang).',
      'Tetap berada di jalur resmi dan jangan melompati pagar pembatas jurang.',
      'Patuhi rambu peringatan cuaca dari pos pantau Balerante.'
    ]
  },
  {
    id: 'trail-jurang-lahar-savana',
    slug: 'jalur-eksplorasi-jurang-lahar-savana',
    title: 'Jalur Eksplorasi Jurang Lahar & Savana',
    category: 'Trekking',
    difficulty: 'Menengah',
    distanceKm: 4.5,
    durationEstimate: '2.5 - 3 Jam',
    elevationGainM: 260,
    maxAltitudeMdpl: 1250,
    summary: 'Menyusuri tepian bibir jurang Kali Woro, melintasi hamparan savana rumput gajah, serta melewati tanggul penahan lahar (Sabo Dam) dengan kontur bergelombang.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    elevationProfilePoints: [15, 25, 40, 55, 65, 80, 85, 95, 100, 90, 80, 75, 65, 50, 40, 25, 15],
    waypoints: [
      {
        name: 'Titik Temu Sabo Dam Kali Woro',
        distanceFromStartKm: 0.0,
        description: 'Tanggul kokoh peninggalan teknik mitigasi lahar dingin yang kini menjadi spot foto lanskap dramatis.',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Padang Savana Rumput Gajah',
        distanceFromStartKm: 1.9,
        description: 'Hamparan hijau luas tempat ternak warga Balerante merumput dengan siluet Merapi di kejauhan.',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Tebing Patahan Lava Purba',
        distanceFromStartKm: 3.2,
        description: 'Formasi batuan vulkanik andesit berusia puluhan tahun dengan tekstur eksotis kehitaman.',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Puncak Shelter Bambu Balerante',
        distanceFromStartKm: 4.5,
        description: 'Pondok istirahat kayu dengan tiupan angin sejuk dan panorama perbukitan Klaten hingga Boyolali.',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    safetyNotes: [
      'Disarankan menggunakan tongkat trekking (trekking pole).',
      'Waspadai bebatuan lepas di tepi tebing aliran lahar.',
      'Bawa jas hujan portabel karena cuaca lereng cepat berubah berkabut.'
    ]
  },
  {
    id: 'trail-downhill-track',
    slug: 'jalur-kali-talang-downhill-track',
    title: 'Kali Talang Downhill Track (MTB)',
    category: 'Downhill / MTB',
    difficulty: 'Menantang',
    distanceKm: 3.2,
    durationEstimate: '30 - 45 Menit',
    elevationGainM: 40,
    maxAltitudeMdpl: 1190,
    summary: 'Trek sepeda gunung teknikal legendaris favorit komunitas sepeda Jawa Tengah & DIY. Menawarkan turunan curam, berm tanah liat padat, dan rock garden alami.',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80'
    ],
    elevationProfilePoints: [100, 95, 88, 80, 72, 60, 50, 42, 35, 28, 20, 15, 10, 8, 5, 0],
    waypoints: [
      {
        name: 'Drop-off Gate Tower Pinus',
        distanceFromStartKm: 0.0,
        description: 'Platform kayu awal meluncur dengan turunan 35 derajat memasuki kanopi hutan pinus.',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Rock Garden Kali Talang',
        distanceFromStartKm: 1.2,
        description: 'Lintasan bebatuan lahar andesit yang menuntut keahlian suspensi dan kendali kemudi penuh.',
        imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'High-speed Pine Berms',
        distanceFromStartKm: 2.3,
        description: 'Lekukan tikungan tanah miring berturutan dengan kecepatan tinggi di bawah rindangnya pohon pinus.',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Finish Arena Basecamp Kali Talang',
        distanceFromStartKm: 3.2,
        description: 'Garis finis di area terbuka berdekatan dengan warung kopi warga dan tempat cuci sepeda.',
        imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    safetyNotes: [
      'Wajib menggunakan helm full-face, knee pad, dan elbow pad.',
      'Hanya untuk sepeda spesifikasi All-Mountain, Enduro, atau Downhill.',
      'Dilarang melintas bagi pejalan kaki di jalur khusus sepeda.'
    ]
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Kubah Puncak Merapi 4 KM',
    category: 'Merapi View',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tampak kepulan asap solfatara tipis dari kawah puncak Merapi pada pukul 06.30 pagi dari deck gardu pandang Kali Talang.',
  },
  {
    id: 'gal-2',
    title: 'Lorong Pinus Berbalut Kabut',
    category: 'Trekking & Hutan',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Suasana pagi hari di trek pinus ketika kabut tipis lereng menyelimuti jalur trekking santai.',
  },
  {
    id: 'gal-3',
    title: 'Pesona Jembatan Bambu Artistik',
    category: 'Trekking & Hutan',
    imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80',
    caption: 'Struktur bambu tradisional yang dibangun gotong-royong oleh warga Balerante menghubungkan tebing jurang Kali Talang.',
  },
  {
    id: 'gal-4',
    title: 'Seduhan Kopi Lereng Balerante',
    category: 'UMKM & Budaya Balerante',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    caption: 'Biji kopi robusta yang ditanam di tanah vulkanik Balerante diseduh hangat mendampingi obrolan pagi di warung warga.',
  },
  {
    id: 'gal-5',
    title: 'Keseruan Peserta Fun Trekking',
    category: 'Event',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    caption: 'Senyum antusias peserta jalan sehat saat mencapai checkpoint Gardu Pandang dengan latar belakang tebing kawah.',
  },
  {
    id: 'gal-6',
    title: 'Komunitas Sepeda Gunung di Rock Garden',
    category: 'Event',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Aksi pesepeda melibas rintangan bebatuan di trek downhill Kali Talang yang memacu adrenalin.',
  },
  {
    id: 'gal-7',
    title: 'Kehangatan Warga Desa Balerante',
    category: 'UMKM & Budaya Balerante',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Keramahan warga lereng yang senantiasa menyambut para pendatang dengan senyuman tulus dan teh hangat serai.',
  },
  {
    id: 'gal-8',
    title: 'Lembah Aliran Lahar Purba',
    category: 'Merapi View',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    caption: 'Kontur jurang Kali Talang yang mengalirkan material vulkanik Merapi, kini bertransformasi menjadi bentang alam eksotis.',
  }
];

