import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import { animate, createTimeline, stagger } from "animejs";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  HandCoins,
  HandHeart,
  Handshake,
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
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PHOTOS, PROGRAM_PHOTOS } from "@/lib/photos";
import { VOLUNTEERS, ROSTER_IS_EMPTY } from "@/lib/volunteers";
import { FORMER_COHORTS, FOUNDERS } from "@/lib/formerVolunteers";
import { LEADERS } from "@/lib/leaders";
import {
  POSTS,
  POST_CATEGORIES,
  formatPostDate,
  getPost,
  getPostBody,
  getPostAuthor,
  getRelatedPosts,
} from "@/lib/posts";
import { CASH_DONATIONS, FUNDING_TOTALS, FUNDING_AS_OF, TOTALS_PERIOD, formatPeso } from "@/lib/funding";
import { KITS, getKit } from "@/lib/kits";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { PhotoGallery } from "@/components/ui/gallery";
import { FaqSection } from "@/components/ui/faq-section";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Comp
      initial="hidden"
      whileInView={isReady ? "visible" : "hidden"}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Comp
      initial="hidden"
      whileInView={isReady ? "visible" : "hidden"}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
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

/* ============================= Input Sanitization & Validation ============================= */

function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>'"]/g, "")
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const BTN_VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  gold: "bg-gold text-navy-ink hover:bg-gold-bright",
  dark: "bg-navy text-white hover:bg-navy-ink",
  outline: "border-2 border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  onDark: "border-2 border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
  success: "bg-forest text-white",
};

