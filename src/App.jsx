import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { PhotoGallery } from "@/components/ui/gallery";
import { FaqSection } from "@/components/ui/faq-section";
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

// Motion animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.01,
    boxShadow: "0 14px 32px rgba(0,0,0,0.06)",
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

// Helper SVG Icons
function ArrowRight({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
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

function AwardIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

// Volunteer Modal Form Component
function VolunteerModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "absolute", inset: 0, background: "rgba(11, 23, 35, 0.75)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{ position: "relative", zIndex: 1, background: "#fff", borderRadius: 24, padding: "32px 36px", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.25)", border: "1px solid rgba(0,0,0,0.08)", fontFamily: "'Poppins', sans-serif" }}
          >
            <button onClick={onClose} style={{ position: "absolute", top: 18, right: 20, background: C.bg, border: "none", width: 34, height: 34, borderRadius: 100, cursor: "pointer", fontSize: "1rem", fontWeight: 600, color: C.mid, display: "flex", alignItems: "center", justifyContent: "center" }}>
              ✕
            </button>

            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 6 }}>
              Join Síkat-Aurora
            </div>
            <h3 style={{ fontSize: "1.35rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>
              Sign Up & Signify Interest
            </h3>
            <p style={{ fontSize: "0.84rem", color: C.mid, marginBottom: 20 }}>
              Takes 2 minutes — our membership team will reach out within 48 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>First name</label>
                  <input required placeholder="Juan" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Last name</label>
                  <input required placeholder="Dela Cruz" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Email address</label>
                <input required type="email" placeholder="juan@gmail.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Mobile number</label>
                <input required type="tel" placeholder="0917 123 4567" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Program of interest</label>
                <select style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }}>
                  <option>Select a program...</option>
                  <option>Abot Ko Ang Libro (Education)</option>
                  <option>Ang Batang Kali (Environment)</option>
                  <option>Hiraya (Active Citizenship)</option>
                  <option>Any program where needed</option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Age Group (15–30 y/o)</label>
                <select style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.85rem", background: C.bg, outline: "none" }}>
                  <option>15–18 years old</option>
                  <option>19–24 years old</option>
                  <option>25–30 years old</option>
                </select>
              </div>

              <button type="submit"
                style={{ width: "100%", background: submitted ? C.gr : C.or, color: "#fff", border: "none", padding: 13, borderRadius: 12, fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s", boxShadow: "0 4px 16px rgba(229,92,20,0.3)" }}>
                {submitted ? <><Check size={16} /> Interest Signified! Welcome to Síkat</> : <>Submit Application <ArrowRight size={15} color="#fff" /></>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Navigation Bar with Animated Pill Slider
function Navbar({ activePage, onNavigate, onOpenModal }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "programs", label: "Programs" },
    { id: "impact", label: "Impact" },
    { id: "leadership", label: "Leadership" },
    { id: "blog", label: "Blog" },
  ];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, fontFamily: "'Poppins', sans-serif" }}>
      <nav style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 36px" }}>
          {/* Logo Branding */}
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src={logoImg} alt="Síkat-Aurora Logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <span style={{ fontSize: "1.05rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.4px" }}>
              Síkat<span style={{ color: C.or }}>-Aurora Inc.</span>
            </span>
          </a>

          {/* Nav Items as Separate Pages */}
          <div style={{ display: "flex", gap: 4, alignItems: "center", background: "#EEF2F7", padding: "4px 5px", borderRadius: 100, position: "relative" }}>
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    position: "relative",
                    border: "none",
                    background: "transparent",
                    color: isActive ? "#fff" : C.dark,
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.8rem",
                    padding: "7px 16px",
                    borderRadius: 100,
                    cursor: "pointer",
                    zIndex: 1,
                    fontFamily: "inherit",
                    transition: "color 0.2s ease",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: C.or,
                        borderRadius: 100,
                        zIndex: -1,
                        boxShadow: "0 4px 12px rgba(229,92,20,0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={onOpenModal}
              style={{ background: activePage === "volunteer" ? C.dark : "transparent", border: "1px solid rgba(0,0,0,0.15)", color: activePage === "volunteer" ? "#fff" : C.dark, padding: "8px 18px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all .2s" }}>
              Volunteer
            </button>
            <button onClick={() => onNavigate("donate")}
              style={{ background: C.or, border: "none", color: "#fff", padding: "8px 20px", borderRadius: 100, fontFamily: "inherit", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", boxShadow: "0 4px 14px rgba(229,92,20,0.3)", transition: "all .2s" }}>
              Donate
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Page Header Banner for subpages
function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: C.dark, color: "#fff", paddingTop: 110, paddingBottom: 44, paddingLeft: 36, paddingRight: 36, fontFamily: "'Poppins', sans-serif" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.ye, marginBottom: 8 }}>{eyebrow}</div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 600, letterSpacing: "-0.6px", marginBottom: 10 }}>{title}</h1>
        {subtitle && <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: 620, fontWeight: 300 }}>{subtitle}</p>}
      </div>
    </motion.div>
  );
}

