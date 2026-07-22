import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// A fanned stack of portraits beside the quote, advancing one at a time.
//
// The tilt of each inactive card is derived from its index rather than
// Math.random(). The original called random() inline inside initial/animate/
// exit, so every unrelated re-render re-rolled the angles and the whole stack
// twitched. Index-derived angles look just as scattered and hold still.
const rotationFor = (index) => ((index * 37) % 21) - 10;

export function AnimatedTestimonials({ testimonials, autoplay = false, className }) {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index) => index === active;
  const current = testimonials[active];

  return (
    <div className={cn("mx-auto w-full max-w-sm px-4 md:max-w-4xl md:px-8", className)}>
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative h-72 w-full sm:h-80">
          <AnimatePresence>
            {testimonials.map((t, index) => (
              <motion.div
                key={t.src}
                initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotationFor(index) }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : rotationFor(index),
                  zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rotationFor(index) }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={t.src}
                  alt={t.alt ?? ""}
                  draggable={false}
                  loading="lazy"
                  className="h-full w-full rounded-3xl border border-navy/10 object-cover object-center shadow-card"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between py-2">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Announced as one block so a screen reader hears the whole quote,
                not each blurred-in word as it lands */}
            <div aria-live="polite" aria-atomic="true">
              <p className="text-[1.1rem] italic leading-[1.75] text-navy/80">
                &ldquo;
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * i }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                &rdquo;
              </p>
              <div className="mt-6">
                <h3 className="text-[1.2rem] font-bold text-navy">{current.name}</h3>
                <p className="mt-1 text-[0.85rem] text-navy/55">{current.designation}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-3 pt-10 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous volunteer"
              className="group/button flex h-11 w-11 items-center justify-center rounded-full border border-navy/12 bg-cream transition-colors duration-200 hover:border-navy/30 hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4 text-navy transition-transform duration-300 group-hover/button:-translate-x-0.5 motion-reduce:group-hover/button:transform-none" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next volunteer"
              className="group/button flex h-11 w-11 items-center justify-center rounded-full border border-navy/12 bg-cream transition-colors duration-200 hover:border-navy/30 hover:bg-white"
            >
              <ArrowRight className="h-4 w-4 text-navy transition-transform duration-300 group-hover/button:translate-x-0.5 motion-reduce:group-hover/button:transform-none" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
