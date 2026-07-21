import { useState } from "react";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import logoImg from "./assets/logo.png";

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

function BookIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function SproutIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-2-3.5.7-.1 3 .5 4.5.1z" /><path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.2-3.9-.7 0-2.8.4-4.4 1.3z" />
    </svg>
  );
}

function Navbar() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,0,0,0.08)", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logoImg} alt="Síkat-Aurora Logo" style={{ width: 38, height: 38, objectFit: "contain" }} />
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: C.dark, letterSpacing: "-0.3px" }}>
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
    <section id="home">
      <AnimatedHero
        backgroundImageUrl="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80&auto=format&fit=crop"
        badge="🌅 Youth-led NGO · Baler, Aurora, Philippines"
        title={<>Ang pagsikat ay nagsisimula sa <span style={{ color: "#F5C200" }}>pagkilos</span></>}
        description="Síkat-Aurora empowers underserved communities through afterschool programs, literacy drives, and creative arts — built by youth, for youth."
        ctaButton={{
          text: "Join as Volunteer",
          onClick: () => document.querySelector("#volunteer")?.scrollIntoView({ behavior: "smooth" }),
        }}
        secondaryCta={{
          text: "View Our Impact",
          onClick: () => document.querySelector("#impact")?.scrollIntoView({ behavior: "smooth" }),
        }}
        stats={[
          ["1,200+", "Children Reached"],
          ["340+", "Active Volunteers"],
          ["12", "School Sites"],
          ["₱2.1M", "Funds Managed"],
        ]}
      />
    </section>
  );
}

