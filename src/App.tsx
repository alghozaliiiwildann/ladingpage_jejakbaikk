import { useEffect, useRef, useState } from "react";
import { HomeScreen, AddScreen, ProgressScreen, Shot } from "./Screens";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.jejakbaik.app";

const slides = [
  { title: "Beranda", src: "image/home.png", el: <HomeScreen /> },
  { title: "Tambah Kebiasaan", src: "image/tambah.png", el: <AddScreen /> },
  { title: "Progres", src: "image/progress.png", el: <ProgressScreen /> },
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

  return (
    <div className={"phone-wrap" + (big ? " big" : "")} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <div className="phone">
        <div className="status">
          <span className="time">9:41</span>
          <div className="sig"><span /><span /><span /></div>
          <div className="batt"><div className="fill" /><span className="dot" /></div>
        </div>
        <div className="screen">
          <div className="island" />
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

const PlayButton = ({ light = false }: { light?: boolean }) => (
  <a className={"play" + (light ? " light" : "")} href={PLAY_URL} target="_blank" rel="noopener noreferrer">
    <svg width="26" height="28" viewBox="0 0 26 28">
      <path fill="#34A853" d="M1 1.2 14.6 14 1 26.8c-.4-.3-.6-.8-.6-1.4V2.6c0-.6.2-1.1.6-1.4Z" />
      <path fill="#FBBC04" d="m19.1 18.5-4.5-4.5 4.5-4.5 5.2 3c1.2.7 1.2 2.3 0 3z" />
      <path fill="#EA4335" d="M14.6 14 19.1 18.5 3.3 27.4c-.8.5-1.6.4-2.3-.6z" />
      <path fill="#4285F4" d="M1 1.2c.7-1 1.5-1.1 2.3-.6l15.8 8.9L14.6 14z" />
    </svg>
    <span><small>DAPATKAN DI</small><b>Google Play</b></span>
  </a>
);

const features = [
  { ic: "✅", t: "Checklist Harian", d: "Centang kebiasaan yang sudah selesai dengan satu ketukan. Simpel & memuaskan." },
  { ic: "📊", t: "Progres Real-time", d: "Lihat persentase progres hari ini lewat cincin progres yang interaktif." },
  { ic: "🎨", t: "Ikon & Kategori", d: "Personalisasi setiap kebiasaan dengan ikon dan kategori pilihanmu." },
  { ic: "🔔", t: "Pengingat Pintar", d: "Notifikasi tepat waktu supaya kamu tidak lupa menjalankan kebiasaan baik." },
  { ic: "🔥", t: "Streak Beruntun", d: "Jaga api semangatmu dengan menghitung hari beruntun tanpa bolong." },
  { ic: "🔒", t: "Privasi Terjaga", d: "Datamu tersimpan aman di perangkat. Tanpa iklan yang mengganggu." },
];

const steps = [
  { n: "01", t: "Unduh Aplikasi", d: "Install Jejak Baik gratis dari Google Play." },
  { n: "02", t: "Tambah Kebiasaan", d: "Tulis nama, target, kategori, dan pilih ikon." },
  { n: "03", t: "Centang Setiap Hari", d: "Tandai kebiasaan yang sudah kamu lakukan." },
  { n: "04", t: "Pantau Progres", d: "Lihat perkembanganmu dan rayakan pencapaian." },
];

const testi = [
  { n: "Rina A.", r: "Mahasiswi", q: "Akhirnya bisa konsisten minum 8 gelas air sehari. Tampilannya bersih banget!" },
  { n: "Dimas P.", r: "Programmer", q: "Belajar coding 1 jam per hari jadi rutinitas. Streak-nya bikin nagih 🔥" },
  { n: "Sari W.", r: "Ibu Rumah Tangga", q: "Simpel, tidak ribet, dan bahasanya Indonesia. Cocok buat semua umur." },
  { n: "Bagus K.", r: "Atlet Amatir", q: "Progres olahraga jadi terukur. Saya suka cincin progresnya!" },
  { n: "Nadia F.", r: "Content Creator", q: "Meditasi 10 menit tiap pagi sekarang sudah jadi kebiasaan. Terima kasih Jejak Baik!" },
  { n: "Yoga S.", r: "Guru", q: "Saya rekomendasikan ke murid-murid untuk membangun kebiasaan membaca." },
];

const faqs = [
  { q: "Apakah Jejak Baik gratis?", a: "Ya! Jejak Baik bisa diunduh dan digunakan secara gratis tanpa iklan yang mengganggu." },
  { q: "Berapa banyak kebiasaan yang bisa saya tambahkan?", a: "Tidak ada batasan. Kamu bisa menambahkan kebiasaan sebanyak yang kamu mau." },
  { q: "Apakah aplikasi ini bisa digunakan offline?", a: "Bisa. Semua fitur utama berjalan tanpa koneksi internet." },
  { q: "Apakah ada pengingat atau notifikasi?", a: "Ada. Kamu bisa mengatur pengingat untuk setiap kebiasaan sesuai jadwalmu." },
  { q: "Apakah data saya aman?", a: "Data kebiasaanmu tersimpan di perangkat dan tidak dibagikan ke pihak ketiga." },
];

export default function App() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
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

  const nav = [["Fitur", "#fitur"], ["Tampilan", "#tampilan"], ["Cara Kerja", "#cara"], ["Testimoni", "#testi"], ["FAQ", "#faq"]];

  return (
    <>
      <div className="scroll-prog" style={{ width: prog + "%" }} />
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="container nav-in">
          <a href="#" className="logo" aria-label="Jejak Baik">
            <img className="logo-mark" src="/image/logo.jpeg" alt="" />
            <span className="logo-text">Jejak<b>Baik</b></span>
          </a>
          <nav className={menu ? "open" : ""}>
            {nav.map(([t, h]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}
          </nav>
          <a href="#unduh" className="nav-cta">Mulai Sekarang</a>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="menu"><i /><i /><i /></button>
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
              <a href="#unduh" className="btn-primary">Coba Gratis →</a>
              <a href="#tampilan" className="btn-ghost">▶ Lihat Tampilan</a>
            </div>
            <div className="hero-proof rv d4">
              <div className="avatars">{["🧑", "👩", "👨", "👧"].map((a, i) => <span key={i}>{a}</span>)}</div>
              <div><b>⭐ 4.9</b> dari 10.000+ pengguna bahagia</div>
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
          {[[10000, "+", "Pengguna aktif"], [250000, "+", "Kebiasaan tercatat"], [86, "%", "Rata-rata konsistensi"], [49, "", "Rating (dari 50)"]].map(([n, s, l], i) => (
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
                <div className="feat-ic">{f.ic}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
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

      <section id="testi" className="sec">
        <div className="sec-head rv container">
          <span className="tag">Testimoni</span>
          <h2>Dicintai oleh <span className="grad">ribuan pengguna</span></h2>
        </div>
        <div className="marquee">
          <div className="mq-track">
            {[...testi, ...testi].map((t, i) => (
              <div className="tcard" key={i}>
                <div className="stars">★★★★★</div>
                <p>"{t.q}"</p>
                <div className="tuser"><span>{t.n[0]}</span><div><b>{t.n}</b><small>{t.r}</small></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="sec soft">
        <div className="container faq-in">
          <div className="sec-head rv">
            <span className="tag">FAQ</span>
            <h2>Pertanyaan yang <span className="grad">sering ditanyakan</span></h2>
          </div>
          <div className="faqs">
            {faqs.map((f, i) => (
              <div className={"faq rv" + (open === i ? " open" : "")} key={i}>
                <button onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}<span>+</span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
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
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="container foot-in">
          <div className="foot-brand">
            <a href="#" className="logo" aria-label="Jejak Baik">
              <svg className="logo-mark" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="gf1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="gf2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path d="M100 10 C144.18 10 182 47.82 182 92 C182 136.18 144.18 174 100 174 C55.82 174 18 136.18 18 92 C18 47.82 55.82 10 100 10 Z" fill="url(#gf1)" stroke="#047857" strokeWidth="4" />
                <path d="M100 174 C55.82 174 18 136.18 18 92 C18 47.82 55.82 10 100 10" fill="none" stroke="url(#gf2)" strokeWidth="12" strokeLinecap="round" />
                <ellipse cx="108" cy="106" rx="14" ry="22" fill="#111827" />
                <path d="M82 120 L94 110 L106 126 L122 102" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M90 118 L106 110 L122 128" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M76 134 Q88 146 106 134 T136 134" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" />
                <path d="M122 150 Q134 150 142 140 T150 122" fill="none" stroke="#34d399" strokeWidth="10" strokeLinecap="round" />
              </svg>
              <span className="logo-text">Jejak<b>Baik</b></span>
            </a>
            <p className="foot-slogan">Sehat Hari Ini, Langkah Baik Esok</p>
          </div>
          <div className="foot-links">
            <h6>Navigasi</h6>
            {nav.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
          </div>
          <div className="foot-links">
            <h6>Unduh</h6>
            <a href={PLAY_URL} target="_blank" rel="noopener noreferrer">Google Play Store</a>
          </div>
          <div className="foot-contact">
            <h6>Kontak</h6>
            <p>hello@jejakbaik.id</p>
            <p>Indonesia</p>
          </div>
          <div className="foot-bottom">
            <p>© 2026 Jejak Baik. Hak cipta dilindungi undang-undang.</p>
            <div className="foot-social">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">X</a>
              <a href="#" aria-label="TikTok">TT</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
