# Speciyal Journey 2026 — E-Leaflet Pak Iyal

E-leaflet / e-invitation purnabakti **Bapak Oktria Hendrarji (Pak Iyal)**, Kepala KPP Pratama Jakarta Pasar Minggu,
dan gathering **Speciyal Journey** di Istana Bogor, Sabtu 31 Oktober 2026.

## Isi halaman
Cover + nama tamu → Hero (H-n otomatis) → Hitung mundur & simpan ke kalender → Biografi → Jejak karier →
Info acara + Google Maps → Rundown → Galeri → Penutup. Musik otomatis berputar saat leaflet dibuka.

## Cara mengubah isi
Semua teks ada di **`js/config.js`** (bagian bertanda `[ISI]` masih placeholder).
- Foto: taruh di `assets/img/`, lalu daftarkan di `gallery` / `honoree.photo`.
- Musik: taruh lagu di `assets/audio/music.mp3`. Bila belum ada, diputar melodi instrumental bawaan.

## Link per tamu
Tambahkan `?to=Nama` di akhir link, misal `.../?to=Herjuno%20Bagus`.

## Publikasi gratis (GitHub Pages)
Settings → Pages → *Deploy from a branch* → pilih branch & folder `/ (root)` → Save.
Link akan menjadi `https://<username>.github.io/<nama-repo>/`.
