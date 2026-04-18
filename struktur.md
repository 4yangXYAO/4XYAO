# Portfolio Website

Portofolio penyedia jasa profesional dengan tema hitam & abu-abu gelap, music popup player, animasi scroll reveal, form kontak, React, Tailwind, dan Node.js.

---

## Struktur File

```
project/
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── server/
│   └── index.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
└── assets/
  ├── css/style.css
  ├── font/
  └── img/profile.png
```

---

## Dokumentasi Class CSS

### Layout & Container

| Class              | Deskripsi                                                     |
| ------------------ | ------------------------------------------------------------- |
| `.wrapper`         | Container utama, max-width 1200px, auto margin                |
| `.section`         | Pembungkus tiap section, padding atas-bawah 100px             |
| `.section-head`    | Header tiap section (label + judul + deskripsi), center-align |
| `.section-label`   | Badge/tag kecil di atas judul section (misal: "LAYANAN")      |
| `.section-heading` | Judul utama tiap section                                      |
| `.section-desc`    | Sub-teks/deskripsi pendek di bawah judul section              |
| `.accent`          | Utility warna aksen ungu untuk teks                           |

---

### Tombol (Button)

| Class          | Deskripsi                                              |
| -------------- | ------------------------------------------------------ |
| `.btn`         | Base class semua tombol — flex, padding, border-radius |
| `.btn-solid`   | Tombol dengan background gradient ungu (primary)       |
| `.btn-outline` | Tombol dengan border transparan (secondary/ghost)      |
| `.btn-block`   | Modifier: tombol penuh lebar (100% width)              |

---

### Navbar

| Class              | Deskripsi                                           |
| ------------------ | --------------------------------------------------- |
| `.navbar`          | Bar navigasi yang fixed di atas halaman             |
| `.navbar.scrolled` | State navbar saat di-scroll — background blur aktif |
| `.nav-inner`       | Container dalam navbar, flex row                    |
| `.brand`           | Logo / nama brand di kiri navbar                    |
| `.brand-mark`      | Karakter `<` dan `/>` di kiri-kanan brand           |
| `.brand-dot`       | Titik berwarna aksen di tengah nama brand           |
| `.nav-menu`        | List item menu navigasi (horizontal)                |
| `.nav-link`        | Tiap link menu, warna berubah saat hover/aktif      |
| `.nav-link.active` | Link aktif sesuai section yang sedang tampil        |
| `.nav-cta`         | Tombol "Hire Me" di kanan navbar                    |
| `.menu-toggle`     | Tombol hamburger untuk mobile                       |

---

### Hero Section

| Class           | Deskripsi                                       |
| --------------- | ----------------------------------------------- |
| `.hero`         | Section hero fullscreen                         |
| `.bg-grid`      | Latar grid garis tipis di belakang konten       |
| `.glow`         | Base class efek cahaya blur bulat di background |
| `.glow-a`       | Cahaya ungu kiri atas                           |
| `.glow-b`       | Cahaya biru kanan bawah                         |
| `.hero-inner`   | Grid dua kolom: teks kiri, foto kanan           |
| `.hero-text`    | Kolom kiri, berisi judul dan CTA                |
| `.status-badge` | Badge hijau "Available for Work"                |
| `.dot-live`     | Titik berkedip di dalam status badge            |
| `.headline`     | Judul besar hero section (H1)                   |
| `.name-grad`    | Nama dengan teks gradient ungu–biru             |
| `.role-text`    | Teks peran yang berubah (typewriter)            |
| `.body-text`    | Paragraf deskripsi singkat                      |
| `.action-row`   | Baris tombol CTA (Lihat Layanan, Hubungi Saya)  |
| `.stat-row`     | Baris statistik angka (Proyek, Klien, Tahun)    |
| `.stat`         | Satu item statistik (angka + label)             |
| `.stat-num`     | Angka besar pada statistik                      |
| `.stat-label`   | Label teks kecil di bawah angka                 |
| `.rule-v`       | Garis vertikal pemisah antar stat               |
| `.visual`       | Kolom kanan, berisi avatar ring                 |

