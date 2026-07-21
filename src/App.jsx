import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Clock,
  Heart,
  Lock,
  Mail,
  MapPin,
  Menu,
  Sprout,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { PhotoGallery } from "@/components/ui/gallery";
import { FaqSection } from "@/components/ui/faq-section";
import logoImg from "./assets/logo.png";
import heroBanner from "./assets/hero-banner.jpg";
import batangKaliImg from "./assets/batang-kali.png";
import abotKoAngLibroImg from "./assets/abot-ko-ang-libro.png";
import hirayaImg from "./assets/hiraya.png";
import impactImg from "./assets/impact.png";

/* ============================= Shared primitives ============================= */

const EASE = [0.22, 1, 0.36, 1];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

// Section that fades in once as it enters the viewport
function Reveal({ className, children, as = "section", ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={sectionVariants}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-9", className)}>{children}</div>;
}

// Eyebrow: a short rule followed by a label — reads as an editorial section marker
function Eyebrow({ className, dark = false, align = "left", children }) {
  return (
    <p
      className={cn(
        "mb-3 flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
        dark ? "text-gold" : "text-primary",
        align === "center" && "justify-center",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6", dark ? "bg-gold/50" : "bg-primary/40")}
      />
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, lead, align = "left", dark = false, className }) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Eyebrow dark={dark} align={align}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[2.1rem]",
          dark ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-[54ch] text-sm leading-[1.7] sm:text-[0.93rem]",
            dark ? "text-white/70" : "text-ink",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

const BTN_VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  dark: "bg-navy text-white hover:bg-ocean",
  outline: "border border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  onDark: "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
  success: "bg-forest text-white",
};

// Squared-off buttons read more institutional than pills; the underline-on-hover
// link variant is handled separately by TextLink.
function Btn({ variant = "primary", className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-3 text-[0.82rem] font-semibold tracking-[0.01em]",
        "transition-colors duration-200 active:translate-y-px",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        BTN_VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Inline text action — the arrow slides on hover, no button chrome
function TextLink({ className, dark = false, children, ...props }) {
  return (
    <button
      className={cn(
        "group inline-flex items-center gap-2 rounded-sm text-[0.82rem] font-semibold transition-colors duration-150",
        dark ? "text-white hover:text-gold" : "text-primary hover:text-primary-dark",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
        aria-hidden="true"
      />
    </button>
  );
}

function Tag({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em]",
        className
      )}
    >
      {children}
    </span>
  );
}

// Flat card defined by a hairline border; hover deepens the border and lifts slightly
function Card({ className, interactive = true, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-navy/10 bg-white shadow-card",
        interactive &&
          "transition-all duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-card-hover motion-reduce:hover:translate-y-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ============================= Volunteer modal ============================= */

function Field({ id, label, children, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-navy">
        {label}
      </label>
      {children || <input id={id} className="form-input" {...inputProps} />}
    </div>
  );
}

function VolunteerModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-deep/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="volunteer-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border-t-2 border-primary bg-white p-7 shadow-modal sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors duration-150 hover:bg-cream hover:text-navy"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <Eyebrow>Join Síkat-Aurora</Eyebrow>
            <h3 id="volunteer-modal-title" className="font-display text-[1.5rem] font-semibold text-navy">
              Sign Up &amp; Signify Interest
            </h3>
            <p className="mb-7 mt-2 text-sm leading-relaxed text-ink">
              Takes 2 minutes — our membership team will reach out within 48 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="vol-first-name" label="First name" required placeholder="Juan" autoComplete="given-name" />
                <Field id="vol-last-name" label="Last name" required placeholder="Dela Cruz" autoComplete="family-name" />
              </div>

              <Field id="vol-email" label="Email address" type="email" required placeholder="juan@gmail.com" autoComplete="email" />
              <Field id="vol-mobile" label="Mobile number" type="tel" required placeholder="0917 123 4567" autoComplete="tel" />

              <Field id="vol-program" label="Program of interest">
                <select id="vol-program" className="form-input">
                  <option>Select a program...</option>
                  <option>Abot Ko Ang Libro (Education)</option>
                  <option>Ang Batang Kali (Environment)</option>
                  <option>Hiraya (Active Citizenship)</option>
                  <option>Any program where needed</option>
                </select>
              </Field>

              <Field id="vol-age" label="Age group (15–30 y/o)">
                <select id="vol-age" className="form-input">
                  <option>15–18 years old</option>
                  <option>19–24 years old</option>
                  <option>25–30 years old</option>
                </select>
              </Field>

              <Btn
                type="submit"
                variant={submitted ? "success" : "primary"}
                className="mt-2 w-full py-3"
                aria-live="polite"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" /> Interest Signified! Welcome to Síkat
                  </>
                ) : (
                  <>
                    Submit Application <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Btn>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ============================= Navigation ============================= */

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "programs", label: "Programs" },
  { id: "impact", label: "Impact" },
  { id: "leadership", label: "Leadership" },
  { id: "blog", label: "Blog" },
];

function Navbar({ activePage, onNavigate, onOpenModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[999]">
      <nav
        aria-label="Main navigation"
        className="border-b border-navy/[0.08] bg-white/95 shadow-[0_4px_20px_rgba(13,31,45,0.04)] backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-9">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="flex shrink-0 items-center gap-2.5 rounded-md no-underline"
          >
            <img src={logoImg} alt="" className="h-9 w-9 object-contain" />
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-navy">
              Síkat<span className="text-primary">-Aurora</span>
            </span>
          </a>

          {/* Desktop nav — active page marked by a sliding underline rule */}
          <div className="relative hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-sm px-3.5 py-2 text-[0.82rem] transition-colors duration-200",
                    isActive ? "font-semibold text-primary" : "font-medium text-navy/70 hover:text-navy"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-x-3 -bottom-px h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Btn variant="outline" className="px-4 py-2 text-[0.8rem]" onClick={onOpenModal}>
              Volunteer
            </Btn>
            <Btn className="px-4 py-2 text-[0.8rem]" onClick={() => go("donate")}>
              Donate
            </Btn>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors duration-150 hover:bg-navy/5 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden border-t border-navy/[0.06] lg:hidden"
            >
              <div className="space-y-1 px-5 py-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    aria-current={activePage === item.id ? "page" : undefined}
                    className={cn(
                      "block w-full border-l-2 px-4 py-2.5 text-left text-sm transition-colors duration-150",
                      activePage === item.id
                        ? "border-primary bg-primary-soft font-semibold text-primary"
                        : "border-transparent font-medium text-navy hover:border-navy/20 hover:bg-navy/5"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex gap-2.5 pt-3">
                  <Btn
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenModal();
                    }}
                  >
                    Volunteer
                  </Btn>
                  <Btn className="flex-1" onClick={() => go("donate")}>
                    Donate
                  </Btn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ============================= Page header ============================= */

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="border-b-2 border-primary bg-navy pb-14 pt-32 text-white"
    >
      <Container>
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <h1 className="max-w-[20ch] font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] sm:text-[2.6rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-[56ch] text-sm leading-[1.7] text-white/70 sm:text-[0.93rem]">{subtitle}</p>
        )}
      </Container>
    </motion.div>
  );
}

/* ============================= Page 1: Home ============================= */

function HomePage({ onNavigate, onOpenModal }) {
  return (
    <>
      <section id="home">
        <AnimatedHero
          backgroundImageUrl={heroBanner}
          badge="SÍKAT-AURORA INC."
          title={
            <>
              Ang pagsíkat ay
              <br />
              <span className="text-gold">nagsisimula sa pagkilos.</span>
            </>
          }
          description="Síkat-Aurora is a youth-led, youth-serving nonprofit bringing free after-school programs in education, environment, and active citizenship to underserved communities in Aurora — powered entirely by volunteers."
          ctaButton={{ text: "Become a Volunteer", onClick: onOpenModal }}
          secondaryCta={{ text: "Donate / Be a Sponsor", onClick: () => onNavigate("donate") }}
        />
      </section>

      {/* Established strip */}
      <Reveal as="div" className="border-y border-navy/10 bg-white">
        <Container className="flex flex-wrap items-center gap-x-5 gap-y-2 py-4">
          <Tag className="bg-primary-soft text-primary">Formally Established</Tag>
          <span className="text-[0.83rem] text-ink">
            August 12, 2021 (International Youth Day) · SEC Reg. No. 2025030194739-03
          </span>
          <TextLink className="ml-auto shrink-0" onClick={() => onNavigate("about")}>
            Read Our History
          </TextLink>
        </Container>
      </Reveal>

      {/* About teaser */}
      <Reveal className="bg-white py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A new face of youth volunteerism in Baler, Aurora"
            />
            <p className="mb-7 mt-5 max-w-[54ch] text-sm leading-[1.75] text-ink sm:text-[0.93rem]">
              <strong className="font-semibold text-navy">Síkat-Aurora Inc.</strong> — formerly Síkat-Baler — is a
              nonprofit, youth-led, and youth-serving organization. The name <em>Síkat</em>, meaning{" "}
              <strong className="font-semibold text-navy">"rise,"</strong> pays tribute to a new generation of
              volunteers where the Philippine sun rises first.
            </p>
            <Btn variant="dark" onClick={() => onNavigate("about")}>
              Learn More About Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          </div>
          <img
            src={hirayaImg}
            alt="Síkat-Aurora volunteers at a community program"
            className="h-64 w-full rounded-lg object-cover sm:h-[26rem]"
            loading="lazy"
          />
        </Container>
      </Reveal>

      {/* Impact stats teaser */}
      <Reveal className="bg-navy py-16 text-white lg:py-20">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              dark
              eyebrow="Impact in Numbers"
              title="The premier platform for youth volunteerism"
            />
            <Btn variant="onDark" onClick={() => onNavigate("impact")}>
              See Full Impact &amp; Awards <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          </div>

          {/* Figures separated by rules rather than boxed into cards */}
          <div className="grid grid-cols-2 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4">
            {[
              ["400+", "Youth Volunteers"],
              ["1,100+", "Learners Reached"],
              ["18", "Partner Communities"],
              ["₱1.5M+", "Donations Raised"],
            ].map(([n, l], i) => (
              <div
                key={l}
                className={cn(
                  "px-2 sm:px-6",
                  i % 2 === 1 && "border-l border-white/15",
                  i > 0 && "lg:border-l lg:border-white/15",
                  i === 2 && "lg:border-l"
                )}
              >
                <p className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.02em] text-gold sm:text-[3rem]">
                  {n}
                </p>
                <p className="mt-3 text-[0.8rem] uppercase tracking-[0.1em] text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>

      {/* Core programs teaser */}
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading eyebrow="Core Programs" title="Three programs, one rising community" />
            <Btn onClick={() => onNavigate("programs")}>
              Explore All Programs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Abot Ko Ang Libro",
                center: "Education",
                img: abotKoAngLibroImg,
                desc: "Mobile library cart bringing books & storytelling to kids ages 2–14.",
              },
              {
                name: "Ang Batang Kali",
                center: "Environment",
                img: batangKaliImg,
                desc: "Environmental life skills for youth ages 8–15 protecting nature.",
              },
              {
                name: "Hiraya",
                center: "Active Citizenship",
                img: hirayaImg,
                desc: "Leadership training & seed funding across 30 DepEd schools.",
              },
            ].map((p) => (
              <Card
                key={p.name}
                className="group cursor-pointer overflow-hidden"
                onClick={() => onNavigate("programs")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onNavigate("programs")}
              >
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-navy/10 p-6">
                  <Tag className="mb-3 bg-primary-soft text-primary">{p.center}</Tag>
                  <h3 className="font-display text-[1.2rem] font-semibold text-navy">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{p.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Reveal>

      {/* Photo gallery teaser */}
      <section className="bg-white">
        <PhotoGallery onViewAll={() => onNavigate("blog")} />
      </section>

      {/* FAQ */}
      <FaqSection
        title="Frequently Asked Questions"
        description="Everything you need to know about volunteerism, programs, and supporting Síkat-Aurora."
        items={OFFICIAL_FAQS}
        contactInfo={{
          title: "Still have questions?",
          description: "Reach out directly to our volunteer coordination team in Baler, Aurora.",
          buttonText: "Contact Us via Email",
          onContact: () => (window.location.href = "mailto:contact@sikataurora.org"),
        }}
      />

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 2: About ============================= */

function AboutPage({ onNavigate, onOpenModal }) {
  const values = [
    {
      title: "Pagmamalasakit",
      desc: "Kumikilos nang may malasakit sa kapwa.",
      accent: "text-primary",
      bg: "bg-primary-soft",
    },
    {
      title: "Paggalang",
      desc: "Kumikilos nang may paggalang sa paniniwala, kultura, at saloobin ng mga kasapi at komunidad.",
      accent: "text-ocean",
      bg: "bg-ocean-soft",
    },
    {
      title: "Pagtugon",
      desc: "Kumikilos upang tumugon sa tunay na mga pangangailangan ng mga tao sa komunidad.",
      accent: "text-teal",
      bg: "bg-teal-soft",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Who We Are"
        title="About Síkat-Aurora Inc."
        subtitle="Formerly Síkat-Baler — formally established on International Youth Day, August 12, 2021."
      />
      <Reveal className="bg-white py-16 lg:py-20">
        <Container>
          <div className="mb-14 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <h2 className="mb-5 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2.1rem]">
                Our Origins &amp; Name
              </h2>
              {/* Opening paragraph set slightly larger — a lede, as in print */}
              <p className="mb-4 max-w-[56ch] text-[0.98rem] leading-[1.75] text-navy/80">
                <strong className="font-semibold text-navy">Síkat-Aurora Inc.</strong> — formerly Síkat-Baler — was
                formally established as a nonprofit, youth-led, and youth-serving organization on{" "}
                <strong className="font-semibold text-navy">August 12, 2021</strong>, during International Youth Day.
              </p>
              <p className="mb-6 max-w-[56ch] text-sm leading-[1.8] text-ink sm:text-[0.93rem]">
                The name <em>Síkat</em>, meaning <strong className="font-semibold text-navy">"rise,"</strong> is a
                tribute to the rise of a new generation of volunteers in the community where the Philippine sun rises
                first.
              </p>
              <div className="border-l-2 border-primary bg-cream px-5 py-4">
                <p className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-navy">
                  Legal Registration
                </p>
                <p className="text-[0.8rem] leading-relaxed text-ink">
                  Company Registration No. <strong className="font-semibold text-navy">2025030194739-03</strong>
                  <br />
                  Unique Registration Number (URN) <strong className="font-semibold text-navy">YO-2807-021323</strong>
                </p>
              </div>
            </div>
            <img
              src={hirayaImg}
              alt="Síkat-Aurora volunteers"
              className="h-64 w-full rounded-lg object-cover sm:h-[26rem]"
              loading="lazy"
            />
          </div>

          {/* Vision & Mission */}
          <div className="mb-16 grid gap-px overflow-hidden rounded-lg border border-navy/10 bg-navy/10 md:grid-cols-2">
            <div className="bg-cream p-8">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary">Vision</p>
              <h3 className="font-display text-[1.3rem] font-semibold text-navy">Our Vision</h3>
              <p className="mt-3 max-w-[48ch] text-sm leading-[1.7] text-ink">
                A future where accessible and enriching after-school programs empower underserved communities in Aurora.
              </p>
            </div>
            <div className="bg-cream p-8">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ocean">Mission</p>
              <h3 className="font-display text-[1.3rem] font-semibold text-navy">Our Mission</h3>
              <p className="mt-3 max-w-[48ch] text-sm leading-[1.7] text-ink">
                To provide inclusive after-school programs in education, environment, and active citizenship — driven by
                youth volunteers to create lasting community impact.
              </p>
            </div>
          </div>

          {/* Core values — numbered, rule-separated entries rather than tinted boxes */}
          <div>
            <SectionHeading eyebrow="What Guides Us" title="Our Core Values" className="mb-10" />
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
              {values.map((v, i) => (
                <div key={v.title} className="border-t-2 border-navy/10 pt-5">
                  <p className={cn("font-display text-[1.4rem] font-semibold", v.accent)} aria-hidden="true">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-[1.25rem] font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-ink">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Reveal>
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 3: Programs ============================= */

function ProgramsPage({ onNavigate, onOpenModal }) {
  const programs = [
    {
      center: "Education",
      name: "Abot Ko Ang Libro",
      duration: "5 consecutive Saturdays",
      desc: "A mobile library cart that brings books closer to kids ages 2–14 through storytelling sessions and book borrowing — rolling into barangays across Baler, Maria Aurora, and Dipaculao.",
      communities: [
        "Brgy. Zabali (Baler)",
        "Brgy. Calabuanan (Baler)",
        "Brgy. Reserva (Baler)",
        "Brgy. 5 (Baler)",
        "Brgy. Diome (Maria Aurora)",
        "Brgy. Buhangin (Baler)",
        "So. Cemento, Brgy. Zabali",
        "Brgy. Diaat (Maria Aurora)",
        "Brgy. Pingit (Baler)",
        "Brgy. Diamanen (Dipaculao)",
      ],
      img: abotKoAngLibroImg,
      accent: "text-primary",
      bg: "bg-primary-soft",
    },
    {
      center: "Environment",
      name: "Ang Batang Kali",
      duration: "5 Saturdays / 3 days",
      desc: "A life skills program helping youth ages 8–15 grow into protectors and stewards of nature — from the rivers of San Luis to the coasts of Casiguran.",
      communities: ["Brgy. Dibut (San Luis)", "Brgy. Zabali (Baler)", "Sitio Cozo (Casiguran)"],
      img: batangKaliImg,
      accent: "text-ocean",
      bg: "bg-ocean-soft",
    },
    {
      center: "Active Citizenship",
      name: "Hiraya: Paglinang sa Kasanayan ng mga Makabagong Bayani ng Aurora",
      duration: "1–2 days",
      desc: "A leadership training equipping aspiring youth leaders with essential skills, knowledge, and initial funding necessary to excel in their roles and make a positive impact in their schools and communities.",
      communities: ["30 DepEd Public Schools in Central Aurora", "Hiraya Dinalungan", "Hiraya Ditumabo NHS"],
      img: hirayaImg,
      accent: "text-teal",
      bg: "bg-teal-soft",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Core Programs"
        title="Three Programs, One Rising Community"
        subtitle="Every program is volunteer-driven and free for its learners — built around our three centers of participation."
      />
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container className="flex flex-col gap-9">
          {programs.map((p, i) => (
            <Card key={p.name} className="grid overflow-hidden md:grid-cols-[1fr_1.25fr]">
              <img
                src={p.img}
                alt={p.name}
                className="h-56 w-full object-cover md:h-full md:min-h-[320px]"
                loading="lazy"
              />
              <div className="border-t border-navy/10 p-7 sm:p-9 md:border-l md:border-t-0">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-display text-[0.95rem] font-semibold text-navy/30" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <Tag className={cn(p.bg, p.accent)}>{p.center}</Tag>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {p.duration}
                  </span>
                </div>
                <h2 className="max-w-[24ch] font-display text-[1.4rem] font-semibold leading-[1.2] tracking-[-0.01em] text-navy sm:text-[1.6rem]">
                  {p.name}
                </h2>
                <p className="mb-6 mt-3 max-w-[58ch] text-sm leading-[1.75] text-ink">{p.desc}</p>
                <p className="mb-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-navy">
                  Partner Communities ({p.communities.length})
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {p.communities.map((c) => (
                    <li
                      key={c}
                      className="inline-flex items-center gap-1 rounded border border-navy/10 bg-cream px-2.5 py-1 text-[0.7rem] font-medium text-navy"
                    >
                      <MapPin className="h-3 w-3 text-ink" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </Container>
      </Reveal>
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 4: Impact & Awards ============================= */

function ImpactPage({ onNavigate, onOpenModal }) {
  const stats = [
    ["400+", "Youth Volunteers"],
    ["1,100+", "Learners Reached"],
    ["18", "Partner Communities"],
    ["5k+", "Facebook Followers"],
    ["₱1.5M+", "Donations & Grants Raised"],
    ["2021", "Formally Established"],
  ];

  const awards = [
    {
      title: "Youth Organization of the Year (Abot Ko Ang Libro)",
      level: "Municipal / Provincial",
      grantor: "Municipal Government of Baler & SK Municipal Federation of Baler",
    },
    {
      title: "Grand Winner, Search for Outstanding Youth Organization",
      level: "Municipal / Provincial",
      grantor: "Provincial Government of Aurora & SK Provincial Federation of Aurora",
    },
    {
      title: "National Winner, Spark-A-Change Challenge",
      level: "National",
      grantor: "J. Amado Araneta Foundation",
    },
    {
      title: "Safe Space Hero 2022 / Outstanding GYS Alumni",
      level: "National",
      grantor: "Global Peace Foundation & Consuelo Zobel Alger Foundation",
    },
    {
      title: "International Winner, Mini-Fund for Youth Grant",
      level: "International",
      grantor: "ASEAN Youth Forum",
    },
  ];

  const levelStyles = {
    International: "bg-primary/20 text-[#FF9A66]",
    National: "bg-gold/20 text-gold",
    "Municipal / Provincial": "bg-sky/20 text-sky",
  };

  return (
    <>
      <PageHeader
        eyebrow="Impact & Awards"
        title="The Premier Platform for Youth Volunteerism in Aurora"
        subtitle="Official metrics and recognitions as of July 2026."
      />
      <Reveal className="bg-navy py-16 text-white lg:py-20">
        <Container>
          <div className="mb-16 grid grid-cols-2 gap-y-9 border-t border-white/15 pt-10 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map(([n, l], i) => (
              <div
                key={l}
                className={cn(
                  "px-2 sm:px-5",
                  i % 2 === 1 && "border-l border-white/15 sm:border-l-0",
                  i % 3 !== 0 && "sm:border-l sm:border-white/15 lg:border-l-0",
                  i > 0 && "lg:border-l lg:border-white/15"
                )}
              >
                <p className="font-display text-[1.9rem] font-semibold leading-none tracking-[-0.02em] text-gold">
                  {n}
                </p>
                <p className="mt-2.5 text-[0.7rem] uppercase leading-snug tracking-[0.1em] text-white/60">{l}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-8 flex items-center gap-3 font-display text-[1.6rem] font-semibold sm:text-[1.9rem]">
            <Award className="h-6 w-6 text-gold" aria-hidden="true" /> Awards &amp; Recognitions
          </h2>
          {/* Awards read as a citation list — level, title, grantor per row */}
          <ul className="mb-16 border-t border-white/15">
            {awards.map((a) => (
              <li
                key={a.title}
                className="grid gap-2 border-b border-white/10 py-5 transition-colors duration-200 hover:bg-white/[0.03] md:grid-cols-[10rem_1fr_18rem] md:items-baseline md:gap-6 md:px-3"
              >
                <Tag className={cn("w-fit", levelStyles[a.level])}>{a.level}</Tag>
                <p className="font-display text-[1.05rem] font-semibold leading-snug text-white">{a.title}</p>
                <p className="text-xs leading-relaxed text-white/55">{a.grantor}</p>
              </li>
            ))}
          </ul>

          {/* Transparency */}
          <div className="grid items-center gap-8 rounded-lg border border-white/15 bg-white/[0.03] p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-[1.4rem] font-semibold text-white sm:text-[1.6rem]">
                Financial Transparency Report
              </h3>
              <p className="mb-6 mt-3 max-w-[48ch] text-sm leading-[1.7] text-white/70">
                We publish where every single peso goes. Over ₱1.5M+ raised through grant competitions and public
                donation drives.
              </p>
              <a
                href="https://bit.ly/sikatfinance"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-[0.82rem] font-semibold text-white no-underline transition-colors duration-200 hover:bg-primary-dark"
              >
                Open Financial Tracker <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <img
              src={impactImg}
              alt="Síkat-Aurora community impact"
              className="h-52 w-full rounded-md object-cover"
              loading="lazy"
            />
          </div>
        </Container>
      </Reveal>
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 5: Leadership ============================= */

function LeadershipPage({ onNavigate, onOpenModal }) {
  const leaders = [
    {
      name: "RJ Belen",
      title: "Executive Director",
      role: "Highest official; presides over Executive Committee, executes policies & sets direction.",
    },
    {
      name: "Angelica Matusalem",
      title: "Deputy Executive Director & Director of Finance",
      role: "Oversees operations, financial capacity, & procurement.",
    },
    {
      name: "Rachelle Ann Imperial",
      title: "Director of Internal Affairs",
      role: "Recruitment & member relations. Deputy: Princess Joy Necesito.",
    },
    {
      name: "Patrisha Mae Abubo",
      title: "Director of External Affairs",
      role: "Envoys to partners & aligned organizations. Deputy: Jomari Guttierrez.",
    },
    {
      name: "Reaiah Codiapit",
      title: "Director of Education & Training",
      role: "Educational arm & program think tank. Deputy: Jefferson Lising.",
    },
    {
      name: "Cattleya Abuan",
      title: "Director of Creatives",
      role: "Brand promotion & online identity. Deputy: John Renuel de Padua.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Organizational Structure"
        title="Youth Leaders Behind the Movement"
        subtitle="Meet the executive committee and directorate driving programs across Aurora Province."
      />
      <Reveal className="bg-white py-16 lg:py-20">
        <Container>
          {/* Directory-style roster: a rule per person, initials set in the display face */}
          <div className="grid gap-x-10 border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((l) => (
              <div
                key={l.name}
                className="group flex gap-4 border-b border-navy/10 py-7 transition-colors duration-200"
              >
                <span
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary-soft font-display text-[0.95rem] font-semibold text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white"
                  aria-hidden="true"
                >
                  {l.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <h3 className="font-display text-[1.15rem] font-semibold leading-snug text-navy">{l.name}</h3>
                  <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-primary">
                    {l.title}
                  </p>
                  <p className="mt-2.5 text-sm leading-[1.7] text-ink">{l.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 6: Blog ============================= */

function BlogPage({ onNavigate, onOpenModal }) {
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
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Card key={p.title} className="group flex flex-col overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt=""
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-navy/10 p-6">
                  <Tag className="mb-3 w-fit bg-primary-soft text-primary">{p.tag}</Tag>
                  <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-navy">{p.title}</h3>
                  <p className="mb-5 mt-2.5 flex-1 text-sm leading-[1.7] text-ink">{p.desc}</p>
                  <a
                    href="#blog"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-2 rounded-sm text-[0.8rem] font-semibold text-primary no-underline transition-colors duration-150 hover:text-primary-dark"
                  >
                    Read full story
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Reveal>
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= FAQ data ============================= */

const OFFICIAL_FAQS = [
  {
    question: "What is Síkat-Aurora Inc.?",
    answer:
      "Síkat-Aurora Inc., formerly Síkat-Baler, is a youth-led, youth-serving nonprofit organization based in Baler, Aurora, Philippines. Established on August 12, 2021 — International Youth Day — it provides free after-school programs in education, environment, and active citizenship, powered by 400+ youth volunteers.",
  },
  {
    question: "How can I volunteer with Síkat-Aurora in Baler, Aurora?",
    answer:
      "Admission is free and open to all youth aged 15–30 in Aurora. Simply follow the Síkat-Aurora Facebook page, signify your interest, then attend at least three (3) events within three months while committing to the organization's principles, rules, and policies.",
  },
  {
    question: "Is Síkat-Aurora a registered nonprofit organization?",
    answer:
      "Yes. Síkat-Aurora Inc. is formally registered as a nonprofit organization in the Philippines — Company Registration No. 2025030194739-03 and Unique Registration Number (URN) YO-2807-021323.",
  },
  {
    question: "How can I donate or sponsor a program?",
    answer:
      "You can give through our donation drive or become a program sponsor — every peso translates directly to books, learning kits, and youth training in Aurora. We publish a full transparency report at bit.ly/sikatfinance.",
  },
  {
    question: "What programs does Síkat-Aurora run?",
    answer:
      "Three core programs: Abot Ko Ang Libro (a mobile library cart with storytelling for kids ages 2–14), Ang Batang Kali (an environmental life skills program for youth ages 8–15), and Hiraya (a leadership training with seed funding for aspiring youth leaders across 30+ DepEd schools in Central Aurora).",
  },
  {
    question: "Where does Síkat-Aurora operate?",
    answer:
      "Síkat-Aurora serves 18 partner communities across the province of Aurora, Philippines — including barangays in Baler, Maria Aurora, Dipaculao, San Luis, and Casiguran, plus public schools throughout Central Aurora.",
  },
];

/* ============================= Page 7: FAQ ============================= */

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
          onContact: () => (window.location.href = "mailto:contact@sikataurora.org"),
        }}
      />
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 8: Volunteer ============================= */

function VolunteerPage({ onOpenModal }) {
  const steps = [
    {
      num: "01",
      title: "Signify your interest",
      desc: "Follow the Síkat-Aurora Facebook page and reach out. Engaging with and sharing posts counts as your first show of support.",
    },
    {
      num: "02",
      title: "Attend 3 events",
      desc: "Join at least three (3) Síkat-Aurora events within three months of signifying interest. Show up, help out, get to know the community.",
    },
    {
      num: "03",
      title: "Commit to principles",
      desc: "Demonstrate willingness to adhere to principles, rules, and policies — including finding a replacement if unavailable for a signed-up program.",
    },
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
    {
      title: "Free Admission",
      desc: "Open to all youth aged 15–30 in Aurora Province with no registration fees.",
      Icon: Sprout,
    },
    {
      title: "Direct Impact",
      desc: "Work directly with kids, rivers, and schools in your local community.",
      Icon: Heart,
    },
    {
      title: "Leadership Growth",
      desc: "Build real credentials, organize events, and manage community projects.",
      Icon: Trophy,
    },
    {
      title: "Lifelong Community",
      desc: "Join a family of 400+ passionate volunteers who lift each other up.",
      Icon: Users,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Join Our Volunteer Movement"
        title="Where Every Youth Has a Voice & Purpose"
        subtitle="Admission is 100% free and open to all youth aged 15–30 in Aurora Province."
      />

      {/* CTA banner */}
      <Reveal className="bg-cream px-6 pt-9 md:px-9">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 rounded-lg border-l-2 border-primary bg-navy p-8 text-white sm:p-10">
          <div>
            <Eyebrow dark>Ready to Make a Difference?</Eyebrow>
            <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.01em] sm:text-[1.9rem]">
              Sign Up to Become a Volunteer
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-white/70">
              Takes 2 minutes. Click below to open the application form.
            </p>
          </div>
          <Btn onClick={onOpenModal}>
            Signify Interest Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Btn>
        </div>
      </Reveal>

      {/* Onboarding steps */}
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Simple Onboarding"
            title="Path from Interested to Inducted"
            className="mb-10"
          />
          {/* Numbered sequence — the rule above each step reads as a progress track */}
          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.num} className="list-none border-t-2 border-primary/25 pt-6">
                <p className="font-display text-[1.5rem] font-semibold leading-none text-primary">{s.num}</p>
                <h3 className="mt-3 font-display text-[1.2rem] font-semibold text-navy">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-ink">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Reveal>

      {/* Volunteer gallery */}
      <Reveal className="bg-white py-16 lg:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Volunteer Action"
            title="Our Volunteers in Every Community"
            lead="Real moments captured across our 18 partner communities in Baler, Maria Aurora, Dipaculao, San Luis, and Casiguran."
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {volunteerGalleries.map((v) => (
              <Card key={v.title} className="group overflow-hidden bg-cream">
                <div className="overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 sm:h-60"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-navy/10 p-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <Tag className="bg-primary-soft text-primary">
                      <MapPin className="h-3 w-3" aria-hidden="true" /> {v.location}
                    </Tag>
                    <Tag className="bg-navy text-gold">{v.tag}</Tag>
                  </div>
                  <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-ink">{v.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Reveal>

      {/* Why volunteer */}
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Why Volunteer"
            title="What You Gain as a Síkat Volunteer"
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ title, desc, Icon }) => (
              <div key={title} className="border-t border-navy/15 pt-6">
                <Icon className="mb-4 h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-display text-[1.15rem] font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-[0.85rem] leading-[1.7] text-ink">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Btn onClick={onOpenModal} className="px-8">
              Open Volunteer Application Form
            </Btn>
          </div>
        </Container>
      </Reveal>
    </>
  );
}

/* ============================= Page 9: Donate ============================= */

function DonatePage() {
  const [amt, setAmt] = useState(0);
  const [method, setMethod] = useState("gcash");
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
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Where Your Gift Goes"
                title="Sponsorship Equivalents"
                className="mb-7"
              />
              <div
                className="mb-7 flex flex-col gap-3"
                role="radiogroup"
                aria-label="Choose a sponsorship amount"
              >
                {tiers.map((t, i) => {
                  const selected = amt === i;
                  return (
                    <button
                      key={t.amount}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setAmt(i)}
                      className={cn(
                        "flex items-center gap-5 rounded-md border px-5 py-4 text-left transition-colors duration-150",
                        selected
                          ? "border-primary bg-primary-soft"
                          : "border-navy/10 bg-white hover:border-navy/30"
                      )}
                    >
                      <span className="w-24 shrink-0 font-display text-[1.3rem] font-semibold text-primary">
                        {t.amount}
                      </span>
                      <span className="text-sm leading-snug text-navy">{t.equiv}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-md border-l-2 border-gold bg-navy p-6 text-white">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold">Transparency</p>
                <p className="mb-3 mt-2 text-[0.83rem] leading-relaxed text-white/75">
                  We publish where every peso goes. Read the full report at{" "}
                  <strong className="font-semibold text-white">bit.ly/sikatfinance</strong>.
                </p>
                <a
                  href="https://bit.ly/sikatfinance"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md text-[0.82rem] font-semibold text-sky no-underline transition-colors duration-150 hover:text-white"
                >
                  View Financial Report <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Donation form */}
            <div className="rounded-lg border border-navy/10 bg-white p-7 shadow-card sm:p-8">
              <h3 className="mb-6 font-display text-[1.35rem] font-semibold text-navy">Donate / Sponsor Now</h3>
              <div className="mb-5 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Payment method">
                <button
                  role="radio"
                  aria-checked={method === "gcash"}
                  onClick={() => setMethod("gcash")}
                  className={cn(
                    "rounded-md border px-3 py-2.5 text-[0.82rem] font-semibold transition-colors duration-150",
                    method === "gcash"
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-navy/15 bg-cream text-navy hover:border-navy/35"
                  )}
                >
                  GCash / Maya
                </button>
                <button
                  role="radio"
                  aria-checked={method === "bank"}
                  onClick={() => setMethod("bank")}
                  className={cn(
                    "rounded-md border px-3 py-2.5 text-[0.82rem] font-semibold transition-colors duration-150",
                    method === "bank"
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-navy/15 bg-cream text-navy hover:border-navy/35"
                  )}
                >
                  Bank Transfer
                </button>
              </div>

              <div className="space-y-4">
                <Field id="donate-name" label="Full Name" placeholder="Juan Dela Cruz" autoComplete="name" />
                <Field
                  id="donate-email"
                  label="Email Address (for receipt)"
                  type="email"
                  placeholder="juan@gmail.com"
                  autoComplete="email"
                />
              </div>

              <Btn
                variant={done ? "success" : "dark"}
                className="mt-6 w-full py-3"
                aria-live="polite"
                onClick={() => {
                  setDone(true);
                  setTimeout(() => setDone(false), 3500);
                }}
              >
                {done ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" /> Receipt Sent!
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Proceed to Secure Donation
                  </>
                )}
              </Btn>
            </div>
          </div>
        </Container>
      </Reveal>
    </>
  );
}

/* ============================= Final CTA & Footer ============================= */

function FinalCTA({ onNavigate, onOpenModal }) {
  return (
    <Reveal as="div" className="border-t-2 border-primary bg-navy py-20 text-center text-white lg:py-24">
      <Container className="max-w-3xl">
        <h2 className="mx-auto max-w-[18ch] font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] sm:text-[2.75rem]">
          Handa ka na bang sumíkat kasama namin?
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-sm leading-[1.75] text-white/70 sm:text-[0.95rem]">
          Join over 400 youth volunteers across Baler and Aurora Province in building a brighter future.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn onClick={onOpenModal} className="px-8">
            Become a Volunteer
          </Btn>
          <Btn variant="onDark" onClick={() => onNavigate("donate")} className="px-8">
            Donate / Be a Sponsor
          </Btn>
        </div>
      </Container>
    </Reveal>
  );
}

function FooterLink({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md p-0 text-left text-[0.8rem] text-white/60 transition-colors duration-150 hover:text-white"
    >
      {children}
    </button>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/[0.06] bg-navy-deep px-6 pb-7 pt-16 text-white/60 md:px-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logoImg} alt="" className="h-9 w-9 object-contain" />
              <span className="font-display text-[1.05rem] font-semibold text-white">Síkat-Aurora Inc.</span>
            </div>
            <p className="mb-5 max-w-[34ch] font-display text-[0.95rem] italic leading-[1.6] text-white/70">
              Ang pagsíkat ay nagsisimula sa pagkilos.
            </p>
            <p className="mb-5 max-w-[36ch] text-[0.82rem] leading-relaxed text-white/55">
              A youth-led nonprofit in Baler, Aurora — where the sun rises first.
            </p>
            <p className="text-xs leading-relaxed text-white/40">
              Company Reg. No. 2025030194739-03
              <br />
              Unique Registration Number (URN) YO-2807-021323
            </p>
          </div>

          <nav aria-label="Footer — explore pages">
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/90">Explore Pages</h4>
            <ul className="flex list-none flex-col gap-2 p-0">
              <li><FooterLink onClick={() => onNavigate("about")}>About Us</FooterLink></li>
              <li><FooterLink onClick={() => onNavigate("programs")}>Core Programs</FooterLink></li>
              <li><FooterLink onClick={() => onNavigate("impact")}>Impact &amp; Awards</FooterLink></li>
              <li><FooterLink onClick={() => onNavigate("leadership")}>Leadership</FooterLink></li>
              <li><FooterLink onClick={() => onNavigate("blog")}>Blog — Kwentong Síkat</FooterLink></li>
              <li><FooterLink onClick={() => onNavigate("faq")}>FAQ</FooterLink></li>
            </ul>
          </nav>

          <nav aria-label="Footer — get involved">
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/90">Get Involved</h4>
            <ul className="flex list-none flex-col gap-2 p-0">
              <li><FooterLink onClick={() => onNavigate("volunteer")}>Become a Volunteer</FooterLink></li>
              <li><FooterLink onClick={() => onNavigate("donate")}>Donate</FooterLink></li>
              <li>
                <a
                  href="https://bit.ly/sikatfinance"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md text-[0.8rem] text-sky no-underline transition-colors duration-150 hover:text-white"
                >
                  Transparency Report <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/90">Contact &amp; Social</h4>
            <p className="mb-1.5 flex items-center gap-2 text-[0.8rem]">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Baler, Aurora, Philippines
            </p>
            <a
              href="mailto:contact@sikataurora.org"
              className="mb-4 inline-flex items-center gap-2 rounded-md text-[0.8rem] text-white/60 no-underline transition-colors duration-150 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> contact@sikataurora.org
            </a>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/sikataurora"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white no-underline transition-colors duration-150 hover:bg-white/[0.12]"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/sikataurora"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white no-underline transition-colors duration-150 hover:bg-white/[0.12]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-6 text-xs text-white/50">
          <p>© 2026 Síkat-Aurora Inc. All rights reserved.</p>
          <p>Established August 12, 2021 — International Youth Day</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================= App shell ============================= */

export default function App() {
  // Initialize from the URL hash so deep links render the right page immediately
  const [activePage, setActivePage] = useState(
    () => window.location.hash.replace("#", "") || "home"
  );
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActivePage(hash || "home");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId === "home" ? "" : pageId;
    window.scrollTo({ top: 0 });
  }, []);

  const openModal = useCallback(() => setIsVolunteerModalOpen(true), []);
  const closeModal = useCallback(() => setIsVolunteerModalOpen(false), []);

  const pages = {
    home: <HomePage onNavigate={navigate} onOpenModal={openModal} />,
    about: <AboutPage onNavigate={navigate} onOpenModal={openModal} />,
    programs: <ProgramsPage onNavigate={navigate} onOpenModal={openModal} />,
    impact: <ImpactPage onNavigate={navigate} onOpenModal={openModal} />,
    leadership: <LeadershipPage onNavigate={navigate} onOpenModal={openModal} />,
    blog: <BlogPage onNavigate={navigate} onOpenModal={openModal} />,
    faq: <FAQPage onNavigate={navigate} onOpenModal={openModal} />,
    volunteer: <VolunteerPage onOpenModal={openModal} />,
    donate: <DonatePage />,
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar activePage={activePage} onNavigate={navigate} onOpenModal={openModal} />

      <VolunteerModal isOpen={isVolunteerModalOpen} onClose={closeModal} />

      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {pages[activePage] ?? pages.home}
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={navigate} />
    </MotionConfig>
  );
}
