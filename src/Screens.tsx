import { useState } from "react";

const StatusBar = () => (
  <div className="sb">
    <span>9:41</span>
    <span className="sb-icons">
      <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
      <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.2c2.2 0 4.2.9 5.7 2.3l1.1-1.1A9.6 9.6 0 0 0 7.5.6 9.6 9.6 0 0 0 .7 3.4l1.1 1.1a8 8 0 0 1 5.7-2.3Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1a6.4 6.4 0 0 0-9 0l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c.5 0 .9.2 1.2.5L7.5 10.3 6.3 9.1c.3-.3.7-.5 1.2-.5Z" /></svg>
      <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="18" height="8" rx="2" /><rect x="23" y="4" width="1.5" height="4" rx=".7" opacity=".4" /></svg>
    </span>
  </div>
);

const habits = [
  { name: "Minum air putih", target: "8 gelas", icon: "💧", bg: "#e0f2fe", done: true },
  { name: "Olahraga", target: "30 menit", icon: "🏋️", bg: "#e0f2fe", done: true },
  { name: "Baca buku", target: "30 menit", icon: "📖", bg: "#fee2e2", done: false },
  { name: "Belajar coding", target: "1 jam", icon: "</>", bg: "#e5e7eb", done: false },
  { name: "Meditasi", target: "10 menit", icon: "🌸", bg: "#dcfce7", done: false },
];

const BottomNav = ({ active }: { active: "home" | "progress" }) => (
  <div className="bnav">
    <div className={active === "home" ? "on" : ""}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
      <span>Home</span>
    </div>
    <div className={active === "progress" ? "on" : ""}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 20V12M12 20V4M18 20v-6" /></svg>
      <span>Progress</span>
    </div>
    <i className="home-ind" />
  </div>
);

export function HomeScreen() {
  const [list, setList] = useState(habits);
  const done = list.filter((h) => h.done).length;
  const pct = Math.round((done / list.length) * 100);
  return (
    <div className="scr">
      <StatusBar />
      <div className="scr-body">
        <div className="hs-head">
          <div>
            <h4>Hai, Arief 👋</h4>
            <p>Selamat pagi!</p>
            <small>Selasa, 15 Oktober 2026</small>
          </div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14532d" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
        </div>
        <div className="hs-card">
          <div className="ring" style={{ ["--p" as string]: pct }}>
            <span>{pct}%</span>
          </div>
          <div className="hs-card-r">
            <b>Progres Hari Ini</b>
            <p>{done} dari {list.length} kebiasaan selesai</p>
            <div className="bar"><i style={{ width: pct + "%" }} /></div>
          </div>
        </div>
        <div className="hs-title"><b>Daftar Kebiasaan</b><span>Lihat Semua</span></div>
        <div className="hs-list">
          {list.map((h, i) => (
            <div className="hs-item" key={h.name} onClick={() => setList(list.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))}>
              <div className="hs-ic" style={{ background: h.bg }}>{h.icon}</div>
              <div className="hs-tx"><b>{h.name}</b><small>Target: {h.target}</small></div>
              <div className={"chk" + (h.done ? " on" : "")}>{h.done && "✓"}</div>
            </div>
          ))}
        </div>
        <div className="fab">+</div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}

export function AddScreen() {
  const icons = ["💧", "🏋️", "📖", "</>", "🌸", "❤️", "😊", "⭐", "•••"];
  const [sel, setSel] = useState(0);
  return (
    <div className="scr">
      <StatusBar />
      <div className="scr-body">
        <div className="as-head"><span>‹</span><b>Tambah Kebiasaan</b></div>
        <label>Nama Kebiasaan *</label>
        <div className="inp">Contoh: Minum air putih</div>
        <label>Target (opsional)</label>
        <div className="inp">Contoh: 8 gelas / 30 menit</div>
        <label>Kategori</label>
        <div className="inp sel">Pilih kategori <span>⌄</span></div>
        <label>Pilih Ikon (opsional)</label>
        <div className="icons">
          {icons.map((ic, i) => (
            <div key={i} className={"ico" + (sel === i ? " on" : "")} onClick={() => setSel(i)}>{ic}</div>
          ))}
        </div>
        <div className="btn-g">Simpan</div>
        <div className="btn-o">Kembali</div>
      </div>
    </div>
  );
}

export function ProgressScreen() {
  const days = [60, 80, 40, 100, 70, 90, 60];
  const lbl = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  return (
    <div className="scr">
      <StatusBar />
      <div className="scr-body">
        <h4 className="ps-t">Progres Mingguan</h4>
        <p className="ps-s">7 – 13 Oktober 2026</p>
        <div className="ps-card">
          <div className="ps-bars">
            {days.map((d, i) => (
              <div key={i} className="ps-col">
                <div className="ps-bar" style={{ height: d + "%", animationDelay: i * 0.08 + "s" }} />
                <small>{lbl[i]}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="ps-grid">
          <div><b>🔥 12</b><small>Hari beruntun</small></div>
          <div><b>✅ 86%</b><small>Konsistensi</small></div>
          <div><b>🏆 5</b><small>Pencapaian</small></div>
          <div><b>⏱️ 24j</b><small>Total waktu</small></div>
        </div>
        <div className="ps-tip">💡 Kamu paling konsisten di hari Kamis. Pertahankan!</div>
      </div>
      <BottomNav active="progress" />
    </div>
  );
}

/** Renders a real screenshot from /image/* if available, otherwise falls back to the HTML replica. */
export function Shot({ src, fallback }: { src: string; fallback: React.ReactNode }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <>{fallback}</>;
  return <img className="shot" src={src} alt="" onError={() => setOk(false)} />;
}
