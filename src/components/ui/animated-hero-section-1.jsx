import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  images = [],
  backgroundImageUrl,
  title,
  description,
  ctaButton,
  secondaryCta,
  badge,
  className,
  autoPlayInterval = 5000,
}) => {
  // Normalize images array
  const bgImages = images.length > 0 ? images : backgroundImageUrl ? [backgroundImageUrl] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (bgImages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % bgImages.length);
  }, [bgImages.length]);

  const handlePrev = useCallback(() => {
    if (bgImages.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + bgImages.length) % bgImages.length);
  }, [bgImages.length]);

  useEffect(() => {
    if (bgImages.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [bgImages.length, autoPlayInterval, handleNext]);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden font-sans pt-36 pb-24 min-h-[560px] sm:min-h-[660px]",
        className
      )}
    >
      {/* Carousel Background Images */}
      <AnimatePresence mode="popLayout">
        {bgImages.length > 0 && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImages[currentIndex]})` }}
          />
        )}
      </AnimatePresence>

      {/* Dark overlay removed to keep background photos bright and clear */}

      {/* Hero content — aligned to the same 1280px page grid as every section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-center px-6 text-white md:px-9"
      >
        {badge && (
          <motion.div variants={itemVariants} className="mb-6">
            <span className="pill-label">{badge}</span>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className="max-w-[16ch] text-[2.3rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3.4rem] md:text-[4rem]"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-[52ch] text-[0.95rem] leading-[1.75] text-white/80 sm:text-[1.02rem]"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            onClick={ctaButton.onClick}
            size="lg"
            className="cursor-pointer rounded-full border-0 bg-primary px-8 py-4 text-[0.85rem] font-semibold text-white shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark motion-reduce:hover:translate-y-0"
          >
            {ctaButton.text}
          </Button>
          {secondaryCta && (
            <Button
              onClick={secondaryCta.onClick}
              size="lg"
              className="cursor-pointer rounded-full border-2 border-white/40 bg-transparent px-8 py-4 text-[0.85rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-navy motion-reduce:hover:translate-y-0"
            >
              {secondaryCta.text}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
