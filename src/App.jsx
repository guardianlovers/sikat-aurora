import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
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
  Minus,
  Plus,
  Rocket,
  Sprout,
  ThumbsUp,
  Trophy,
  UserRound,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PHOTOS, PROGRAM_PHOTOS } from "@/lib/photos";
import { VOLUNTEERS, ROSTER_IS_EMPTY } from "@/lib/volunteers";
import { LEADERS } from "@/lib/leaders";
import { POSTS, POST_CATEGORIES, formatPostDate } from "@/lib/posts";
import { CASH_DONATIONS, FUNDING_TOTALS, FUNDING_AS_OF, TOTALS_PERIOD, formatPeso } from "@/lib/funding";
import { KITS, getKit } from "@/lib/kits";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { PhotoGallery } from "@/components/ui/gallery";
import { FaqSection } from "@/components/ui/faq-section";
import logoImg from "./assets/logo.png";
import heroBanner from "./assets/home/hero-banner/1.jpg";
import impactVolunteersImg from "./assets/home/impact-in-numbers/400-youth-volunteer.jpg";
import impactLearnersImg from "./assets/home/impact-in-numbers/1100-learner-reached.jpg";
import impactCommunitiesImg from "./assets/home/impact-in-numbers/18-partner-community.jpg";
import impactDonationsImg from "./assets/home/impact-in-numbers/donation-grant.jpg";
import coreAbklImg from "./assets/programs/core-program/abot-ko-ang-libro.jpg";
import coreAbkpImg from "./assets/programs/core-program/batang-kali.jpg";
import coreHirayaImg from "./assets/programs/core-program/hiraya.jpg";
import howWeStartedImg from "./assets/about/how-we-started/how-we-started.jpg";
import whoWeAre1 from "./assets/about/who-we-are/1.jpg";
import whoWeAre2 from "./assets/about/who-we-are/2.jpg";
import whoWeAre3 from "./assets/about/who-we-are/3.jpg";
import whoWeAre4 from "./assets/about/who-we-are/4.jpg";
import homeWhoWeAre from "./assets/home/who-we-are/1.jpg";
import sunImg from "./assets/about/vision-mission/sun.png";
import recognitionSparkChange from "./assets/impact/recognitions/spark-a-change.jpg";
import recognitionAraneta from "./assets/impact/recognitions/488223845_10225500053268278_7311255336231534549_n.jpg";

/* ============================= Shared primitives ============================= */

// Luxury cubic-bezier curve for slow, elegant decelerating momentum
const EASE = [0.16, 1, 0.3, 1];

const REVEAL_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  },
};

// Section that animates smoothly as it enters the viewport
function Reveal({ className, children, variant = "fadeUp", as = "section", ...props }) {
  const Comp = motion[as];
  const chosenVariant = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.fadeUp;
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={chosenVariant}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Container that automatically staggers direct children as they enter the viewport
function StaggerContainer({ className, children, stagger = 0.12, delay = 0, as = "div", ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

function StaggerItem({ className, children, as = "div", ...props }) {
  const Comp = motion[as];
  const itemVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: EASE },
    },
  };
  return (
    <Comp variants={itemVariants} className={className} {...props}>
      {children}
    </Comp>
  );
}

function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-9", className)}>{children}</div>;
}

// The brand's section marker: black uppercase type in a yellow pill.
// It stays yellow on dark backgrounds too — that contrast is the point.
function Eyebrow({ className, align = "left", dark = false, children }) {
  return (
    <div className={cn("mb-3", align === "center" && "text-center", className)}>
      <span className="pill-label">{children}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, lead, align = "left", dark = false, className, titleClassName }) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && <Eyebrow align={align} dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "max-w-[42ch] text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]",
          dark ? "text-white" : "text-navy",
          align === "center" && "mx-auto",
          titleClassName
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

/* ============================= Image Lightbox Modal ============================= */

