"use client";

import { useEffect, useRef, useState } from "react";

const aboutCards = [
  {
    icon: "fas fa-laptop-code",
    title: "Developer",
    text: "Membangun aplikasi web modern yang responsif, cepat, dan skalabel menggunakan teknologi terkini.",
  },
  {
    icon: "fas fa-pen-nib",
    title: "Designer",
    text: "Merancang antarmuka yang intuitif dan estetis dengan pendekatan user-centered design.",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Problem Solver",
    text: "Menganalisis masalah secara sistematis dan memberikan solusi kreatif yang efisien dan tepat sasaran.",
  },
];

const services = [
  {
    title: "Web Development",
    color: "#7c3aed",
    icon: "fas fa-code icon-main",
    desc: "Pengembangan website dari landing page hingga aplikasi web kompleks dengan performa tinggi dan SEO-friendly.",
    perks: ["Frontend & Backend", "Responsive Design", "API Integration"],
    delay: 0,
  },
  {
    title: "UI/UX Design",
    color: "#0891b2",
    icon: "fas fa-palette icon-main",
    desc: "Desain antarmuka yang menarik dan pengalaman pengguna yang seamless untuk produk digital Anda.",
    perks: ["Wireframing & Prototyping", "Design System", "User Research"],
    delay: 100,
  },
  {
    title: "Mobile App",
    color: "#d97706",
    icon: "fas fa-mobile-screen icon-main",
    desc: "Pengembangan aplikasi mobile cross-platform yang ringan, cepat, dan siap untuk Play Store / App Store.",
    perks: ["Android & iOS", "React Native", "Push Notification"],
    delay: 200,
  },
  {
    title: "SEO & Digital Marketing",
    color: "#16a34a",
    icon: "fas fa-magnifying-glass-chart icon-main",
    desc: "Optimasi mesin pencari dan strategi pemasaran digital untuk meningkatkan visibilitas online bisnis Anda.",
    perks: ["Coming soon!"],
    delay: 300,
  },
  {
    title: "AI Prompt",
    color: "#e11d48",
    icon: "fa-solid fa-terminal",
    desc: "Membuat prompt yang efektif untuk menghasilkan konten berkualitas tinggi dengan bantuan kecerdasan buatan.",
    perks: ["Coming soon!"],
    delay: 400,
  },
  {
    title: "Automation & Bot",
    color: "#db2777",
    icon: "fas fa-robot icon-main",
    desc: "Pembuatan bot otomatis, bot Telegram, Bot Whatsaap, web scraper, dan sistem automasi untuk efisiensi bisnis Anda",
    perks: ["Coming soon!"],
    delay: 500,
  },
  {
    title: "Copy Writer",
    color: "#16a34a",
    icon: "fas fa-regular fa-pen-to-square",
    desc: "Menulis konten menarik dan SEO-friendly untuk website, blog, dan iklan Anda.",
    perks: ["Content Writing", "SEO Copywriting", "Email Marketing"],
    delay: 300,
  },
  {
    title: "Video Editing",
    color: "#e11d48",
    icon: "fas fa-video icon-main",
    desc: "Editing video profesional untuk konten media sosial, iklan, YouTube, dan promosi bisnis.",
    perks: ["Motion Graphics", "Color Grading", "Subtitles & VFX"],
    delay: 400,
  },
  {
    title: "Photo Editing",
    color: "#db2777",
    icon: "fa-solid fa-camera",
    desc: "Melakukan editing foto, penyesuaian warna, dan efek visual lainnya, sesuai request Anda.",
    perks: ["background removal", "Banner Design", "Other Services"],
    delay: 500,
  },
];

const skills = [
  { icon: "fab fa-html5", label: "HTML5" },
  { icon: "fab fa-css3-alt", label: "CSS3" },
  { icon: "fab fa-js-square", label: "JavaScript" },
  { icon: "fab fa-react", label: "React" },
  { icon: "fab fa-node-js", label: "Node.js" },
  { icon: "fab fa-python", label: "Python" },
  { icon: "fab fa-figma", label: "Figma" },
  { icon: "fab fa-git-alt", label: "Git" },
  { icon: "fab fa-docker", label: "Docker" },
  { icon: "fas fa-database", label: "MySQL" },
  { icon: "fas fa-fire", label: "Firebase" },
  { icon: "fas fa-cloud", label: "Cloud" },
  { icon: "fas fa-robot", label: "AI" },
];

