import { useState } from "react";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import logoImg from "./assets/logo.png";
import heroBanner from "./assets/hero-banner.jpg";
import batangKaliImg from "./assets/batang-kali.png";
import abotKoAngLibroImg from "./assets/abot-ko-ang-libro.png";
import hirayaImg from "./assets/hiraya.png";
import impactImg from "./assets/impact.png";

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

function AwardIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function Navbar() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Impact", href: "#impact" },
    { label: "Programs", href: "#programs" },
    { label: "Leadership", href: "#leadership" },
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, fontFamily: "'Poppins', sans-serif" }}>
      <nav style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 40px" }}>
          {/* Logo Branding */}
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src={logoImg} alt="Síkat-Aurora Logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: C.dark, letterSpacing: "-0.4px" }}>
              Síkat<span style={{ color: C.or }}>-Aurora Inc.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {navItems.map((item, i) => (
              <NavLink key={i} href={item.href}>{item.label}</NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => document.querySelector("#onboarding")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: C.dark, padding: "8px 20px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.83rem", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.borderColor = C.dark; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; }}>
              Volunteer
            </button>
            <button onClick={() => document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: C.or, border: "none", color: "#fff", padding: "9px 22px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.83rem", cursor: "pointer", boxShadow: "0 4px 14px rgba(229,92,20,0.3)", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#D4500F"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.or; e.currentTarget.style.transform = "none"; }}>
              Donate
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home">
      <AnimatedHero
        backgroundImageUrl={heroBanner}
        badge="Ang pagsíkat ay nagsisimula sa pagkilos."
        title={<>Where the sun rises, <span style={{ color: "#F5C200" }}>the youth rise with it.</span></>}
        description="Síkat-Aurora is a youth-led, youth-serving nonprofit bringing free after-school programs in education, environment, and active citizenship to underserved communities in Aurora — powered entirely by volunteers."
        ctaButton={{
          text: "Become a Volunteer",
          onClick: () => document.querySelector("#onboarding")?.scrollIntoView({ behavior: "smooth" }),
        }}
        secondaryCta={{
          text: "Donate / Be a Sponsor",
          onClick: () => document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" }),
        }}
        stats={[
          ["400+", "Youth Volunteers"],
          ["1,100+", "Learners Reached"],
          ["18", "Partner Communities"],
          ["₱1.5M+", "Donations & Grants Raised"],
        ]}
      />
    </section>
  );
}

function Ticker() {
  return (
    <div style={{ background: C.or, padding: "14px 40px", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ background: "rgba(0,0,0,0.2)", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".5px", flexShrink: 0 }}>Announcement</span>
        <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.88rem" }}>"Síkat-Aurora Inc. formally established on August 12, 2021 (International Youth Day) · SEC Reg. No. 2025030194739-03"</span>
        <a href="#about" onClick={e=>{e.preventDefault();document.querySelector("#about")?.scrollIntoView({behavior:"smooth"})}}
          style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          About Us <ArrowRight size={13} color="#fff" />
        </a>
      </div>
    </div>
  );
}

