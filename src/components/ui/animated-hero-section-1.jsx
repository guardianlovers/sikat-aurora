import * as React from "react";
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
        "relative flex w-full flex-col items-center justify-center overflow-hidden font-sans pt-28 pb-16 min-h-[480px] sm:min-h-[540px]",
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
              "radial-gradient(circle at 20% 80%, rgba(229,92,20,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(26,63,92,0.3) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Hero Content — aligned to exact 1280px grid with 40px padding */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-start justify-center max-w-[1280px] w-full text-white mx-auto"
        style={{ paddingLeft: 40, paddingRight: 40 }}
      >
        {badge && (
          <motion.div variants={itemVariants} className="mb-3">
            <span
              className="text-xs font-semibold tracking-wider uppercase bg-[#F5C200]/15 text-[#F5C200] px-3.5 py-1.5 rounded-full border border-[#F5C200]/30 inline-block"
            >
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight leading-[1.2] max-w-3xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-white/80 font-normal"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3 flex-wrap">
          <Button
            onClick={ctaButton.onClick}
            size="lg"
            className="bg-[#E55C14] hover:bg-[#cc4f0f] text-white border-0 font-semibold px-6 py-3 text-sm rounded-full shadow-md cursor-pointer transition-all"
          >
            {ctaButton.text}
          </Button>
          {secondaryCta && (
            <Button
              onClick={secondaryCta.onClick}
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 font-semibold px-6 py-3 text-sm rounded-full transition-all cursor-pointer"
            >
              {secondaryCta.text}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
