/*
 * ===================================================================
 *  SPECIYAL JOURNEY — FILE ISI (KONTEN)
 *  Cukup edit file ini untuk mengganti teks, rundown, karier, dll.
 *  Teks bertanda [ISI] masih placeholder & menunggu data asli.
 * ===================================================================
 */
window.SPECIYAL = {
  // ---------- Umum ----------
  title: "Speciyal Journey",
  office: "KPP Pratama Jakarta Pasar Minggu",
  tagline: ["One journey, one farewell.", "One more milestone to achieve."],

  // ---------- Musik ----------
  // Taruh file lagu di assets/audio/music.mp3 (atau ganti dengan URL mp3 lain).
  // Jika file belum ada, otomatis diputar melodi instrumental bawaan.
  music: "assets/audio/music.mp3",

  // ---------- Tokoh ----------
  honoree: {
    name: "Oktria Hendrarji",
    nickname: "Pak Iyal",
    position: "Kepala KPP Pratama Jakarta Pasar Minggu",
    photo: "assets/img/pak-iyal.jpg",
    birth: "Lahir 30 Oktober [ISI tahun] di [ISI kota]",
    retire: "Purnabakti 30 Oktober 2026 — tepat di hari ulang tahun beliau",
    quote:
      "“Setiap perjalanan punya akhir, namun setiap akhir adalah awal dari perjalanan yang baru.”",
    bio: [
      "[ISI] Paragraf biografi singkat Pak Iyal — latar belakang keluarga, pendidikan, dan awal mula berkarier di Direktorat Jenderal Pajak.",
      "[ISI] Paragraf kedua — nilai-nilai kepemimpinan, kesan dari rekan kerja, serta kontribusi beliau selama memimpin KPP Pratama Jakarta Pasar Minggu.",
    ],
    facts: [
      { label: "Masa Pengabdian", value: "[ISI] Tahun" },
      { label: "Unit Kerja", value: "[ISI] Kantor" },
      { label: "Hobi", value: "[ISI]" },
    ],
  },

  // ---------- Perjalanan Karier (urut dari awal) ----------
  journey: [
    { year: "[ISI]", place: "Awal Pengabdian", desc: "[ISI] Bergabung dengan Direktorat Jenderal Pajak." },
    { year: "[ISI]", place: "[ISI] Unit / Kantor", desc: "[ISI] Jabatan & cerita singkat." },
    { year: "[ISI]", place: "[ISI] Unit / Kantor", desc: "[ISI] Jabatan & cerita singkat." },
    { year: "[ISI]", place: "KPP Pratama Jakarta Pasar Minggu", desc: "Memimpin sebagai Kepala Kantor." },
    { year: "2026", place: "Purnabakti", desc: "30 Oktober 2026 — menutup pengabdian dengan penuh syukur." },
  ],

  // ---------- Acara ----------
  event: {
    name: "Gathering Speciyal Journey",
    // Format ISO, zona WIB (+07:00). Dipakai juga untuk hitung mundur.
    start: "2026-10-31T07:00:00+07:00",
    end: "2026-10-31T16:00:00+07:00",
    dayLabel: "Sabtu",
    dateLabel: "31 Oktober 2026",
    timeLabel: "07.00 WIB — selesai",
    venue: "Istana Bogor",
    address: "Jl. Ir. H. Juanda No.1, Paledang, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16122",
    mapsQuery: "Istana Bogor",
    // Opsional: tempel link Google Maps khusus (titik kumpul, dll). Kosongkan = pakai mapsQuery.
    mapsLink: "",
    dressCode: "[ISI] Dress code",
  },

  // ---------- Rundown ----------
  rundown: [
    { time: "06.00", title: "Kumpul & Keberangkatan", desc: "[ISI] Titik kumpul KPP Pratama Jakarta Pasar Minggu" },
    { time: "08.00", title: "Tiba di Bogor & Registrasi", desc: "[ISI]" },
    { time: "09.00", title: "Pembukaan", desc: "[ISI] MC & doa pembuka" },
    { time: "09.30", title: "Speciyal Journey Session", desc: "[ISI] Kilas balik perjalanan Pak Iyal" },
    { time: "11.30", title: "Ishoma", desc: "[ISI] Makan siang bersama" },
    { time: "13.00", title: "Kesan & Pesan", desc: "[ISI]" },
    { time: "14.30", title: "Pemberian Kenang-kenangan", desc: "[ISI]" },
    { time: "15.30", title: "Foto Bersama & Penutup", desc: "[ISI]" },
  ],

  // ---------- Galeri (tambahkan file ke assets/img/ lalu daftarkan di sini) ----------
  gallery: [
    { src: "assets/img/poster-bogor.jpg", caption: "Bogor · 31 Oktober 2026" },
    { src: "assets/img/logo-speciyal.jpg", caption: "Warmindo Speciyal Journey" },
    { src: "assets/img/pak-iyal.jpg", caption: "Pak Iyal" },
  ],

  closing:
    "Terima kasih atas setiap langkah, teladan, dan cerita yang telah Bapak bagikan. Selamat memasuki babak baru, Pak Iyal!",
};
