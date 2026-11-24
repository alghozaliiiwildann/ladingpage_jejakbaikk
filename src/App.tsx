import { useEffect, useRef, useState } from "react";
import { HomeScreen, AddScreen, ProgressScreen, Shot } from "./Screens";
import logoImage from "../image/logo.jpeg";
import homeImage from "../image/home.jpeg";
import kebiasaanImage from "../image/kebiasan.jpeg";
import profileImage from "../image/profile.jpeg";
import progresImage from "../image/progres.jpeg";

const APK_URL = "https://expo.dev/artifacts/eas/eiz8L1bOyYnjgbiQiSBOx5THNq7Fb5HUdVD_IpGOl2E.apk";
// Ganti nomor WhatsApp di bawah dengan nomor resmi Jejak Baik (format: 62xxxxxxxxxx)
const WA_NUMBER = "6281234567890";
const IG_URL = "https://www.instagram.com/jejakbaik.app/";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Jejak Baik, saya ingin bertanya tentang aplikasinya.")}`;
const TIKTOK_URL = "https://tiktok.com/@jejakbaik.id";
const EMAIL = "jejakbaik0@gmail.com";

const slides = [
  { title: "Beranda", src: homeImage, bar: "linear-gradient(90deg,#16a54b,#37c16b)", fg: "#fff", el: <HomeScreen /> },
  { title: "Tambah Kebiasaan", src: kebiasaanImage, bar: "#f9fafc", fg: "#0b1b12", el: <AddScreen /> },
  { title: "Profil", src: profileImage, bar: "linear-gradient(90deg,#18a94e,#34bf66)", fg: "#fff", el: <HomeScreen /> },
  { title: "Progres", src: progresImage, bar: "#f9fafc", fg: "#0b1b12", el: <ProgressScreen /> },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function PhoneSlider({ big = false }: { big?: boolean }) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [pause]);
  const cur = slides[i];

  return (
    <div className={"phone-wrap" + (big ? " big" : "")} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <div className="phone">
        <div className="screen">
          <div className="topbar" style={{ background: cur.bar, color: cur.fg }}>
            <span className="bar-time">9:41</span>
            <div className="bar-icons" aria-hidden="true">
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.2c2.2 0 4.2.9 5.7 2.3l1.1-1.1A9.6 9.6 0 0 0 7.5.6 9.6 9.6 0 0 0 .7 3.4l1.1 1.1a8 8 0 0 1 5.7-2.3Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1a6.4 6.4 0 0 0-9 0l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c.5 0 .9.2 1.2.5L7.5 10.3 6.3 9.1c.3-.3.7-.5 1.2-.5Z" /></svg>
              <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" /><rect x="23" y="4" width="1.5" height="4" rx=".7" fill="currentColor" opacity=".4" /></svg>
            </div>
          </div>
          <div className="island" aria-hidden="true"><span className="lens" /></div>
          <div className="track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {slides.map((s) => (
              <div className="slide" key={s.title}>
                <Shot src={s.src} fallback={s.el} />
              </div>
            ))}
          </div>
        </div>
        <div className="home-bar" />
      </div>
      <div className="dots">
        {slides.map((s, k) => (
          <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={s.title} />
        ))}
      </div>
      <div className="slide-label">{slides[i].title}</div>
      {big && (
        <>
          <button className="arrow prev" onClick={() => setI((i - 1 + slides.length) % slides.length)}>‹</button>
          <button className="arrow next" onClick={() => setI((i + 1) % slides.length)}>›</button>
        </>
      )}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - start) / 1500, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString("id-ID")}{suffix}</span>;
}

const DownloadIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

const IgIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
  </svg>
);

const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.86.5 3.6 1.4 5.1L2 22l5.2-1.55a9.86 9.86 0 0 0 4.84 1.27h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.47 2 12.04 2Zm5.76 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.06-1.02.24-3.44-.72-2.9-1.15-4.72-4.13-4.86-4.32-.14-.2-1.15-1.55-1.15-2.95s.73-2.09 1-2.38c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.81 2 .88 2.14.07.15.12.32.02.51-.1.2-.2.32-.34.5-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.17.29.74 1.22 1.58 1.98 1.09.97 1.83 1.27 2.1 1.42.29.14.45.12.62-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.14.27.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
  </svg>
);

const TtIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82A5.9 5.9 0 0 0 15.55 2h-3.1v13.2a2.5 2.5 0 1 1-1.78-2.4V9.64a5.65 5.65 0 1 0 4.88 5.6V8.87a8.9 8.9 0 0 0 4.2 1.05V6.8a4.9 4.9 0 0 1-3.15-.98Z" />
  </svg>
);

const MailIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

const PlayButton = ({ light = false }: { light?: boolean }) => (
  <a className={"play" + (light ? " light" : "")} href={APK_URL} download target="_blank" rel="noopener noreferrer">
    <span className="play-ic"><DownloadIcon size={26} /></span>
    <span><small>VERSI ANDROID · APK</small><b>Unduh Gratis</b></span>
  </a>
);

const featureIcons: Record<string, React.ReactNode> = {
  check: <><path d="M9 6.5h11" /><path d="M9 12h11" /><path d="M9 17.5h7" /><path d="m3.5 6.2 1.6 1.6L8 4.9" /><path d="m3.5 11.7 1.6 1.6L8 10.4" /></>,
  chart: <><path d="M3.5 20.5h17" /><path d="M6.5 20.5v-7" /><path d="M12 20.5V4.5" /><path d="M17.5 20.5v-10" /></>,
  palette: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.8" /><circle cx="17" cy="7" r="3.5" /><rect x="3.5" y="14" width="7" height="6.5" rx="1.8" /><path d="M14 15.5h6.5" /><path d="M17.25 12.25v6.5" /></>,
  bell: <><path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9Z" /><path d="M10.2 20.5a2 2 0 0 0 3.6 0" /></>,
  flame: <><path d="M12 2.5c3.5 4 6 6.5 6 10.5a6 6 0 0 1-12 0c0-2 .8-3.6 2-5 .2 1.6 1 2.6 2 2.9 0-3 .8-5.7 2-8.4Z" /></>,
  lock: <><rect x="4.5" y="10" width="15" height="10.5" rx="2.5" /><path d="M8 10V7.5a4 4 0 0 1 8 0V10" /><path d="M12 14.5v2" /></>,
};

