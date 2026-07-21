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
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[90vh] lg:min-h-screen w-full flex-col items-center justify-center overflow-hidden font-sans",
        className
      )}
    >
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(229,92,20,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(26,63,92,0.25) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Hero content matching Figma exactly */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-start justify-center px-8 sm:px-12 md:px-16 max-w-6xl w-full text-white pt-24 pb-16"
      >
        {badge && (
          <motion.div variants={itemVariants} className="mb-4">
            <span
              className="text-base sm:text-lg font-semibold tracking-wide"
              style={{ color: "#F5C200" }}
            >
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-semibold tracking-tight leading-[1.1] max-w-4xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80 font-light"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex items-center gap-4 flex-wrap">
          <Button
            onClick={ctaButton.onClick}
            size="lg"
            className="bg-[#E55C14] hover:bg-[#cc4f0f] text-white border-0 font-semibold px-8 py-6 text-base rounded-lg shadow-lg"
          >
            {ctaButton.text}
          </Button>
          {secondaryCta && (
            <Button
              onClick={secondaryCta.onClick}
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-6 text-base rounded-lg transition-colors"
            >
              {secondaryCta.text}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