---

### Avatar / Profile

| Class           | Deskripsi                                 |
| --------------- | ----------------------------------------- |
| `.avatar-ring`  | Container keseluruhan avatar dengan orbit |
| `.avatar-frame` | Lingkaran foto profil (border + shadow)   |
| `.avatar-img`   | Tag `<img>` foto profil                   |
| `.orbit`        | Lingkaran orbit yang berputar             |
| `.orbit-a`      | Orbit dalam, arah searah jarum jam        |
| `.orbit-b`      | Orbit tengah, arah berlawanan             |
| `.orbit-c`      | Orbit luar, paling lambat                 |
| `.orbit-node`   | Ikon teknologi di ujung setiap orbit      |

---

### Scroll & Hero Extras

| Class         | Deskripsi                                |
| ------------- | ---------------------------------------- |
| `.scroll-cue` | Teks + panah "Scroll" di bawah hero      |
| `.arrow-down` | Panah segitiga animasi bouncing ke bawah |

---

### About Section

| Class           | Deskripsi                                          |
| --------------- | -------------------------------------------------- |
| `.card-grid`    | Grid tiga kolom untuk kartu about                  |
| `.feature-card` | Kartu info (Developer / Designer / Problem Solver) |
| `.card-icon`    | Ikon besar di atas teks dalam feature card         |

---

### Services Section

| Class               | Deskripsi                                     |
| ------------------- | --------------------------------------------- |
| `.grid-services`    | Grid kartu layanan (auto-fit, min 320px)      |
| `.srv-card`         | Kartu tiap layanan, animasi masuk dari bawah  |
| `.srv-card.visible` | State saat kartu sudah muncul (fade-up aktif) |
| `.icon-box`         | Kotak ikon berwarna di atas nama layanan      |
| `.icon-main`        | Ikon Font Awesome di dalam `.icon-box`        |
| `.perk-list`        | List fitur/manfaat dalam satu layanan         |
| `.price-tag`        | Baris harga mulai dari...                     |

> **CSS Variable**: setiap `.srv-card` menerima `--icon-color` via `style=""` untuk warna ikon dan border unik per kartu.

---

### Skills Section

| Class        | Deskripsi                                 |
| ------------ | ----------------------------------------- |
| `.tag-cloud` | Flex wrap container semua badge teknologi |
| `.tech-tag`  | Badge satu teknologi (ikon + nama)        |

---

### Portfolio / Works Section

| Class            | Deskripsi                                   |
| ---------------- | ------------------------------------------- |
| `.grid-works`    | Grid tiga kolom kartu karya                 |
| `.work-item`     | Satu kartu portofolio                       |
| `.thumb-wrap`    | Area gambar/thumbnail karya                 |
| `.thumb-inner`   | Placeholder gambar (ikon besar + gradient)  |
| `.thumb-overlay` | Overlay gelap saat hover, berisi tombol     |
| `.view-link`     | Tombol "Lihat Proyek" di dalam overlay      |
| `.item-info`     | Area teks di bawah thumbnail (tipe + judul) |
| `.item-type`     | Label tipe proyek (Web, Mobile, dsb.)       |

---

### Contact Section

| Class             | Deskripsi                                       |
| ----------------- | ----------------------------------------------- |
| `.contact-layout` | Grid dua kolom: info kiri, form kanan           |
| `.info-side`      | Kolom kiri berisi data kontak dan sosial media  |
| `.info-row`       | Satu baris informasi kontak (ikon + teks)       |
| `.icon-badge`     | Kotak ikon kecil di sebelah info kontak         |
| `.social-row`     | Baris tombol sosial media                       |
| `.soc-btn`        | Satu tombol ikon sosial media                   |
| `.form-side`      | Kolom kanan berisi form kontak                  |
| `.field`          | Satu grup input (label + input/select/textarea) |

---

### Footer

| Class           | Deskripsi                                |
| --------------- | ---------------------------------------- |
| `.site-footer`  | Footer paling bawah halaman              |
| `.footer-inner` | Konten footer, center-align              |
| `.footer-sub`   | Teks sekunder di footer ("Built with ♥") |