function About() {
  const values = [
    { title: "Pagmamalasakit", desc: "Kumikilos nang may malasakit sa kapwa.", color: C.or, bg: "#FEF3EC" },
    { title: "Paggalang", desc: "Kumikilos nang may paggalang sa paniniwala, kultura, at saloobin ng mga kasapi at komunidad.", color: C.bl, bg: "#EEF4FA" },
    { title: "Pagtugon", desc: "Kumikilos upang tumugon sa tunay na mga pangangailangan ng mga tao sa komunidad.", color: "#0E6B8C", bg: "#E8F4F8" },
  ];

  const keywords = ["Passionate", "Community-driven", "Youth-led", "Impact-focused"];

  return (
    <section id="about" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Who We Are</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 16 }}>
              A new face of youth volunteerism in Baler, Aurora
            </h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
              <strong>Síkat-Aurora Inc.</strong> — formerly Síkat-Baler — was formally established as a nonprofit, youth-led, and youth-serving organization on <strong>August 12, 2021</strong>, during International Youth Day.
            </p>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300, marginBottom: 28 }}>
              The name <em>Síkat</em>, meaning <strong>"rise,"</strong> is a tribute to the rise of a new generation of volunteers in the community where the Philippine sun rises first.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
              {keywords.map((kw, i) => (
                <span key={i} style={{ background: C.bg, color: C.dark, padding: "6px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 600, border: "1px solid rgba(0,0,0,0.06)" }}>
                  {kw}
                </span>
              ))}
            </div>
            {/* Vision & Mission Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.bg, borderRadius: 16, padding: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: C.dark, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <SproutIcon size={18} color={C.or} /> Vision
                </h3>
                <p style={{ fontSize: "0.8rem", color: C.mid, lineHeight: 1.6 }}>
                  A future where accessible and enriching after-school programs empower underserved communities in Aurora.
                </p>
              </div>
              <div style={{ background: C.bg, borderRadius: 16, padding: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: C.dark, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <BookIcon size={18} color={C.bl} /> Mission
                </h3>
                <p style={{ fontSize: "0.8rem", color: C.mid, lineHeight: 1.6 }}>
                  To provide inclusive after-school programs in education, environment, and active citizenship — driven by youth volunteers to create lasting community impact.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img src={hirayaImg} alt="Síkat-Aurora Youth Volunteers" style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 24, boxShadow: "0 12px 36px rgba(0,0,0,0.08)", marginBottom: 24 }} />
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: C.dark, marginBottom: 14 }}>Our Core Values</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {values.map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, background: v.bg, border: "1px solid rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: v.color, fontSize: "0.9rem", flexShrink: 0 }}>
                    0{i+1}
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: C.dark }}>{v.title}</strong>
                    <span style={{ fontSize: "0.78rem", color: C.mid }}>{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    ["400+", "Youth Volunteers"],
    ["1,100+", "Learners Reached"],
    ["18", "Partner Communities"],
    ["5k+", "Facebook Followers"],
    ["₱1.5M+", "Donations & Grants Raised"],
    ["2021", "Formally Established"],
  ];

  const awards = [
    { title: "Youth Organization of the Year (Abot Ko Ang Libro)", level: "Municipal / Provincial", grantor: "Municipal Government of Baler & SK Municipal Federation of Baler" },
    { title: "Grand Winner, Search for Outstanding Youth Organization", level: "Municipal / Provincial", grantor: "Provincial Government of Aurora & SK Provincial Federation of Aurora" },
    { title: "National Winner, Spark-A-Change Challenge", level: "National", grantor: "J. Amado Araneta Foundation" },
    { title: "Safe Space Hero 2022 / Outstanding GYS Alumni", level: "National", grantor: "Global Peace Foundation & Consuelo Zobel Alger Foundation" },
    { title: "International Winner, Mini-Fund for Youth Grant", level: "International", grantor: "ASEAN Youth Forum" },
  ];

  return (
    <section id="impact" style={{ padding: "100px 40px", background: C.dark, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.ye, marginBottom: 10 }}>Impact in Numbers</div>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 10 }}>The premier platform for youth volunteerism in Aurora</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", marginBottom: 44 }}>*Official Data as of July 2026</p>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 60 }}>
          {stats.map(([n, l], i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1, marginBottom: 6 }}>{n}</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Awards Section */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "36px" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <AwardIcon size={20} color={C.ye} /> Awards & Recognitions
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {awards.map((a, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ display: "inline-block", background: a.level === "International" ? "rgba(225,92,20,0.2)" : a.level === "National" ? "rgba(245,194,0,0.2)" : "rgba(168,212,240,0.2)", color: a.level === "International" ? C.or : a.level === "National" ? C.ye : C.sky, fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, marginBottom: 10 }}>
                  {a.level}
                </span>
                <div style={{ color: "#fff", fontSize: "0.88rem", fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{a.title}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", lineHeight: 1.5 }}>{a.grantor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const programs = [
    {
      center: "Education",
      name: "Abot Ko Ang Libro",
      duration: "5 consecutive Saturdays",
      desc: "A mobile library cart that brings books closer to kids ages 2–14 through storytelling sessions and book borrowing — rolling into barangays across Baler, Maria Aurora, and Dipaculao.",
      communities: ["Brgy. Zabali (Baler)", "Brgy. Calabuanan (Baler)", "Brgy. Reserva (Baler)", "Brgy. 5 (Baler)", "Brgy. Diome (Maria Aurora)", "Brgy. Buhangin (Baler)", "So. Cemento, Brgy. Zabali", "Brgy. Diaat (Maria Aurora)", "Brgy. Pingit (Baler)", "Brgy. Diamanen (Dipaculao)"],
      img: abotKoAngLibroImg,
      color: C.or,
      lightBg: "#FEF3EC",
    },
    {
      center: "Environment",
      name: "Ang Batang Kali",
      duration: "5 Saturdays / 3 days",
      desc: "A life skills program helping youth ages 8–15 grow into protectors and stewards of nature — from the rivers of San Luis to the coasts of Casiguran.",
      communities: ["Brgy. Dibut (San Luis)", "Brgy. Zabali (Baler)", "Sitio Cozo (Casiguran)"],
      img: batangKaliImg,
      color: C.bl,
      lightBg: "#EEF4FA",
    },
    {
      center: "Active Citizenship",
      name: "Hiraya: Paglinang sa Kasanayan ng mga Makabagong Bayani ng Aurora",
      duration: "1–2 days",
      desc: "A leadership training equipping aspiring youth leaders with essential skills, knowledge, and initial funding necessary to excel in their roles and make a positive impact in their schools and communities.",
      communities: ["30 DepEd Public Schools in Central Aurora", "Hiraya Dinalungan", "Hiraya Ditumabo NHS"],
      img: hirayaImg,
      color: "#0E6B8C",
      lightBg: "#E8F4F8",
    },
  ];

  return (
    <section id="programs" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Core Programs</div>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Three programs, one rising community</h2>
        <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 600, fontWeight: 300, marginBottom: 52 }}>
          Every program is volunteer-driven and free for its learners — built around our three centers of participation.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {programs.map((p, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", minHeight: 320, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ background: p.lightBg, color: p.color, fontSize: "0.72rem", fontWeight: 700, padding: "4px 12px", borderRadius: 100 }}>
                    Center of Participation: {p.center}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: C.mid, fontWeight: 500 }}>⏱️ {p.duration}</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: C.dark, letterSpacing: "-0.4px", marginBottom: 12 }}>{p.name}</h3>
                <p style={{ fontSize: "0.88rem", color: C.mid, lineHeight: 1.7, marginBottom: 20, fontWeight: 400 }}>{p.desc}</p>
                <div style={{ fontSize: "0.76rem", fontWeight: 700, color: C.dark, marginBottom: 10 }}>Partner Communities:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.communities.map((c, ci) => (
                    <span key={ci} style={{ background: C.bg, color: C.dark, fontSize: "0.72rem", padding: "4px 10px", borderRadius: 8, fontWeight: 500 }}>
                      📍 {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Onboarding() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { setSubmitted(true); setTimeout(() => setSubmitted(false), 3500); };

  const steps = [
    { num: "01", title: "Signify your interest", desc: "Follow the Síkat-Aurora Facebook page and reach out. Engaging with and sharing posts counts as your first show of support." },
    { num: "02", title: "Attend 3 events", desc: "Join at least three (3) Síkat-Aurora events within three months of signifying interest. Show up, help out, get to know the community." },
    { num: "03", title: "Commit to principles", desc: "Demonstrate willingness to adhere to principles, rules, and policies — including finding a replacement if unavailable." },
  ];

  return (
    <section id="onboarding" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Join Us</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>How can I be a member?</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 32 }}>
              Admission is <strong>free and open to all youth aged 15–30 in Aurora.</strong> Here's the path from interested to inducted:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, background: C.bg, padding: "20px", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.or, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>
                    {s.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: C.dark, marginBottom: 4 }}>{s.title}</h4>
                    <p style={{ fontSize: "0.82rem", color: C.mid, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <img src={hirayaImg} alt="Volunteers in action" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 20, display: "block" }} />
          </div>

          {/* Volunteer Form */}
          <div style={{ background: "#fff", borderRadius: 24, padding: 36, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.3px", marginBottom: 4 }}>Start Volunteering Today</h3>
            <p style={{ fontSize: "0.82rem", color: C.mid, marginBottom: 24 }}>Open for youth ages 15–30 in Aurora Province.</p>
            
            {[["First name", "Last name"], ["Email address", ""], ["Mobile number", ""]].map((row, ri) => (
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
              ["Program of interest", ["Select a program...", "Abot Ko Ang Libro (Education)", "Ang Batang Kali (Environment)", "Hiraya (Active Citizenship)", "Any program"]],
              ["Age Range", ["15–18 years old", "19–24 years old", "25–30 years old"]],
            ].map(([label, opts], i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{label}</label>
                <select style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }}>
                  {opts.map((o, oi) => <option key={oi}>{o}</option>)}
                </select>
              </div>
            ))}

            <button onClick={handleSubmit}
              style={{ width: "100%", background: submitted ? C.gr : C.or, color: "#fff", border: "none", padding: 14, borderRadius: 12, fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s" }}>
              {submitted ? <><Check size={16} /> Interest Signified!</> : <>Signify Interest & Apply <ArrowRight size={14} color="#fff" /></>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Donate() {
  const [amt, setAmt] = useState(0);
  const [done, setDone] = useState(false);

  const tiers = [
    { amount: "₱150", equiv: "3 storybooks for the Abot Ko Ang Libro mobile cart" },
    { amount: "₱500", equiv: "Art & learning supplies for one Saturday storytelling session" },
    { amount: "₱1,500", equiv: "A full Batang Kali nature-stewardship kit for one batch of kids" },
    { amount: "₱5,000", equiv: "Seed funding for one youth-led Hiraya school project" },
  ];

  return (
    <section id="donate" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Donate / Be a Sponsor</div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Every peso becomes a page, a seedling, a leader</h2>
            <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>
              Your donation goes directly to program materials and community sessions. Here's what your support is equivalent to:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {tiers.map((t, i) => (
                <div key={i} onClick={() => setAmt(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: amt === i ? "#FEF3EC" : "#fff", borderRadius: 16, border: `1px solid ${amt === i ? C.or : "rgba(0,0,0,0.06)"}`, cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: C.or, width: 80, flexShrink: 0 }}>{t.amount}</div>
                  <div style={{ fontSize: "0.83rem", color: C.dark, fontWeight: 500 }}>{t.equiv}</div>
                </div>
              ))}
            </div>

            <div style={{ background: C.dark, color: "#fff", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 600, color: C.ye, marginBottom: 4 }}>Full Transparency Promise</div>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 10 }}>
                We publish where every peso goes. Funding sources include grant competitions and public donation drives.
              </p>
              <a href="https://bit.ly/sikatfinance" target="_blank" rel="noreferrer" style={{ color: C.sky, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                Read full report at bit.ly/sikatfinance <ArrowRight size={12} color={C.sky} />
              </a>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 24, padding: 36, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: C.dark, marginBottom: 20 }}>Make a Donation</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
              <button style={{ padding: "14px", border: `2px solid ${C.or}`, borderRadius: 12, background: "#FEF3EC", fontWeight: 700, color: C.or, cursor: "pointer" }}>GCash / Maya</button>
              <button style={{ padding: "14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, background: C.bg, fontWeight: 600, color: C.dark, cursor: "pointer" }}>Bank Transfer</button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>Full Name</label>
              <input placeholder="Juan Dela Cruz" style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>Email Address (for official receipt)</label>
              <input placeholder="juan@gmail.com" style={{ width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
            </div>

            <button onClick={() => { setDone(true); setTimeout(() => setDone(false), 3500); }}
              style={{ width: "100%", background: done ? C.gr : C.dark, color: "#fff", border: "none", padding: 14, borderRadius: 12, fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s" }}>
              {done ? <><Check size={16} /> Receipt Generated!</> : <><Lock size={14} /> Proceed to Secure Donation</>}
            </button>
            <p style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.35)", textAlign: "center", marginTop: 14 }}>
              Registered NGO · Reg No. 2025030194739-03 · URN YO-2807-021323
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const leaders = [
    { name: "RJ Belen", title: "Executive Director", role: "Highest official; presides over Executive Committee, executes policies & sets direction." },
    { name: "Angelica Matusalem", title: "Deputy Executive Director & Director of Finance", role: "Oversees operations, financial capacity, & procurement." },
    { name: "Rachelle Ann Imperial", title: "Director of Internal Affairs", role: "Recruitment & member relations. Deputy: Princess Joy Necesito." },
    { name: "Patrisha Mae Abubo", title: "Director of External Affairs", role: "Envoys to partners & aligned organizations. Deputy: Jomari Guttierrez." },
    { name: "Reaiah Codiapit", title: "Director of Education & Training", role: "Educational arm & program think tank. Deputy: Jefferson Lising." },
    { name: "Cattleya Abuan", title: "Director of Creatives", role: "Brand promotion & online identity. Deputy: John Renuel de Padua." },
  ];

  return (
    <section id="leadership" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Organizational Structure</div>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Youth leaders behind the movement</h2>
        <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520, fontWeight: 300, marginBottom: 48 }}>
          Meet the executive committee and directorate driving programs across Aurora Province.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {leaders.map((l, i) => (
            <div key={i} style={{ background: C.bg, borderRadius: 20, padding: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.or, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", marginBottom: 14 }}>
                {l.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: C.dark, marginBottom: 4 }}>{l.name}</h3>
              <div style={{ fontSize: "0.78rem", color: C.or, fontWeight: 600, marginBottom: 10 }}>{l.title}</div>
              <p style={{ fontSize: "0.8rem", color: C.mid, lineHeight: 1.6 }}>{l.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const posts = [
    {
      title: "Field Notes — Five Saturdays in Brgy. Zabali",
      desc: "What happens when a library on wheels meets fifty kids who've never borrowed a book before.",
      tag: "Abot Ko Ang Libro",
      img: abotKoAngLibroImg,
    },
    {
      title: "Volunteer Story — From Dibut to Cozo: Batang Kali by the water",
      desc: "How a river cleanup turned into a lifelong promise between kids and their coastline.",
      tag: "Ang Batang Kali",
      img: batangKaliImg,
    },
    {
      title: "Updates — Hiraya 2026: 30 schools, one generation of leaders",
      desc: "Inside the leadership training that hands young people both the mic and the funding.",
      tag: "Hiraya",
      img: hirayaImg,
    },
  ];

  return (
    <section id="blog" style={{ padding: "100px 40px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Blog & Stories</div>
        <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 14 }}>Kwentong Síkat</h2>
        <p style={{ color: C.mid, fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520, fontWeight: 300, marginBottom: 48 }}>
          Stories from the field — by the volunteers, for the community.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {posts.map((p, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
              <img src={p.img} alt={p.title} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "24px" }}>
                <span style={{ background: "#FEF3EC", color: C.or, fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: 100, marginBottom: 10, display: "inline-block" }}>
                  {p.tag}
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: C.dark, lineHeight: 1.4, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: "0.8rem", color: C.mid, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                <a href="#" style={{ color: C.or, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  Read full story <ArrowRight size={13} color={C.or} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is Síkat-Aurora Inc.?",
      a: "Síkat-Aurora Inc., formerly Síkat-Baler, is a youth-led, youth-serving nonprofit organization based in Baler, Aurora, Philippines. Established on August 12, 2021 — International Youth Day — it provides free after-school programs in education, environment, and active citizenship, powered by 400+ youth volunteers."
    },
    {
      q: "How can I volunteer with Síkat-Aurora in Baler, Aurora?",
      a: "Admission is free and open to all youth aged 15–30 in Aurora. Simply follow the Síkat-Aurora Facebook page, signify your interest, then attend at least three (3) events within three months while committing to the organization's principles, rules, and policies."
    },
    {
      q: "Is Síkat-Aurora a registered nonprofit organization?",
      a: "Yes. Síkat-Aurora Inc. is formally registered as a nonprofit organization in the Philippines — Company Registration No. 2025030194739-03 and Unique Registration Number (URN) YO-2807-021323."
    },
    {
      q: "How can I donate or sponsor a program?",
      a: "You can give through our donation drive or become a program sponsor — every peso translates directly to books, learning kits, and youth training in Aurora. We publish a full transparency report at bit.ly/sikatfinance."
    },
    {
      q: "What programs does Síkat-Aurora run?",
      a: "Three core programs: Abot Ko Ang Libro (a mobile library cart with storytelling for kids ages 2–14), Ang Batang Kali (an environmental life skills program for youth ages 8–15), and Hiraya (a leadership training with seed funding for aspiring youth leaders across 30+ DepEd schools in Central Aurora)."
    },
    {
      q: "Where does Síkat-Aurora operate?",
      a: "Síkat-Aurora serves 18 partner communities across the province of Aurora, Philippines — including barangays in Baler, Maria Aurora, Dipaculao, San Luis, and Casiguran, plus public schools throughout Central Aurora."
    }
  ];

  return (
    <section id="faq" style={{ padding: "100px 40px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>FAQ</div>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.8px" }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, overflow: "hidden", background: C.bg }}>
              <button onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", textAlign: "left", fontSize: "0.95rem", fontWeight: 600, color: C.dark, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{f.q}</span>
                <span style={{ fontSize: "1.2rem", color: C.or }}>{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 24px 20px", fontSize: "0.85rem", color: C.mid, lineHeight: 1.7 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <div style={{ background: C.dark, color: "#fff", padding: "100px 40px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.8rem", fontWeight: 700, letterSpacing: "-1px", marginBottom: 20 }}>
          Handa ka na bang sumíkat kasama namin?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 36 }}>
          Join over 400 youth volunteers across Baler and Aurora Province in building a brighter future.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <button onClick={() => document.querySelector("#onboarding")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: C.or, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 100, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(229,92,20,0.4)" }}>
            Become a Volunteer
          </button>
          <button onClick={() => document.querySelector("#donate")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 32px", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>
            Donate / Be a Sponsor
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#04090F", color: "rgba(255,255,255,0.5)", padding: "80px 40px 32px", fontFamily: "'Poppins', sans-serif", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: 48, marginBottom: 60 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img src={logoImg} alt="Síkat-Aurora Logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>Síkat-Aurora Inc.</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.75, maxWidth: 300, fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Ang pagsíkat ay nagsisimula sa pagkilos. A youth-led nonprofit in Baler, Aurora — where the sun rises.
            </p>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
              Company Reg. No. 2025030194739-03<br />
              Unique Registration Number (URN) YO-2807-021323
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, marginBottom: 18 }}>Explore</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "0.8rem" }}>
              <li><a href="#about" style={{ color: "inherit", textDecoration: "none" }}>About Us</a></li>
              <li><a href="#impact" style={{ color: "inherit", textDecoration: "none" }}>Impact & Awards</a></li>
              <li><a href="#programs" style={{ color: "inherit", textDecoration: "none" }}>Our Programs</a></li>
              <li><a href="#blog" style={{ color: "inherit", textDecoration: "none" }}>Blog — Kwentong Síkat</a></li>
              <li><a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, marginBottom: 18 }}>Get Involved</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "0.8rem" }}>
              <li><a href="#onboarding" style={{ color: "inherit", textDecoration: "none" }}>Become a Volunteer</a></li>
              <li><a href="#donate" style={{ color: "inherit", textDecoration: "none" }}>Donate</a></li>
              <li><a href="#donate" style={{ color: "inherit", textDecoration: "none" }}>Be a Sponsor</a></li>
              <li><a href="https://bit.ly/sikatfinance" target="_blank" rel="noreferrer" style={{ color: C.sky, textDecoration: "none" }}>Transparency Report ↗</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, marginBottom: 18 }}>Contact & Social</h4>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.6, marginBottom: 14 }}>
              📍 Baler, Aurora, Philippines<br />
              📧 contact@sikataurora.org
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["Facebook", "Instagram"].map((platform, i) => (
                <a key={i} href="#" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}>
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
          <div>© 2026 Síkat-Aurora Inc. All rights reserved.</div>
          <div>Established August 12, 2021 — International Youth Day</div>
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
        html { scroll-behavior: smooth; }
        body { font-family: 'Poppins', sans-serif; margin: 0; background: #F7F4F0; }
        input::placeholder { color: rgba(0,0,0,0.3); }
        textarea::placeholder { color: rgba(0,0,0,0.3); }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Impact />
      <Programs />
      <Onboarding />
      <Donate />
      <Leadership />
      <Blog />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