const works = [
  { type: "Portofolio", title: "About We", icon: "fas fa-globe" },
  {
    type: "Jhasil Kerja Kami",
    title: "Project Showcase",
    icon: "fas fa-mobile-screen-button",
  },
];

const socials = [
  {
    href: "https://github.com/4yangXYAO",
    icon: "fab fa-github",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/4yangxyao",
    icon: "fab fa-linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/4yangXYAO",
    icon: "fab fa-twitter",
    label: "Twitter",
  },
  {
    href: "https://www.instagram.com/1clayyy",
    icon: "fab fa-instagram",
    label: "Instagram",
  },
];

const playlist = [
  { title: "Portfolio Vibes", artist: "Ambient Focus Mix", src: "" },
  { title: "Creative Flow", artist: "Lo-Fi Beats", src: "" },
  { title: "Night Code", artist: "Chill Electronics", src: "" },
];

const sections = [
  { href: "#about", label: "Tentang" },
  { href: "#services", label: "Layanan" },
  { href: "#skills", label: "Skill" },
  { href: "#portfolio-work", label: "Portofolio" },
  { href: "#contact", label: "Kontak" },
];

function formatTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds)) {
    return "0:00";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getContactApiUrl() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(
    /\/$/,
    "",
  );

  if (apiBaseUrl) {
    return `${apiBaseUrl}/contact`;
  }

  return "/api/contact";
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState(() => playlist[0]);
  const [timeNow, setTimeNow] = useState("0:00");
  const [timeTotal, setTimeTotal] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [formState, setFormState] = useState("idle");

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const discRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      ".feature-card, .work-item, .tech-tag, .info-row, .form-side, .section-head",
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal", "visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    revealTargets.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const serviceCards = document.querySelectorAll(".srv-card");

    if (!("IntersectionObserver" in window)) {
      serviceCards.forEach((card) => card.classList.add("visible"));
      return undefined;
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number.parseInt(
              entry.target.dataset.delay || "0",
              10,
            );
            window.setTimeout(
              () => entry.target.classList.add("visible"),
              delay,
            );
          }
        });
      },
      { threshold: 0.1 },
    );

    serviceCards.forEach((card) => cardObserver.observe(card));
    return () => cardObserver.disconnect();
  }, []);

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    const observedSections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
            navLinks.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(
              `.nav-link[href="#${entry.target.id}"]`,
            );
            if (activeLink) {
              activeLink.classList.add("active");
            }
          }
        });
      },
      { threshold: 0.4 },
    );

    observedSections.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    loadTrack(currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    if (discRef.current) {
      discRef.current.style.animationPlayState = playing ? "running" : "paused";
    }
  }, [playing]);

  function loadTrack(index) {
    const selected = playlist[index];
    setTrackInfo(selected);
    setTimeNow("0:00");
    setTimeTotal("0:00");
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (selected.src) {
        audioRef.current.src = selected.src;
        audioRef.current.load();
      }
    }
  }

  function togglePlay() {
    const audio = audioRef.current;

    if (!playlist[currentTrack].src) {
      setPlaying((value) => !value);
      return;
    }

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function openPlayer() {
    setPlayerOpen(true);
  }

  function closePlayer() {
    setPlayerOpen(false);
  }

  function goToTrack(nextIndex) {
    setCurrentTrack((nextIndex + playlist.length) % playlist.length);
    setPlaying((value) => value);
    if (playlist[nextIndex]?.src && audioRef.current && playing) {
      audioRef.current.play().catch(() => {});
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormState("loading");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const contactApiUrl = getContactApiUrl();

    try {
      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim pesan");
      }

      setFormState("success");
      event.currentTarget.reset();
      window.setTimeout(() => setFormState("idle"), 2500);
    } catch (error) {
      setFormState("error");
      window.setTimeout(() => setFormState("idle"), 2500);
    }
  }

  function syncAudioProgress() {
    const audio = audioRef.current;
    if (!audio || !audio.duration) {
      return;
    }

    const pct = (audio.currentTime / audio.duration) * 100;
    setProgress(pct);
    setTimeNow(formatTime(audio.currentTime));
    setTimeTotal(formatTime(audio.duration));
  }

  function seekTrack(event) {
    const audio = audioRef.current;
    const track = progressRef.current;

    if (!audio || !track || !audio.duration) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const pct = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1,
    );
    audio.currentTime = pct * audio.duration;
    setProgress(pct * 100);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      <button
        className="player-btn"
        id="playerBtn"
        aria-label="Play Music"
        type="button"
        onClick={openPlayer}
      >
        <i className="fas fa-music" id="playerIco"></i>
        <span className="pulse-ring"></span>
      </button>

      <div
        className={`modal-bg ${playerOpen ? "active" : ""}`}
        id="modalBg"
        onClick={closePlayer}
      ></div>

      <div
        className={`player-modal ${playerOpen ? "open" : ""}`}
        id="playerModal"
      >
        <div className="modal-top">
          <div className="disc-art">
            <i
              className="fas fa-compact-disc fa-spin"
              id="discIcon"
              ref={discRef}
            ></i>
          </div>
          <button
            className="close-btn"
            id="closeBtn"
            type="button"
            onClick={closePlayer}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="track-meta">
          <h3 id="trackTitle">{trackInfo.title}</h3>
          <p id="trackArtist">{trackInfo.artist}</p>
        </div>
        <div className="progress-wrap">
          <span className="time-label" id="timeNow">
            {timeNow}
          </span>
          <div
            className="progress-track"
            id="progressTrack"
            ref={progressRef}
            onClick={seekTrack}
          >
            <div
              className="progress-fill"
              id="trackFill"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="progress-dot"
              id="trackDot"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
          <span className="time-label" id="timeTotal">
            {timeTotal}
          </span>
        </div>
        <div className="ctrl-wrap">
          <button
            className="ctrl-btn"
            id="prevBtn"
            type="button"
            onClick={() => goToTrack(currentTrack - 1)}
          >
            <i className="fas fa-backward-step"></i>
          </button>
          <button
            className="ctrl-btn ctrl-play"
            id="playBtn"
            type="button"
            onClick={togglePlay}
          >
            <i
              className={`fas ${playing ? "fa-pause" : "fa-play"}`}
              id="playIco"
            ></i>
          </button>
          <button
            className="ctrl-btn"
            id="nextBtn"
            type="button"
            onClick={() => goToTrack(currentTrack + 1)}
          >
            <i className="fas fa-forward-step"></i>
          </button>
        </div>
        <div className="volume-row">
          <i className="fas fa-volume-low"></i>
          <input
            type="range"
            id="volSlider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <i className="fas fa-volume-high"></i>
        </div>
        <audio
          id="audioPlayer"
          ref={audioRef}
          onTimeUpdate={syncAudioProgress}
          onEnded={() => goToTrack(currentTrack + 1)}
        ></audio>
      </div>

      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        id="navbar"
        ref={navRef}
      >
        <div className="nav-inner">
          <a href="#about" className="brand">
            <span className="brand-mark"></span>XYaoNLe's
            <span className="brand-dot">.</span>SERVICE
            <span className="brand-mark"></span>
          </a>
          <ul className={`nav-menu ${menuOpen ? "open" : ""}`} id="navMenu">
            {sections.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.href ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="nav-cta"
            type="button"
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Hire Me
          </button>
          <button
            className="menu-toggle"
            id="menuToggle"
            aria-label="Menu"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <section className="about section" id="about">
        <div className="wrapper">
          <div className="section-head">
            <span className="section-label">
              <i className="fas fa-user"></i> Tentang Kami
            </span>
            <h2 className="section-heading">
              Kenali Lebih Dalam <span className="accent">Siapa Kami</span>
            </h2>
          </div>
          <div className="card-grid">
            {aboutCards.map((card) => (
              <div className="feature-card" key={card.title}>
                <i className={`${card.icon} card-icon`}></i>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="wrapper">
          <div className="section-head">
            <span className="section-label">
              <i className="fas fa-gear"></i> Layanan
            </span>
            <h2 className="section-heading">
              Apa yang Saya <span className="accent">Tawarkan</span>
            </h2>
            <p className="section-desc">
              Layanan profesional yang saya sediakan, silahkan tap/click pada
              layanan yang Anda butuhkan.
            </p>
          </div>
          <div className="grid-services">
            {services.map((service) => (
              <a
                key={service.title}
                href="https://wa.me/62895330107704"
                target="_blank"
                rel="noreferrer"
                className="block"
                style={{ textDecoration: "underline", color: "inherit" }}
              >
                <div
                  className="srv-card"
                  data-delay={service.delay}
                  style={{ "--icon-color": service.color }}
                >
                  <div className="icon-box">
                    <i className={service.icon}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <ul className="perk-list">
                    {service.perks.map((perk) => (
                      <li key={perk}>
                        <i className="fas fa-check"></i> {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="price-tag">
                    Mulai dari <strong>Rp xxx</strong>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="wrapper">
          <div className="section-head">
            <span className="section-label">
              <i className="fas fa-chart-bar"></i> Tech Stack
            </span>
            <h2 className="section-heading">
              Skill & <span className="accent">Teknologi</span>
            </h2>
          </div>
          <div className="tag-cloud">
            {skills.map((skill) => (
              <div className="tech-tag" key={skill.label}>
                <i className={skill.icon}></i>
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="works section" id="portfolio-work">
        <div className="wrapper">
          <div className="section-head">
            <span className="section-label">
              <i className="fas fa-folder-open"></i> Lebih Lengkap Tentang Kami
            </span>
            <h2 className="section-heading">
              Portofolio <span className="accent">Kami</span>
            </h2>
          </div>
          <div className="grid-works">
            {works.map((work) => (
              <div className="work-item" key={work.title}>
                <div className="thumb-wrap">
                  <div className="thumb-inner">
                    <i className={work.icon}></i>
                  </div>
                  <div className="thumb-overlay">
                    <a
                      href="#"
                      className="view-link"
                      onClick={(event) => event.preventDefault()}
                    >
                      <i className="fas fa-arrow-up-right-from-square"></i>{" "}
                      Lihat Proyek
                    </a>
                  </div>
                </div>
                <div className="item-info">
                  <span className="item-type">{work.type}</span>
                  <h4>{work.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="wrapper">
          <div className="section-head">
            <span className="section-label">
              <i className="fas fa-envelope"></i> Kontak
            </span>
            <h2 className="section-heading">
              Mari <span className="accent">Bekerja Sama</span>
            </h2>
            <p className="section-desc">
              punya Proyek di luar menu, maupun spesial request? silahkan
              diskusikan dengan kami !
            </p>
          </div>
          <div className="contact-layout">
            <div className="info-side">
              <div className="info-row">
                <div className="icon-badge">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>@gmail.com</p>
                </div>
              </div>
              <div className="info-row">
                <div className="icon-badge">
                  <a
                    href="https://wa.me/62895330107704"
                    target="_blank"
                    rel="noreferrer"
                    className="soc-btn"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
                <div>
                  <strong>WhatsApp</strong>
                  <p>+62 8953-3010-7704</p>
                </div>
              </div>
              <div className="info-row">
                <div className="icon-badge">
                  <a
                    href="https://www.instagram.com/1clayyy"
                    target="_blank"
                    rel="noreferrer"
                    className="soc-btn"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
                <div>
                  <strong>Instagram</strong>
                  <p>@1clayyy</p>
                </div>
              </div>
              <div className="social-row">
                {socials.map((social) => (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="soc-btn"
                    key={social.label}
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            <form
              className="form-side"
              id="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nama lengkap Anda"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@domain.com"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="service">Layanan yang dibutuhkan</label>
                <select id="service" name="service" defaultValue="">
                  <option value="">— Pilih layanan —</option>
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Mobile App</option>
                  <option>SEO & Digital Marketing</option>
                  <option>Video Editing</option>
                  <option>Automation & Bot</option>
                  <option>Copy Writer</option>
                  <option>Photo Editing</option>
                  <option>AI Prompt</option>
                  <option>Other Services</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Ceritakan proyek Anda..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-solid btn-block"
                disabled={formState === "loading"}
              >
                {formState === "loading" ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Mengirim...
                  </>
                ) : formState === "success" ? (
                  <>
                    <i className="fas fa-check"></i> Pesan Terkirim!
                  </>
                ) : formState === "error" ? (
                  <>
                    <i className="fas fa-triangle-exclamation"></i> Gagal
                    Mengirim
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrapper">
          <div className="footer-inner">
            <p>
              &copy; 2026 <span className="accent">XYaoLe's Service</span>. All
              rights reserved.
            </p>
            <p className="footer-sub">
              Built with{" "}
              <i className="fas fa-heart" style={{ color: "#e11d48" }}></i>
              ,Coffee, Rokok, abis itu kena paru-paru, sakit 2 hari
            </p>
          </div>
        </div>
      </footer>

      <audio id="audioPlayer" ref={audioRef}></audio>
    </div>
  );
}