---

### Music Player

| Class                | Deskripsi                                                  |
| -------------------- | ---------------------------------------------------------- |
| `.player-btn`        | Tombol FAB (floating) buka/tutup player, pojok kanan bawah |
| `.pulse-ring`        | Efek lingkaran ripple di belakang tombol player            |
| `.modal-bg`          | Overlay gelap blur saat modal terbuka                      |
| `.modal-bg.active`   | State aktif overlay (opacity 1)                            |
| `.player-modal`      | Modal popup music player                                   |
| `.player-modal.open` | State modal saat terbuka (scale + opacity normal)          |
| `.modal-top`         | Baris atas modal: disc art + tombol close                  |
| `.disc-art`          | Kotak ikon piringan hitam berputar                         |
| `.close-btn`         | Tombol × tutup modal                                       |
| `.track-meta`        | Judul lagu dan nama artis                                  |
| `.progress-wrap`     | Baris progress bar + waktu                                 |
| `.time-label`        | Teks waktu kiri/kanan progress bar                         |
| `.progress-track`    | Bar progress (clickable)                                   |
| `.progress-fill`     | Fill gradient sesuai posisi lagu                           |
| `.progress-dot`      | Handle bulat di atas progress (muncul saat hover)          |
| `.ctrl-wrap`         | Baris kontrol (prev, play, next)                           |
| `.ctrl-btn`          | Tombol kontrol musik (lingkaran)                           |
| `.ctrl-play`         | Modifier untuk tombol play utama (lebih besar)             |
| `.volume-row`        | Baris volume slider                                        |

---

### Animasi & Utility

| Class             | Deskripsi                                         |
| ----------------- | ------------------------------------------------- |
| `.reveal`         | Elemen tersembunyi, siap dianimasikan saat scroll |
| `.reveal.visible` | State setelah terlihat — opacity & posisi normal  |

---

## ID Elemen (JavaScript)

| ID              | Fungsi                            |
| --------------- | --------------------------------- |
| `navbar`        | Navbar — toggle class `scrolled`  |
| `navMenu`       | Menu mobile — toggle class `open` |
| `menuToggle`    | Tombol hamburger                  |
| `typewriter`    | Span target animasi typewriter    |
| `contactForm`   | Form kontak                       |
| `playerBtn`     | Tombol buka player                |
| `playerModal`   | Modal player                      |
| `modalBg`       | Background overlay                |
| `closeBtn`      | Tombol tutup modal                |
| `playBtn`       | Tombol play/pause                 |
| `playIco`       | Ikon di dalam tombol play         |
| `prevBtn`       | Tombol lagu sebelumnya            |
| `nextBtn`       | Tombol lagu berikutnya            |
| `audioPlayer`   | Elemen `<audio>` HTML5            |
| `progressTrack` | Bar progress (klik untuk seek)    |
| `trackFill`     | Fill progress bar                 |
| `trackDot`      | Titik handle progress             |
| `timeNow`       | Waktu berjalan                    |
| `timeTotal`     | Durasi total lagu                 |
| `volSlider`     | Slider volume                     |
| `discIcon`      | Ikon cakram yang berputar         |
| `trackTitle`    | Nama lagu                         |
| `trackArtist`   | Nama artis                        |

---

## Cara Menambah Musik

Edit array `playlist` di `assets/js/main.js`:

```js
const playlist = [
  { title: "Nama Lagu", artist: "Nama Artis", src: "assets/music/lagu.mp3" },
];
```

Letakkan file `.mp3` di folder `assets/music/`.

---

## Cara Kustomisasi

| Kebutuhan         | Cara                                         |
| ----------------- | -------------------------------------------- |
| Ganti nama        | Cari `Nama Kamu` di `index.html`             |
| Ganti foto        | Replace `assets/img/profile.png`             |
| Ganti warna aksen | Ubah `--accent` di `:root` dalam `style.css` |
| Tambah layanan    | Duplikat `.srv-card` di `index.html`         |
| Tambah karya      | Duplikat `.work-item` di `index.html`        |