function ImageLightboxModal({ photo, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (photo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-navy p-3 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close photo preview"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="overflow-hidden rounded-xl bg-black/40">
            <img
              src={photo.src}
              alt={photo.alt || "Síkat-Aurora program photo"}
              className="max-h-[80vh] w-auto max-w-full object-contain mx-auto"
            />
          </div>
          {photo.alt && (
            <p className="mt-3 text-center text-xs font-medium text-white/80">{photo.alt}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// The deck's "in Photos" pattern: a grid of program photography under a label, now fully interactive with Lightbox preview
function PhotoGrid({ label, photos, className }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className={className}>
      {label && <span className="pill-label mb-5 inline-flex">{label}</span>}
      <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((p) => (
          <StaggerItem key={p.src}>
            <figure
              onClick={() => setSelectedPhoto(p)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-navy/5 shadow-xs transition-all duration-300 hover:shadow-md"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-32 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105 motion-reduce:group-hover:scale-100 sm:h-40"
              />
            </figure>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <ImageLightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}

/* Slot-machine figures: each digit spins through a 0–9 reel before landing.
   Only digits spin — ₱ , . k M + stay put so "₱1.5M+" still reads correctly. */

const SLOT_REEL = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SLOT_PASSES = 3; // full 0–9 rotations before the reel settles
const SLOT_LINE = 1.25; // em per reel cell — also the wrapper's line-height

function SlotDigit({ digit, delay, play }) {
  // Three passes of 0–9 then the landing digit, so every reel travels the same
  // distance and they stop left-to-right purely on `delay`.
  const strip = [...Array(SLOT_PASSES)].flatMap(() => SLOT_REEL).concat(digit);

  return (
    // clip-path (not overflow-hidden) so the wrapper keeps its text baseline
    <span
      className="relative inline-block"
      style={{ lineHeight: SLOT_LINE, clipPath: "inset(0)" }}
    >
      {/* Invisible copy sets the width and the baseline the reel lands on */}
      <span className="invisible">{digit}</span>
      <motion.span
        className="absolute left-0 top-0 flex w-full flex-col"
        initial={{ y: 0 }}
        animate={{ y: play ? `-${SLOT_PASSES * 10 * SLOT_LINE}em` : 0 }}
        transition={{ duration: 1.4, delay, ease: [0.12, 0.8, 0.2, 1] }}
      >
        {strip.map((d, i) => (
          <span key={i} style={{ height: `${SLOT_LINE}em`, lineHeight: SLOT_LINE }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function SlotFigure({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  let digitIndex = 0;
  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the plain figure; the reel is decorative */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {reduced
          ? value
          : [...value].map((ch, i) =>
              /\d/.test(ch) ? (
                <SlotDigit key={i} digit={ch} delay={digitIndex++ * 0.09} play={inView} />
              ) : (
                <span key={i}>{ch}</span>
              )
            )}
      </span>
    </span>
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
        <SlotFigure
          value={figure}
          className={cn("font-medium", dark ? "text-white" : "text-navy")}
        />{" "}
        {label}
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
  const [program, setProgram] = useState("");

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
            className="relative z-10 flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-modal"
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors duration-150 hover:bg-navy/[0.06] hover:text-navy"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Header stays put; only the form below it scrolls */}
            <div className="shrink-0 px-7 pb-5 pt-8 sm:px-9">
              <Eyebrow>Join Síkat-Aurora</Eyebrow>
              <h3 id="volunteer-modal-title" className="text-[1.5rem] font-bold text-navy">
                Sign Up &amp; Signify Interest
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/75">
                Takes 2 minutes — our membership team will reach out within 48 hours.
              </p>
            </div>

            <div className="scroll-slim min-h-0 flex-1 overflow-y-auto px-7 pb-8 sm:px-9">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="vol-first-name" label="First name" required placeholder="Juan" autoComplete="given-name" />
                  <Field id="vol-last-name" label="Last name" required placeholder="Dela Cruz" autoComplete="family-name" />
                </div>

                <Field id="vol-email" label="Email address" type="email" required placeholder="juan@gmail.com" autoComplete="email" />
                <Field id="vol-mobile" label="Mobile number" type="tel" required placeholder="0917 123 4567" autoComplete="tel" />

                <Field id="vol-program" label="Program of interest">
                  <select
                    id="vol-program"
                    required
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className={cn("form-select", !program && "form-select-muted")}
                  >
                    <option value="" disabled>
                      Select a program...
                    </option>
                    <option>Abot Ko Ang Libro (Education)</option>
                    <option>Ang Batang Kali (Environment)</option>
                    <option>Hiraya (Active Citizenship)</option>
                    <option>Any program where needed</option>
                  </select>
                </Field>

                <Field id="vol-age" label="Age group (15–30 y/o)">
                  <select id="vol-age" className="form-select" defaultValue="15–18 years old">
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
            </div>
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
    <div className="bg-navy pb-16 pt-32 text-white">
      <Container>
        <StaggerContainer stagger={0.08}>
          {eyebrow && (
            <StaggerItem>
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </StaggerItem>
          )}
          <StaggerItem>
            <h1 className="max-w-[20ch] text-[2.1rem] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[3rem]">
              {title}
            </h1>
          </StaggerItem>
          {subtitle && (
            <StaggerItem>
              <p className="mt-4 max-w-[56ch] text-[0.98rem] leading-[1.75] text-white/75">{subtitle}</p>
            </StaggerItem>
          )}
        </StaggerContainer>
      </Container>
    </div>
  );
}

/* ============================= Page 1: Home ============================= */

// Each figure is paired with a photograph of the thing being counted.
// These four live in src/assets/impact-in-numbers/, named after their stat —
// replace a file there (same name) to swap a photo.
const HOME_IMPACT_STATS = [
  {
    Icon: Users,
    figure: "400+",
    label: "youth volunteers",
    photo: {
      src: impactVolunteersImg,
      alt: "The Síkat-Aurora volunteer corps gathered for a group photo",
    },
  },
  {
    Icon: BookOpen,
    figure: "1,100+",
    label: "learners reached",
    photo: {
      src: impactLearnersImg,
      alt: "A volunteer reading a storybook one-on-one with a young learner",
    },
  },
  {
    Icon: MapPin,
    figure: "18",
    label: "partner communities",
    photo: {
      src: impactCommunitiesImg,
      alt: "A packed community room of children and volunteers at a partner barangay",
    },
  },
  {
    Icon: HandCoins,
    figure: "₱1.5M+",
    label: "donations and grants",
    photo: {
      src: impactDonationsImg,
      alt: "Donation packs laid out beside the Síkat-Aurora banner, ready for distribution",
    },
  },
];

const heroBannerModules = import.meta.glob("./assets/home/hero-banner/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const HERO_BANNER_IMAGES = Object.values(heroBannerModules);

function HomePage({ onNavigate, onOpenModal }) {
  return (
    <>
      <section id="home">
        <AnimatedHero
          images={HERO_BANNER_IMAGES}
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

      {/* About teaser */}
      <Reveal className="bg-white py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A new face of youth volunteerism in Aurora"
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
            src={homeWhoWeAre}
            alt="Síkat-Aurora volunteers and children at a community assembly"
            className="w-full rounded-lg"
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

          {/* Each figure sits with the photograph that evidences it, so the
              image is doing the same work as the number rather than decorating it. */}
          <StaggerContainer as="ul" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {HOME_IMPACT_STATS.map(({ Icon, figure, label, photo }) => (
              <StaggerItem as="li" key={label} className="group">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100 lg:h-52"
                  />
                </div>
                <div className="mt-5 flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[0.95rem] leading-snug text-white/75">
                    <SlotFigure
                      value={figure}
                      className="block text-[1.6rem] font-medium leading-tight text-white"
                    />
                    {label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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

          {/* Bento: Abot Ko Ang Libro takes the tall tile, the other two sit beside
              it, and two field photos fill the remaining cells on wide screens. */}
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[15.5rem]">
            {[
              {
                name: "Abot Ko Ang Libro",
                center: "Education",
                img: coreAbklImg,
                desc: "Mobile library cart bringing books & storytelling to kids ages 2–14.",
                span: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
              },
              {
                name: "Ang Batang Kali",
                center: "Environment",
                img: coreAbkpImg,
                desc: "Environmental life skills for youth ages 8–15 protecting nature.",
              },
              {
                name: "Hiraya",
                center: "Active Citizenship",
                img: coreHirayaImg,
                desc: "Leadership training & seed funding across 30 DepEd schools.",
              },
            ].map((p) => (
              <StaggerItem key={p.name} className={p.span}>
                <div
                  className="group relative h-full min-h-[15.5rem] cursor-pointer overflow-hidden rounded-2xl shadow-card transition-shadow duration-200 hover:shadow-card-hover"
                  onClick={() => onNavigate("programs")}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onNavigate("programs")}
                >
                  <img
                    src={p.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                  {/* Keeps the copy legible whatever the photo underneath is doing */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-ink via-navy-ink/55 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <Tag className="mb-2.5 bg-white/15 text-white backdrop-blur-sm">{p.center}</Tag>
                    <h3 className="text-[1.2rem] font-bold text-white">{p.name}</h3>
                    <p className="mt-1.5 max-w-[34ch] text-sm leading-relaxed text-white/80">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Filler tiles — decorative, so they drop out below the bento grid */}
            {[PROGRAM_PHOTOS.abkp[3], PROGRAM_PHOTOS.hiraya[0]].map((photo) => (
              <StaggerItem key={photo.src} className="hidden lg:block">
                <div className="group h-full overflow-hidden rounded-2xl shadow-card">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
// Decorative sun in the brand's style — the ring of triangular rays from the
// logo, drawn as SVG so it can sit behind content at any size. aria-hidden;
// purely ornamental.
function SunRays({ className, rays = 12 }) {
  const paths = Array.from({ length: rays }, (_, i) => {
    const angle = (i * 360) / rays;
    const rad = (deg) => (deg * Math.PI) / 180;
    const inner = 40;
    const outer = 60;
    const half = 7; // half-width of each ray base, in degrees
    const x1 = 100 + inner * Math.cos(rad(angle - half));
    const y1 = 100 + inner * Math.sin(rad(angle - half));
    const x2 = 100 + inner * Math.cos(rad(angle + half));
    const y2 = 100 + inner * Math.sin(rad(angle + half));
    const tx = 100 + outer * Math.cos(rad(angle));
    const ty = 100 + outer * Math.sin(rad(angle));
    return `M ${x1} ${y1} L ${tx} ${ty} L ${x2} ${y2} Z`;
  });
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="currentColor">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

// Flanking the About statement — one from each program, plus the assembly
const ABOUT_HERO_PHOTOS = [
  { src: whoWeAre1, alt: "Síkat-Aurora youth volunteers at a community program" },
  { src: whoWeAre2, alt: "Volunteers engaging with local children in Aurora" },
  { src: whoWeAre3, alt: "Youth leaders at a Síkat-Aurora program activity" },
  { src: whoWeAre4, alt: "Síkat-Aurora community assembly and outreach" },
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
      <Reveal className="bg-white px-6 pb-16 pt-36 md:px-9 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)_minmax(0,0.75fr)]">
          {/* Side columns sit slightly off-axis so the pair does not read as a bar */}
          <StaggerContainer className="hidden gap-4 lg:grid">
            <StaggerItem>
              <img
                src={ABOUT_HERO_PHOTOS[0].src}
                alt={ABOUT_HERO_PHOTOS[0].alt}
                className="h-52 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03]"
              />
            </StaggerItem>
            <StaggerItem>
              <img
                src={ABOUT_HERO_PHOTOS[1].src}
                alt={ABOUT_HERO_PHOTOS[1].alt}
                className="h-36 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03]"
              />
            </StaggerItem>
          </StaggerContainer>

          <div className="text-center">
            <Eyebrow align="center">Who We Are</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mx-auto max-w-[20ch] text-[2.1rem] font-bold leading-[1.12] tracking-[-0.03em] text-navy sm:text-[3rem]"
            >
              A youth-led movement building a new face of volunteerism in Aurora
            </motion.h1>
            {/* The brand's gold rule, used here as an underline accent */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              aria-hidden="true"
              className="mx-auto mt-7 block h-1.5 w-24 origin-center rounded-full bg-gold"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mx-auto mt-7 max-w-[58ch] text-[1.02rem] leading-[1.8] text-navy/75"
            >
              Síkat-Aurora Inc. provides free after-school programs in education, environment, and active
              citizenship — powered entirely by young volunteers, for the communities they come from.
            </motion.p>
          </div>

          <StaggerContainer className="hidden gap-4 pt-14 lg:grid" delay={0.15}>
            <StaggerItem>
              <img
                src={ABOUT_HERO_PHOTOS[2].src}
                alt={ABOUT_HERO_PHOTOS[2].alt}
                className="h-36 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03]"
              />
            </StaggerItem>
            <StaggerItem>
              <img
                src={ABOUT_HERO_PHOTOS[3].src}
                alt={ABOUT_HERO_PHOTOS[3].alt}
                className="h-52 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03]"
              />
            </StaggerItem>
          </StaggerContainer>

          {/* Below lg the columns would squeeze, so the same four run as a grid */}
          <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:hidden">
            {ABOUT_HERO_PHOTOS.map((p) => (
              <StaggerItem key={p.src}>
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-28 w-full rounded-xl object-cover sm:h-32 shadow-xs"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Reveal>

      {/* 2 — Vision and mission, stacked and centered, with the brand's sun symbol */}
      <Reveal variant="scaleUp" className="relative overflow-hidden bg-cream py-16 lg:py-24">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          src={sunImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 opacity-20 sm:h-80 sm:w-80"
        />
        <motion.img
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          src={sunImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 opacity-20 sm:h-80 sm:w-80"
        />
        <Container className="relative max-w-4xl space-y-12 text-center">
          <StaggerContainer stagger={0.15}>
            <StaggerItem className="mb-10">
              <Eyebrow align="center">Vision</Eyebrow>
              <p className="mx-auto max-w-[52ch] text-[1.25rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
                A future where{" "}
                <span className="bg-gold/35 px-1 rounded-sm">accessible and enriching after-school programs</span> empower
                underserved communities in Aurora.
              </p>
            </StaggerItem>
            <StaggerItem>
              <Eyebrow align="center">Mission</Eyebrow>
              <p className="mx-auto max-w-[52ch] text-[1.25rem] font-medium leading-[1.6] text-navy sm:text-[1.5rem]">
                To provide inclusive after-school programs in{" "}
                <span className="bg-gold/35 px-1 rounded-sm">education, environment, and active citizenship</span>, driven by
                youth volunteers to create lasting community impact.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Reveal>

      {/* 3 — Values as a divided vertical stack */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Our Values" title="Ang aming pinanghahawakan" className="mb-12" />
          <StaggerContainer as="dl" className="border-t border-navy/15">
            {VALUES.map((v) => (
              <StaggerItem key={v.title} className="group border-b border-navy/15 py-8 transition-colors duration-200 hover:bg-cream/40 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-8 sm:px-4 sm:rounded-xl">
                <dt className="text-[1.3rem] font-bold tracking-[-0.01em] text-navy transition-colors duration-200 group-hover:text-primary">{v.title}</dt>
                <dd className="mt-2 sm:mt-0">
                  <p className="text-[1rem] leading-[1.7] text-navy/85">{v.desc}</p>
                  <p className="mt-1.5 text-[0.88rem] italic leading-relaxed text-navy/55">{v.gloss}</p>
                </dd>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Reveal>

      {/* 4 — Origin narrative beside a photograph */}
      <Reveal className="overflow-hidden bg-cream">
        <div className="grid items-stretch lg:grid-cols-2">
          <figure className="relative min-h-[300px] overflow-hidden lg:min-h-[560px]">
            <img
              src={howWeStartedImg}
              alt="Síkat-Aurora how we started — where the Philippine sun rises first"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </figure>
          <div className="flex items-center px-6 py-16 md:px-9 lg:py-24">
            <StaggerContainer className="w-full lg:ml-auto lg:max-w-xl lg:pr-4">
              <StaggerItem>
                <Eyebrow>How We Started</Eyebrow>
                <h2 className="max-w-[18ch] text-[1.7rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[2.1rem]">
                  Where the Philippine sun rises first
                </h2>
              </StaggerItem>
              <StaggerItem>
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
              </StaggerItem>


            </StaggerContainer>
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
          <StaggerContainer as="ul" className="border-t border-navy/15">
            {[
              { name: "Abot Ko Ang Libro", center: "Education", desc: "A mobile library cart bringing books and storytelling to kids ages 2–14." },
              { name: "Ang Batang Kali", center: "Environment", desc: "Life skills helping youth ages 8–15 grow into stewards of nature." },
              { name: "Hiraya", center: "Active Citizenship", desc: "Leadership training and seed funding for youth leaders across 30 DepEd schools." },
            ].map((p) => (
              <StaggerItem as="li" key={p.name}>
                <button
                  onClick={() => onNavigate("programs")}
                  className="group flex w-full items-center gap-6 border-b border-navy/15 py-7 text-left transition-all duration-200 hover:bg-cream/50 sm:px-4 sm:rounded-xl"
                >
                  <div className="flex-1">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-primary">{p.center}</p>
                    <h3 className="mt-1.5 text-[1.3rem] font-bold text-navy transition-colors duration-200 group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 max-w-[60ch] text-[0.92rem] leading-relaxed text-navy/75">{p.desc}</p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-navy/40 transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-primary motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
        { name: "Brgy. Zabali", url: "https://www.facebook.com/media/set/?set=a.196219879269623&type=3" },
        { name: "Brgy. Calabuanan", url: "https://www.facebook.com/media/set/?set=a.804815785537451&type=3" },
        { name: "Brgy. Reserva", url: "https://www.facebook.com/media/set/?set=a.512972314721801&type=3" },
        { name: "Brgy. 5", url: "https://www.facebook.com/media/set/?set=a.220092246882386&type=3" },
        { name: "Brgy. Diome", url: "https://www.facebook.com/media/set/?set=a.318236403734636&type=3" },
        { name: "Buhangin", url: "https://www.facebook.com/media/set/?set=a.333655845986783&type=3" },
        { name: "Sitio Cemento", url: "https://www.facebook.com/media/set/?set=a.665564846129213&type=3" },
        { name: "Brgy. Diaat", url: "https://www.facebook.com/media/set/?set=a.743808994971464&type=3" },
        { name: "Brgy. Pingit", url: "https://www.facebook.com/media/set/?set=a.771258718893158&type=3" },
        { name: "Brgy. Diamanen", url: "https://www.facebook.com/media/set/?set=a.910207084998320&type=3" },
        { name: "Brgy. Bacong", url: "https://www.facebook.com/media/set/?set=a.834679889217707&type=3" },
        { name: "Diteki", url: "https://www.facebook.com/media/set/?set=a.991454176873610&type=3" },
        { name: "TOPNHS", url: "https://www.facebook.com/media/set/?set=a.1020879573931070&type=3" },
        { name: "Obligacion IS", url: "https://www.facebook.com/media/set/?set=a.1018228814196146&type=3" },
        { name: "Diego Ortiz ES", url: "https://www.facebook.com/media/set/?set=a.781959607823069&type=3" },
        { name: "Villa Aurora ES", url: "https://www.facebook.com/media/set/?set=a.753190090700021&type=3" },
      ],
      img: coreAbklImg,
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
      communities: [
        { name: "Brgy. Dibut", url: "https://www.facebook.com/media/set/?set=a.371452035079739&type=3" },
        { name: "Casiguran", url: "https://www.facebook.com/media/set/?set=a.341001421918892&type=3" },
        { name: "Sitio Ilaya", url: "https://www.facebook.com/media/set/?set=a.558837003007907&type=3" },
        { name: "KALI Summit 2026", url: "https://www.facebook.com/media/set/?set=a.1059197203432640&type=3" },
        { name: "Training of Trainers", url: "https://www.facebook.com/media/set/?set=a.871082465577449&type=3" },
      ],
      img: coreAbkpImg,
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
      communities: [
        { name: "Maria Aurora", url: "https://www.facebook.com/media/set/?set=a.1000689259283435&type=3" },
        { name: "Baler Linggo ng Kabataan", url: "https://www.facebook.com/media/set/?set=a.857540020265027&type=3" },
        { name: "Ditumabo NHS", url: "https://www.facebook.com/media/set/?set=a.777656438253386&type=3" },
        { name: "Dinalungan 2025", url: "https://www.facebook.com/media/set/?set=a.731377936214570&type=3" },
        { name: "Makabagong Bayani", url: "https://www.facebook.com/media/set/?set=a.400484279303939&type=3" },
      ],
      img: coreHirayaImg,
      photos: PROGRAM_PHOTOS.hiraya,
      accent: "text-forest",
      bg: "bg-forest-soft",
    },
  ];

  return (
    <>
      {programs.map((p, i) => (
        <Reveal
          key={p.name}
          className={cn(
            "overflow-hidden",
            i % 2 === 1 ? "bg-cream" : "bg-white",
            i === 0 ? "pt-20 lg:pt-24" : "border-t border-navy/10"
          )}
        >
          <div
            className={cn(
              "grid items-stretch lg:grid-cols-2",
              i % 2 === 1 && "lg:[&>figure]:order-last"
            )}
          >
            <figure className="relative min-h-[280px] overflow-hidden lg:min-h-[520px]">
              <img
                src={p.img}
                alt={p.alt || p.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </figure>

            <div className="flex items-center px-6 py-14 md:px-9 lg:py-20">
              <StaggerContainer className={cn("w-full", i % 2 === 0 ? "lg:max-w-xl lg:pl-4" : "lg:ml-auto lg:max-w-xl lg:pr-4")}>
                <StaggerItem>
                  <Eyebrow>Core Program</Eyebrow>
                  <h2 className="max-w-[20ch] text-[1.6rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[2rem]">
                    {p.name}
                  </h2>
                </StaggerItem>

                <StaggerItem>
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
                </StaggerItem>

                <StaggerItem>
                  <p className="mb-2.5 mt-6 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy">
                    Partner Communities ({p.communities.length})
                  </p>
                  <StaggerContainer as="ul" className="flex flex-wrap gap-1.5" stagger={0.04}>
                    {p.communities.map((c) => {
                      const name = typeof c === "string" ? c : c.name;
                      const url = typeof c === "object" && c.url ? c.url : null;

                      if (url) {
                        return (
                          <StaggerItem as="li" key={name}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-white px-3 py-1 text-[0.7rem] font-medium text-navy transition-all duration-200 hover:border-primary hover:bg-primary-soft hover:text-primary hover:-translate-y-0.5 shadow-xs"
                            >
                              <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                              {name}
                              <ArrowUpRight className="h-3 w-3 opacity-60 ml-0.5" aria-hidden="true" />
                            </a>
                          </StaggerItem>
                        );
                      }

                      return (
                        <StaggerItem
                          as="li"
                          key={name}
                          className="inline-flex items-center gap-1 rounded-full border border-navy/10 bg-white px-3 py-1 text-[0.7rem] font-medium text-navy"
                        >
                          <MapPin className="h-3 w-3 text-primary" aria-hidden="true" /> {name}
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>
                </StaggerItem>
              </StaggerContainer>
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
      <Reveal className="bg-white pb-16 pt-20 lg:pb-20 lg:pt-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our Reach"
                title="Five years of youth-led impact across Aurora"
                className="mb-10"
              />
              <StaggerContainer as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
                {stats.map((s) => (
                  <StaggerItem as="li" key={s.label}>
                    <StatRow {...s} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <StaggerContainer className="grid grid-cols-2 gap-4">
              <StaggerItem className="space-y-4">
                <img
                  src={PROGRAM_PHOTOS.abkl[0].src}
                  alt={PROGRAM_PHOTOS.abkl[0].alt}
                  loading="lazy"
                  className="h-40 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03] sm:h-52"
                />
                <img
                  src={PROGRAM_PHOTOS.hiraya[3].src}
                  alt={PROGRAM_PHOTOS.hiraya[3].alt}
                  loading="lazy"
                  className="h-32 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03] sm:h-40"
                />
              </StaggerItem>
              <StaggerItem className="space-y-4 pt-8">
                <img
                  src={PROGRAM_PHOTOS.abkp[0].src}
                  alt={PROGRAM_PHOTOS.abkp[0].alt}
                  loading="lazy"
                  className="h-32 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03] sm:h-40"
                />
                <img
                  src={PHOTOS.volunteersGroup}
                  alt="Síkat-Aurora youth volunteers together at a program"
                  loading="lazy"
                  className="h-40 w-full rounded-2xl object-cover shadow-sm transition-transform duration-500 hover:scale-[1.03] sm:h-52"
                />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Container>
      </Reveal>

      {/* Funding, charted from the published transparency report */}
      <Reveal className="border-y border-navy/10 bg-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Transparency"
            title="Where our funding comes from"
            lead={`Cash donations and grants received per fiscal year, as published in our public financial report as of ${FUNDING_AS_OF}.`}
            className="mb-12"
          />

          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <FundingChart />

            <div>
              <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
                <img
                  src={PHOTOS.communityOutreach}
                  alt="Síkat-Aurora community impact and financial transparency"
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-72"
                />
              </div>
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
            eyebrow="Awards & Honors"
            title="Recognized locally, nationally, and internationally"
            lead="From municipal SK federations to national foundations and the ASEAN Youth Forum."
            className="mb-12"
          />
          <StaggerContainer as="ul" className="border-t border-white/20">
            {awards.map((a) => (
              <StaggerItem
                as="li"
                key={a.title}
                className="grid gap-2 border-b border-white/10 py-5 transition-colors duration-200 hover:bg-white/[0.04] md:grid-cols-[11rem_1fr_18rem] md:items-baseline md:gap-6 md:px-3"
              >
                <Tag className={cn("w-fit", levelStyles[a.level])}>{a.level}</Tag>
                <p className="text-[1.05rem] font-bold leading-snug text-white">{a.title}</p>
                <p className="text-xs leading-relaxed text-white/55">{a.grantor}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Reveal>

      {/* Recognition in the field */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Impact in Action"
            title="Recognition rooted in real community work"
            lead="Behind every honor are dedicated youth volunteers teaching children, protecting nature, and empowering communities across Aurora."
            className="mb-12"
          />
          <PhotoGrid
            photos={[
              { src: recognitionSparkChange, alt: "Síkat-Aurora National Winner, Spark-A-Change Challenge" },
              { src: recognitionAraneta, alt: "J. Amado Araneta Foundation recognition" },
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
  return (
    <>
      <Reveal className="bg-white pb-16 pt-20 lg:pb-24 lg:pt-24">
        <Container>
          <SectionHeading
            eyebrow="Organizational Structure"
            title="The youth leaders driving the movement"
            lead="Meet the executive committee and directorate guiding volunteer initiatives across Aurora Province."
            className="mb-12"
          />

          <StaggerContainer className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {LEADERS.map((l) => (
              <StaggerItem as="article" key={l.name} className="group flex flex-col">
                {/* Portrait slot — falls back to initials until a photo is added */}
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-primary-soft shadow-xs">
                  {l.photo ? (
                    <img
                      src={l.photo}
                      alt={l.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span
                        className="text-[2.2rem] font-bold text-primary/45 transition-colors duration-200 group-hover:text-primary/60"
                        aria-hidden="true"
                      >
                        {l.initials}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-[1.15rem] font-bold leading-snug text-navy">{l.name}</h3>
                <p className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-primary">
                  {l.title}
                </p>
                <p className="mt-2 text-sm leading-[1.7] text-navy/75">{l.role}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
function VolunteerCard({ volunteer, onSelectPhoto }) {
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
    <figure
      className="group cursor-pointer"
      onClick={() => volunteer.photo && onSelectPhoto?.({ src: volunteer.photo, alt: volunteer.name ? `${volunteer.name} - ${volunteer.role}` : "Síkat-Aurora volunteer" })}
    >
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
    </figure>
  );
}

function MarqueeRow({ volunteers, reverse = false, hidden = false, onSelectPhoto }) {
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
            {[...volunteers, ...volunteers].map((v, i) => (
              <li key={`${copy}-${i}-${v.id}`} className="w-32 shrink-0 pr-5 sm:w-40">
                <VolunteerCard volunteer={v} onSelectPhoto={onSelectPhoto} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function VolunteerWall({ onOpenModal }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

      <div
        className="group relative space-y-5"
        role="region"
        aria-label="Síkat-Aurora volunteers"
        tabIndex={0}
      >
        <MarqueeRow volunteers={VOLUNTEERS} onSelectPhoto={setSelectedPhoto} />
        <MarqueeRow volunteers={[...VOLUNTEERS].reverse()} reverse hidden onSelectPhoto={setSelectedPhoto} />
      </div>

      <ImageLightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

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
          <h3 className="text-[1.15rem] font-bold leading-snug text-navy transition-colors duration-200 group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-5 mt-2.5 flex-1 text-[0.88rem] leading-[1.7] text-navy/70">{post.excerpt}</p>
          <div className="mt-auto flex flex-wrap items-center gap-2.5">
            <Tag className={cn("w-fit text-[0.72rem]", CATEGORY_STYLES[post.category])}>{post.category}</Tag>
            <PostMeta post={post} />
          </div>
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
      {/* Lead story */}
      <Reveal className="border-b border-navy/10 bg-white pb-14 pt-20 lg:pb-16 lg:pt-24">
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
      "Yes. Síkat-Aurora Inc. is formally registered as a nonprofit organization in the Philippines.",
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
      <FaqSection
        className="pt-20 lg:pt-24"
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
      <header className="pt-28 lg:pt-36">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">Join Our Volunteer Movement</h1>
          <p className="mt-4 text-lg text-navy/70">Where Every Youth Has a Voice & Purpose</p>
          <p className="mt-2 text-navy/60">Admission is 100% free and open to all youth aged 15–30 in Aurora Province.</p>
        </Container>
      </header>

      {/* CTA banner */}
      <Reveal className="bg-cream px-6 pb-12 pt-20 md:px-9 lg:pt-24">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 rounded-lg border-l-2 border-primary bg-navy p-8 text-white sm:p-10">
          <div>
            <Eyebrow dark>Ready to Make a Difference?</Eyebrow>
            <h2 className="max-w-[20ch] text-[1.5rem] font-bold tracking-[-0.01em] sm:text-[1.9rem]">
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

// Product-style kit card. `featured` lays it out wide with the photo beside
// the details; the rest stack photo-over-details in the grid below.
function KitCard({ kit, featured = false, onDonate }) {
  return (
    <Card
      as="article"
      className={cn(
        "flex overflow-hidden",
        featured ? "flex-col lg:flex-row" : "h-full flex-col"
      )}
    >
      <div className={cn("shrink-0 overflow-hidden bg-cream", featured && "lg:w-[46%]")}>
        <img
          src={kit.image}
          alt={kit.imageAlt}
          loading="lazy"
          className={cn(
            "w-full object-cover transition-transform duration-500 hover:scale-[1.03]",
            featured ? "h-56 lg:h-full lg:min-h-[19rem]" : "aspect-[4/3] h-auto"
          )}
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-6", featured && "justify-center p-7 sm:p-9")}>
        <h3
          className={cn(
            "font-bold leading-snug text-navy",
            featured ? "text-[1.45rem]" : "text-[1.05rem]"
          )}
        >
          {kit.name}
        </h3>

        <p
          className={cn(
            "mt-2 leading-relaxed text-navy/70",
            featured ? "max-w-[46ch] text-[0.95rem]" : "text-[0.85rem]"
          )}
        >
          {kit.blurb}
        </p>

        {featured && (
          <ul className="mt-5 flex list-none flex-col gap-2 p-0">
            {kit.includes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.85rem] text-navy/75">
                <Check className="h-3.5 w-3.5 shrink-0 text-forest" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Price and CTA pinned to the bottom so cards line up across the row */}
        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-4",
            featured ? "pt-7" : "pt-5"
          )}
        >
          <p className={cn("font-bold text-primary", featured ? "text-[1.9rem]" : "text-[1.35rem]")}>
            {formatPeso(kit.amount)}
          </p>
          <Btn
            onClick={() => onDonate(kit.id)}
            className={cn(featured ? "px-8" : "px-6 py-2.5 text-[0.8rem]")}
          >
            Donate <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Btn>
        </div>
      </div>
    </Card>
  );
}

// Message on the left, the two ways to act on the right — the old single
// column left most of this navy band empty.
function TransparencyNote() {
  return (
    <div className="overflow-hidden rounded-2xl bg-navy text-white">
      <div className="grid gap-9 p-8 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14">
        <div>
          <h3 className="text-[1.4rem] font-bold leading-[1.2] sm:text-[1.6rem]">
            Every peso, on the record.
          </h3>
          <p className="mt-3.5 max-w-[50ch] text-[0.88rem] leading-relaxed text-white/70">
            We publish where every peso goes — the full ledger is open to anyone who wants to read
            it. If you'd rather just ask before you give, we'll answer.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:border-l lg:border-white/10 lg:pl-14">
          <a
            href="https://bit.ly/sikatfinance"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 rounded-full bg-gold px-6 py-3.5 text-[0.85rem] font-semibold text-navy-ink no-underline transition-colors duration-200 hover:bg-gold-bright"
          >
            View Financial Report
            <ArrowUpRight
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:transform-none"
              aria-hidden="true"
            />
          </a>
          <a
            href="https://www.facebook.com/sikataurora/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-4 rounded-full border-2 border-white/25 px-6 py-3 text-[0.85rem] font-semibold text-white no-underline transition-colors duration-200 hover:border-white hover:bg-white hover:text-navy"
          >
            Message Us Directly
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
          <p className="mt-1 text-center text-[0.72rem] text-white/45">bit.ly/sikatfinance</p>
        </div>
      </div>
    </div>
  );
}

function DonatePage({ onDonate }) {
  const featured = KITS.find((k) => k.featured) ?? KITS[0];
  const rest = KITS.filter((k) => k !== featured);

  return (
    <Reveal className="bg-cream pb-16 pt-20 lg:pb-20 lg:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Where Your Gift Goes"
          title="Sponsorship Equivalents"
          lead="Every kit below is a real bundle we hand out in the field. Pick one and we'll tell you exactly which batch it reached."
          className="mb-10"
        />

        <StaggerContainer className="grid gap-6">
          <StaggerItem>
            <KitCard kit={featured} featured onDonate={onDonate} />
          </StaggerItem>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((kit) => (
              <StaggerItem key={kit.id} className="h-full">
                <KitCard kit={kit} onDonate={onDonate} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <div className="mt-10">
          <TransparencyNote />
        </div>
      </Container>
    </Reveal>
  );
}

/* ============================= Page 10: Checkout ============================= */

// Server endpoint that creates the PayMongo Checkout Session and returns
// { checkoutUrl }. It does not exist yet — it needs to run somewhere that can
// hold PAYMONGO_SECRET_KEY (a Vercel serverless function under /api would do).
// Until it does, Proceed to Payment surfaces an error instead of pretending.
const PAYMONGO_CHECKOUT_ENDPOINT = "/api/paymongo/checkout";

function CheckoutPage({ kit, onNavigate }) {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  const total = kit.amount * qty;

  // Hands off to PayMongo's hosted checkout, which is where the donor picks
  // GCash / Maya / card / bank. The session has to be created server-side —
  // PayMongo's secret key must never reach the browser — so this posts to our
  // own endpoint and follows the checkout URL it returns.
  const handleProceed = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(PAYMONGO_CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kitId: kit.id, quantity: qty, name, email }),
      });

      if (!res.ok) throw new Error(`Checkout failed (${res.status})`);

      const { checkoutUrl } = await res.json();
      if (!checkoutUrl) throw new Error("No checkout URL was returned.");

      window.location.href = checkoutUrl;
    } catch (err) {
      setStatus("error");
      setError(
        `${err.message} — online payment isn't connected yet. Please message us and we'll arrange your donation directly.`
      );
    }
  };

  return (
    <Reveal className="bg-cream pb-16 pt-20 lg:pb-20 lg:pt-24">
      <Container>
        <button
          onClick={() => onNavigate("donate")}
          className="mb-7 inline-flex items-center gap-1.5 rounded-md text-[0.82rem] font-semibold text-navy/70 transition-colors duration-150 hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back to sponsorship kits
        </button>

        <SectionHeading eyebrow="Step 2 of 2" title="Confirm your sponsorship" className="mb-9" />

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Order summary */}
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-7">
            <h3 className="mb-5 text-[1.05rem] font-bold text-navy">Your sponsorship</h3>

            <div className="flex gap-4">
              <img
                src={kit.image}
                alt={kit.imageAlt}
                className="h-24 w-28 shrink-0 rounded-xl bg-cream object-cover sm:h-28 sm:w-32"
              />
              <div className="min-w-0">
                <Tag className="mb-1.5 bg-navy/[0.06] text-navy/70">{kit.program}</Tag>
                <p className="font-semibold leading-snug text-navy">{kit.name}</p>
                <p className="mt-1 text-[0.82rem] text-navy/60">{formatPeso(kit.amount)} each</p>
              </div>
            </div>

            <ul className="mt-5 flex list-none flex-col gap-2 border-t border-navy/10 p-0 pt-5">
              {kit.includes.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[0.85rem] text-navy/75">
                  <Check className="h-3.5 w-3.5 shrink-0 text-forest" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-5">
              <span className="text-[0.85rem] font-semibold text-navy">Quantity</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-150 hover:border-navy/40 disabled:pointer-events-none disabled:opacity-40"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span aria-live="polite" className="w-10 text-center font-semibold text-navy">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  disabled={qty >= 99}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-150 hover:border-navy/40 disabled:pointer-events-none disabled:opacity-40"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-navy/10 pt-5">
              <span className="text-[0.9rem] font-semibold text-navy">Total</span>
              <span className="text-[1.7rem] font-bold text-primary">{formatPeso(total)}</span>
            </div>
          </div>

          {/* Payment details */}
          <div className="rounded-2xl border border-navy/10 bg-white p-7 shadow-card sm:p-8">
            <h3 className="mb-6 text-[1.35rem] font-bold text-navy">Payment details</h3>

            {/* No method picker — PayMongo's hosted checkout collects that itself */}
            <form onSubmit={handleProceed} className="space-y-4">
              <Field
                id="donate-name"
                label="Full Name"
                placeholder="Juan Dela Cruz"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Field
                id="donate-email"
                label="Email Address (for receipt)"
                type="email"
                placeholder="juan@gmail.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Btn
                type="submit"
                variant="dark"
                className="mt-6 w-full py-3"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "Redirecting…"
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Proceed to Payment
                  </>
                )}
              </Btn>
            </form>

            {status === "error" && (
              <p role="alert" className="mt-4 rounded-xl bg-crimson-soft px-4 py-3 text-[0.8rem] leading-relaxed text-crimson">
                {error}
              </p>
            )}

            <p className="mt-4 text-center text-[0.75rem] leading-relaxed text-navy/55">
              You'll choose GCash, Maya, card or bank transfer on the next screen. We'll email your
              receipt once payment clears.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <TransparencyNote />
        </div>
      </Container>
    </Reveal>
  );
}

/* ============================= Final CTA & Footer ============================= */

function FinalCTA({ onNavigate, onOpenModal }) {
  return (
    <Reveal as="div" className="border-t-2 border-primary bg-navy py-20 text-center text-white lg:py-24">
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
            <div className="mb-4 flex items-center gap-3">
              <img src={logoImg} alt="" className="h-12 w-12 object-contain" />
              <span className="text-[1.05rem] font-bold text-white">Síkat-Aurora Inc.</span>
            </div>
            <p className="mb-5 max-w-[34ch] text-[0.95rem] italic leading-[1.6] text-white/70">
              Ang pagsíkat ay nagsisimula sa pagkilos.
            </p>
            <p className="mb-5 max-w-[36ch] text-[0.82rem] leading-relaxed text-white/55">
              A youth-led nonprofit in Baler, Aurora — where the sun rises first.
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
              href="mailto:sikataurora@gmail.com"
              className="mb-4 inline-flex items-center gap-2 rounded-md text-[0.8rem] text-white/60 no-underline transition-colors duration-150 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> sikataurora@gmail.com
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

        <div className="border-t border-white/[0.06] pt-6 text-center text-xs text-white/50">
          <p>© 2026 Síkat-Aurora Inc. All rights reserved.</p>
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
  // Which sponsorship kit the donor picked, carried from Donate into Checkout
  const [checkoutKitId, setCheckoutKitId] = useState(null);

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

  const startCheckout = useCallback(
    (kitId) => {
      setCheckoutKitId(kitId);
      navigate("checkout");
    },
    [navigate]
  );

  // A direct link to #checkout has no kit behind it, so fall back to the catalog
  const checkoutKit = getKit(checkoutKitId);

  const pages = {
    home: <HomePage onNavigate={navigate} onOpenModal={openModal} />,
    about: <AboutPage onNavigate={navigate} onOpenModal={openModal} />,
    programs: <ProgramsPage onNavigate={navigate} onOpenModal={openModal} />,
    impact: <ImpactPage onNavigate={navigate} onOpenModal={openModal} />,
    leadership: <LeadershipPage onNavigate={navigate} onOpenModal={openModal} />,
    blog: <BlogPage onNavigate={navigate} onOpenModal={openModal} />,
    faq: <FAQPage onNavigate={navigate} onOpenModal={openModal} />,
    volunteer: <VolunteerPage onOpenModal={openModal} />,
    donate: <DonatePage onDonate={startCheckout} />,
    checkout: checkoutKit ? (
      <CheckoutPage kit={checkoutKit} onNavigate={navigate} />
    ) : (
      <DonatePage onDonate={startCheckout} />
    ),
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar activePage={activePage} onNavigate={navigate} onOpenModal={openModal} />

      <VolunteerModal isOpen={isVolunteerModalOpen} onClose={closeModal} />

      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, scale: 0.992 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.992 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {pages[activePage] ?? pages.home}
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={navigate} />
    </MotionConfig>
  );
}