function Ticker() {
  return (
    <div style={{ background: C.or, padding: "14px 40px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ background: "rgba(0,0,0,0.2)", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".5px", flexShrink: 0 }}>Story of the Month</span>
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
    {
      color: C.bl, lightBg: "#EEF4FA", tag: "Afterschool",
      name: "Ang Batang Kali",
      desc: "Our core afterschool engagement program — providing structured schedules, curriculum activities, and registration portals so every child in Aurora has a safe place to grow.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.bl} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=190&fit=crop&q=70",
    },
    {
      color: C.or, lightBg: "#FEF3EC", tag: "Literacy",
      name: "Abot Ko Ang Libro",
      desc: "A literacy-focused book drive and reading program featuring a 'Donate a Book' tracker and a gallery of storytelling activities that ignite a love of learning.",
      icon: <BookIcon size={22} color={C.or} />,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=190&fit=crop&q=70",
    },
    {
      color: "#0E6B8C", lightBg: "#E8F4F8", tag: "Arts & Culture",
      name: "Hiraya",
      desc: "A creative arts and cultural program nurturing imagination, self-expression, and Filipino heritage among Aurora's youth through workshops, performances, and exhibitions.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E6B8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=190&fit=crop&q=70",
    },
    {
      color: "#7b2d8b", lightBg: "#F5EEF8", tag: "Stories",
      name: "Impact Blog",
      desc: "Field reports, volunteer testimonials, and high-quality photo essays that humanize our data and bring the voices of Aurora's children to the world.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7b2d8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=190&fit=crop&q=70",
    },
  ];
  return (
    <section id="programs" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, gap: 24 }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Our Programs</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Flagship Initiatives</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520, fontWeight: 300 }}>Four community-driven programs designed to uplift children and families across Aurora Province — built by youth, sustained by community.</p>
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
              <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 12, left: 12, background: p.lightBg, color: p.color, fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: 100, letterSpacing: ".3px" }}>{p.tag}</div>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {p.icon}
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.2px" }}>{p.name}</div>
                </div>
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
  const funds = [
    ["Program activities", "48%", 48, C.ye],
    ["Educational materials", "27%", 27, C.sky],
    ["Community events", "15%", 15, "#4ade80"],
    ["Operations & admin", "10%", 10, "rgba(255,255,255,0.25)"],
  ];
  const stats = [
    ["1,200+", "Children in programs"],
    ["3,400", "Books donated"],
    ["12", "School sites"],
    ["₱2.1M", "Funds managed"],
    ["340+", "Volunteers deployed"],
    ["98%", "Program completion"],
  ];
  const docs = ["Annual Report 2025", "Q1 Financial Tracker 2026", "Program Impact Report"];
  return (
    <section id="impact" style={{ padding: "100px 40px", background: C.dark, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.ye }}>Transparency Hub</div>
          <div style={{ background: "rgba(245,194,0,0.15)", color: C.ye, fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: ".5px" }}>Live Data</div>
        </div>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Our impact, open to all</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520, fontWeight: 300 }}>Track every peso we receive and spend. Real-time fund allocation reporting across all 12 school sites — in full compliance with RA 10173.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 52, marginTop: 52, alignItems: "start" }}>
          <div>
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=560&h=300&fit=crop&q=70" alt="Aurora community" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 20, display: "block", marginBottom: 24 }} />
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", fontWeight: 600, marginBottom: 14 }}>Fund Allocation — May 2026</div>
            {funds.map(([name, pct, val, color], i) => (
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
              {stats.map(([n, l], i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ fontSize: "1.7rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, marginTop: 4, letterSpacing: ".3px" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "20px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "0.82rem", marginBottom: 4 }}>Public Documents</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginBottom: 16 }}>Downloadable reports — RA 10173 compliant</div>
              {docs.map((name, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ width: 34, height: 34, background: "rgba(229,92,20,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.or} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", marginTop: 1 }}>PDF · Public access</div>
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
  const perks = [
    "Leadership development & NGO training",
    "Official certificate of service hours",
    "Networking with youth changemakers",
    "Real community impact from Day 1",
  ];
  const roles = [
    { icon: "👨‍🏫", title: "Program Facilitator", desc: "Lead afterschool sessions for Ang Batang Kali across Aurora." },
    { icon: "📚", title: "Literacy Coach", desc: "Run reading circles and storytelling sessions for Abot Ko Ang Libro." },
    { icon: "🎨", title: "Arts Facilitator", desc: "Lead creative workshops and cultural activities for Hiraya." },
    { icon: "📷", title: "Documentation Lead", desc: "Capture field stories, photos, and impact reports." },
  ];
  return (
    <section id="volunteer" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Get Involved</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Become a Volunteer</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>Join hundreds of youth changemakers across Aurora Province. Your skills and time can transform a child's future — apply in 2 minutes.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {roles.map((r, i) => (
                <div key={i} style={{ background: C.bg, borderRadius: 14, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{r.icon}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: "0.75rem", color: C.mid, lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              ))}
            </div>
            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=560&h=200&fit=crop&q=70" alt="Volunteers" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 20, display: "block", marginBottom: 16 }} />
            <div style={{ background: C.dark, borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: "0.88rem", marginBottom: 14 }}>Why volunteer with Síkat-Aurora?</div>
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
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.3px", marginBottom: 4 }}>Apply to Volunteer</h3>
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
              {[
                ["Role of interest", ["Select a role...", "Program Facilitator", "Literacy Coach", "Arts Facilitator", "Documentation Lead", "General / any role"]],
                ["Availability", ["Weekends only", "Weekdays only", "Both weekdays & weekends", "School breaks / summer"]],
              ].map(([label, opts], i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                  <select style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }}>
                    {opts.map((o, oi) => <option key={oi}>{o}</option>)}
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
              <p style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.35)", textAlign: "center", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <Lock size={12} /> Your data is protected under RA 10173
              </p>
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
  const amounts = ["₱250", "₱500", "₱1,000", "₱2,500", "₱5,000", "Custom"];
  const pays = [
    { label: "GCash", logo: "G" },
    { label: "Maya", logo: "M" },
    { label: "PayPal", logo: "P" },
  ];
  const impacts = [
    { color: C.or, bg: "#FEF3EC", emoji: "📚", label: "₱250 provides 5 books", sub: "for Abot Ko Ang Libro reading circles" },
    { color: C.bl, bg: "#EEF4FA", emoji: "👦", label: "₱500 funds one child", sub: "through one month of Ang Batang Kali" },
    { color: "#0E6B8C", bg: "#E8F4F8", emoji: "🎨", label: "₱1,000 funds a Hiraya workshop", sub: "covering arts materials for one session" },
    { color: "#534AB7", bg: "#F0F0F7", emoji: "🏫", label: "₱5,000 sponsors a site", sub: "covering materials, training & logistics" },
  ];
  return (
    <section id="donate" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Make a Difference</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Support Our Mission</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 32 }}>Every peso goes directly to a child's education, a book in their hands, or a creative workshop that sparks their potential. Receipts auto-generated for all donations.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {impacts.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(229,92,20,0.3)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.3rem" }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: C.dark }}>{item.label}</strong>
                    <span style={{ fontSize: "0.78rem", color: C.mid }}>{item.sub}</span>
                  </div>
                  <ChevronRight size={14} />
                </div>
              ))}
            </div>
            <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=560&h=160&fit=crop&q=70" alt="Community" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 16, display: "block" }} />
          </div>
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: 30, border: "1px solid rgba(0,0,0,0.07)" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.2px", marginBottom: 20 }}>Choose an amount</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
                {amounts.map((a, i) => (
                  <button key={i} onClick={() => setAmt(i)}
                    style={{ padding: "12px 8px", border: `1px solid ${amt === i ? C.or : "rgba(0,0,0,0.1)"}`, borderRadius: 10, background: amt === i ? "rgba(229,92,20,0.07)" : C.bg, fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", color: amt === i ? C.or : C.dark }}>
                    {a}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 8 }}>Payment method</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {pays.map((p, i) => (
                  <button key={i} onClick={() => setPay(i)}
                    style={{ flex: 1, padding: "10px 8px", border: `1px solid ${pay === i ? C.or : "rgba(0,0,0,0.1)"}`, borderRadius: 10, background: pay === i ? "rgba(229,92,20,0.07)" : C.bg, fontFamily: "inherit", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", color: pay === i ? C.or : C.mid, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <span style={{ width: 20, height: 20, background: pay === i ? C.or : "#ddd", color: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800 }}>{p.logo}</span>
                    {p.label}
                  </button>
                ))}
              </div>
              {[["Full name", "Your name"], ["Email address", "you@email.com"]].map(([label, ph], i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                  <input placeholder={ph} style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
                </div>
              ))}
              <button onClick={() => { setDone(true); setTimeout(() => setDone(false), 3500); }}
                style={{ width: "100%", background: done ? C.gr : C.dark, color: "#fff", border: "none", padding: 14, borderRadius: 12, fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s" }}>
                {done ? <><Check size={16} /> Redirecting to payment...</> : <><Lock size={14} /> Proceed to secure payment</>}
              </button>
              <div style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.35)", textAlign: "center", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <Lock size={12} /> Secure · Auto-receipted · RA 10173 compliant
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
    {
      bg: "#EEF4FA", color: C.bl, tag: "Abot Ko Ang Libro", date: "May 12, 2026",
      title: "Liza's first book: a story about finding your voice",
      excerpt: "At nine years old, Liza had never finished a full book. Today she reads to her siblings every night — and dreams of becoming a teacher.",
      initials: "KR", author: "Kaye Reyes",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&q=70",
    },
    {
      bg: "#E8F4F8", color: "#0E6B8C", tag: "Hiraya", date: "Apr 28, 2026",
      title: "How a mural turned one school wall into a community landmark",
      excerpt: "Twelve students from San Luis spent three weekends painting a mural that now tells the story of Aurora's history — and their own dreams.",
      initials: "MC", author: "Marco Cruz",
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=200&fit=crop&q=70",
    },
    {
      bg: "#FEF3EC", color: C.or, tag: "Ang Batang Kali", date: "Apr 10, 2026",
      title: "From student to mentor: Nico's journey with Ang Batang Kali",
      excerpt: "At 19, Nico was once a beneficiary of our afterschool program. Now he leads weekend sessions for 30 children in San Luis, Aurora.",
      initials: "AL", author: "Ana Lim",
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=200&fit=crop&q=70",
    },
  ];
  return (
    <section id="stories" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, gap: 24 }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Impact Blog & Stories</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>From the field</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300 }}>Testimonials, field reports, and photo essays — real stories told by the children, volunteers, and families of Aurora.</p>
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
    <div style={{ background: C.dark, padding: "80px 40px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.ye, marginBottom: 10 }}>Síkat Newsletter</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.6px", marginBottom: 14 }}>Stay in the loop</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300 }}>Get the Síkat Newsletter delivered monthly — program updates, impact reports, community stories, and volunteer opportunities across Aurora Province.</p>
        </div>
        <div>
          <div style={{ display: "flex", gap: 10, maxWidth: 460 }}>
            <input placeholder="Enter your email address" style={{ flex: 1, padding: "13px 18px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontFamily: "inherit", fontSize: "0.88rem", background: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }} />
            <button onClick={() => { setSubbed(true); setTimeout(() => setSubbed(false), 3500); }}
              style={{ background: subbed ? C.gr : C.or, color: "#fff", border: "none", padding: "13px 22px", borderRadius: 12, fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", whiteSpace: "nowrap", transition: "background .3s" }}>
              {subbed ? "Subscribed!" : "Subscribe"}
            </button>
          </div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: 12, display: "flex", alignItems: "center", gap: 5 }}>
            <Lock size={12} /> No spam. Unsubscribe anytime. RA 10173 compliant.
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    ["Programs", ["Ang Batang Kali", "Abot Ko Ang Libro", "Hiraya", "Impact Blog"]],
    ["Get Involved", ["Volunteer", "Donate", "Partner with us", "Newsletter"]],
    ["Organization", ["About us", "Transparency Hub", "Contact", "Privacy Policy"]],
  ];
  return (
    <footer style={{ background: "#080F17", padding: "60px 40px 28px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <img src={logoImg} alt="Síkat-Aurora Logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem" }}>Síkat-Aurora</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", lineHeight: 1.75, maxWidth: 260, fontWeight: 300 }}>A youth-led NGO dedicated to afterschool programs and literacy initiatives across Aurora Province, Philippines. Registered · RA 10173 compliant.</p>
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
            {["f", "ig", "tw", "yt"].map((s, i) => (
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
        input::placeholder { color: rgba(0,0,0,0.3); }
        textarea::placeholder { color: rgba(0,0,0,0.3); }
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
