import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const AnimatedHero = ({
  backgroundImageUrl,
  title,
  description,
  ctaButton,
  secondaryCta,
  badge,
  stats,
  className,
}) => {
  const glassBtn =
    "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors";

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(229,92,20,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(26,63,92,0.3) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Hero content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-start justify-center px-10 max-w-7xl w-full text-white pt-20"
      >
        {badge && (
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: "rgba(245,194,0,0.15)",
                border: "1px solid rgba(245,194,0,0.3)",
                color: "#F5C200",
              }}
            >
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-3xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 font-light"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4 flex-wrap">
          <Button onClick={ctaButton.onClick} size="lg"
            className="bg-[#E55C14] hover:bg-[#cc4f0f] text-white border-0 font-semibold px-8"
          >
            {ctaButton.text}
          </Button>
          {secondaryCta && (
            <Button onClick={secondaryCta.onClick} size="lg" className={glassBtn}>
              {secondaryCta.text}
            </Button>
          )}
        </motion.div>

        {stats && (
          <motion.div variants={itemVariants} className="mt-16 flex gap-10 flex-wrap">
            {stats.map(([num, label], i) => (
              <div key={i} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-10 bg-white/10" />}
                <div>
                  <div className="text-3xl font-bold tracking-tight">{num}</div>
                  <div className="text-xs text-white/40 font-medium tracking-widest uppercase mt-1">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
