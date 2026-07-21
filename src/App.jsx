import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  HandCoins,
  Heart,
  Lock,
  Mail,
  MapPin,
  Menu,
  Rocket,
  Sprout,
  ThumbsUp,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PHOTOS, PROGRAM_PHOTOS } from "@/lib/photos";
import { VOLUNTEERS, ROSTER_IS_EMPTY } from "@/lib/volunteers";
import { POSTS, POST_CATEGORIES, formatPostDate } from "@/lib/posts";
import { CASH_DONATIONS, FUNDING_TOTALS, FUNDING_AS_OF, TOTALS_PERIOD, formatPeso } from "@/lib/funding";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { PhotoGallery } from "@/components/ui/gallery";
import { FaqSection } from "@/components/ui/faq-section";
import logoImg from "./assets/logo.png";
import heroBanner from "./assets/hero-banner.jpg";

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

// The brand's section marker: black uppercase type in a yellow pill.
// It stays yellow on dark backgrounds too — that contrast is the point.
function Eyebrow({ className, align = "left", children }) {
  return (
    <div className={cn("mb-4", align === "center" && "flex justify-center", className)}>
      <span className="pill-label">{children}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, lead, align = "left", dark = false, className }) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "max-w-[20ch] text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]",
          dark ? "text-white" : "text-navy",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-[54ch] text-[0.95rem] leading-[1.7]",
            dark ? "text-white/75" : "text-navy/75",
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
  primary: "bg-primary text-white shadow-cta hover:bg-primary-dark",
  gold: "bg-gold text-navy-ink hover:bg-gold-bright",
  dark: "bg-navy text-white hover:bg-navy-ink",
  outline: "border-2 border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  onDark: "border-2 border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
  success: "bg-forest text-white",
};

// Rounded buttons match the brand's pill vocabulary; the lift on hover is small
// enough to read as feedback rather than decoration.
function Btn({ variant = "primary", className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.85rem] font-semibold",
        "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0",
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
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.68rem] font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}

// Rounded card with a soft border; hover lifts and warms the shadow.
// `as` lets callers pick a semantic element (e.g. "article" for a post).
function Card({ as: Element = "div", className, interactive = true, children, ...props }) {
  return (
    <Element
      className={cn(
        "rounded-2xl border border-navy/10 bg-white shadow-card",
        interactive &&
          "transition-all duration-200 ease-out-expo hover:-translate-y-1 hover:border-navy/15 hover:shadow-card-hover motion-reduce:hover:translate-y-0",
        className
      )}
      {...props}
    >
      {children}
    </Element>
  );
}

