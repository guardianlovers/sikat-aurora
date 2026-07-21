import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const AnimatedHero = ({
  backgroundImageUrl,
  title,
  description,
  ctaButton,
  secondaryCta,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden font-sans pt-36 pb-24 min-h-[560px] sm:min-h-[660px]",
        className
      )}
    >
      {/* Background image with a single legibility overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/70 to-navy-deep/40" />
      </div>

      {/* Hero content — aligned to the same 1280px page grid as every section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-center px-6 text-white md:px-9"
      >
        {badge && (
          <motion.div variants={itemVariants} className="mb-5">
            <span className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="max-w-[15ch] font-display text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[3.2rem] md:text-[3.75rem]"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-[52ch] text-sm leading-[1.75] text-white/75 sm:text-[0.98rem]"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            onClick={ctaButton.onClick}
            size="lg"
            className="cursor-pointer rounded-md border-0 bg-primary px-7 py-3.5 text-[0.82rem] font-semibold text-white transition-colors duration-200 hover:bg-primary-dark active:translate-y-px"
          >
            {ctaButton.text}
          </Button>
          {secondaryCta && (
            <Button
              onClick={secondaryCta.onClick}
              size="lg"
              className="cursor-pointer rounded-md border border-white/35 bg-transparent px-7 py-3.5 text-[0.82rem] font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-navy active:translate-y-px"
            >
              {secondaryCta.text}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
