/* ===================================================
   PORTFOLIO — MAIN.JS
   Handles: Navbar, Typewriter, Scroll Reveal,
            Card Animations, Form, Music Player
=================================================== */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- HAMBURGER MENU ----
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});

// ---- TYPEWRITER EFFECT ----
const roles = [
  'Web Developer',
  'UI/UX Designer',
  'Mobile App Dev',
  'Problem Solver',
  'Creative Maker',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = roles[roleIdx];
  if (isDeleting) {
    typeEl.textContent = current.slice(0, charIdx--);
    if (charIdx < 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 500);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ---- SCROLL REVEAL ----
const revealTargets = document.querySelectorAll(
  '.feature-card, .work-item, .tech-tag, .info-row, .form-side, .section-head'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal', 'visible');
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

// ---- SERVICE CARD ANIMATION ----
const srvCards = document.querySelectorAll('.srv-card');

if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.1 });

  srvCards.forEach(c => cardObserver.observe(c));
} else {
  // fallback kalau observer gagal
  srvCards.forEach(c => c.classList.add('visible'));
}

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1800);
});

// ====================================================
// MUSIC PLAYER
// ====================================================
const playerBtn  = document.getElementById('playerBtn');
const playerModal = document.getElementById('playerModal');
const modalBg    = document.getElementById('modalBg');
const closeBtn   = document.getElementById('closeBtn');
const playBtn    = document.getElementById('playBtn');
const playIco    = document.getElementById('playIco');
const audio      = document.getElementById('audioPlayer');
const progressTrack = document.getElementById('progressTrack');
const trackFill  = document.getElementById('trackFill');
const trackDot   = document.getElementById('trackDot');
const timeNow    = document.getElementById('timeNow');
const timeTotal  = document.getElementById('timeTotal');
const volSlider  = document.getElementById('volSlider');
const discIcon   = document.getElementById('discIcon');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');

// Playlist — add your own music file paths to `src`
const playlist = [
  { title: 'Portfolio Vibes',  artist: 'Ambient Focus Mix',  src: '' },
  { title: 'Creative Flow',    artist: 'Lo-Fi Beats',        src: '' },
  { title: 'Night Code',       artist: 'Chill Electronics',  src: '' },
];

let current = 0;
let playing = false;

function fmt(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function load(idx) {
  const t = playlist[idx];
  trackTitle.textContent  = t.title;
  trackArtist.textContent = t.artist;
  if (t.src) { audio.src = t.src; audio.load(); }
  trackFill.style.width = '0%';
  trackDot.style.left   = '0%';
  timeNow.textContent   = '0:00';
  timeTotal.textContent = '0:00';
}

function syncUI() {
  if (playing) {
    playIco.className = 'fas fa-pause';
    discIcon.style.animationPlayState = 'running';
  } else {
    playIco.className = 'fas fa-play';
    discIcon.style.animationPlayState = 'paused';
  }
}

function togglePlay() {
  if (!playlist[current].src) {
    playing = !playing;
    syncUI();
    return;
  }
  if (audio.paused) { audio.play().catch(() => {}); playing = true; }
  else              { audio.pause(); playing = false; }
  syncUI();
}

playBtn.addEventListener('click', togglePlay);

document.getElementById('prevBtn').addEventListener('click', () => {
  current = (current - 1 + playlist.length) % playlist.length;
  load(current);
  if (playing && playlist[current].src) audio.play();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  current = (current + 1) % playlist.length;
  load(current);
  if (playing && playlist[current].src) audio.play();
});

audio.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100 || 0;
  trackFill.style.width = pct + '%';
  trackDot.style.left   = pct + '%';
  timeNow.textContent   = fmt(audio.currentTime);
  timeTotal.textContent = fmt(audio.duration);
});

audio.addEventListener('ended', () => {
  current = (current + 1) % playlist.length;
  load(current);
  audio.play();
});

progressTrack.addEventListener('click', (e) => {
  const rect = progressTrack.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = pct * audio.duration;
  trackFill.style.width = (pct * 100) + '%';
  trackDot.style.left   = (pct * 100) + '%';
});

volSlider.addEventListener('input', () => { audio.volume = volSlider.value; });
audio.volume = 0.7;

function openPlayer()  { playerModal.classList.add('open'); modalBg.classList.add('active'); }
function closePlayer() { playerModal.classList.remove('open'); modalBg.classList.remove('active'); }

playerBtn.addEventListener('click', openPlayer);
closeBtn.addEventListener('click', closePlayer);
modalBg.addEventListener('click', closePlayer);

load(0);
discIcon.style.animationPlayState = 'paused';

// ---- SMOOTH ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navMenu.classList.remove('open');
    }
  });
});

// ---- ACTIVE NAV HIGHLIGHT ----
const sections    = document.querySelectorAll('section[id]');
const allLinks    = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const hit = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (hit) hit.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