// ================= PAGE 1: HOME =================
function HomePage({ onNavigate, onOpenModal }) {
  return (
    <>
      <section id="home">
        <AnimatedHero
          backgroundImageUrl={heroBanner}
          badge="SÍKAT-AURORA INC."
          title={
            <>
              Ang pagsíkat ay<br />
              <span style={{ color: "#F5C200" }}>nagsisimula sa pagkilos.</span>
            </>
          }
          description="Síkat-Aurora is a youth-led, youth-serving nonprofit bringing free after-school programs in education, environment, and active citizenship to underserved communities in Aurora — powered entirely by volunteers."
          ctaButton={{
            text: "Become a Volunteer",
            onClick: onOpenModal,
          }}
          secondaryCta={{
            text: "Donate / Be a Sponsor",
            onClick: () => onNavigate("donate"),
          }}
        />
      </section>

      {/* Ticker */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ background: C.or, padding: "14px 36px", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ background: "rgba(0,0,0,0.2)", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: "0.7rem", fontWeight: 600, letterSpacing: ".5px", flexShrink: 0 }}>Formally Established</span>
          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.85rem" }}>"Established August 12, 2021 (International Youth Day) · SEC Reg. No. 2025030194739-03"</span>
          <button onClick={() => onNavigate("about")}
            style={{ background: "transparent", border: "none", color: "#fff", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: "inherit" }}>
            Read Our History <ArrowRight size={13} color="#fff" />
          </button>
        </div>
      </motion.div>

      {/* About Teaser */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 52, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 10 }}>Who We Are</div>
            <h2 style={{ fontSize: "1.95rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1.28, marginBottom: 16 }}>
              A new face of youth volunteerism in Baler, Aurora
            </h2>
            <p style={{ color: C.mid, fontSize: "0.92rem", lineHeight: 1.75, fontWeight: 300, marginBottom: 22 }}>
              <strong>Síkat-Aurora Inc.</strong> — formerly Síkat-Baler — is a nonprofit, youth-led, and youth-serving organization. The name <em>Síkat</em>, meaning <strong>"rise,"</strong> pays tribute to a new generation of volunteers where the Philippine sun rises first.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => onNavigate("about")}
                style={{ background: C.dark, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 100, fontWeight: 600, fontSize: "0.84rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Learn More About Us <ArrowRight size={14} color="#fff" />
              </button>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.3 }}>
            <img src={hirayaImg} alt="Volunteers" style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 20, boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }} />
          </motion.div>
        </div>
      </motion.section>

      {/* Impact Stats Teaser */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.dark, color: "#fff", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.ye, marginBottom: 8 }}>Impact in Numbers</div>
              <h2 style={{ fontSize: "1.95rem", fontWeight: 600, letterSpacing: "-0.5px" }}>The premier platform for youth volunteerism</h2>
            </div>
            <button onClick={() => onNavigate("impact")}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "10px 22px", borderRadius: 100, fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>
              See Full Impact & Awards →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {[["400+", "Youth Volunteers"], ["1,100+", "Learners Reached"], ["18", "Partner Communities"], ["₱1.5M+", "Donations Raised"]].map(([n, l], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.07)" }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "26px 18px", textAlign: "center", transition: "all 0.2s" }}
              >
                <div style={{ fontSize: "2.2rem", fontWeight: 600, color: C.ye, marginBottom: 4 }}>{n}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>{l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Programs Teaser */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 8 }}>Core Programs</div>
              <h2 style={{ fontSize: "1.95rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.5px" }}>Three programs, one rising community</h2>
            </div>
            <button onClick={() => onNavigate("programs")}
              style={{ background: C.or, color: "#fff", border: "none", padding: "10px 22px", borderRadius: 100, fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(229,92,20,0.3)" }}>
              Explore All Programs →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {[
              { name: "Abot Ko Ang Libro", center: "Education", img: abotKoAngLibroImg, desc: "Mobile library cart bringing books & storytelling to kids ages 2–14." },
              { name: "Ang Batang Kali", center: "Environment", img: batangKaliImg, desc: "Environmental life skills for youth ages 8–15 protecting nature." },
              { name: "Hiraya", center: "Active Citizenship", img: hirayaImg, desc: "Leadership training & seed funding across 30 DepEd schools." },
            ].map((p, i) => (
              <motion.div
                key={i}
                variants={cardHoverVariants}
                whileHover="hover"
                onClick={() => onNavigate("programs")}
                style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}
              >
                <img src={p.img} alt={p.name} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                <div style={{ padding: "20px" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, color: C.or, background: "#FEF3EC", padding: "4px 10px", borderRadius: 100, display: "inline-block", marginBottom: 8 }}>{p.center}</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontSize: "0.84rem", color: C.mid, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Photo Gallery Blog Teaser directly on Home */}
      <section style={{ background: "#fff" }}>
        <PhotoGallery onViewAll={() => onNavigate("blog")} />
      </section>

      {/* FAQ Section directly on Home */}
      <FaqSection
        title="Frequently Asked Questions"
        description="Everything you need to know about volunteerism, programs, and supporting Síkat-Aurora."
        items={OFFICIAL_FAQS}
        contactInfo={{
          title: "Still have questions?",
          description: "Reach out directly to our volunteer coordination team in Baler, Aurora.",
          buttonText: "Contact Us via Email",
          onContact: () => window.location.href = "mailto:contact@sikataurora.org",
        }}
      />

      {/* Final CTA Band */}
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

// ================= PAGE 2: ABOUT =================
function AboutPage({ onNavigate }) {
  const values = [
    { title: "Pagmamalasakit", desc: "Kumikilos nang may malasakit sa kapwa.", color: C.or, bg: "#FEF3EC" },
    { title: "Paggalang", desc: "Kumikilos nang may paggalang sa paniniwala, kultura, at saloobin ng mga kasapi at komunidad.", color: C.bl, bg: "#EEF4FA" },
    { title: "Pagtugon", desc: "Kumikilos upang tumugon sa tunay na mga pangangailangan ng mga tao sa komunidad.", color: "#0E6B8C", bg: "#E8F4F8" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Who We Are"
        title="About Síkat-Aurora Inc."
        subtitle="Formerly Síkat-Baler — formally established on International Youth Day, August 12, 2021."
      />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 52, alignItems: "start", marginBottom: 52 }}>
            <div>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 600, color: C.dark, marginBottom: 14 }}>Our Origins & Name</h2>
              <p style={{ color: C.mid, fontSize: "0.92rem", lineHeight: 1.8, fontWeight: 300, marginBottom: 14 }}>
                <strong>Síkat-Aurora Inc.</strong> — formerly Síkat-Baler — was formally established as a nonprofit, youth-led, and youth-serving organization on <strong>August 12, 2021</strong>, during International Youth Day.
              </p>
              <p style={{ color: C.mid, fontSize: "0.92rem", lineHeight: 1.8, fontWeight: 300, marginBottom: 18 }}>
                The name <em>Síkat</em>, meaning <strong>"rise,"</strong> is a tribute to the rise of a new generation of volunteers in the community where the Philippine sun rises first.
              </p>
              <div style={{ background: C.bg, padding: "18px 22px", borderRadius: 16, borderLeft: `4px solid ${C.or}` }}>
                <div style={{ fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Legal Registration Info:</div>
                <div style={{ fontSize: "0.8rem", color: C.mid }}>
                  Company Registration No. <strong>2025030194739-03</strong><br />
                  Unique Registration Number (URN) <strong>YO-2807-021323</strong>
                </div>
              </div>
            </div>
            <div>
              <img src={hirayaImg} alt="Síkat-Aurora Volunteers" style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 20, boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }} />
            </div>
          </div>

          {/* Vision & Mission */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 52 }}>
            <div style={{ background: C.bg, borderRadius: 20, padding: 28, border: "1px solid rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: C.or, background: "#FEF3EC", padding: "4px 12px", borderRadius: 100, display: "inline-block", marginBottom: 10 }}>VISION</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: C.dark, marginBottom: 8 }}>Our Vision</h3>
              <p style={{ fontSize: "0.88rem", color: C.mid, lineHeight: 1.7 }}>
                A future where accessible and enriching after-school programs empower underserved communities in Aurora.
              </p>
            </div>
            <div style={{ background: C.bg, borderRadius: 20, padding: 28, border: "1px solid rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: C.bl, background: "#EEF4FA", padding: "4px 12px", borderRadius: 100, display: "inline-block", marginBottom: 10 }}>MISSION</span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: C.dark, marginBottom: 8 }}>Our Mission</h3>
              <p style={{ fontSize: "0.88rem", color: C.mid, lineHeight: 1.7 }}>
                To provide inclusive after-school programs in education, environment, and active citizenship — driven by youth volunteers to create lasting community impact.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 600, color: C.dark, marginBottom: 24, textAlign: "center" }}>Our Core Values</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  style={{ background: v.bg, borderRadius: 20, padding: "24px", border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: v.color, marginBottom: 8 }}>0{i+1}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{v.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: C.mid, lineHeight: 1.65 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ================= PAGE 3: PROGRAMS =================
function ProgramsPage({ onNavigate }) {
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
    <>
      <PageHeader
        eyebrow="Core Programs"
        title="Three Programs, One Rising Community"
        subtitle="Every program is volunteer-driven and free for its learners — built around our three centers of participation."
      />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 36 }}>
          {programs.map((p, i) => (
            <motion.div
              key={i}
              variants={cardHoverVariants}
              whileHover="hover"
              style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 0, boxShadow: "0 8px 24px rgba(0,0,0,0.03)" }}
            >
              <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ background: p.lightBg, color: p.color, fontSize: "0.7rem", fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>
                    Center of Participation: {p.center}
                  </span>
                  <span style={{ fontSize: "0.76rem", color: C.mid, fontWeight: 500 }}>⏱️ {p.duration}</span>
                </div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.3px", marginBottom: 10 }}>{p.name}</h2>
                <p style={{ fontSize: "0.86rem", color: C.mid, lineHeight: 1.65, marginBottom: 18, fontWeight: 400 }}>{p.desc}</p>
                <div style={{ fontSize: "0.76rem", fontWeight: 600, color: C.dark, marginBottom: 8 }}>Partner Communities ({p.communities.length}):</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.communities.map((c, ci) => (
                    <span key={ci} style={{ background: C.bg, color: C.dark, fontSize: "0.7rem", padding: "4px 10px", borderRadius: 8, fontWeight: 500 }}>
                      📍 {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ================= PAGE 4: IMPACT & AWARDS =================
function ImpactPage({ onNavigate }) {
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
    <>
      <PageHeader
        eyebrow="Impact & Awards"
        title="The Premier Platform for Youth Volunteerism in Aurora"
        subtitle="Official metrics and recognitions as of July 2026."
      />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.dark, color: "#fff", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 48 }}>
            {stats.map(([n, l], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 12px", textAlign: "center" }}
              >
                <div style={{ fontSize: "1.75rem", fontWeight: 600, color: C.ye, letterSpacing: "-0.5px", lineHeight: 1, marginBottom: 4 }}>{n}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{l}</div>
              </motion.div>
            ))}
          </div>

          <h2 style={{ fontSize: "1.65rem", fontWeight: 600, color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <AwardIcon size={22} color={C.ye} /> Awards & Recognitions
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 48 }}>
            {awards.map((a, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: "22px", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span style={{ display: "inline-block", background: a.level === "International" ? "rgba(225,92,20,0.2)" : a.level === "National" ? "rgba(245,194,0,0.2)" : "rgba(168,212,240,0.2)", color: a.level === "International" ? C.or : a.level === "National" ? C.ye : C.sky, fontSize: "0.66rem", fontWeight: 600, padding: "4px 10px", borderRadius: 100, marginBottom: 10 }}>
                  {a.level}
                </span>
                <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{a.title}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.76rem", lineHeight: 1.45 }}>{a.grantor}</div>
              </motion.div>
            ))}
          </div>

          {/* Transparency Section */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: "32px", border: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: 8 }}>Financial Transparency Report</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.86rem", lineHeight: 1.65, fontWeight: 300, marginBottom: 16 }}>
                We publish where every single peso goes. Over ₱1.5M+ raised through grant competitions and public donation drives.
              </p>
              <a href="https://bit.ly/sikatfinance" target="_blank" rel="noreferrer" style={{ background: C.or, color: "#fff", padding: "10px 20px", borderRadius: 100, fontWeight: 600, fontSize: "0.82rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 6px 20px rgba(229,92,20,0.4)" }}>
                Open Financial Tracker (bit.ly/sikatfinance) ↗
              </a>
            </div>
            <div>
              <img src={impactImg} alt="Impact transparency" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 16 }} />
            </div>
          </div>
        </div>
      </motion.section>
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ================= PAGE 5: LEADERSHIP =================
function LeadershipPage({ onNavigate }) {
  const leaders = [
    { name: "RJ Belen", title: "Executive Director", role: "Highest official; presides over Executive Committee, executes policies & sets direction." },
    { name: "Angelica Matusalem", title: "Deputy Executive Director & Director of Finance", role: "Oversees operations, financial capacity, & procurement." },
    { name: "Rachelle Ann Imperial", title: "Director of Internal Affairs", role: "Recruitment & member relations. Deputy: Princess Joy Necesito." },
    { name: "Patrisha Mae Abubo", title: "Director of External Affairs", role: "Envoys to partners & aligned organizations. Deputy: Jomari Guttierrez." },
    { name: "Reaiah Codiapit", title: "Director of Education & Training", role: "Educational arm & program think tank. Deputy: Jefferson Lising." },
    { name: "Cattleya Abuan", title: "Director of Creatives", role: "Brand promotion & online identity. Deputy: John Renuel de Padua." },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Organizational Structure"
        title="Youth Leaders Behind the Movement"
        subtitle="Meet the executive committee and directorate driving programs across Aurora Province."
      />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {leaders.map((l, i) => (
              <motion.div
                key={i}
                variants={cardHoverVariants}
                whileHover="hover"
                style={{ background: C.bg, borderRadius: 20, padding: "26px", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.or, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "1rem", marginBottom: 14, boxShadow: "0 4px 14px rgba(229,92,20,0.3)" }}>
                  {l.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>{l.name}</h3>
                <div style={{ fontSize: "0.78rem", color: C.or, fontWeight: 600, marginBottom: 10 }}>{l.title}</div>
                <p style={{ fontSize: "0.84rem", color: C.mid, lineHeight: 1.6 }}>{l.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// ================= PAGE 6: BLOG =================
function BlogPage({ onNavigate }) {
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
    <>
      <PageHeader
        eyebrow="Blog & Stories"
        title="Kwentong Síkat"
        subtitle="Stories from the field — by the volunteers, for the community."
      />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {posts.map((p, i) => (
              <motion.div
                key={i}
                variants={cardHoverVariants}
                whileHover="hover"
                style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 24px rgba(0,0,0,0.03)" }}
              >
                <img src={p.img} alt={p.title} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "22px" }}>
                  <span style={{ background: "#FEF3EC", color: C.or, fontSize: "0.68rem", fontWeight: 600, padding: "4px 10px", borderRadius: 100, marginBottom: 10, display: "inline-block" }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: C.dark, lineHeight: 1.4, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: C.mid, lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
                  <a href="#" style={{ color: C.or, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    Read full story <ArrowRight size={13} color={C.or} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <FinalCTA onNavigate={onNavigate} />
    </>
  );
}

// Official FAQs Data
const OFFICIAL_FAQS = [
  {
    question: "What is Síkat-Aurora Inc.?",
    answer: "Síkat-Aurora Inc., formerly Síkat-Baler, is a youth-led, youth-serving nonprofit organization based in Baler, Aurora, Philippines. Established on August 12, 2021 — International Youth Day — it provides free after-school programs in education, environment, and active citizenship, powered by 400+ youth volunteers."
  },
  {
    question: "How can I volunteer with Síkat-Aurora in Baler, Aurora?",
    answer: "Admission is free and open to all youth aged 15–30 in Aurora. Simply follow the Síkat-Aurora Facebook page, signify your interest, then attend at least three (3) events within three months while committing to the organization's principles, rules, and policies."
  },
  {
    question: "Is Síkat-Aurora a registered nonprofit organization?",
    answer: "Yes. Síkat-Aurora Inc. is formally registered as a nonprofit organization in the Philippines — Company Registration No. 2025030194739-03 and Unique Registration Number (URN) YO-2807-021323."
  },
  {
    question: "How can I donate or sponsor a program?",
    answer: "You can give through our donation drive or become a program sponsor — every peso translates directly to books, learning kits, and youth training in Aurora. We publish a full transparency report at bit.ly/sikatfinance."
  },
  {
    question: "What programs does Síkat-Aurora run?",
    answer: "Three core programs: Abot Ko Ang Libro (a mobile library cart with storytelling for kids ages 2–14), Ang Batang Kali (an environmental life skills program for youth ages 8–15), and Hiraya (a leadership training with seed funding for aspiring youth leaders across 30+ DepEd schools in Central Aurora)."
  },
  {
    question: "Where does Síkat-Aurora operate?",
    answer: "Síkat-Aurora serves 18 partner communities across the province of Aurora, Philippines — including barangays in Baler, Maria Aurora, Dipaculao, San Luis, and Casiguran, plus public schools throughout Central Aurora."
  }
];

// ================= PAGE 7: FAQ =================
function FAQPage({ onNavigate, onOpenModal }) {
  return (
    <>
      <PageHeader
        eyebrow="Frequently Asked Questions"
        title="Everything You Need to Know About Síkat-Aurora"
        subtitle="Common questions about our programs, volunteer induction, and financial transparency."
      />
      <FaqSection
        title="Frequently Asked Questions"
        description="Everything you need to know about volunteerism, programs, and supporting Síkat-Aurora."
        items={OFFICIAL_FAQS}
        contactInfo={{
          title: "Still have questions?",
          description: "Reach out directly to our volunteer coordination team in Baler, Aurora.",
          buttonText: "Contact Us via Email",
          onContact: () => window.location.href = "mailto:contact@sikataurora.org",
        }}
      />
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

// ================= PAGE 8: VOLUNTEER GALLERY & EXPERIENCE PAGE =================
function VolunteerPage({ onNavigate, onOpenModal }) {
  const steps = [
    { num: "01", title: "Signify your interest", desc: "Follow the Síkat-Aurora Facebook page and reach out. Engaging with and sharing posts counts as your first show of support." },
    { num: "02", title: "Attend 3 events", desc: "Join at least three (3) Síkat-Aurora events within three months of signifying interest. Show up, help out, get to know the community." },
    { num: "03", title: "Commit to principles", desc: "Demonstrate willingness to adhere to principles, rules, and policies — including finding a replacement if unavailable for a signed-up program." },
  ];

  const volunteerGalleries = [
    {
      title: "Education Volunteers — Abot Ko Ang Libro",
      desc: "Volunteers rolling mobile book carts into barangays in Baler, Maria Aurora, and Dipaculao to read and teach children ages 2–14.",
      img: abotKoAngLibroImg,
      location: "Baler & Maria Aurora",
      tag: "400+ Active Youth",
    },
    {
      title: "Environmental Stewards — Ang Batang Kali",
      desc: "Youth leaders conducting river cleanups and environmental life skills for children in Dibut, Zabali, and Sitio Cozo.",
      img: batangKaliImg,
      location: "San Luis & Casiguran",
      tag: "Coastal Care",
    },
    {
      title: "Youth Leaders & Mentors — Hiraya Program",
      desc: "Mentors facilitating leadership workshops and seed grants for student leaders across 30 public high schools in Central Aurora.",
      img: hirayaImg,
      location: "Central Aurora DepEd Schools",
      tag: "30 Public Schools",
    },
    {
      title: "Community Outreach & All-Hands Assemblies",
      desc: "Volunteers united across 18 partner communities celebrating International Youth Day and community outreach drives.",
      img: heroBanner,
      location: "Province-wide Aurora",
      tag: "18 Communities",
    },
  ];

  const pillars = [
    { title: "Free Admission", desc: "Open to all youth aged 15–30 in Aurora Province with no registration fees.", icon: "🌱" },
    { title: "Direct Impact", desc: "Work directly with kids, rivers, and schools in your local community.", icon: "❤️" },
    { title: "Leadership Growth", desc: "Build real credentials, organize events, and manage community projects.", icon: "🏆" },
    { title: "Lifelong Community", desc: "Join a family of 400+ passionate volunteers who lift each other up.", icon: "🤝" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Join Our Volunteer Movement"
        title="Where Every Youth Has a Voice & Purpose"
        subtitle="Admission is 100% free and open to all youth aged 15–30 in Aurora Province."
      />

      {/* Hero Action CTA Banner */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "36px 36px 16px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", background: C.dark, color: "#fff", borderRadius: 20, padding: "32px 38px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 12px 32px rgba(0,0,0,0.08)", flexWrap: "wrap", gap: 18 }}>
          <div>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: C.ye, textTransform: "uppercase", letterSpacing: "1px" }}>Ready to Make a Difference?</span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginTop: 4, marginBottom: 4 }}>Sign Up to Become a Volunteer</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", maxWidth: 580, fontWeight: 300 }}>
              Takes 2 minutes. Click below to open the application form modal.
            </p>
          </div>
          <button onClick={onOpenModal}
            style={{ background: C.or, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 100, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(229,92,20,0.35)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Signify Interest Now <ArrowRight size={15} color="#fff" />
          </button>
        </div>
      </motion.section>

      {/* Path from Interested to Inducted */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 6 }}>Simple Onboarding</div>
            <h2 style={{ fontSize: "1.95rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.5px" }}>Path from Interested to Inducted</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {steps.map((s, i) => (
              <motion.div
                key={i}
                variants={cardHoverVariants}
                whileHover="hover"
                style={{ background: "#fff", padding: "26px 22px", borderRadius: 20, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 6px 20px rgba(0,0,0,0.02)" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.or, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "1rem", marginBottom: 14, boxShadow: "0 4px 12px rgba(229,92,20,0.3)" }}>
                  {s.num}
                </div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: "0.84rem", color: C.mid, lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Volunteer Image & Community Gallery Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: "#fff", fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 6 }}>Volunteer Action</div>
            <h2 style={{ fontSize: "1.95rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.5px" }}>Our Volunteers in Every Community</h2>
            <p style={{ color: C.mid, fontSize: "0.9rem", maxWidth: 620, margin: "8px auto 0", fontWeight: 300 }}>
              Real moments captured across our 18 partner communities in Baler, Maria Aurora, Dipaculao, San Luis, and Casiguran.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {volunteerGalleries.map((v, i) => (
              <motion.div
                key={i}
                variants={cardHoverVariants}
                whileHover="hover"
                style={{ background: C.bg, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 24px rgba(0,0,0,0.03)" }}
              >
                <img src={v.img} alt={v.title} style={{ width: "100%", height: 230, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ background: "#FEF3EC", color: C.or, fontSize: "0.68rem", fontWeight: 600, padding: "4px 10px", borderRadius: 100 }}>
                      📍 {v.location}
                    </span>
                    <span style={{ background: C.dark, color: C.ye, fontSize: "0.68rem", fontWeight: 600, padding: "4px 10px", borderRadius: 100 }}>
                      {v.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.12rem", fontWeight: 600, color: C.dark, marginBottom: 6 }}>{v.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: C.mid, lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Volunteer With Us Pillars */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: C.or, marginBottom: 6 }}>Why Volunteer</div>
            <h2 style={{ fontSize: "1.95rem", fontWeight: 600, color: C.dark, letterSpacing: "-0.5px" }}>What You Gain as a Síkat Volunteer</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                variants={cardHoverVariants}
                whileHover="hover"
                style={{ background: "#fff", borderRadius: 18, padding: "24px 18px", border: "1px solid rgba(0,0,0,0.05)", textAlign: "center" }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{p.icon}</div>
                <h3 style={{ fontSize: "1.02rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>{p.title}</h3>
                <p style={{ fontSize: "0.8rem", color: C.mid, lineHeight: 1.55 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <button onClick={onOpenModal}
              style={{ background: C.or, color: "#fff", border: "none", padding: "13px 30px", borderRadius: 100, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(229,92,20,0.35)" }}>
              Open Volunteer Application Form (Modal)
            </button>
          </div>
        </div>
      </motion.section>
    </>
  );
}

// ================= PAGE 9: DONATE =================
function DonatePage({ onNavigate }) {
  const [amt, setAmt] = useState(0);
  const [done, setDone] = useState(false);

  const tiers = [
    { amount: "₱150", equiv: "3 storybooks for the Abot Ko Ang Libro mobile cart" },
    { amount: "₱500", equiv: "Art & learning supplies for one Saturday storytelling session" },
    { amount: "₱1,500", equiv: "A full Batang Kali nature-stewardship kit for one batch of kids" },
    { amount: "₱5,000", equiv: "Seed funding for one youth-led Hiraya school project" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Donate / Be a Sponsor"
        title="Every Peso Becomes a Page, a Seedling, a Leader"
        subtitle="Your donation goes directly to program materials and community sessions."
      />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        style={{ padding: "64px 36px", background: C.bg, fontFamily: "'Poppins', sans-serif" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 52, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 600, color: C.dark, marginBottom: 18 }}>Sponsorship Equivalents</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {tiers.map((t, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.012 }}
                    onClick={() => setAmt(i)}
                    style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: amt === i ? "#FEF3EC" : "#fff", borderRadius: 16, border: `2px solid ${amt === i ? C.or : "rgba(0,0,0,0.06)"}`, cursor: "pointer", transition: "all .2s" }}
                  >
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: C.or, width: 78, flexShrink: 0 }}>{t.amount}</div>
                    <div style={{ fontSize: "0.85rem", color: C.dark, fontWeight: 500 }}>{t.equiv}</div>
                  </motion.div>
                ))}
              </div>

              <div style={{ background: C.dark, color: "#fff", borderRadius: 20, padding: "22px 24px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: C.ye, marginBottom: 4 }}>Transparency Line</div>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 12 }}>
                  We publish where every peso goes. Read the full report at <strong>bit.ly/sikatfinance</strong>.
                </p>
                <a href="https://bit.ly/sikatfinance" target="_blank" rel="noreferrer" style={{ color: C.sky, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  View Financial Report ↗
                </a>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 28px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "1.18rem", fontWeight: 600, color: C.dark, marginBottom: 18 }}>Donate / Sponsor Now</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 18 }}>
                <button style={{ padding: "11px", border: `2px solid ${C.or}`, borderRadius: 10, background: "#FEF3EC", fontWeight: 600, color: C.or, cursor: "pointer", fontSize: "0.82rem" }}>GCash / Maya</button>
                <button style={{ padding: "11px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, background: C.bg, fontWeight: 600, color: C.dark, cursor: "pointer", fontSize: "0.82rem" }}>Bank Transfer</button>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Full Name</label>
                <input placeholder="Juan Dela Cruz" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.84rem", background: C.bg, outline: "none" }} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 600, color: C.dark, marginBottom: 4 }}>Email Address (for receipt)</label>
                <input placeholder="juan@gmail.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "inherit", fontSize: "0.84rem", background: C.bg, outline: "none" }} />
              </div>

              <button onClick={() => { setDone(true); setTimeout(() => setDone(false), 3500); }}
                style={{ width: "100%", background: done ? C.gr : C.dark, color: "#fff", border: "none", padding: 13, borderRadius: 10, fontFamily: "inherit", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background .3s", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
                {done ? <><Check size={15} /> Receipt Sent!</> : <><Lock size={13} /> Proceed to Secure Donation</>}
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

// Final CTA Band
function FinalCTA({ onNavigate, onOpenModal }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      style={{ background: C.dark, color: "#fff", padding: "64px 36px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
        <h2 style={{ fontSize: "2.3rem", fontWeight: 600, letterSpacing: "-0.6px", marginBottom: 14 }}>
          Handa ka na bang sumíkat kasama namin?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.94rem", lineHeight: 1.7, marginBottom: 28 }}>
          Join over 400 youth volunteers across Baler and Aurora Province in building a brighter future.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onOpenModal}
            style={{ background: C.or, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 100, fontWeight: 600, fontSize: "0.86rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(229,92,20,0.35)" }}>
            Become a Volunteer
          </button>
          <button onClick={() => onNavigate("donate")}
            style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "12px 28px", borderRadius: 100, fontWeight: 600, fontSize: "0.86rem", cursor: "pointer" }}>
            Donate / Be a Sponsor
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Footer
function Footer({ onNavigate }) {
  return (
    <footer style={{ background: "#04090F", color: "rgba(255,255,255,0.5)", padding: "64px 36px 28px", fontFamily: "'Poppins', sans-serif", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.2fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src={logoImg} alt="Síkat-Aurora Logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
              <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.05rem" }}>Síkat-Aurora Inc.</span>
            </div>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.7, maxWidth: 300, fontWeight: 300, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
              Ang pagsíkat ay nagsisimula sa pagkilos. A youth-led nonprofit in Baler, Aurora — where the sun rises.
            </p>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.55 }}>
              Company Reg. No. 2025030194739-03<br />
              Unique Registration Number (URN) YO-2807-021323
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 14 }}>Explore Pages</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: "0.8rem" }}>
              <li><button onClick={() => onNavigate("about")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>About Us</button></li>
              <li><button onClick={() => onNavigate("programs")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Core Programs</button></li>
              <li><button onClick={() => onNavigate("impact")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Impact & Awards</button></li>
              <li><button onClick={() => onNavigate("leadership")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Leadership</button></li>
              <li><button onClick={() => onNavigate("blog")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Blog — Kwentong Síkat</button></li>
              <li><button onClick={() => onNavigate("faq")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 14 }}>Get Involved</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: "0.8rem" }}>
              <li><button onClick={() => onNavigate("volunteer")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Become a Volunteer</button></li>
              <li><button onClick={() => onNavigate("donate")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Donate</button></li>
              <li><a href="https://bit.ly/sikatfinance" target="_blank" rel="noreferrer" style={{ color: C.sky, textDecoration: "none" }}>Transparency Report ↗</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 14 }}>Contact & Social</h4>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.6, marginBottom: 12 }}>
              📍 Baler, Aurora, Philippines<br />
              📧 contact@sikataurora.org
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a href="https://www.facebook.com/sikataurora" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: "0.74rem", fontWeight: 600, textDecoration: "none" }}>
                Facebook
              </a>
              <a href="https://www.instagram.com/sikataurora" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: "0.74rem", fontWeight: 600, textDecoration: "none" }}>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.74rem" }}>
          <div>© 2026 Síkat-Aurora Inc. All rights reserved.</div>
          <div>Established August 12, 2021 — International Youth Day</div>
        </div>
      </div>
    </footer>
  );
}

// MAIN APP WITH MULTI-PAGE ROUTING, MODAL & SLIDING ANIMATIONS
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActivePage(hash);
      } else {
        setActivePage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId === "home" ? "" : pageId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = () => setIsVolunteerModalOpen(true);
  const closeModal = () => setIsVolunteerModalOpen(false);

  return (
    <>
      <Navbar activePage={activePage} onNavigate={navigate} onOpenModal={openModal} />

      <VolunteerModal isOpen={isVolunteerModalOpen} onClose={closeModal} />

      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {activePage === "home" && <HomePage onNavigate={navigate} onOpenModal={openModal} />}
          {activePage === "about" && <AboutPage onNavigate={navigate} />}
          {activePage === "programs" && <ProgramsPage onNavigate={navigate} />}
          {activePage === "impact" && <ImpactPage onNavigate={navigate} />}
          {activePage === "leadership" && <LeadershipPage onNavigate={navigate} />}
          {activePage === "blog" && <BlogPage onNavigate={navigate} />}
          {activePage === "faq" && <FAQPage onNavigate={navigate} onOpenModal={onOpenModal} />}
          {activePage === "volunteer" && <VolunteerPage onNavigate={navigate} onOpenModal={onOpenModal} />}
          {activePage === "donate" && <DonatePage onNavigate={navigate} />}
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={navigate} />
    </>
  );
}
