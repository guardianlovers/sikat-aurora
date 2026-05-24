import { useState } from "react";

const C = {
  or: "#E55C14",
  ye: "#F5C200",
  bl: "#1A3F5C",
  sky: "#A8D4F0",
  gr: "#155222",
  red: "#7A1515",
  dark: "#0D1F2D",
  mid: "#4A5568",
  bg: "#F7F4F0",
};

const style = (css) => ({ style: css });

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
      style={{
        textDecoration: "none",
        color: C.mid,
        fontWeight: 500,
        fontSize: "0.82rem",
        padding: "7px 14px",
        borderRadius: 8,
        transition: "all .2s",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#EEF2F7")}
      onMouseLeave={(e) => (e.target.style.background = "transparent")}
    >
      {children}
    </a>
  );
}

function SunIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="4" fill="#fff" />
      {[[10,1,10,4],[10,16,10,19],[1,10,4,10],[16,10,19,10]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      ))}
      {[[3.22,3.22,5.34,5.34],[14.66,14.66,16.78,16.78],[16.78,3.22,14.66,5.34],[5.34,14.66,3.22,16.78]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function ArrowRight({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ChevronRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function Check({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.ye} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Lock({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function DownloadIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function Navbar() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, padding: "0 40px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{
        maxWidth: 1280, margin: "16px auto 0",
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(0,0,0,0.07)", borderRadius: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: C.or, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SunIcon size={20} />
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.3px" }}>
            Síkat<span style={{ color: C.or }}>-Aurora</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["#programs","#impact","#volunteer","#stories","#donate"].map((h, i) => (
            <NavLink key={i} href={h}>{h.replace("#","").charAt(0).toUpperCase()+h.slice(2)}</NavLink>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => document.querySelector("#volunteer")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.12)", color: C.dark, padding: "8px 18px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
            Volunteer
          </button>
          <button onClick={() => document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: C.or, border: "none", color: "#fff", padding: "9px 20px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
            Donate now
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", background: C.dark, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", paddingTop: 100, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 80%, rgba(229,92,20,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(26,63,92,0.25) 0%, transparent 50%)` }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,194,0,0.12)", border: "1px solid rgba(245,194,0,0.25)", color: C.ye, padding: "6px 16px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, marginBottom: 24, letterSpacing: ".3px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ye} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Youth-led NGO · Baler, Aurora, Philippines
          </div>
          <h1 style={{ fontSize: "3.6rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 20 }}>
            Every child deserves a <span style={{ color: C.ye }}>brighter</span> tomorrow
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 36, fontWeight: 300, maxWidth: 440 }}>
            Síkat-Aurora empowers underserved communities through afterschool programs, literacy drives, and sustainable school initiatives — built by youth, for youth.
          </p>
          <div style={{ display: "flex", gap: 12, marginBottom: 52 }}>
            <button onClick={() => document.querySelector("#volunteer")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: C.or, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Join as volunteer <ArrowRight color="#fff" />
            </button>
            <button onClick={() => document.querySelector("#impact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)", padding: "14px 28px", borderRadius: 100, fontFamily: "inherit", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              View our impact
            </button>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[["1,200+","Children reached"],["340+","Active volunteers"],["12","School sites"]].map(([n,l],i) => (
              <div key={i} style={{ display: "flex", gap: 32, alignItems: "center" }}>
                {i > 0 && <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.1)" }} />}
                <div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: ".3px", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <img src="https://placehold.co/600x260/1A3F5C/A8D4F0?text=Community+Photo" alt="Community" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 20, display: "block" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[["https://placehold.co/200x120/E55C14/ffffff?text=Afterschool","Afterschool"],["https://placehold.co/200x120/155222/ffffff?text=Literacy","Literacy"],["https://placehold.co/200x120/F5C200/1A3F5C?text=Garden","Garden"]].map(([src,alt],i) => (
              <img key={i} src={src} alt={alt} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 14, display: "block" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div style={{ background: C.or, padding: "14px 40px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ background: "rgba(0,0,0,0.2)", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".5px", flexShrink: 0 }}>Story of the month</span>
        <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.88rem" }}>"Liza, 9, read her first full book through Abot Ko Ang Libro — now she wants to be a teacher."</span>
        <a href="#stories" onClick={e=>{e.preventDefault();document.querySelector("#stories")?.scrollIntoView({behavior:"smooth"})}}
          style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          Read her story <ArrowRight size={13} color="#fff" />
        </a>
      </div>
    </div>
  );
}

function Programs() {
  const programs = [
    { color: C.bl, lightBg: "#EEF4FA", tag: "Afterschool", name: "Ang Batang Kali", desc: "Core afterschool engagement with schedules, curriculum activities, and registration portals for local children.", img: `https://placehold.co/400x190/${C.bl.replace("#","")}/A8D4F0?text=Ang+Batang+Kali` },
    { color: C.or, lightBg: "#FEF3EC", tag: "Literacy", name: "Abot Ko Ang Libro", desc: 'Book drives and reading programs with a "Donate a Book" tracker and storytelling activity gallery.', img: `https://placehold.co/400x190/E55C14/ffffff?text=Abot+Ko+Ang+Libro` },
    { color: C.gr, lightBg: "#EDF7EF", tag: "Agriculture", name: "Gulay sa Paaralan", desc: "School gardening documentation showcasing sustainable agriculture and progress across school sites.", img: `https://placehold.co/400x190/155222/ffffff?text=Gulay+sa+Paaralan` },
    { color: "#7b2d8b", lightBg: "#F5EEF8", tag: "Stories", name: "Impact Blog", desc: "Field reports, testimonials, and photo essays that humanize our data and bring our community to life.", img: `https://placehold.co/400x190/7b2d8b/ffffff?text=Impact+Blog` },
  ];
  return (
    <section id="programs" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, gap: 24 }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Our programs</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Flagship initiatives</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 500, fontWeight: 300 }}>Four programs designed to uplift communities across Aurora Province.</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, color: C.or, fontWeight: 600, fontSize: "0.85rem", border: `1px solid rgba(229,92,20,0.25)`, padding: "10px 20px", borderRadius: 100, background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>
            View all <ArrowRight size={13} color={C.or} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {programs.map((p, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "all .3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <img src={p.img} alt={p.name} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", color: p.color, marginBottom: 6 }}>{p.tag}</div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: C.dark, marginBottom: 8, letterSpacing: "-0.2px" }}>{p.name}</div>
                <p style={{ fontSize: "0.8rem", color: C.mid, lineHeight: 1.65, marginBottom: 14, fontWeight: 400 }}>{p.desc}</p>
                <a href="#" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontWeight: 600, color: C.or, textDecoration: "none" }}>
                  Learn more <ArrowRight size={13} color={C.or} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const funds = [["Program activities","48%",48,C.ye],["Educational materials","27%",27,C.sky],["Community events","15%",15,"#4ade80"],["Operations","10%",10,"rgba(255,255,255,0.25)"]];
  const stats = [["1,200+","Children in programs"],["3,400","Books donated"],["12","School sites"],["₱2.1M","Funds managed"],["340+","Volunteers deployed"],["98%","Program completion"]];
  const docs = ["Annual Report 2025","Q1 Financial Tracker 2026","Program Impact Report"];
  return (
    <section id="impact" style={{ padding: "100px 40px", background: C.dark, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.ye, marginBottom: 10 }}>Transparency hub</div>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Our impact, open to all</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 500, fontWeight: 300 }}>Track where every peso goes. Real-time reporting across all 12 school sites in Aurora Province.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 52, marginTop: 52, alignItems: "start" }}>
          <div>
            <img src="https://placehold.co/560x300/112233/1A3F5C?text=Aurora+Province+Map" alt="Map placeholder" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 20, display: "block", marginBottom: 24 }} />
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 14 }}>Fund allocation — May 2026</div>
            {funds.map(([name,pct,val,color],i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{name}</span>
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{pct}</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ width: `${val}%`, height: "100%", background: color, borderRadius: 100 }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              {stats.map(([n,l],i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ fontSize: "1.7rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, marginTop: 4, letterSpacing: ".3px" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "20px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.82rem", marginBottom: 14 }}>Public documents</div>
              {docs.map((name, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ width: 34, height: 34, background: "rgba(229,92,20,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.or} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", marginTop: 1 }}>PDF</div>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.3)", cursor: "pointer" }}><DownloadIcon /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { setSubmitted(true); setTimeout(() => setSubmitted(false), 3500); };
  const perks = ["Leadership development & training","Certificate of service hours","Networking with NGO professionals","Real community impact from Day 1"];
  return (
    <section id="volunteer" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Get involved</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Become a volunteer</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>Join hundreds of youth changemakers across Aurora Province. Your time can transform a child's future.</p>
            <img src="https://placehold.co/560x220/1A3F5C/A8D4F0?text=Volunteer+Group+Photo" alt="Volunteers" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 20, display: "block", marginBottom: 14 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <img src="https://placehold.co/260x110/E55C14/ffffff?text=Teaching+Session" alt="Teaching" style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 14, display: "block" }} />
              <img src="https://placehold.co/260x110/155222/ffffff?text=Garden+Project" alt="Garden" style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 14, display: "block" }} />
            </div>
            <div style={{ background: C.dark, borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: "0.88rem", marginBottom: 14 }}>Why volunteer with us?</div>
              {perks.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <Check size={14} />
                  <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: 34, border: "1px solid rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.3px", marginBottom: 4 }}>Apply to volunteer</h3>
              <p style={{ fontSize: "0.82rem", color: C.mid, marginBottom: 24 }}>Takes 2 minutes — we'll reach out within 48 hours.</p>
              {[["First name","Last name"],["Email address",""],["Mobile number",""]].map((row, ri) => (
                row[1] ? (
                  <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    {row.map((label, li) => (
                      <div key={li}>
                        <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                        <input style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={ri} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{row[0]}</label>
                    <input style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
                  </div>
                )
              ))}
              {[["Program interest",["Select a program...","Ang Batang Kali — Afterschool","Abot Ko Ang Libro — Literacy","Gulay sa Paaralan — Garden","General / any program"]],
                ["Availability",["Weekends only","Weekdays only","Both weekdays & weekends","School breaks / summer"]]].map(([label, opts], i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                  <select style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }}>
                    {opts.map((o,oi) => <option key={oi}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>Tell us about yourself (optional)</label>
                <textarea rows={3} style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none", resize: "vertical" }} />
              </div>
              <button onClick={handleSubmit}
                style={{ width: "100%", background: submitted ? C.gr : C.or, color: "#fff", border: "none", padding: 14, borderRadius: 12, fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s" }}>
                {submitted ? <><Check size={16} /> Application sent!</> : <>Submit application <ArrowRight size={14} color="#fff" /></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Donate() {
  const [amt, setAmt] = useState(0);
  const [pay, setPay] = useState(0);
  const [done, setDone] = useState(false);
  const amounts = ["₱250","₱500","₱1,000","₱2,500","₱5,000","Custom"];
  const pays = ["GCash","Maya","PayPal"];
  const impacts = [
    { color: C.or, bg: "#FEF3EC", label: "₱250 provides 5 books", sub: "for Abot Ko Ang Libro reading circles" },
    { color: C.bl, bg: "#EEF4FA", label: "₱500 funds a child", sub: "through one month of Ang Batang Kali" },
    { color: C.gr, bg: "#EDF7EF", label: "₱1,000 seeds a school garden", sub: "for an entire semester" },
    { color: "#534AB7", bg: "#F0F0F7", label: "₱5,000 sponsors a site", sub: "covering materials, training & logistics" },
  ];
  return (
    <section id="donate" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Make a difference</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Support our mission</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 32 }}>Every peso you give directly funds a child's education, a book in their hands, or a meal from a school garden.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {impacts.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(229,92,20,0.3)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: C.dark }}>{item.label}</strong>
                    <span style={{ fontSize: "0.78rem", color: C.mid }}>{item.sub}</span>
                  </div>
                  <ChevronRight size={14} />
                </div>
              ))}
            </div>
            <img src="https://placehold.co/560x160/1A3F5C/A8D4F0?text=Community+Photo" alt="Community" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 16, display: "block" }} />
          </div>
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: 30, border: "1px solid rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.2px", marginBottom: 20 }}>Choose an amount</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
                {amounts.map((a, i) => (
                  <button key={i} onClick={() => setAmt(i)}
                    style={{ padding: "12px 8px", border: `1px solid ${amt===i ? C.or : "rgba(0,0,0,0.1)"}`, borderRadius: 10, background: amt===i ? "rgba(229,92,20,0.07)" : C.bg, fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", color: amt===i ? C.or : C.dark }}>
                    {a}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 8 }}>Payment method</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {pays.map((p, i) => (
                  <button key={i} onClick={() => setPay(i)}
                    style={{ flex: 1, padding: 10, border: `1px solid ${pay===i ? C.bl : "rgba(0,0,0,0.1)"}`, borderRadius: 10, background: pay===i ? "rgba(26,63,92,0.07)" : C.bg, fontFamily: "inherit", fontWeight: 600, fontSize: "0.78rem", cursor: "pointer", color: pay===i ? C.bl : C.mid }}>
                    {p}
                  </button>
                ))}
              </div>
              {[["Full name","Your name"],["Email address","you@email.com"]].map(([label, ph], i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                  <input placeholder={ph} style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
                </div>
              ))}
              <button onClick={() => { setDone(true); setTimeout(() => setDone(false), 3500); }}
                style={{ width: "100%", background: done ? C.gr : C.dark, color: "#fff", border: "none", padding: 14, borderRadius: 12, fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s" }}>
                {done ? <><Check size={16} /> Redirecting...</> : <><Lock size={14} /> Proceed to payment</>}
              </button>
              <div style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.35)", textAlign: "center", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <Lock size={12} /> Secure · Receipted · RA 10173 compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    { bg: "#EEF4FA", color: C.bl, tag: "Abot Ko Ang Libro", date: "May 12, 2026", title: "Liza's first book: a story about finding your voice", excerpt: "At nine years old, Liza had never finished a full book. Today she reads to her siblings every night — and dreams of becoming a teacher.", initials: "KR", author: "Kaye Reyes", img: `https://placehold.co/400x200/1A3F5C/A8D4F0?text=Liza's+Story` },
    { bg: "#EDF7EF", color: C.gr, tag: "Gulay sa Paaralan", date: "Apr 28, 2026", title: "How one school garden fed 80 families last harvest season", excerpt: "What started as a small plot behind Baler Central School has grown into a thriving garden supplying fresh produce to the community.", initials: "MC", author: "Marco Cruz", img: `https://placehold.co/400x200/155222/ffffff?text=Garden+Story` },
    { bg: "#FEF3EC", color: C.or, tag: "Volunteerism", date: "Apr 10, 2026", title: "From student to mentor: Nico's journey with Ang Batang Kali", excerpt: "At 19, Nico was once a beneficiary of our afterschool program. Now he leads weekend sessions for 30 children in San Luis, Aurora.", initials: "AL", author: "Ana Lim", img: `https://placehold.co/400x200/E55C14/ffffff?text=Nico's+Story` },
  ];
  return (
    <section id="stories" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, gap: 24 }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Impact stories</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>From the field</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300 }}>Real stories told through the voices of children, volunteers, and families.</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, color: C.or, fontWeight: 600, fontSize: "0.85rem", border: `1px solid rgba(229,92,20,0.25)`, padding: "10px 20px", borderRadius: 100, background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>
            All stories <ArrowRight size={13} color={C.or} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {stories.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.09)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <img src={s.img} alt={s.title} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ background: s.bg, color: s.color, fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: 100, letterSpacing: ".3px" }}>{s.tag}</span>
                  <span style={{ fontSize: "0.7rem", color: "#aaa", fontWeight: 500 }}>{s.date}</span>
                </div>
                <div style={{ fontSize: "0.97rem", fontWeight: 600, color: C.dark, lineHeight: 1.45, marginBottom: 8, letterSpacing: "-0.2px" }}>{s.title}</div>
                <p style={{ fontSize: "0.78rem", color: C.mid, lineHeight: 1.65, marginBottom: 14, fontWeight: 400 }}>{s.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#EEF2F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.mid }}>{s.initials}</div>
                    <span style={{ fontSize: "0.72rem", color: C.mid, fontWeight: 500 }}>{s.author}</span>
                  </div>
                  <a href="#" style={{ fontSize: "0.75rem", fontWeight: 600, color: C.or, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                    Read more <ArrowRight size={12} color={C.or} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [subbed, setSubbed] = useState(false);
  return (
    <div style={{ background: C.dark, padding: "80px 40px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ width: 56, height: 56, background: "rgba(229,92,20,0.15)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.or} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h2 style={{ fontSize: "2rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.6px", marginBottom: 12 }}>Stay in the loop</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 30, fontWeight: 300 }}>Get the Síkat Newsletter delivered monthly — program updates, impact reports, and community stories.</p>
        <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
          <input placeholder="Enter your email address" style={{ flex: 1, padding: "13px 18px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontFamily: "inherit", fontSize: "0.88rem", background: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }} />
          <button onClick={() => { setSubbed(true); setTimeout(() => setSubbed(false), 3500); }}
            style={{ background: subbed ? C.gr : C.or, color: "#fff", border: "none", padding: "13px 22px", borderRadius: 12, fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", whiteSpace: "nowrap", transition: "background .3s" }}>
            {subbed ? "Subscribed!" : "Subscribe"}
          </button>
        </div>
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <Lock size={12} /> No spam. Unsubscribe anytime. RA 10173 compliant.
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    ["Programs", ["Ang Batang Kali","Abot Ko Ang Libro","Gulay sa Paaralan","Impact Blog"]],
    ["Get involved", ["Volunteer","Donate","Partner with us","Newsletter"]],
    ["Organization", ["About us","Transparency hub","Contact","Privacy policy"]],
  ];
  return (
    <footer style={{ background: "#080F17", padding: "60px 40px 28px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, background: C.or, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><SunIcon size={18} /></div>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>Síkat-Aurora</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", lineHeight: 1.75, maxWidth: 250, fontWeight: 300 }}>A youth-led NGO dedicated to afterschool programs and literacy initiatives across Aurora Province, Philippines.</p>
          </div>
          {cols.map(([title, links], i) => (
            <div key={i}>
              <h4 style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.82rem", marginBottom: 16, letterSpacing: ".5px" }}>{title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l, li) => (
                  <li key={li}><a href="#" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6, transition: "color .2s", fontWeight: 300 }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
                    <ChevronRight size={13} />{l}
                  </a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>© 2026 Síkat-Aurora. All rights reserved. Registered NGO · Baler, Aurora, Philippines</span>
          <div style={{ display: "flex", gap: 8 }}>
            {["f","ig","tw","yt"].map((s, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.or; e.currentTarget.style.color = C.or; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; }
        input::placeholder { color: rgba(0,0,0,0.3); }
        input[style*="rgba(255,255,255,0.06)"]::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Programs />
      <Impact />
      <Volunteer />
      <Donate />
      <Stories />
      <Newsletter />
      <Footer />
    </>
  );
}