// The deck's "in Photos" pattern: a grid of program photography under a label
function PhotoGrid({ label, photos, className }) {
  return (
    <div className={className}>
      {label && <span className="pill-label mb-5 inline-flex">{label}</span>}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((p) => (
          <figure key={p.src} className="group overflow-hidden rounded-xl bg-navy/5">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-32 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105 motion-reduce:group-hover:scale-100 sm:h-40"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

// Stat row in the deck's "In a Nutshell" style: gold icon, bold navy figure
function StatRow({ Icon, figure, label, dark = false }) {
  return (
    <li className="flex items-center gap-4">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          dark ? "bg-gold/15 text-gold" : "bg-gold/20 text-navy"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className={cn("text-[1.05rem] leading-snug", dark ? "text-white/80" : "text-navy/80")}>
        <span className={cn("font-bold", dark ? "text-white" : "text-navy")}>{figure}</span> {label}
      </p>
    </li>
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
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-navy/75 transition-colors duration-150 hover:bg-cream hover:text-navy"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <Eyebrow>Join Síkat-Aurora</Eyebrow>
            <h3 id="volunteer-modal-title" className="text-[1.5rem] font-bold text-navy">
              Sign Up &amp; Signify Interest
            </h3>
            <p className="mb-7 mt-2 text-sm leading-relaxed text-navy/75">
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
            <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-navy">
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
                      className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-gold"
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
      className="bg-navy pb-16 pt-32 text-white"
    >
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-[18ch] text-[2.1rem] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[2.9rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-[56ch] text-[0.95rem] leading-[1.7] text-white/75">{subtitle}</p>
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
          <span className="text-[0.83rem] text-navy/75">
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
            <p className="mb-7 mt-5 max-w-[54ch] text-sm leading-[1.75] text-navy/75 sm:text-[0.93rem]">
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
            src={PHOTOS.communityAssembly}
            alt="Síkat-Aurora volunteers and children at a community assembly"
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

          {/* Figures in the deck's "In a Nutshell" style, set against the work
              they describe so the band is not an unbroken block of navy. */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
              {[
                { Icon: Users, figure: "400+", label: "youth volunteers" },
                { Icon: BookOpen, figure: "1,100+", label: "learners reached" },
                { Icon: MapPin, figure: "18", label: "partner communities" },
                { Icon: HandCoins, figure: "₱1.5M+", label: "donations and grants" },
              ].map((s) => (
                <StatRow key={s.label} dark {...s} />
              ))}
            </ul>

            {/* Offset collage — the taller column drops down to break the grid line */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={PROGRAM_PHOTOS.abkl[1].src}
                  alt={PROGRAM_PHOTOS.abkl[1].alt}
                  loading="lazy"
                  className="h-44 w-full rounded-2xl object-cover sm:h-56"
                />
                <img
                  src={PROGRAM_PHOTOS.abkp[0].src}
                  alt={PROGRAM_PHOTOS.abkp[0].alt}
                  loading="lazy"
                  className="h-32 w-full rounded-2xl object-cover sm:h-40"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={PROGRAM_PHOTOS.hiraya[0].src}
                  alt={PROGRAM_PHOTOS.hiraya[0].alt}
                  loading="lazy"
                  className="h-32 w-full rounded-2xl object-cover sm:h-40"
                />
                <img
                  src={PHOTOS.communityAssembly}
                  alt="Síkat-Aurora volunteers and children at a community assembly"
                  loading="lazy"
                  className="h-44 w-full rounded-2xl object-cover sm:h-56"
                />
              </div>
            </div>
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
                img: PROGRAM_PHOTOS.abkl[0].src,
                desc: "Mobile library cart bringing books & storytelling to kids ages 2–14.",
              },
              {
                name: "Ang Batang Kali",
                center: "Environment",
                img: PROGRAM_PHOTOS.abkp[0].src,
                desc: "Environmental life skills for youth ages 8–15 protecting nature.",
              },
              {
                name: "Hiraya",
                center: "Active Citizenship",
                img: PROGRAM_PHOTOS.hiraya[0].src,
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
                  <h3 className="text-[1.2rem] font-bold text-navy">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/75">{p.desc}</p>
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
      />

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 2: About ============================= */

// Mandates come from the organization's own committee descriptions.
// Flanking the About statement — one from each program, plus the assembly
const ABOUT_HERO_PHOTOS = [
  PROGRAM_PHOTOS.abkl[0],
  PROGRAM_PHOTOS.abkp[0],
  PROGRAM_PHOTOS.hiraya[0],
  { src: PHOTOS.communityAssembly, alt: "Síkat-Aurora volunteers and children at a community assembly" },
];

const VALUES = [
  {
    title: "Pagmamalasakit",
    desc: "Kumikilos nang may malasakit sa kapwa.",
    gloss: "We act with genuine care for one another.",
  },
  {
    title: "Paggalang",
    desc: "Kumikilos nang may paggalang sa paniniwala, kultura, at saloobin ng mga kasapi at komunidad.",
    gloss: "We act with respect for the beliefs, culture, and views of our members and communities.",
  },
  {
    title: "Pagtugon",
    desc: "Kumikilos upang tumugon sa tunay na mga pangangailangan ng mga tao sa komunidad.",
    gloss: "We act in response to the real needs of the people in the community.",
  },
];

function AboutPage({ onNavigate, onOpenModal }) {
  return (
    <>
      {/* 1 — Statement of purpose, flanked by the work it describes */}
      <section className="bg-white px-6 pb-16 pt-36 md:px-9 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)_minmax(0,0.75fr)]">
          {/* Side columns sit slightly off-axis so the pair does not read as a bar */}
          <div className="hidden gap-4 lg:grid">
            <img
              src={ABOUT_HERO_PHOTOS[0].src}
              alt={ABOUT_HERO_PHOTOS[0].alt}
              className="h-52 w-full rounded-2xl object-cover"
            />
            <img
              src={ABOUT_HERO_PHOTOS[1].src}
              alt={ABOUT_HERO_PHOTOS[1].alt}
              className="h-36 w-full rounded-2xl object-cover"
            />
          </div>

          <div className="text-center">
            <Eyebrow align="center">Who We Are</Eyebrow>
            <h1 className="mx-auto max-w-[20ch] text-[2.1rem] font-bold leading-[1.12] tracking-[-0.03em] text-navy sm:text-[3rem]">
              A youth-led movement building a new face of volunteerism in Aurora
            </h1>
            {/* The brand's gold rule, used here as an underline accent */}
            <span aria-hidden="true" className="mx-auto mt-7 block h-1.5 w-24 rounded-full bg-gold" />
            <p className="mx-auto mt-7 max-w-[58ch] text-[1.02rem] leading-[1.8] text-navy/75">
              Síkat-Aurora Inc. provides free after-school programs in education, environment, and active
              citizenship — powered entirely by young volunteers, for the communities they come from.
            </p>
          </div>

          <div className="hidden gap-4 pt-14 lg:grid">
            <img
              src={ABOUT_HERO_PHOTOS[2].src}
              alt={ABOUT_HERO_PHOTOS[2].alt}
              className="h-36 w-full rounded-2xl object-cover"
            />
            <img
              src={ABOUT_HERO_PHOTOS[3].src}
              alt={ABOUT_HERO_PHOTOS[3].alt}
              className="h-52 w-full rounded-2xl object-cover"
            />
          </div>

          {/* Below lg the columns would squeeze, so the same four run as a grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:hidden">
            {ABOUT_HERO_PHOTOS.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-28 w-full rounded-xl object-cover sm:h-32"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2 — Vision and mission, stacked and centered */}
      <Reveal className="bg-cream py-16 lg:py-24">
        <Container className="max-w-4xl space-y-12 text-center">
          <div>
            <Eyebrow align="center">Vision</Eyebrow>
            <p className="mx-auto max-w-[52ch] text-[1.25rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
              A future where{" "}
              <span className="bg-gold/35 px-1">accessible and enriching after-school programs</span> empower
              underserved communities in Aurora.
            </p>
          </div>
          <div>
            <Eyebrow align="center">Mission</Eyebrow>
            <p className="mx-auto max-w-[52ch] text-[1.25rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
              To provide inclusive after-school programs in{" "}
              <span className="bg-gold/35 px-1">education, environment, and active citizenship</span>, driven by
              youth volunteers to create lasting community impact.
            </p>
          </div>
        </Container>
      </Reveal>

      {/* 3 — Values as a divided vertical stack */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Our Values" title="Ang aming pinanghahawakan" className="mb-12" />
          <dl className="border-t border-navy/15">
            {VALUES.map((v) => (
              <div key={v.title} className="border-b border-navy/15 py-8 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="text-[1.3rem] font-bold tracking-[-0.01em] text-navy">{v.title}</dt>
                <dd className="mt-2 sm:mt-0">
                  <p className="text-[1rem] leading-[1.7] text-navy/85">{v.desc}</p>
                  <p className="mt-1.5 text-[0.88rem] italic leading-relaxed text-navy/55">{v.gloss}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>

      {/* 4 — Origin narrative beside a photograph */}
      <Reveal className="overflow-hidden bg-cream">
        <div className="grid items-stretch lg:grid-cols-2">
          <figure className="relative min-h-[300px] lg:min-h-[560px]">
            <img
              src={PHOTOS.communityAssembly}
              alt="Síkat-Aurora volunteers and children gathered at a community assembly"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
          <div className="flex items-center px-6 py-16 md:px-9 lg:py-24">
            <div className="w-full lg:ml-auto lg:max-w-xl lg:pr-4">
              <Eyebrow>How We Started</Eyebrow>
              <h2 className="max-w-[18ch] text-[1.7rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[2.1rem]">
                Where the Philippine sun rises first
              </h2>
              <p className="mt-5 max-w-[56ch] text-[0.98rem] leading-[1.8] text-navy/80">
                <strong className="font-semibold text-navy">Síkat-Aurora Inc.</strong> — formerly Síkat-Baler — was
                formally established as a nonprofit, youth-led, and youth-serving organization on{" "}
                <strong className="font-semibold text-navy">August 12, 2021</strong>, during International Youth Day.
              </p>
              <p className="mt-4 max-w-[56ch] text-[0.98rem] leading-[1.8] text-navy/80">
                The name <em>Síkat</em>, meaning <strong className="font-semibold text-navy">"rise,"</strong> is a
                tribute to the rise of a new generation of volunteers in the community where the Philippine sun
                rises first — in Baler, Aurora.
              </p>

              <dl className="mt-8 grid gap-4 border-t border-navy/15 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy/55">
                    Company Registration No.
                  </dt>
                  <dd className="mt-1 font-semibold text-navy">2025030194739-03</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy/55">
                    Unique Registration No.
                  </dt>
                  <dd className="mt-1 font-semibold text-navy">YO-2807-021323</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 5 — The programs, as a linked list rather than repeated cards */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Our Programs"
            title="Three centers of participation"
            lead="Every program is volunteer-driven and free for the learners it serves."
            className="mb-12"
          />
          <ul className="border-t border-navy/15">
            {[
              { name: "Abot Ko Ang Libro", center: "Education", desc: "A mobile library cart bringing books and storytelling to kids ages 2–14." },
              { name: "Ang Batang Kali", center: "Environment", desc: "Life skills helping youth ages 8–15 grow into stewards of nature." },
              { name: "Hiraya", center: "Active Citizenship", desc: "Leadership training and seed funding for youth leaders across 30 DepEd schools." },
            ].map((p) => (
              <li key={p.name}>
                <button
                  onClick={() => onNavigate("programs")}
                  className="group flex w-full items-center gap-6 border-b border-navy/15 py-7 text-left transition-colors duration-200 hover:bg-cream"
                >
                  <div className="flex-1">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-primary">{p.center}</p>
                    <h3 className="mt-1.5 text-[1.3rem] font-bold text-navy transition-colors duration-200 group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 max-w-[60ch] text-[0.92rem] leading-relaxed text-navy/75">{p.desc}</p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-navy/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Btn onClick={() => onNavigate("programs")}>
              Explore All Programs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          </div>
        </Container>
      </Reveal>

      {/* 7 — Joining, drawn from the organization's own admission rules */}
      <Reveal className="bg-cream py-16 lg:py-24">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="Admission & Membership"
            title="Admission is free and open to all youth in Aurora"
            lead="Open to anyone aged 15–30. Three steps, three months."
            className="mb-12"
          />
          <ol className="grid gap-8 sm:grid-cols-3">
            {[
              { n: "01", t: "Signify your interest", d: "Follow the Síkat-Aurora page and let us know you want in." },
              { n: "02", t: "Attend three events", d: "Join at least three Síkat-Aurora events within three months." },
              { n: "03", t: "Commit to the principles", d: "Adhere to the organization's principles, rules, and policies." },
            ].map((s) => (
              <li key={s.n} className="list-none border-t-2 border-gold pt-5">
                <p className="text-[1.4rem] font-bold leading-none text-primary">{s.n}</p>
                <h3 className="mt-3 text-[1.1rem] font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-[0.9rem] leading-[1.7] text-navy/75">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn onClick={onOpenModal}>
              Become a Volunteer <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
            <Btn variant="outline" onClick={() => onNavigate("faq")}>
              Read the FAQ
            </Btn>
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
      shortName: "ABKL",
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
      img: PROGRAM_PHOTOS.abkl[0].src,
      photos: PROGRAM_PHOTOS.abkl,
      accent: "text-primary",
      bg: "bg-primary-soft",
    },
    {
      center: "Environment",
      name: "Ang Batang Kali",
      shortName: "ABKP",
      duration: "5 Saturdays / 3 days",
      desc: "A life skills program helping youth ages 8–15 grow into protectors and stewards of nature — from the rivers of San Luis to the coasts of Casiguran.",
      communities: ["Brgy. Dibut (San Luis)", "Brgy. Zabali (Baler)", "Sitio Cozo (Casiguran)"],
      img: PROGRAM_PHOTOS.abkp[0].src,
      photos: PROGRAM_PHOTOS.abkp,
      accent: "text-navy",
      bg: "bg-sky-soft",
    },
    {
      center: "Active Citizenship",
      name: "Hiraya: Paglinang sa Kasanayan ng mga Makabagong Bayani ng Aurora",
      shortName: "Hiraya",
      duration: "1–2 days",
      desc: "A leadership training equipping aspiring youth leaders with essential skills, knowledge, and initial funding necessary to excel in their roles and make a positive impact in their schools and communities.",
      communities: ["30 DepEd Public Schools in Central Aurora", "Hiraya Dinalungan", "Hiraya Ditumabo NHS"],
      img: PROGRAM_PHOTOS.hiraya[0].src,
      photos: PROGRAM_PHOTOS.hiraya,
      accent: "text-forest",
      bg: "bg-forest-soft",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Core Programs"
        title="Three Programs, One Rising Community"
        subtitle="Every program is volunteer-driven and free for its learners — built around our three centers of participation."
      />
      {/* Each program alternates a half-bleed photo with its details, then
          opens into its own photo grid — the deck's "in Photos" spread. */}
      {programs.map((p, i) => (
        <Reveal
          key={p.name}
          className={cn(
            "overflow-hidden",
            i % 2 === 1 ? "bg-cream" : "bg-white",
            // The alternating backgrounds are too close in tone to read as a
            // break on their own, so separate the programs with a rule.
            i > 0 && "border-t border-navy/10"
          )}
        >
          <div
            className={cn(
              "grid items-stretch lg:grid-cols-2",
              i % 2 === 1 && "lg:[&>figure]:order-last"
            )}
          >
            <figure className="relative min-h-[280px] lg:min-h-[520px]">
              <img src={p.img} alt={p.alt || p.name} className="absolute inset-0 h-full w-full object-cover" />
            </figure>

            <div className="flex items-center px-6 py-14 md:px-9 lg:py-20">
              <div className={cn("w-full", i % 2 === 0 ? "lg:max-w-xl lg:pl-4" : "lg:ml-auto lg:max-w-xl lg:pr-4")}>
                <Eyebrow>Core Program</Eyebrow>
                <h2 className="max-w-[20ch] text-[1.6rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[2rem]">
                  {p.name}
                </h2>

                <dl className="mt-5 space-y-2 text-[0.9rem] leading-relaxed">
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-navy">Center of Participation:</dt>
                    <dd className="text-navy/75">{p.center}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-semibold text-navy">Duration:</dt>
                    <dd className="text-navy/75">{p.duration}</dd>
                  </div>
                </dl>

                <p className="mt-4 max-w-[56ch] text-[0.92rem] leading-[1.75] text-navy/75">{p.desc}</p>

                <p className="mb-2.5 mt-6 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy">
                  Partner Communities ({p.communities.length})
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {p.communities.map((c) => (
                    <li
                      key={c}
                      className="inline-flex items-center gap-1 rounded-full border border-navy/10 bg-white px-3 py-1 text-[0.7rem] font-medium text-navy"
                    >
                      <MapPin className="h-3 w-3 text-primary" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Container className="pb-20 pt-12 lg:pb-28 lg:pt-16">
            <PhotoGrid label={`${p.shortName} in Photos`} photos={p.photos} />
          </Container>
        </Reveal>
      ))}
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 4: Impact & Awards ============================= */

// Horizontal bars built from the published figures. Rendered as a definition
// list so the numbers are readable without the chart.
function FundingChart() {
  const max = Math.max(...CASH_DONATIONS.map((d) => d.amount));

  return (
    <div>
      <dl className="space-y-4">
        {CASH_DONATIONS.map((d) => (
          <div key={d.year} className="grid grid-cols-[3.2rem_1fr] items-center gap-4">
            <dt className="text-[0.85rem] font-bold text-navy">{d.year}</dt>
            <dd className="flex items-center gap-3">
              <div className="h-7 flex-1 overflow-hidden rounded-r-md bg-navy/[0.06]">
                <div
                  className={cn(
                    "h-full rounded-r-md transition-[width] duration-700 ease-out-expo",
                    d.partial ? "bg-gold" : "bg-primary"
                  )}
                  style={{ width: `${(d.amount / max) * 100}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-right text-[0.82rem] font-semibold tabular-nums text-navy">
                {formatPeso(d.amount)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 flex items-start gap-2 text-[0.78rem] leading-relaxed text-navy/55">
        <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm bg-gold" />
        2026 covers January to early May only, so it is not yet a full year.
      </p>
    </div>
  );
}

function ImpactPage({ onNavigate, onOpenModal }) {
  const stats = [
    { Icon: Rocket, figure: "2021", label: "formally established" },
    { Icon: Users, figure: "400+", label: "youth volunteers" },
    { Icon: BookOpen, figure: "1,100+", label: "learners reached" },
    { Icon: MapPin, figure: "18", label: "partner communities" },
    { Icon: ThumbsUp, figure: "5k+", label: "followers on Facebook" },
    { Icon: HandCoins, figure: "₱1.5M+", label: "donations and grants" },
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

      {/* Figures, set against the programs they came from */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="In a Nutshell"
                title="What four years of youth volunteerism adds up to"
                className="mb-10"
              />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
                {stats.map((s) => (
                  <StatRow key={s.label} {...s} />
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={PROGRAM_PHOTOS.abkl[0].src}
                  alt={PROGRAM_PHOTOS.abkl[0].alt}
                  loading="lazy"
                  className="h-40 w-full rounded-2xl object-cover sm:h-52"
                />
                <img
                  src={PROGRAM_PHOTOS.hiraya[3].src}
                  alt={PROGRAM_PHOTOS.hiraya[3].alt}
                  loading="lazy"
                  className="h-32 w-full rounded-2xl object-cover sm:h-40"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={PROGRAM_PHOTOS.abkp[0].src}
                  alt={PROGRAM_PHOTOS.abkp[0].alt}
                  loading="lazy"
                  className="h-32 w-full rounded-2xl object-cover sm:h-40"
                />
                <img
                  src={PHOTOS.volunteersGroup}
                  alt="Síkat-Aurora youth volunteers together at a program"
                  loading="lazy"
                  className="h-40 w-full rounded-2xl object-cover sm:h-52"
                />
              </div>
            </div>
          </div>
        </Container>
      </Reveal>

      {/* Funding, charted from the published transparency report */}
      <Reveal className="border-y border-navy/10 bg-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Funding"
            title="Where the money comes from"
            lead={`Cash donations and grants received per fiscal year, as published in our transparency report as of ${FUNDING_AS_OF}.`}
            className="mb-12"
          />

          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <FundingChart />

            <div>
              <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy/50">
                Totals for {TOTALS_PERIOD}
              </p>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10">
                {[
                  ["Cash donations", formatPeso(FUNDING_TOTALS.cash), "text-navy"],
                  ["In-kind donations", formatPeso(FUNDING_TOTALS.inKind), "text-navy"],
                  ["Expenses", formatPeso(FUNDING_TOTALS.expenses), "text-primary"],
                  ["Remaining balance", formatPeso(FUNDING_TOTALS.balance), "text-forest"],
                ].map(([label, value, tone]) => (
                  <div key={label} className="bg-white p-5">
                    <dt className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy/50">
                      {label}
                    </dt>
                    <dd className={cn("mt-1.5 text-[1.15rem] font-bold tabular-nums", tone)}>{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 text-[0.78rem] leading-relaxed text-navy/55">
                Figures above cover {TOTALS_PERIOD}; 2026 donations are still being recorded.
              </p>
              <p className="mt-4 text-[0.88rem] leading-[1.7] text-navy/70">
                We publish where every single peso goes — the full ledger is open to anyone who wants
                to read it.
              </p>
              <a
                href="https://bit.ly/sikatfinance"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.85rem] font-semibold text-white no-underline shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark motion-reduce:hover:translate-y-0"
              >
                Open the Financial Tracker <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </Reveal>

      {/* Awards — the one dark band on the page */}
      <Reveal className="bg-navy py-16 text-white lg:py-24">
        <Container>
          <SectionHeading
            dark
            eyebrow="Recognition"
            title="Awards & recognitions"
            lead="From the municipality of Baler to the ASEAN Youth Forum."
            className="mb-12"
          />
          <ul className="border-t border-white/20">
            {awards.map((a) => (
              <li
                key={a.title}
                className="grid gap-2 border-b border-white/10 py-5 transition-colors duration-200 hover:bg-white/[0.04] md:grid-cols-[11rem_1fr_18rem] md:items-baseline md:gap-6 md:px-3"
              >
                <Tag className={cn("w-fit", levelStyles[a.level])}>{a.level}</Tag>
                <p className="text-[1.05rem] font-bold leading-snug text-white">{a.title}</p>
                <p className="text-xs leading-relaxed text-white/55">{a.grantor}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      {/* Recognition in the field */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="On the Ground"
            title="What the recognition looks like in practice"
            lead="Every award traces back to a Saturday spent with kids somewhere in Aurora."
            className="mb-12"
          />
          <PhotoGrid
            photos={[
              PROGRAM_PHOTOS.abkl[2],
              PROGRAM_PHOTOS.abkp[1],
              PROGRAM_PHOTOS.hiraya[1],
              PROGRAM_PHOTOS.abkp[3],
            ]}
          />
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
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary-soft text-[0.95rem] font-bold text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white"
                  aria-hidden="true"
                >
                  {l.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <h3 className="text-[1.15rem] font-bold leading-snug text-navy">{l.name}</h3>
                  <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-primary">
                    {l.title}
                  </p>
                  <p className="mt-2.5 text-sm leading-[1.7] text-navy/75">{l.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>

      <VolunteerWall onOpenModal={onOpenModal} />

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

// Grid of volunteer portraits. Entries without a photo show their initials,
// and entries with neither fall back to an empty slot, so the wall stays
// presentable while photos are still being gathered.
function VolunteerCard({ volunteer }) {
  const initials = volunteer.name
    ? volunteer.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : null;

  return (
    <figure className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-navy/10 bg-cream">
        {volunteer.photo ? (
          <img
            src={volunteer.photo}
            alt={volunteer.name || "Síkat-Aurora volunteer"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gold/15">
            {initials ? (
              <span className="text-[1.6rem] font-bold text-navy/70">{initials}</span>
            ) : (
              <UserRound className="h-8 w-8 text-navy/25" aria-hidden="true" />
            )}
          </div>
        )}
      </div>
      {volunteer.name && (
        <figcaption className="mt-3">
          <p className="text-[0.9rem] font-semibold leading-snug text-navy">{volunteer.name}</p>
          {volunteer.role && <p className="mt-0.5 text-[0.78rem] text-navy/60">{volunteer.role}</p>}
        </figcaption>
      )}
    </figure>
  );
}

// One scrolling row. The track holds two identical copies and shifts by -50%,
// so the loop closes with no jump; spacing lives on each tile rather than the
// track to keep both copies exactly half the width. `reverse` flips the travel
// direction. Pauses on hover/focus; reduced motion turns it into a swipe strip.
function MarqueeRow({ volunteers, reverse = false, hidden = false }) {
  return (
    <div className="no-scrollbar overflow-x-auto" aria-hidden={hidden || undefined}>
      <div
        className={cn(
          "flex w-max animate-marquee",
          "hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          "motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 list-none" aria-hidden={copy === 1 || undefined}>
            {/* The roster is short, so repeat it within each half — a half must
                be at least a screen wide or a gap shows on very wide displays. */}
            {[...volunteers, ...volunteers].map((v, i) => (
              <li key={`${copy}-${i}-${v.id}`} className="w-32 shrink-0 pr-5 sm:w-40">
                <VolunteerCard volunteer={v} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function VolunteerWall({ onOpenModal }) {
  return (
    <Reveal className="bg-cream py-16 lg:py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            eyebrow="Our Volunteers"
            title="The 400+ behind every program"
            lead="Síkat-Aurora runs entirely on youth volunteers from across Aurora Province."
          />
          <Btn variant="outline" onClick={onOpenModal}>
            Join Them <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Btn>
        </div>

      </Container>

      {/* Two rows travelling opposite ways. Only the first is exposed to
          assistive tech — the second is the same people, so announcing both
          would just repeat the roster. */}
      <div
        className="group relative space-y-5"
        role="region"
        aria-label="Síkat-Aurora volunteers"
        tabIndex={0}
      >
        <MarqueeRow volunteers={VOLUNTEERS} />
        <MarqueeRow volunteers={[...VOLUNTEERS].reverse()} reverse hidden />
      </div>

      {ROSTER_IS_EMPTY && (
        <Container>
          <p className="mt-8 text-center text-[0.85rem] text-navy/50">
            Volunteer photos are being collected — this wall fills in as they come in.
          </p>
        </Container>
      )}
    </Reveal>
  );
}

/* ============================= Page 6: Blog ============================= */

const CATEGORY_STYLES = {
  "Abot Ko Ang Libro": "bg-primary-soft text-primary",
  "Ang Batang Kali": "bg-forest-soft text-forest",
  Hiraya: "bg-sky-soft text-navy",
  Updates: "bg-gold/25 text-navy-ink",
};

function PostMeta({ post, className, dark = false }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem]",
        dark ? "text-white/60" : "text-navy/55",
        className
      )}
    >
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readTime}</span>
    </p>
  );
}

function PostCard({ post }) {
  return (
    <Card as="article" className="group flex flex-col overflow-hidden">
      <a
        href={`#blog/${post.slug}`}
        onClick={(e) => e.preventDefault()}
        className="flex flex-1 flex-col no-underline"
      >
        <div className="overflow-hidden">
          <img
            src={post.img}
            alt=""
            loading="lazy"
            className="h-48 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Tag className={cn("mb-3 w-fit", CATEGORY_STYLES[post.category])}>{post.category}</Tag>
          <h3 className="text-[1.15rem] font-bold leading-snug text-navy transition-colors duration-200 group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-5 mt-2.5 flex-1 text-[0.88rem] leading-[1.7] text-navy/70">{post.excerpt}</p>
          <PostMeta post={post} />
        </div>
      </a>
    </Card>
  );
}

function BlogPage({ onNavigate, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p !== featured);
  const visible =
    activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader
        eyebrow="Blog & Stories"
        title="Kwentong Síkat"
        subtitle="Stories from the field — written by the volunteers, for the community."
      />

      {/* Lead story */}
      <Reveal className="border-b border-navy/10 bg-white py-14 lg:py-16">
        <Container>
          <a
            href={`#blog/${featured.slug}`}
            onClick={(e) => e.preventDefault()}
            className="group grid gap-8 no-underline lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={featured.img}
                alt=""
                className="h-64 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 sm:h-[26rem]"
              />
            </div>
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="pill-label">Latest Story</span>
                <Tag className={CATEGORY_STYLES[featured.category]}>{featured.category}</Tag>
              </div>
              <h2 className="max-w-[18ch] text-[1.8rem] font-bold leading-[1.15] text-navy transition-colors duration-200 group-hover:text-primary sm:text-[2.3rem]">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-[54ch] text-[0.98rem] leading-[1.75] text-navy/75">
                {featured.excerpt}
              </p>
              <PostMeta post={featured} className="mt-5" />
              <span className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-primary">
                Read full story
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                  aria-hidden="true"
                />
              </span>
            </div>
          </a>
        </Container>
      </Reveal>

      {/* Filters + archive */}
      <section className="bg-cream py-14 lg:py-20">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
            <SectionHeading eyebrow="All Stories" title="From the field" />
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter stories by program"
            >
              {POST_CATEGORIES.map((c) => {
                const isActive = activeCategory === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(c)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-200",
                      isActive
                        ? "border-navy bg-navy text-white"
                        : "border-navy/15 bg-white text-navy/70 hover:border-navy/40 hover:text-navy"
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="py-16 text-center text-[0.95rem] text-navy/55">
              No stories in this category yet — check back soon.
            </p>
          )}
        </Container>
      </section>

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
      img: PROGRAM_PHOTOS.abkl[2].src,
      location: "Baler & Maria Aurora",
      tag: "400+ Active Youth",
    },
    {
      title: "Environmental Stewards — Ang Batang Kali",
      desc: "Youth leaders conducting river cleanups and environmental life skills for children in Dibut, Zabali, and Sitio Cozo.",
      img: PROGRAM_PHOTOS.abkp[1].src,
      location: "San Luis & Casiguran",
      tag: "Coastal Care",
    },
    {
      title: "Youth Leaders & Mentors — Hiraya Program",
      desc: "Mentors facilitating leadership workshops and seed grants for student leaders across 30 public high schools in Central Aurora.",
      img: PROGRAM_PHOTOS.hiraya[0].src,
      location: "Central Aurora DepEd Schools",
      tag: "30 Public Schools",
    },
    {
      title: "Community Outreach & All-Hands Assemblies",
      desc: "Volunteers united across 18 partner communities celebrating International Youth Day and community outreach drives.",
      img: PHOTOS.communityAssembly,
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
            <h2 className="text-[1.5rem] font-bold tracking-[-0.01em] sm:text-[1.9rem]">
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
                <p className="text-[1.5rem] font-bold leading-none text-primary">{s.num}</p>
                <h3 className="mt-3 text-[1.2rem] font-bold text-navy">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-navy/75">{s.desc}</p>
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
                  <h3 className="text-[1.2rem] font-bold leading-snug text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-navy/75">{v.desc}</p>
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
                <h3 className="text-[1.15rem] font-bold text-navy">{title}</h3>
                <p className="mt-2 text-[0.85rem] leading-[1.7] text-navy/75">{desc}</p>
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
                      <span className="w-24 shrink-0 text-[1.3rem] font-bold text-primary">
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
              <h3 className="mb-6 text-[1.35rem] font-bold text-navy">Donate / Sponsor Now</h3>
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
    <Reveal as="div" className="border-t-2 border-primary bg-black py-20 text-center text-white lg:py-24">
      <Container className="max-w-3xl">
        {/* Sized to hold two balanced lines at every width */}
        <h2 className="mx-auto max-w-[22ch] text-balance text-[clamp(1.35rem,6.4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.015em]">
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
    <footer className="border-t border-white/10 bg-black px-6 pb-7 pt-16 text-white/60 md:px-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logoImg} alt="" className="h-9 w-9 object-contain" />
              <span className="text-[1.05rem] font-bold text-white">Síkat-Aurora Inc.</span>
            </div>
            <p className="mb-5 max-w-[34ch] text-[0.95rem] italic leading-[1.6] text-white/70">
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