const FeatureIcon = ({ name }: { name: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {featureIcons[name]}
  </svg>
);

const features = [
  { ic: "check", t: "Checklist Harian", d: "Centang kebiasaan yang sudah selesai dengan satu ketukan. Simpel & memuaskan." },
  { ic: "chart", t: "Progres Real-time", d: "Lihat persentase progres hari ini lewat cincin progres yang interaktif." },
  { ic: "palette", t: "Ikon & Kategori", d: "Personalisasi setiap kebiasaan dengan ikon dan kategori pilihanmu." },
  { ic: "bell", t: "Pengingat Pintar", d: "Notifikasi tepat waktu supaya kamu tidak lupa menjalankan kebiasaan baik." },
  { ic: "flame", t: "Streak Beruntun", d: "Jaga api semangatmu dengan menghitung hari beruntun tanpa bolong." },
  { ic: "lock", t: "Privasi Terjaga", d: "Datamu tersimpan aman di perangkat. Tanpa iklan yang mengganggu." },
];

const steps = [
  { n: "01", t: "Unduh APK", d: "Tekan tombol download dan pasang aplikasinya di Android." },
  { n: "02", t: "Tambah Kebiasaan", d: "Tulis nama, target, kategori, dan pilih ikon." },
  { n: "03", t: "Centang Setiap Hari", d: "Tandai kebiasaan yang sudah kamu lakukan." },
  { n: "04", t: "Pantau Progres", d: "Lihat perkembanganmu dan rayakan pencapaian." },
];

export default function App() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement;
      setProg((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const nav = [["Fitur", "#fitur"], ["Tampilan", "#tampilan"], ["Cara Kerja", "#cara"]];

  return (
    <>
      <div className="scroll-prog" style={{ width: prog + "%" }} />
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="container nav-in">
          <a href="#" className="logo" aria-label="Jejak Baik">
            <span className="nav-logo-icon">
              <img src={logoImage} alt="Jejak Baik" />
            </span>
            <span className="logo-text">Jejak<b>Baik</b></span>
          </a>
          <nav className={menu ? "open" : ""}>
            {nav.map(([t, h]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}
            <a href={APK_URL} download target="_blank" rel="noopener noreferrer" className="nav-mob">Download APK</a>
          </nav>
          <a href={APK_URL} download target="_blank" rel="noopener noreferrer" className="nav-cta"><DownloadIcon size={16} /> Download APK</a>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="menu" aria-expanded={menu}><i /><i /><i /></button>
        </div>
      </header>

      <section className="hero">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="container hero-in">
          <div className="hero-tx">
            <span className="pill rv">🌱 Aplikasi Habit Tracker #1 Berbahasa Indonesia</span>
            <h1 className="rv d1">Bangun <span className="grad">kebiasaan baik</span>, satu langkah setiap hari.</h1>
            <p className="rv d2">Jejak Baik membantumu mencatat, memantau, dan merayakan setiap kebiasaan positif — dari minum air putih hingga belajar coding.</p>
            <div className="hero-btn rv d3">
              <a href={APK_URL} download target="_blank" rel="noopener noreferrer" className="btn-primary"><DownloadIcon size={19} /> Download APK</a>
              <a href="#tampilan" className="btn-ghost">▶ Lihat Tampilan</a>
            </div>
            <div className="hero-proof rv d4">
              <div className="avatars">{["🧑", "👩", "👨", "👧"].map((a, i) => <span key={i}>{a}</span>)}</div>
              <div><b>Gratis</b> · tanpa iklan · tanpa langganan</div>
            </div>
          </div>
          <div className="hero-ph rv d2">
            <PhoneSlider />
            <div className="float f1">💧 <div><b>Minum air</b><small>8/8 gelas ✓</small></div></div>
            <div className="float f2">🔥 <div><b>12 hari</b><small>streak beruntun</small></div></div>
            <div className="float f3">🏆 <div><b>+1 Lencana</b><small>Konsisten Seminggu</small></div></div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-in">
          {[[10000, "+", "Pengguna aktif"], [250000, "+", "Kebiasaan tercatat"], [86, "%", "Rata-rata konsistensi"], [100, "%", "Gratis & tanpa iklan"]].map(([n, s, l], i) => (
            <div key={i} className="stat rv" style={{ transitionDelay: i * 0.1 + "s" }}>
              <b><Counter to={n as number} suffix={s as string} /></b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="fitur" className="sec">
        <div className="container">
          <div className="sec-head rv">
            <span className="tag">Fitur Unggulan</span>
            <h2>Semua yang kamu butuhkan untuk <span className="grad">tumbuh</span></h2>
            <p>Dirancang sederhana, tapi powerful. Fokus pada hal yang benar-benar penting.</p>
          </div>
          <div className="feat-grid">
            {features.map((f, i) => (
              <div className="feat rv" key={f.t} style={{ transitionDelay: i * 0.08 + "s" }}>
                <span className="feat-index">{String(i + 1).padStart(2, "0")}</span>
                <div className="feat-ic"><FeatureIcon name={f.ic} /></div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
          <p className="feat-note rv">Semua fitur inti bisa dipakai gratis — tanpa iklan, tanpa langganan.</p>
        </div>
      </section>

      <section className="sec allin">
        <div className="container">
          <div className="sec-head rv">
            <span className="tag light">Semua Dalam Satu Tempat</span>
            <h2>Catat, pantau, dan rayakan — <span className="grad-l">semua dalam satu tempat</span></h2>
            <p>Tidak perlu lagi catatan di kertas atau banyak aplikasi. Jejak Baik merangkum semuanya.</p>
          </div>
          <div className="allin-grid">
            {[
              ["💧", "Kesehatan", "Minum air, tidur cukup, makan sehat"],
              ["🏋️", "Kebugaran", "Olahraga, jalan kaki, peregangan"],
              ["📖", "Belajar", "Baca buku, kursus, belajar bahasa"],
              ["</>", "Produktivitas", "Coding, menulis, deep work"],
              ["🌸", "Mindfulness", "Meditasi, jurnal, bersyukur"],
              ["❤️", "Hubungan", "Telepon keluarga, quality time"],
            ].map(([ic, t, d], i) => (
              <div className="allin-item rv" key={t} style={{ transitionDelay: i * 0.08 + "s" }}>
                <span>{ic}</span>
                <div><b>{t}</b><small>{d}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tampilan" className="sec">
        <div className="container show-in">
          <div className="rv">
            <span className="tag">Tampilan Aplikasi</span>
            <h2>Antarmuka yang <span className="grad">bersih & menyenangkan</span></h2>
            <p className="muted">Geser untuk melihat setiap halaman. Coba juga ketuk kebiasaan di layar untuk mencentangnya!</p>
            <ul className="checks">
              <li>Beranda dengan cincin progres harian</li>
              <li>Form tambah kebiasaan yang intuitif</li>
              <li>Statistik mingguan yang mudah dipahami</li>
              <li>Desain hijau segar yang menenangkan mata</li>
            </ul>
          </div>
          <div className="rv d2"><PhoneSlider big /></div>
        </div>
      </section>

      <section id="cara" className="sec soft">
        <div className="container">
          <div className="sec-head rv">
            <span className="tag">Cara Kerja</span>
            <h2>Mulai dalam <span className="grad">4 langkah mudah</span></h2>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className="step rv" key={s.n} style={{ transitionDelay: i * 0.12 + "s" }}>
                <div className="step-n">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="unduh" className="cta">
        <div className="container">
          <div className="cta-box rv">
            <div className="cta-ring r1" /><div className="cta-ring r2" />
            <span className="cta-emoji">👣</span>
            <h2>Siap meninggalkan jejak baik hari ini?</h2>
            <p>Gabung bersama 10.000+ orang yang sudah membangun kebiasaan positif. Gratis, tanpa iklan.</p>
            <PlayButton light />
            <p className="cta-note">Langsung unduh file APK — tanpa perlu akun toko aplikasi.</p>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="container foot-in">
          <div className="foot-brand">
            <a href="#" className="logo" aria-label="Jejak Baik">
              <span className="nav-logo-icon">
                <img src={logoImage} alt="Jejak Baik" />
              </span>
              <span className="logo-text">Jejak<b>Baik</b></span>
            </a>
            <p className="foot-slogan">Sehat Hari Ini, Langkah Baik Esok</p>
            <p className="foot-desc">Habit tracker berbahasa Indonesia untuk mencatat, memantau, dan merayakan setiap kebiasaan baikmu.</p>
            <div className="foot-social">
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IgIcon size={19} /></a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WaIcon size={19} /></a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TtIcon size={19} /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email"><MailIcon size={19} /></a>
            </div>
          </div>

          <div className="foot-links">
            <h6>Navigasi</h6>
            {nav.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
            <a href="#unduh">Download</a>
          </div>

          <div className="foot-contact">
            <h6>Kontak</h6>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"><span className="ci"><WaIcon /></span><span>WhatsApp<br /><small>+62 857-9843-3405</small></span></a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"><span className="ci"><IgIcon /></span><span>Instagram<br /><small>@jejakbaik.app</small></span></a>
            <a href={`mailto:${EMAIL}`}><span className="ci"><MailIcon /></span><span>Email<br /><small>{EMAIL}</small></span></a>
            <p className="foot-loc">Berdiri di Indonesia 🇮🇩</p>
          </div>
        </div>

        <div className="container foot-bottom">
          <p>© 2026 <b>Jejak Baik</b> — Sehat Hari Ini, Langkah Baik Esok.</p>
          <p>Hak cipta dilindungi undang-undang.</p>
        </div>
      </footer>
    </>
  );
}