// Rounded buttons match the brand's pill vocabulary; the lift on hover is small
// enough to read as feedback rather than decoration.
function Btn({ variant = "primary", className, children, to, href, onClick, ...props }) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.85rem] font-semibold no-underline",
    "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:pointer-events-none disabled:opacity-50",
    BTN_VARIANTS[variant],
    className
  );

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={(e) => {
          window.scrollTo({ top: 0 });
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
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
function Card({ as: Element = "div", className, interactive = true, children, to, onClick, ...props }) {
  const Component = to ? Link : Element;
  return (
    <Component
      to={to}
      onClick={(e) => {
        if (to) window.scrollTo({ top: 0 });
        if (onClick) onClick(e);
      }}
      className={cn(
        "rounded-2xl border border-navy/10 bg-white shadow-card no-underline",
        interactive &&
          "transition-all duration-200 ease-out-expo hover:-translate-y-1 hover:border-navy/15 hover:shadow-card-hover motion-reduce:hover:translate-y-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
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
                alt={p.alt || "Síkat-Aurora program photo"}
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
          className={cn("font-extrabold font-display", dark ? "text-white" : "text-navy")}
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
  const [ageGroup, setAgeGroup] = useState("15–17 years old");
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedParental, setAgreedParental] = useState(false);

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
    const form = e.currentTarget;
    const rawEmail = form.elements["vol-email"]?.value || "";
    const cleanEmail = sanitizeInput(rawEmail);

    if (!isValidEmail(cleanEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!agreedPrivacy) {
      alert("Please consent to the Privacy & Data Management Policy.");
      return;
    }

    if ((ageGroup === "15–17 years old" || ageGroup.includes("15–17") || ageGroup.includes("15–18")) && !agreedParental) {
      alert("Parent/guardian permission is required for applicants aged 15–17.");
      return;
    }

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
                  <select
                    id="vol-age"
                    className="form-select"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  >
                    <option value="15–17 years old">15–17 years old</option>
                    <option value="18–24 years old">18–24 years old</option>
                    <option value="25–30 years old">25–30 years old</option>
                  </select>
                </Field>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2.5 text-[0.8rem] leading-snug text-navy/80 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreedPrivacy}
                      onChange={(e) => setAgreedPrivacy(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-navy/20 text-primary focus:ring-primary shrink-0"
                    />
                    <span>
                      I have read the{" "}
                      <Link to="/privacy" target="_blank" className="font-semibold text-primary underline">
                        Privacy &amp; Data Management Policy
                      </Link>{" "}
                      and consent to the collection and use of my information for my volunteer application.
                    </span>
                  </label>

                  {(ageGroup === "15–17 years old" || ageGroup.includes("15–17") || ageGroup.includes("15–18")) && (
                    <label className="flex items-start gap-2.5 text-[0.8rem] leading-snug text-navy/80 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={agreedParental}
                        onChange={(e) => setAgreedParental(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-navy/20 text-primary focus:ring-primary shrink-0"
                      />
                      <span>
                        I confirm that I have permission from my parent or legal guardian to submit this application and participate in Síkat-Aurora activities.
                      </span>
                    </label>
                  )}
                </div>

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
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "programs", label: "Programs", path: "/programs" },
  { id: "impact", label: "Impact", path: "/impact" },
  { id: "leadership", label: "The Team", path: "/leadership" },
  { id: "blog", label: "Blog", path: "/blog" },
];

// Browser tab title. Nav labels are reused so the tab always matches the
// highlighted nav item; the rest are routes with no nav entry of their own.
const SITE_NAME = "Síkat-Aurora";
const PAGE_TITLES = {
  ...Object.fromEntries(NAV_ITEMS.map((item) => [item.id, item.label])),
  faq: "FAQ",
  privacy: "Privacy Policy & Security",
  terms: "Terms of Use",
  volunteer: "Volunteer",
  donate: "Donate",
  checkout: "Checkout",
};

function Navbar({ onOpenModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine which nav item is active based on the current path
  const activePath = location.pathname;
  const activeNavId = NAV_ITEMS.find(
    (item) => item.path === "/" ? activePath === "/" : activePath.startsWith(item.path)
  )?.id || "home";

  const go = (path) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo({ top: 0 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[999]">
      <nav
        aria-label="Main navigation"
        className="border-b border-navy/[0.08] bg-white/95 shadow-[0_4px_20px_rgba(13,31,45,0.04)] backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-9">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0 }); }}
            className="flex shrink-0 items-center gap-2.5 rounded-md no-underline"
          >
            <img src={logoImg} alt="Síkat-Aurora Logo" className="h-9 w-9 object-contain" />
            <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-navy">
              Síkat<span className="text-primary">-Aurora</span>
            </span>
          </Link>

          {/* Desktop nav — active page marked by a sliding underline rule */}
          <div className="relative hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNavId === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0 })}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-sm px-3.5 py-2 text-[0.82rem] no-underline transition-colors duration-200",
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
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Btn to="/volunteer" variant="outline" className="px-4 py-2 text-[0.8rem]">
              Volunteer
            </Btn>
            <Btn to="/donate" className="px-4 py-2 text-[0.8rem]">
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
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0 }); }}
                    aria-current={activeNavId === item.id ? "page" : undefined}
                    className={cn(
                      "block w-full border-l-2 px-4 py-2.5 text-left text-sm no-underline transition-colors duration-150",
                      activeNavId === item.id
                        ? "border-primary bg-primary-soft font-semibold text-primary"
                        : "border-transparent font-medium text-navy hover:border-navy/20 hover:bg-navy/5"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex gap-2.5 pt-3">
                  <Btn
                    to="/volunteer"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    Volunteer
                  </Btn>
                  <Btn
                    to="/donate"
                    className="flex-1"
                    onClick={() => setMobileOpen(false)}
                  >
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

function HomePage({ onNavigate, onOpenModal, onPlayVideo }) {
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
          description="A youth-led movement empowering 1,100+ children through literacy, books, and mentorship across Aurora — powered by volunteers and sponsors."
          ctaButton={{ text: "Become a Volunteer", onClick: onOpenModal }}
          secondaryCta={{ text: "Donate / Be a Sponsor", to: "/donate" }}
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
              volunteers rising together where the Philippine sun rises first.
            </p>
            <Btn to="/about" variant="dark">
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
            <Btn to="/impact" variant="onDark">
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
                      className="block text-[1.7rem] font-extrabold font-display leading-tight text-white"
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
            <Btn to="/programs">
              Explore All Programs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Btn>
          </div>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Abot Ko Ang Libro",
                center: "Education",
                img: coreAbklImg,
                desc: "Mobile library cart bringing books & storytelling to kids ages 2–14.",
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
              <StaggerItem key={p.name}>
                <Card
                  to="/programs"
                  className="group cursor-pointer overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <img
                      src={p.img}
                      alt={`${p.name} - ${p.center} core program in Aurora`}
                      className="h-52 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                      loading="lazy"
                    />
                  </div>
                  <div className="border-t border-navy/10 p-6">
                    <h3 className="text-[1.2rem] font-bold text-navy">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/75">{p.desc}</p>
                    <Tag className="mt-4 bg-primary-soft text-primary">{p.center}</Tag>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Reveal>

      {/* Photo gallery teaser */}
      <section className="bg-white">
        <PhotoGallery onViewAll={() => onNavigate("blog")} />
      </section>

      {/* Volunteer gallery */}
      <Reveal className="bg-cream py-16 lg:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Volunteer Action"
            title="Our Volunteers in Every Community"
            lead="Real moments captured across our 18 partner communities in the Province of Aurora."
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VOLUNTEER_VIDEOS.map((v) => (
              <VideoPlayer key={v.id} id={v.id} title={v.title} onPlay={onPlayVideo} />
            ))}
          </div>
        </Container>
      </Reveal>

      {/* FAQ */}
      <FaqSection
        className="bg-white"
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
    Icon: HandHeart,
    title: "Pagmamalasakit",
    desc: "Kumikilos nang may malasakit sa kapwa.",
    gloss: "We act with genuine care for one another.",
  },
  {
    Icon: Handshake,
    title: "Paggalang",
    desc: "Kumikilos nang may paggalang sa paniniwala, kultura, at saloobin ng mga kasapi at komunidad.",
    gloss: "We act with respect for the beliefs, culture, and views of our members and communities.",
  },
  {
    Icon: Sprout,
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

      {/* 3 — Values as three centred icon columns */}
      <Reveal className="bg-white py-16 lg:py-24">
        <Container className="max-w-5xl">
          <SectionHeading
            eyebrow="Our Values"
            title="Ang aming pinanghahawakan"
            align="center"
            className="mb-14"
          />
          <StaggerContainer as="dl" className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {VALUES.map((v) => (
              <StaggerItem key={v.title} className="group text-center">
                <span className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/25 text-primary transition-colors duration-200 group-hover:border-primary group-hover:bg-primary-soft">
                  <v.Icon className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <dt className="text-[1.15rem] font-bold tracking-[-0.01em] text-navy">{v.title}</dt>
                <dd>
                  <p className="mx-auto mt-2.5 max-w-[32ch] text-[0.92rem] leading-[1.6] text-navy/80">
                    {v.desc}
                  </p>
                  <p className="mx-auto mt-2 max-w-[32ch] text-[0.82rem] italic leading-relaxed text-navy/50">
                    {v.gloss}
                  </p>
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
                <Link
                  to="/programs"
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="group flex w-full items-center gap-6 border-b border-navy/15 py-7 text-left no-underline transition-all duration-200 hover:bg-cream/50 sm:px-4 sm:rounded-xl"
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
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-10">
            <Btn to="/programs">
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
            <Btn to="/faq" variant="outline">
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
      <Reveal className="bg-cream py-16 lg:py-24">
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
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.85rem] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark motion-reduce:hover:translate-y-0"
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
              PROGRAM_PHOTOS.abkl[0],
              PROGRAM_PHOTOS.abkl[1],
              PROGRAM_PHOTOS.abkl[2],
              PROGRAM_PHOTOS.abkp[0],
              PROGRAM_PHOTOS.abkp[1],
              PROGRAM_PHOTOS.abkp[2],
              PROGRAM_PHOTOS.abkp[3],
              PROGRAM_PHOTOS.hiraya[0],
              PROGRAM_PHOTOS.hiraya[1],
              PROGRAM_PHOTOS.hiraya[2],
            ]}
          />
        </Container>
      </Reveal>

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page 5: Leadership ============================= */

// PLACEHOLDER QUOTES. Names and roles come from the placeholder roster in
// lib/volunteers.js, so nobody real is being quoted — and the quotes are lorem
// ipsum rather than plausible English, so none of this can be mistaken for a
// genuine endorsement. Replace each `quote` once real volunteer interviews are
// collected, and point `name`/`designation` at the actual person.
const VOLUNTEER_VOICES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
].map((quote, i) => {
  // Use realistic names and roles
  const voices = [
    { name: "Patricia Reyes", designation: "Abot Ko Ang Libro Volunteer" },
    { name: "Joshua Cruz", designation: "Eco Mentor — Ang Batang Kali" },
    { name: "Bianca Santos", designation: "Project Coordinator — Hiraya" },
    { name: "Alvin Alcantara", designation: "Storytelling Facilitator" },
  ];
  const v = VOLUNTEERS[[0, 4, 8, 9][i]];
  return {
    quote,
    name: voices[i].name,
    designation: voices[i].designation,
    src: v.photo,
    alt: "Síkat-Aurora volunteer in the field",
  };
});

/* ---------------------------- Organisational chart ---------------------------- */

function OrgCard({ leader }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, scale: 0.96, y: 15 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className="group flex flex-col items-center text-center"
    >
      {/* Portrait slot — falls back to initials until a photo is added */}
      <div className="mx-auto mb-3 h-28 w-28 shrink-0 overflow-hidden rounded-full bg-primary-soft">
        {leader.photo ? (
          <img
            src={leader.photo}
            alt={leader.name || "Síkat-Aurora team leader"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[1.8rem] font-bold text-primary/45" aria-hidden="true">
              {leader.initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <h3 className="font-bold leading-snug text-navy text-[1rem]">
          {leader.name}
        </h3>
        <p className="mt-0.5 text-[0.68rem] font-bold uppercase tracking-[0.09em] text-primary">
          {leader.title}
        </p>
      </div>
    </motion.article>
  );
}

// Vertical rule joining one tier to the next
function OrgStem() {
  return (
    <motion.div
      variants={{
        hidden: { scaleY: 0, originY: 0 },
        visible: { scaleY: 1, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className="h-8 w-px shrink-0 bg-navy/20"
      aria-hidden="true"
    />
  );
}

function OrgChart() {
  const director = LEADERS.find((l) => l.tier === 0);
  const deputyDirector = LEADERS.find((l) => l.tier === 1);
  const directorate = LEADERS.filter((l) => l.tier === 2);

  return (
    <StaggerContainer stagger={0.08} delay={0.05} className="flex flex-col items-center">
      <div className="w-full max-w-xs">
        <OrgCard leader={director} />
      </div>

      <OrgStem />

      <div className="w-full max-w-xs">
        <OrgCard leader={deputyDirector} />
      </div>

      <OrgStem />

      <div className="relative w-full">
        {/* Horizontal rule spanning the centres of the first and last columns. */}
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.5, ease: "easeOut" } },
          }}
          className="absolute top-0 hidden h-px bg-navy/20 lg:block"
          style={{ left: "calc(12.5% - 0.5625rem)", right: "calc(12.5% - 0.5625rem)", originX: 0.5 }}
          aria-hidden="true"
        />

        <div className="grid gap-x-6 gap-y-12 pt-0 sm:grid-cols-2 lg:grid-cols-4 lg:pt-8">
          {directorate.map((l) => (
            <div key={l.name} className="relative flex flex-col items-center">
              {/* Stub dropping from the horizontal rule to this card */}
              <motion.div
                variants={{
                  hidden: { scaleY: 0, originY: 0 },
                  visible: { scaleY: 1, transition: { duration: 0.3, ease: "easeOut" } },
                }}
                className="absolute -top-8 left-1/2 hidden h-8 w-px bg-navy/20 lg:block"
                aria-hidden="true"
              />
              <OrgCard leader={l} />
              {l.deputy && (
                <>
                  <OrgStem />
                  <OrgCard leader={l.deputy} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </StaggerContainer>
  );
}

function LeadershipPage({ onNavigate, onOpenModal }) {
  return (
    <>
      <Reveal className="bg-white pb-16 pt-20 lg:pb-24 lg:pt-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Organizational Structure"
            title="The youth leaders driving the movement"
            lead="Meet the executive committee and directorate guiding volunteer initiatives across Aurora Province."
            className="mb-12"
          />

          <OrgChart />
        </Container>
      </Reveal>

      <VolunteerWall onOpenModal={onOpenModal} />

      <FormerVolunteers />

      {/* Volunteer experience, in their own words */}
      <Reveal className="bg-cream py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Volunteer Voices"
            title="What it's like on the ground"
            lead="Volunteers on what the work actually asks of them, and what they take home from it."
            align="center"
            className="mb-10"
          />
          <AnimatedTestimonials testimonials={VOLUNTEER_VOICES} autoplay />
        </Container>
      </Reveal>

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
            alt={volunteer.name ? `${volunteer.name} - ${volunteer.role || 'Síkat-Aurora volunteer'}` : "Síkat-Aurora volunteer"}
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

// Three rows off the same roster. Each starts at a different point in the list
// and runs at its own speed, so the rows never line up into visible columns.
const rotate = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)];
const MARQUEE_ROWS = [0, 1 / 3, 2 / 3].map((fraction, i) => ({
  volunteers: rotate(VOLUNTEERS, Math.floor(VOLUNTEERS.length * fraction)),
  reverse: i % 2 === 1,
  duration: [90, 104, 82][i],
}));

function MarqueeRow({ volunteers, reverse = false, hidden = false, duration = 90, onSelectPhoto }) {
  return (
    <div className="no-scrollbar overflow-x-auto" aria-hidden={hidden || undefined}>
      <div
        style={{ animationDuration: `${duration}s` }}
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
        {MARQUEE_ROWS.map((row, i) => (
          <MarqueeRow
            key={i}
            volunteers={row.volunteers}
            reverse={row.reverse}
            duration={row.duration}
            // Only the first row is read out — the rest repeat the same roster
            hidden={i > 0}
            onSelectPhoto={setSelectedPhoto}
          />
        ))}
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

// One collapsible cohort of alumni. Names flow across responsive columns,
// matching the roster layout used elsewhere on the page.

// Departments always read in this order: executive, then internal, external,
// finance & logistics, education, and creatives last. Within a department the
// Director comes before their Deputy.
const DEPARTMENT_ORDER = [/executive|founder/i, /internal/i, /external/i, /finance|logistics/i, /education/i, /creatives/i];
function roleRank(role = "") {
  const dept = DEPARTMENT_ORDER.findIndex((re) => re.test(role));
  const base = dept === -1 ? DEPARTMENT_ORDER.length : dept;
  return base * 2 + (/deputy/i.test(role) ? 1 : 0);
}

function FormerCohort({ cohort, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `term-${cohort.term.replace(/[^0-9]/g, "")}`;
  const members = [...cohort.members].sort((a, b) => roleRank(a.role) - roleRank(b.role));

  return (
    <div className="border-b border-navy/10">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-2.5 py-5 text-left text-[1.15rem] font-bold text-primary transition-colors duration-150 hover:text-primary/80"
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 transition-transform duration-300 ease-out-expo",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
          Executive Committee {cohort.term}
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="columns-1 gap-x-8 pb-7 sm:columns-2 lg:columns-3 [&>li]:break-inside-avoid">
              {members.map((member, i) => (
                <li key={`${member.name}-${i}`} className="pb-3.5 break-inside-avoid">
                  <p className="text-[1.05rem] font-semibold leading-snug text-navy">
                    {member.name}
                  </p>
                  {member.role && (
                    <p className="mt-0.5 text-[0.8rem] font-medium uppercase tracking-[0.015em] text-primary/80">
                      {member.role}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Color themes cycling through the signature colors of the Síkat-Aurora logo
const FOUNDER_CARD_BG = [
  { bg: "bg-[#BD0005]", text: "text-white", pattern: "stroke-white/25", hoverBg: "bg-[#BD0005]/95" }, // 0: RJ Belen (Crimson Red)
  { bg: "bg-[#EC670A]", text: "text-white", pattern: "stroke-white/25", hoverBg: "bg-[#EC670A]/95" }, // 1: Rachelle Ann Imperial (Primary Orange)
  { bg: "bg-[#9DD4F2]", text: "text-navy", pattern: "stroke-navy/25", hoverBg: "bg-[#9DD4F2]/95" },   // 2: Reaiah Codiapit (Sky Blue)
  { bg: "bg-[#006B1E]", text: "text-white", pattern: "stroke-white/25", hoverBg: "bg-[#006B1E]/95" }, // 3: Crystal Lei Pena (Forest Green)
  { bg: "bg-[#FBC21B]", text: "text-navy", pattern: "stroke-navy/25", hoverBg: "bg-[#FBC21B]/95" },  // 4: Geraldine Guerrero (Sun Gold)
  { bg: "bg-[#1D4A6F]", text: "text-white", pattern: "stroke-white/25", hoverBg: "bg-[#1D4A6F]/95" }, // 5: Julie May Pecson (Deep Navy)
  { bg: "bg-[#BD0005]", text: "text-white", pattern: "stroke-white/25", hoverBg: "bg-[#BD0005]/95" }, // 6: Ryan Angelo Caliwag (Crimson Red)
];

function FounderCard({ founder, index }) {
  const theme = FOUNDER_CARD_BG[index % FOUNDER_CARD_BG.length];
  const bioText =
    founder.bio ||
    `Co-founder of Síkat-Aurora; youth leader championing educational development and community empowerment across Aurora Province.`;

  return (
    <div className="group flex w-full flex-col items-center text-center">
      {/* Smaller Rounded Rectangular Card */}
      <div
        className={cn(
          "relative aspect-[4/4.2] w-full overflow-hidden rounded-xl shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md",
          theme.bg
        )}
      >
        {/* Organic Fingerprint / Wave SVG Line Pattern */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-35"
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -20 110 C 20 40, 180 40, 220 110 C 180 180, 20 180, -20 110"
            className={theme.pattern}
            strokeWidth="3"
          />
          <path
            d="M -40 110 C 10 20, 190 20, 240 110 C 190 200, 10 200, -40 110"
            className={theme.pattern}
            strokeWidth="2.5"
          />
          <path
            d="M 0 110 C 30 60, 170 60, 200 110 C 170 160, 30 160, 0 110"
            className={theme.pattern}
            strokeWidth="2"
          />
          <circle cx="100" cy="110" r="35" className={theme.pattern} strokeWidth="2" />
          <circle cx="100" cy="110" r="65" className={theme.pattern} strokeWidth="2" />
          <circle cx="100" cy="110" r="95" className={theme.pattern} strokeWidth="2" />
        </svg>

        {/* Photo (clean, 100% visible in normal state) */}
        {founder.photo ? (
          <img
            src={founder.photo}
            alt={founder.name}
            loading="lazy"
            className="relative z-10 h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
        ) : (
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-3 text-center">
            <span className={cn("text-2xl font-extrabold tracking-wider opacity-90", theme.text)}>
              {founder.initials}
            </span>
          </div>
        )}

        {/* Hover Bio / Description Overlay */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col justify-center p-3 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            theme.hoverBg
          )}
        >
          <p className={cn("text-[0.68rem] font-semibold leading-tight drop-shadow-sm", theme.text)}>
            {bioText}
          </p>
        </div>
      </div>

      {/* Label under card */}
      <div className="mt-2.5 flex flex-col items-center text-center">
        {founder.role && (
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.06em] text-navy/70">
            {founder.role}
          </p>
        )}
        <h4 className="mt-0.5 text-[0.88rem] font-bold leading-tight text-navy">
          {founder.name}
        </h4>
      </div>
    </div>
  );
}

// Past leadership, grouped by term year, shown as collapsible lists.
function FormerVolunteers() {
  return (
    <Reveal className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Past Leadership"
          title="The leaders who stepped up before"
          lead="The former executives and directors who steered Síkat-Aurora in earlier terms and paved the way for the team leading it today."
          className="mb-12"
        />

        {FOUNDERS.length > 0 && (
          <div className="mb-16 text-center">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {FOUNDERS.map((founder, i) => (
                <FounderCard key={`${founder.name}-${i}`} founder={founder} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-navy/10 pt-4">
          {FORMER_COHORTS.map((cohort, i) => (
            <FormerCohort key={cohort.term} cohort={cohort} defaultOpen={i === 0} />
          ))}
        </div>
      </Container>
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
    <Card as="article" className="group flex flex-col overflow-hidden !rounded-xl">
      <Link to={`/blog/${post.slug}`} className="flex flex-1 flex-col no-underline">
        <div className="overflow-hidden">
          <img
            src={post.img}
            alt={post.title ? `Story feature photo for ${post.title}` : "Síkat-Aurora story photo"}
            loading="lazy"
            className="h-40 w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-[1.02rem] font-bold leading-snug text-navy transition-colors duration-200 group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-3.5 mt-2 flex-1 text-[0.82rem] leading-[1.7] text-navy/70">{post.excerpt}</p>
          <div className="mt-auto flex flex-wrap items-center gap-2.5">
            <PostMeta post={post} />
          </div>
        </div>
      </Link>
    </Card>
  );
}

/* ============================= Page 11: Article ============================= */

function PostPage({ post, onNavigate, onOpenModal }) {
  const body = getPostBody(post);
  const related = getRelatedPosts(post);
  const author = getPostAuthor(post);

  return (
    <>
      {/* No scroll-reveal anywhere on this page — long-form text that fades in
          as you scroll fights the reading rather than decorating it */}
      <article>
        {/* Masthead */}
        <section className="bg-white pb-10 pt-20 lg:pt-24">
          <Container className="max-w-3xl">
            <Link
              to="/blog"
              onClick={() => window.scrollTo({ top: 0 })}
              className="mb-7 inline-flex items-center gap-1.5 rounded-md text-[0.82rem] font-semibold text-navy/70 no-underline transition-colors duration-150 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All stories
            </Link>

            <h1 className="text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[2.6rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-[1.05rem] leading-[1.7] text-navy/75">{post.excerpt}</p>

            {/* Byline — avatar, writer, then the date and read time beneath */}
            <div className="mt-7 flex items-center gap-3 border-t border-navy/10 pt-6">
              <img
                src={author.avatar}
                alt={author.name ? `Portrait of author ${author.name}` : "Author portrait"}
                className="h-11 w-11 shrink-0 rounded-full border border-navy/10 bg-cream object-contain"
              />
              <div className="min-w-0">
                <p className="text-[0.9rem] font-semibold leading-tight text-navy">{author.name}</p>
                {author.role && (
                  <p className="mt-0.5 text-[0.78rem] leading-tight text-navy/55">{author.role}</p>
                )}
              </div>
              <PostMeta post={post} className="ml-auto shrink-0" />
            </div>
          </Container>
        </section>

        {/* max-w-3xl matches the masthead and body containers, so the photo
            lines up with the text rather than bleeding wider than it */}
        <Container className="max-w-3xl">
          <img
            src={post.img}
            alt={post.title ? `Main article photo for ${post.title}` : "Síkat-Aurora story main photo"}
            className="h-64 w-full rounded-2xl object-cover sm:h-[26rem]"
          />
        </Container>

        {/* Body shares the masthead's max-w-3xl column so the photo, heading and
            text all line up. At ~76 characters the measure is still readable. */}
        <section className="bg-white pb-16 pt-12 lg:pb-24">
          <Container className="max-w-3xl">
            <div>
              {body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="mt-11 text-[1.35rem] font-bold leading-snug text-navy sm:text-[1.5rem]"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="my-9 border-l-2 border-gold pl-6 text-[1.15rem] italic leading-[1.7] text-navy/80"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return (
                  <p key={i} className="mt-5 text-[1.02rem] leading-[1.85] text-navy/80">
                    {block.text}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 border-t border-navy/10 pt-8">
              <Btn to="/blog" variant="outline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all stories
              </Btn>
            </div>
          </Container>
        </section>
      </article>

      {related.length > 0 && (
        <section className="bg-cream py-14 lg:py-20">
          <Container>
            <SectionHeading eyebrow="Keep Reading" title="More from the field" className="mb-8" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
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
            className="group grid gap-8 no-underline lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={featured.img}
                alt={featured.title ? `Featured Kwentong Síkat story: ${featured.title}` : "Featured Síkat-Aurora story photo"}
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

          <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

function VideoModal({ videoId, onClose }) {
  useEffect(() => {
    if (!videoId) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoId, onClose]);

  return (
    <AnimatePresence>
      {videoId && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-black shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-3 sm:top-3 sm:z-10"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function VideoPlayer({ id, title, onPlay }) {
  return (
    <div
      onClick={() => onPlay(id)}
      className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-navy/10 shadow-md"
    >
      <img
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt={`Video thumbnail: ${title}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-navy/10 transition-colors duration-300 group-hover:bg-navy/20" />
      
      {/* Custom Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-6 w-6 fill-white text-white" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

const VOLUNTEER_VIDEOS = [
  {
    id: "VfFF8cfnS5Q",
    title: "Síkat-Aurora Volunteer Video 1",
  },
  {
    id: "OKwnViJL_jY",
    title: "Síkat-Aurora Volunteer Video 2",
  },
  {
    id: "9S3pdY9bhx0",
    title: "Síkat-Aurora Volunteer Video 3",
  },
  {
    id: "2VhrjEVrKnM",
    title: "Síkat-Aurora Volunteer Video 4",
  },
  {
    id: "uDG1b6XAFSY",
    title: "Síkat-Aurora Volunteer Video 5",
  },
];

/* ============================= Anime.js Section Wrapper ============================= */

function AnimeSection({ className, children, selector = ".anime-target", delayFactor = 100 }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Set initial target opacity to zero to prevent layout flash before animation triggers
    const targets = el.querySelectorAll(selector);
    targets.forEach((t) => {
      t.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (targets.length > 0) {
              animate(targets, {
                translateY: [45, 0],
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 950,
                delay: stagger(delayFactor),
                ease: "outExpo",
              });
            } else {
              animate(el, {
                translateY: [35, 0],
                opacity: [0, 1],
                duration: 850,
                ease: "outExpo",
              });
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [selector, delayFactor]);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}

function VolunteerPage({ onNavigate, onOpenModal, onPlayVideo }) {
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

  const pillars = [
    {
      title: "Free Admission",
      desc: "Open to all youth aged 15–30 in Aurora Province with no registration fees.",
      img: PHOTOS.communityOutreach,
    },
    {
      title: "Direct Impact",
      desc: "Work directly with kids, rivers, and schools in your local community.",
      img: PHOTOS.abkpRiverCleanup,
    },
    {
      title: "Leadership Growth",
      desc: "Build real credentials, organize events, and manage community projects.",
      img: PHOTOS.hirayaWorkshop,
    },
    {
      title: "Lifelong Community",
      desc: "Join a family of 400+ passionate volunteers who lift each other up.",
      img: PHOTOS.volunteersGroup,
    },
  ];

  return (
    <>
      {/* Why volunteer */}
      <AnimeSection className="bg-white pb-16 pt-20 lg:pb-20 lg:pt-24" selector=".anime-pillar" delayFactor={120}>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Join the Youth Corps"
            title="Step Up. Teach. Transform Lives in Aurora."
            lead="Your time, passion, and heart can unlock a child's future. Join over 400 youth volunteers creating real educational change across 18 partner communities."
            className="mb-10 anime-pillar"
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ title, desc, img }) => (
              <div key={title} className="anime-pillar border-t border-navy/15 pt-6 will-change-transform">
                <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy/10 shadow-sm">
                  <img
                    src={img}
                    alt={`Síkat-Aurora volunteer pillar - ${title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out-expo hover:scale-[1.04]"
                  />
                </div>
                <h3 className="text-[1.15rem] font-bold text-navy">{title}</h3>
                <p className="mt-2.5 text-[0.85rem] leading-[1.7] text-navy/75">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </AnimeSection>

      {/* Volunteer gallery */}
      <AnimeSection className="bg-cream py-16 lg:py-20" selector=".anime-video" delayFactor={140}>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Volunteer Action"
            title="Our Volunteers in Every Community"
            lead="Real moments captured across our 18 partner communities in the Province of Aurora."
            className="mb-10 anime-video"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VOLUNTEER_VIDEOS.map((v) => (
              <div key={v.id} className="anime-video will-change-transform">
                <VideoPlayer id={v.id} title={v.title} onPlay={onPlayVideo} />
              </div>
            ))}
          </div>
        </Container>
      </AnimeSection>

      {/* Onboarding steps */}
      <AnimeSection className="bg-white py-16 lg:py-20" selector=".anime-step" delayFactor={150}>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Simple Onboarding"
            title="3 Simple Steps to Join Our Volunteer Corps"
            className="mb-10 anime-step"
          />
          {/* Numbered sequence — the rule above each step reads as a progress track */}
          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.num} className="anime-step list-none border-t-2 border-primary/25 pt-6 will-change-transform">
                <p className="text-[1.5rem] font-bold leading-none text-primary">{s.num}</p>
                <h3 className="mt-3 text-[1.2rem] font-bold text-navy">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-navy/75">{s.desc}</p>
              </li>
            ))}
          </ol>

          <div className="anime-step mt-14 text-center">
            <Btn onClick={onOpenModal} className="px-8">
              Open Volunteer Application Form
            </Btn>
          </div>
        </Container>
      </AnimeSection>

      {/* Final CTA */}
      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
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
            100% Transparent. Every Peso Accounted For.
          </h3>
          <p className="mt-3.5 max-w-[50ch] text-[0.88rem] leading-relaxed text-white/70">
            We publish our complete financial ledger publicly. 100% of your sponsorship goes directly toward community learning materials, volunteer literacy cart operations, and student kits.
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
  return (
    <Reveal className="bg-cream pb-16 pt-20 lg:pb-20 lg:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Where Your Gift Goes"
          title="Sponsorship Equivalents"
          lead="Every kit below is a real bundle we hand out in the field. Pick one and we'll tell you exactly which batch it reached."
          className="mb-10"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KITS.map((kit) => (
            <StaggerItem key={kit.id} className="h-full">
              <KitCard kit={kit} onDonate={onDonate} />
            </StaggerItem>
          ))}
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
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);

    if (!isValidEmail(cleanEmail)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch(PAYMONGO_CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kitId: kit.id, quantity: qty, name: cleanName, email: cleanEmail }),
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
        <Link
          to="/donate"
          onClick={() => window.scrollTo({ top: 0 })}
          className="mb-7 inline-flex items-center gap-1.5 rounded-md text-[0.82rem] font-semibold text-navy/70 no-underline transition-colors duration-150 hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Change kit selection
        </Link>

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

            <p className="mt-4 text-center text-[0.78rem] font-medium leading-relaxed text-navy/70">
              🔒 <strong>PCI DSS Compliant Checkout:</strong> Payment choice (GCash, Maya, card, bank transfer) happens securely on PayMongo's PCI DSS certified portal. Síkat-Aurora never touches or stores your card or banking credentials.
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
          Handa ka na bang sumíkat at maglingkod kasama namin?
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-sm leading-[1.75] text-white/70 sm:text-[0.95rem]">
          Join over 400 youth volunteers and visionaries across Baler and Aurora Province in empowering the next generation of learners.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn onClick={onOpenModal} className="px-8">
            Become a Volunteer
          </Btn>
          <Btn to="/donate" variant="onDark" className="px-8">
            Fuel Our Cause / Sponsor
          </Btn>
        </div>
      </Container>
    </Reveal>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0 })}
      className="rounded-md p-0 text-left text-[0.8rem] text-white/60 no-underline transition-colors duration-150 hover:text-white"
    >
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-7 pt-16 text-white/60 md:px-9">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={logoImg} alt="Síkat-Aurora Logo" className="h-12 w-12 object-contain" />
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
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/programs">Core Programs</FooterLink></li>
              <li><FooterLink to="/impact">Impact &amp; Awards</FooterLink></li>
              <li><FooterLink to="/leadership">The Team</FooterLink></li>
              <li><FooterLink to="/blog">Blog — Kwentong Síkat</FooterLink></li>
              <li><FooterLink to="/faq">FAQ</FooterLink></li>
            </ul>
          </nav>

          <nav aria-label="Footer — get involved">
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/90">Get Involved</h4>
            <ul className="flex list-none flex-col gap-2 p-0">
              <li><FooterLink to="/volunteer">Become a Volunteer</FooterLink></li>
              <li><FooterLink to="/donate">Donate</FooterLink></li>
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
              <a
                href="https://www.tiktok.com/@sikataurora"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white no-underline transition-colors duration-150 hover:bg-white/[0.12]"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Síkat-Aurora Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <FooterLink to="/privacy">Privacy Policy &amp; Data Security</FooterLink>
            <FooterLink to="/terms">Terms of Use</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================= Page: Privacy & Security ============================= */

function PrivacyPage({ onNavigate, onOpenModal }) {
  return (
    <>
      <PageHeader
        eyebrow="Data Protection & Compliance"
        title="Privacy & Data Management Policy"
        subtitle="Effective Date: July 23, 2026 | Last Updated: July 23, 2026"
      />

      <section className="bg-white py-16 lg:py-24 font-sans text-navy/80">
        <Container className="max-w-4xl space-y-10">
          <div className="space-y-4">
            <p className="text-base leading-relaxed sm:text-lg text-navy font-medium">
              Síkat-Aurora Inc. respects your privacy and is committed to handling personal information responsibly, securely, and transparently.
            </p>
            <p className="text-sm leading-relaxed sm:text-base">
              This Privacy &amp; Data Management Policy explains what information we collect through our website and activities, why we collect it, how we use and protect it, and how you may exercise your rights under Republic Act No. 10173, otherwise known as the Data Privacy Act of 2012.
            </p>
          </div>

          <div className="space-y-10">
            {/* 1. Information We Collect */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-navy">1. Information We Collect</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                We collect only the information reasonably necessary to manage our programs, volunteer activities, donations, communications, and community documentation.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-base font-bold text-navy">Volunteer Applications</h3>
                <p className="text-sm leading-relaxed sm:text-base">When you apply or signify interest as a volunteer, we may collect:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Mobile number</li>
                  <li>Age or age group</li>
                  <li>Preferred program</li>
                  <li>Availability, skills, interests, or location</li>
                  <li>Parent or guardian information when required</li>
                  <li>Attendance, training, and activity participation records</li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-navy">Donation and Sponsorship Information</h3>
                <p className="text-sm leading-relaxed sm:text-base">When you donate or sponsor a program, we may collect:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Selected sponsorship kit or program</li>
                  <li>Donation amount and quantity</li>
                  <li>Payment status and transaction reference</li>
                  <li>Information needed to issue a confirmation or receipt</li>
                </ul>
                <p className="text-sm leading-relaxed sm:text-base pt-1">
                  Síkat-Aurora Inc. does not directly collect or store credit card numbers, CVVs, electronic-wallet PINs, one-time passwords, bank passwords, or similar financial credentials.
                </p>
                <p className="text-sm leading-relaxed sm:text-base">
                  When online payments become available, payment information will be processed through PayMongo or another authorized third-party payment provider under that provider’s own privacy and security policies.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-navy">Communications</h3>
                <p className="text-sm leading-relaxed sm:text-base">
                  When you contact us through email, social media, forms, or other channels, we may collect your name, contact information, message, attachments, and any information needed to respond to your concern.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-navy">Website and Technical Information</h3>
                <p className="text-sm leading-relaxed sm:text-base">
                  Our website and hosting providers may automatically process limited technical information, such as:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                  <li>Internet Protocol address</li>
                  <li>Browser and device type</li>
                  <li>Date and time of access</li>
                  <li>Pages visited</li>
                  <li>Referring website</li>
                  <li>Security and error logs</li>
                </ul>
                <p className="text-sm leading-relaxed sm:text-base pt-1">
                  This information may be used to maintain website security, identify technical problems, and understand general website usage.
                </p>
              </div>
            </div>

            {/* 2. Why We Process Personal Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">2. Why We Process Personal Information</h2>
              <p className="text-sm leading-relaxed sm:text-base">We may use personal information to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Review and respond to volunteer applications</li>
                <li>Coordinate orientations, programs, and community activities</li>
                <li>Communicate with volunteers, donors, partners, and participants</li>
                <li>Verify age, eligibility, permission, or participation requirements</li>
                <li>Process and document donations and sponsorships</li>
                <li>Issue donation confirmations or receipts</li>
                <li>Maintain attendance and organizational records</li>
                <li>Document and report program activities and impact</li>
                <li>Respond to questions, complaints, and privacy requests</li>
                <li>Protect children, participants, volunteers, and partner communities</li>
                <li>Maintain the security and functionality of the website</li>
                <li>Comply with legal, accounting, regulatory, and organizational requirements</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                We will not use personal information for purposes that are incompatible with the reason it was originally collected without providing appropriate notice or obtaining additional consent when required.
              </p>
            </div>

            {/* 3. Lawful Basis for Processing */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">3. Lawful Basis for Processing</h2>
              <p className="text-sm leading-relaxed sm:text-base">Depending on the situation, we may process personal information based on:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Your consent</li>
                <li>Steps taken at your request, such as reviewing a volunteer application</li>
                <li>The performance of an agreement or organizational commitment</li>
                <li>Compliance with a legal obligation</li>
                <li>Protection of the vital interests and safety of participants</li>
                <li>The legitimate interests of Síkat-Aurora Inc., provided these do not override the rights and freedoms of the individual</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Age and other information classified as sensitive personal information will be handled only when necessary and with the appropriate lawful basis.
              </p>
            </div>

            {/* 4. Children and Young Participants */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">4. Children and Young Participants</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. works with children and young people. We recognize that information concerning minors requires additional care and protection.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Applicants below 18 years old may be required to provide permission from a parent or legal guardian before joining an activity or submitting additional personal information.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                We limit the personal information collected from children to what is necessary for participation, safety, program implementation, documentation, and reporting.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                We do not intentionally publish a child’s home address, personal contact information, school records, medical information, or other details that may expose the child to unnecessary risk.
              </p>
            </div>

            {/* 5. Photographs and Videos of Children */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">5. Photographs and Videos of Children</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                All identifiable photographs and videos of children published by Síkat-Aurora Inc. are used only after appropriate consent has been obtained from a parent or legal guardian, or after an authorized partner school, community organization, or institution has confirmed that the required consent was secured.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">Photographs and videos may be used for:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Program documentation</li>
                <li>Accomplishment and transparency reports</li>
                <li>Educational materials</li>
                <li>Organizational publications</li>
                <li>Social-media and website updates</li>
                <li>Volunteer and partner recognition</li>
                <li>Fundraising and community-awareness activities</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Síkat-Aurora Inc. aims to portray every child respectfully, safely, and with dignity. We will not intentionally publish content that humiliates, exploits, discriminates against, or creates an unreasonable safety risk for a child.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Where consent cannot be verified, identifiable photographs or videos of the child should not be published.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                A parent, legal guardian, or authorized representative may request the review or removal of a child’s photograph or video by emailing <a href="mailto:sikataurora@gmail.com" className="text-primary underline">sikataurora@gmail.com</a> and providing enough information to identify the content.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Removal requests will be reviewed promptly. We will make reasonable efforts to remove the content from platforms under our control, although previously shared or independently copied content may remain outside our direct control.
              </p>
            </div>

            {/* 6. Sharing of Personal Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">6. Sharing of Personal Information</h2>
              <p className="text-sm leading-relaxed sm:text-base">We do not sell, rent, or trade personal information.</p>
              <p className="text-sm leading-relaxed sm:text-base">We may share limited information only when reasonably necessary with:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Authorized officers, staff members, or volunteers</li>
                <li>Partner schools, barangays, organizations, or program coordinators</li>
                <li>Website, database, cloud-storage, email, and hosting providers</li>
                <li>Payment processors when online donations are available</li>
                <li>Accountants, auditors, or authorized professional advisers</li>
                <li>Government agencies or authorities when required by law</li>
                <li>Emergency responders when necessary to protect someone’s health or safety</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Anyone given access to nonpublic personal information must handle it confidentially and only for the authorized purpose.
              </p>
            </div>

            {/* 7. Data Retention */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">7. Data Retention</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                We retain personal information only for as long as reasonably necessary for the purpose for which it was collected.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">As a general guide:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Unsuccessful or inactive volunteer applications may be retained for up to 12 months</li>
                <li>Active volunteer and participation records may be retained during the volunteer’s involvement and for up to three years afterward</li>
                <li>General inquiries may be retained for up to two years after resolution</li>
                <li>Donation and accounting records may be retained for the period required by applicable accounting, tax, audit, and nonprofit regulations</li>
                <li>Media-consent and program-documentation records may be retained while the related photographs, videos, reports, or publications remain in legitimate organizational use</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Information may be retained longer when necessary for legal claims, safeguarding concerns, investigations, audits, or compliance with law.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                When information is no longer needed, we will take reasonable steps to securely delete, anonymize, or dispose of it.
              </p>
            </div>

            {/* 8. Data Security */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">8. Data Security</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. uses reasonable organizational, physical, and technical safeguards appropriate to the nature of the information being processed.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">These may include:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Restricting access to authorized individuals</li>
                <li>Using password-protected accounts and systems</li>
                <li>Using HTTPS encryption for website communications</li>
                <li>Limiting the information collected through forms</li>
                <li>Reviewing access to organizational files and accounts</li>
                <li>Maintaining confidentiality obligations</li>
                <li>Using trusted hosting, database, and payment providers</li>
                <li>Responding to suspected security incidents and data breaches</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                No online system can be guaranteed to be completely secure. However, we will take reasonable steps to prevent unauthorized access, loss, alteration, misuse, or disclosure.
              </p>
            </div>

            {/* 9. Third-Party Services */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">9. Third-Party Services</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Our website may connect to or contain content from services such as:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>PayMongo</li>
                <li>Vercel</li>
                <li>Supabase</li>
                <li>YouTube</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>TikTok</li>
                <li>Google services</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                These providers may independently process technical, account, or transaction information under their own terms and privacy policies.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Following an external link or interacting with embedded content may allow the third-party provider to collect information about your device or activity.
              </p>
            </div>

            {/* 10. Your Data Privacy Rights */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">10. Your Data Privacy Rights</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Subject to the Data Privacy Act of 2012 and applicable limitations, you may have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Be informed about the processing of your personal information</li>
                <li>Request access to personal information held about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Object to certain types of processing</li>
                <li>Withdraw consent when processing is based on consent</li>
                <li>Request deletion, erasure, or blocking when legally appropriate</li>
                <li>Request data portability when applicable</li>
                <li>File a complaint with the National Privacy Commission</li>
                <li>Seek compensation when you have suffered damage due to unlawful processing</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Withdrawing consent will not invalidate processing that was lawfully performed before the withdrawal.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Some information may need to be retained despite a deletion request when required by law, necessary for safeguarding, or needed to establish or defend legal claims.
              </p>
            </div>

            {/* 11. Privacy Requests */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">11. Privacy Requests</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                To request access, correction, withdrawal of consent, removal of a photograph, or deletion of personal information, contact:
              </p>
              <div className="mt-2 text-sm leading-relaxed sm:text-base">
                <p className="font-semibold text-navy">Síkat-Aurora Inc.</p>
                <p>Baler, Aurora, Philippines</p>
                <p>Email: <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a></p>
              </div>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Please provide sufficient information for us to verify your identity and locate the relevant record. We may request additional verification to protect the information from unauthorized disclosure.
              </p>
            </div>

            {/* 12. Changes to This Policy */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">12. Changes to This Policy</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                We may update this Privacy &amp; Data Management Policy when our programs, website features, service providers, data practices, or legal obligations change.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                The updated policy will be published on this page with a revised “Last Updated” date.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Page: Terms of Use ============================= */

function TermsPage({ onNavigate, onOpenModal }) {
  return (
    <>
      <PageHeader
        eyebrow="Legal &amp; Organizational Policies"
        title="Terms of Use"
        subtitle="Effective Date: July 23, 2026 | Last Updated: July 23, 2026"
      />

      <section className="bg-white py-16 lg:py-24 font-sans text-navy/80">
        <Container className="max-w-4xl space-y-10">
          <div className="space-y-4">
            <p className="text-base leading-relaxed sm:text-lg text-navy font-medium">
              Welcome to the official website of Síkat-Aurora Inc.
            </p>
            <p className="text-sm leading-relaxed sm:text-base">
              These Terms of Use govern your access to and use of the Síkat-Aurora Inc. website, including its pages, articles, photographs, videos, volunteer forms, donation features, and other content or services made available through the website.
            </p>
            <p className="text-sm leading-relaxed sm:text-base">
              By accessing or using this website, submitting a form, or making a donation through the website, you acknowledge that you have read and agree to these Terms of Use and our{" "}
              <Link to="/privacy" className="text-primary font-semibold underline">
                Privacy &amp; Data Management Policy
              </Link>.
            </p>
            <p className="text-sm leading-relaxed sm:text-base">
              If you do not agree with these Terms, please discontinue your use of the website.
            </p>
          </div>

          <div className="space-y-10">
            {/* 1. About Síkat-Aurora Inc. */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">1. About Síkat-Aurora Inc.</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. is a youth-led and youth-serving nonprofit organization based in Baler, Aurora, Philippines.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                The website provides information about the organization’s programs, activities, impact, volunteers, partnerships, donation initiatives, community stories, and opportunities to participate.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Information published on the website is provided primarily for public awareness, volunteer engagement, community education, fundraising, documentation, and organizational transparency.
              </p>
            </div>

            {/* 2. Permitted Use of the Website */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">2. Permitted Use of the Website</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                You may use the website for lawful, personal, educational, and noncommercial purposes, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Learning about Síkat-Aurora Inc. and its programs</li>
                <li>Reading organizational news, reports, and community stories</li>
                <li>Applying or signifying interest as a volunteer</li>
                <li>Contacting the organization</li>
                <li>Making a donation or sponsoring a program</li>
                <li>Sharing official website links through social media or other platforms</li>
                <li>Accessing publicly available organizational resources</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Your use of the website must not interfere with its security, operation, accessibility, or the rights and safety of Síkat-Aurora Inc., its volunteers, program participants, partners, donors, or community members.
              </p>
            </div>

            {/* 3. Prohibited Activities */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">3. Prohibited Activities</h2>
              <p className="text-sm leading-relaxed sm:text-base">You may not use the website to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Violate any Philippine law or applicable regulation</li>
                <li>Submit false, misleading, fraudulent, or incomplete information</li>
                <li>Impersonate another person, volunteer, partner, donor, or representative of Síkat-Aurora Inc.</li>
                <li>Attempt to gain unauthorized access to the website, database, forms, accounts, or administrative systems</li>
                <li>Introduce malware, harmful code, automated attacks, or other materials that may damage the website</li>
                <li>Scrape, harvest, or collect names, contact details, images, or other personal information from the website</li>
                <li>Misuse information about children, learners, volunteers, donors, or partner communities</li>
                <li>Copy or use the Síkat-Aurora name, logo, branding, or materials in a way that falsely suggests endorsement or partnership</li>
                <li>Alter, manipulate, or misrepresent photographs, videos, statements, reports, or other organizational content</li>
                <li>Use website content for harassment, discrimination, exploitation, misinformation, or unlawful commercial activity</li>
                <li>Circumvent any security, access, copyright, or privacy protection implemented on the website</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Síkat-Aurora Inc. may restrict access, preserve relevant records, and report suspected unlawful activity to the appropriate authorities.
              </p>
            </div>

            {/* 4. Volunteer Applications */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">4. Volunteer Applications</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Submitting a volunteer application or interest form does not automatically guarantee membership, acceptance, placement, participation, or assignment to a specific program or activity.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">Volunteer applications may be reviewed based on:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Age and eligibility requirements</li>
                <li>Program needs and available opportunities</li>
                <li>Location and availability</li>
                <li>Completion of orientations or required training</li>
                <li>Safeguarding and community-protection requirements</li>
                <li>Compliance with organizational principles, policies, and codes of conduct</li>
                <li>The safety and best interests of learners and partner communities</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Applicants must provide accurate and current information.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Applicants who are below 18 years old may be required to obtain permission from a parent or legal guardian before participating in an activity.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Accepted volunteers may be required to follow additional volunteer agreements, safeguarding policies, confidentiality requirements, event guidelines, and codes of conduct. Those additional policies form part of the conditions of participation.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. reserves the right to decline, suspend, remove, or reassign a volunteer when reasonably necessary for safety, program integrity, organizational needs, misconduct, policy violations, or the protection of participants.
              </p>
            </div>

            {/* 5. Donations and Sponsorships */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">5. Donations and Sponsorships</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Donations made to Síkat-Aurora Inc. are voluntary and are intended to support its nonprofit programs, community activities, learners, volunteers, and organizational operations.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                When you select a donation kit, sponsorship option, or specific program, Síkat-Aurora Inc. will make reasonable efforts to use the donation for the stated purpose.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                However, actual community needs, availability of materials, supplier prices, program schedules, emergencies, and operational circumstances may change. Síkat-Aurora Inc. may therefore substitute items or redirect funds to a closely related program need when reasonably necessary to preserve the intended charitable purpose of the donation.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                A sponsorship kit shown on the website represents the type of support funded by the corresponding donation. It does not necessarily mean that the donor is purchasing a specific physical product or that a particular item will be delivered to the donor.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Reasonable payment-processing, banking, administrative, transportation, documentation, and program-delivery costs may be deducted when necessary to implement the relevant activity.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. may provide donation acknowledgments, transaction confirmations, or receipts when available. These documents should not be treated as confirmation of tax deductibility unless expressly stated.
              </p>
            </div>

            {/* 6. Payment Processing */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">6. Payment Processing</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                When online payment becomes available, payments may be processed by PayMongo or another authorized third-party payment provider.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                The payment provider may independently collect and process information required to complete the transaction, such as payment-method details, transaction information, device information, and identity-verification data.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. does not directly request or store credit card numbers, CVVs, electronic-wallet PINs, one-time passwords, bank passwords, or similar financial credentials through its website.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">You are responsible for ensuring that:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>The payment information you provide is accurate</li>
                <li>You are authorized to use the selected payment method</li>
                <li>You review the amount before confirming the transaction</li>
                <li>You do not share your PIN, password, CVV, or one-time password with anyone claiming to represent Síkat-Aurora Inc.</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1 font-semibold text-navy">
                Síkat-Aurora Inc. will never ask you to disclose your electronic-wallet PIN, bank password, CVV, or one-time password through email, private message, telephone call, or volunteer form.
              </p>
            </div>

            {/* 7. Donation Refunds and Transaction Errors */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">7. Donation Refunds and Transaction Errors</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Donations are generally final once successfully processed and allocated for program use.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">A refund or transaction review may be considered when:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>The same donation was charged more than once because of a technical error</li>
                <li>An incorrect amount was processed</li>
                <li>The transaction was unauthorized</li>
                <li>The donation was accepted for a program that Síkat-Aurora Inc. can no longer implement</li>
                <li>A refund is required by applicable law or payment-provider rules</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Requests should be sent to <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a> as soon as reasonably possible and should include the donor’s name, email address, transaction date, amount, and transaction reference.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Approved refunds may be reduced by nonrefundable charges imposed by banks or payment processors, where legally permitted.
              </p>
            </div>

            {/* 8. Photographs and Videos of Children */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">8. Photographs and Videos of Children</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. works with children and young people and treats their safety, privacy, and dignity as a priority.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Identifiable photographs and videos of children may be published only when appropriate consent has been documented from a parent or legal guardian, or when an authorized partner school, community organization, or institution has confirmed that the required consent was obtained.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">Photographs and videos may be used for legitimate organizational purposes such as:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Program documentation</li>
                <li>Accomplishment and transparency reports</li>
                <li>Educational and advocacy materials</li>
                <li>Organizational publications</li>
                <li>Website and social-media updates</li>
                <li>Volunteer and partner recognition</li>
                <li>Fundraising and community-awareness activities</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Publication on the Síkat-Aurora website does not give website visitors permission to freely reuse photographs or videos of children.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Unless written permission has been obtained from Síkat-Aurora Inc. and any other required rights holder, users must not:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Download or copy identifiable photographs or videos of children</li>
                <li>Repost the content on another page, account, website, or publication</li>
                <li>Crop, edit, manipulate, or combine the content with other media</li>
                <li>Use the content in advertisements, promotions, fundraising activities, or artificial-intelligence systems</li>
                <li>Use facial recognition, image scraping, profiling, or similar technologies on the content</li>
                <li>Add captions, comments, or context that may humiliate, sexualize, exploit, discriminate against, misrepresent, or endanger a child</li>
                <li>Attempt to identify, locate, contact, or obtain additional personal information about a child appearing in the content</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Sharing a direct link to an official Síkat-Aurora webpage or social-media post is permitted, provided the content is not altered or presented misleadingly.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                A parent, legal guardian, or authorized representative may request the review or removal of a child’s photograph or video by contacting <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a>.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. will make reasonable efforts to remove approved content from platforms and accounts under its control. However, it may not be able to remove copies that have already been downloaded, independently reposted, archived, or distributed by third parties.
              </p>
            </div>

            {/* 9. Intellectual Property */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">9. Intellectual Property</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Unless otherwise indicated, the website and its original content are owned by, licensed to, or used with permission by Síkat-Aurora Inc.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">Protected materials may include:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>The Síkat-Aurora name and logo</li>
                <li>Website design, layout, and graphics</li>
                <li>Photographs and videos</li>
                <li>Articles, captions, stories, reports, and program descriptions</li>
                <li>Illustrations, publications, training materials, and downloadable resources</li>
                <li>Campaign names, program identities, and branding elements</li>
                <li>Databases, compilations, and original website materials</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                You may view and share direct links to publicly available pages for personal, informational, or educational purposes.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                You may not reproduce, republish, sell, license, distribute, modify, translate, publicly display, or commercially use substantial portions of the website without prior written permission.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Nothing in these Terms transfers ownership of any intellectual property to the website user.
              </p>
            </div>

            {/* 10. User Communications and Submitted Materials */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">10. User Communications and Submitted Materials</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                When you submit information through a volunteer form, donation form, email, or other communication channel, you confirm that:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>The information is accurate to the best of your knowledge</li>
                <li>You have the right to submit the information</li>
                <li>The submission does not violate another person’s privacy, intellectual-property rights, or legal rights</li>
                <li>The submission does not contain malicious, unlawful, defamatory, discriminatory, or exploitative material</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                You retain ownership of original material you submit.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                However, when you voluntarily provide testimonials, event photographs, stories, quotations, designs, or other materials for publication, you grant Síkat-Aurora Inc. a nonexclusive, royalty-free permission to review, store, reproduce, edit for length or clarity, and publish the material for the purpose communicated to you.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Additional consent will be obtained when required, particularly when the material contains personal information or depicts a child.
              </p>
            </div>

            {/* 11. Accuracy of Website Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">11. Accuracy of Website Information</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. aims to keep website information accurate and current. However, program schedules, volunteer opportunities, donation needs, impact figures, leadership information, partnerships, and other details may change.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Website content is provided for general information and should not be treated as professional, legal, financial, medical, or emergency advice.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                An announcement, application form, or donation option appearing on the website does not guarantee that the relevant opportunity remains available.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                When an important decision depends on website information, you may contact Síkat-Aurora Inc. to confirm the latest details.
              </p>
            </div>

            {/* 12. Community Stories and Impact Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">12. Community Stories and Impact Information</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Stories, photographs, testimonials, and impact reports may describe real programs, volunteers, learners, and communities.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. may shorten, anonymize, translate, or edit certain information to protect privacy, improve clarity, or avoid revealing sensitive details.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Impact figures may be based on organizational records, attendance reports, partner confirmations, funding reports, and reasonable estimates available at the time of publication.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Any correction request concerning a published story, figure, name, photograph, or program detail may be sent to <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a>.
              </p>
            </div>

            {/* 13. Third-Party Websites and Services */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">13. Third-Party Websites and Services</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                The website may contain links to services operated by third parties, including social-media platforms, payment providers, video platforms, transparency-report services, and partner websites.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. does not control and is not responsible for the content, availability, security, data practices, or policies of independent third-party websites.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Accessing an external link is subject to the third party’s own terms and privacy policy.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                A link to another website does not automatically mean that Síkat-Aurora Inc. endorses every statement, service, product, or activity appearing on that website.
              </p>
            </div>

            {/* 14. Website Availability and Security */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">14. Website Availability and Security</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. may update, suspend, restrict, or discontinue any portion of the website when necessary for maintenance, security, program changes, legal compliance, or organizational operations.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                The organization does not guarantee that the website will always be uninterrupted, error-free, or free from harmful components.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Users are responsible for maintaining appropriate security protections on their own devices and internet connections.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Security concerns, suspected vulnerabilities, fraudulent messages, or misuse of the organization’s identity should be reported privately to <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a>. Users should not publicly disclose a security vulnerability before the organization has had a reasonable opportunity to investigate it.
              </p>
            </div>

            {/* 15. Disclaimer and Limitation of Liability */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">15. Disclaimer and Limitation of Liability</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                The website and its content are provided on an “as available” basis.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                To the fullest extent permitted by law, Síkat-Aurora Inc. will not be responsible for indirect, incidental, or consequential loss arising solely from:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Temporary website unavailability</li>
                <li>Reliance on outdated or incomplete general information</li>
                <li>A third-party website or service</li>
                <li>Unauthorized alteration or reuse of website content</li>
                <li>Events outside the organization’s reasonable control</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Nothing in these Terms excludes responsibility that cannot legally be excluded, including responsibility arising from fraud, willful misconduct, gross negligence, or violations of applicable data-protection obligations.
              </p>
            </div>

            {/* 16. Privacy and Personal Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">16. Privacy and Personal Information</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Personal information submitted through the website is handled according to the Síkat-Aurora Inc.{" "}
                <Link to="/privacy" className="text-primary font-semibold underline">
                  Privacy &amp; Data Management Policy
                </Link>.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">The Privacy &amp; Data Management Policy explains:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>What personal information may be collected</li>
                <li>Why and how it is processed</li>
                <li>Who may receive it</li>
                <li>How long it may be retained</li>
                <li>How it is protected</li>
                <li>How individuals may exercise their privacy rights</li>
                <li>How photographs and videos of children are managed</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                By submitting personal information, you acknowledge that you have reviewed the applicable privacy notice.
              </p>
            </div>

            {/* 17. Reporting Misuse or Requesting Removal */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">17. Reporting Misuse or Requesting Removal</h2>
              <p className="text-sm leading-relaxed sm:text-base">You may contact Síkat-Aurora Inc. to report:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                <li>Unauthorized use of the organization’s name or logo</li>
                <li>Fraudulent donation requests</li>
                <li>Misuse of photographs or videos</li>
                <li>Publication of inaccurate personal information</li>
                <li>Content that may place a child or participant at risk</li>
                <li>Copyright or intellectual-property concerns</li>
                <li>Suspected security vulnerabilities</li>
                <li>Other violations of these Terms</li>
              </ul>
              <p className="text-sm leading-relaxed sm:text-base pt-1">
                Reports should include the relevant webpage, social-media post, screenshot, account name, or other information that may help the organization investigate.
              </p>
              <div className="mt-2 text-sm leading-relaxed sm:text-base">
                <p className="font-semibold text-navy">Síkat-Aurora Inc.</p>
                <p>Baler, Aurora, Philippines</p>
                <p>Email: <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a></p>
              </div>
            </div>

            {/* 18. Changes to These Terms */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">18. Changes to These Terms</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                Síkat-Aurora Inc. may update these Terms when website features, donation methods, volunteer processes, programs, service providers, or legal requirements change.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                The revised Terms will be published on this page with an updated revision date.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Continued use of the website after the updated Terms become effective constitutes acceptance of the revised Terms.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Material changes affecting personal-information processing will also be reflected in the Privacy &amp; Data Management Policy or an appropriate privacy notice.
              </p>
            </div>

            {/* 19. Governing Law */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">19. Governing Law</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                These Terms are governed by the laws of the Republic of the Philippines.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Any complaint or dispute should first be raised with Síkat-Aurora Inc. so that the organization has a reasonable opportunity to investigate and respond.
              </p>
              <p className="text-sm leading-relaxed sm:text-base">
                Nothing in these Terms prevents a person from filing a complaint with the National Privacy Commission, another appropriate government agency, or a court with proper jurisdiction.
              </p>
            </div>

            {/* 20. Severability */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">20. Severability</h2>
              <p className="text-sm leading-relaxed sm:text-base">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply to the fullest extent permitted by law.
              </p>
            </div>

            {/* 21. Contact Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-navy">21. Contact Information</h2>
              <p className="text-sm leading-relaxed sm:text-base">Questions about these Terms of Use may be sent to:</p>
              <div className="mt-2 text-sm leading-relaxed sm:text-base">
                <p className="font-semibold text-navy">Síkat-Aurora Inc.</p>
                <p>Baler, Aurora, Philippines</p>
                <p>Email: <a href="mailto:sikataurora@gmail.com" className="text-primary font-semibold underline">sikataurora@gmail.com</a></p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA onNavigate={onNavigate} onOpenModal={onOpenModal} />
    </>
  );
}

/* ============================= Article page wrapper ============================= */

function ArticlePageWrapper({ onNavigate, onOpenModal }) {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    document.title = post ? `${SITE_NAME} | ${post.title}` : `${SITE_NAME} | Article Not Found`;
  }, [post]);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-cream">
        <Container className="text-center">
          <h1 className="text-[2rem] font-bold text-navy">Article not found</h1>
          <p className="mt-3 text-navy/60">The story you’re looking for doesn’t exist or has been removed.</p>
          <Link to="/blog" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white no-underline hover:bg-primary-dark">
            Back to Blog
          </Link>
        </Container>
      </div>
    );
  }

  return <PostPage post={post} onNavigate={onNavigate} onOpenModal={onOpenModal} />;
}

/* ============================= App shell ============================= */

// Maps old page IDs (used by child components) to React Router paths.
const PAGE_ID_TO_PATH = {
  home: "/",
  about: "/about",
  programs: "/programs",
  impact: "/impact",
  leadership: "/leadership",
  blog: "/blog",
  faq: "/faq",
  volunteer: "/volunteer",
  donate: "/donate",
  checkout: "/checkout",
  terms: "/terms",
};

export default function App() {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [checkoutKitId, setCheckoutKitId] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const location = useLocation();
  const routerNavigate = useNavigate();

  const playVideo = useCallback((videoId) => setActiveVideoId(videoId), []);
  const closeVideo = useCallback(() => setActiveVideoId(null), []);
  const openModal = useCallback(() => setIsVolunteerModalOpen(true), []);
  const closeModal = useCallback(() => setIsVolunteerModalOpen(false), []);

  // Compatibility wrapper: child components still call onNavigate("about")
  // and this translates to router navigation.
  const navigate = useCallback(
    (pageId) => {
      const path = PAGE_ID_TO_PATH[pageId] || `/${pageId}`;
      routerNavigate(path);
      window.scrollTo({ top: 0 });
    },
    [routerNavigate]
  );

  const startCheckout = useCallback(
    (kitId) => {
      setCheckoutKitId(kitId);
      routerNavigate("/checkout");
      window.scrollTo({ top: 0 });
    },
    [routerNavigate]
  );

  // A direct link to /checkout has no kit behind it, so fall back to the catalog
  const checkoutKit = getKit(checkoutKitId);

  // Update page title based on current route
  useEffect(() => {
    const pathSegment = location.pathname.split("/")[1] || "home";
    const title = PAGE_TITLES[pathSegment];
    document.title = title ? `${SITE_NAME} | ${title}` : SITE_NAME;
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar onOpenModal={openModal} />

      <VolunteerModal isOpen={isVolunteerModalOpen} onClose={closeModal} />
      <VideoModal videoId={activeVideoId} onClose={closeVideo} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={navigate} onOpenModal={openModal} onPlayVideo={playVideo} />} />
          <Route path="/about" element={<AboutPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/programs" element={<ProgramsPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/impact" element={<ImpactPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/leadership" element={<LeadershipPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/blog" element={<BlogPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/blog/:slug" element={<ArticlePageWrapper onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/faq" element={<FAQPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/privacy" element={<PrivacyPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/terms" element={<TermsPage onNavigate={navigate} onOpenModal={openModal} />} />
          <Route path="/volunteer" element={<VolunteerPage onNavigate={navigate} onOpenModal={openModal} onPlayVideo={playVideo} />} />
          <Route path="/donate" element={<DonatePage onDonate={startCheckout} />} />
          <Route path="/checkout" element={
            checkoutKit
              ? <CheckoutPage kit={checkoutKit} onNavigate={navigate} />
              : <DonatePage onDonate={startCheckout} />
          } />
          {/* Catch-all: redirect to home */}
          <Route path="*" element={<HomePage onNavigate={navigate} onOpenModal={openModal} onPlayVideo={playVideo} />} />
        </Routes>
      </main>

      <Footer />
    </MotionConfig>
  );
}
