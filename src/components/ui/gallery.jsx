import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import moment1 from "@/assets/home/moments-from-the-field/1.jpg";
import moment2 from "@/assets/home/moments-from-the-field/2.jpg";
import moment3 from "@/assets/home/moments-from-the-field/3.jpg";
import moment4 from "@/assets/home/moments-from-the-field/4.jpg";
import moment5 from "@/assets/home/moments-from-the-field/5.jpg";

export const PhotoGallery = ({
  animationDelay = 0.3,
  onViewAll,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  const photos = [
    {
      id: 1,
      order: 0,
      x: "-320px",
      y: "15px",
      zIndex: 50,
      direction: "left",
      src: moment1,
      alt: "Moment from the field in Aurora",
    },
    {
      id: 2,
      order: 1,
      x: "-160px",
      y: "32px",
      zIndex: 40,
      direction: "left",
      src: moment2,
      alt: "Síkat-Aurora volunteers and children",
    },
    {
      id: 3,
      order: 2,
      x: "0px",
      y: "8px",
      zIndex: 30,
      direction: "right",
      src: moment3,
      alt: "Youth engagement workshop",
    },
    {
      id: 4,
      order: 3,
      x: "160px",
      y: "22px",
      zIndex: 20,
      direction: "right",
      src: moment4,
      alt: "Storytelling session under trees",
    },
    {
      id: 5,
      order: 4,
      x: "320px",
      y: "44px",
      zIndex: 10,
      direction: "left",
      src: moment5,
      alt: "Active community volunteerism",
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 font-sans lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 text-center md:px-9">
        <div className="mb-10">
          <div className="mb-4 flex justify-center">
            <span className="pill-label">VISUAL STORIES</span>
          </div>
          <h2 className="mx-auto max-w-[20ch] text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[2.4rem]">
            Moments from the field
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-[0.95rem] leading-[1.7] text-navy/75">
            Snapshots from Baler, Maria Aurora, San Luis, and Casiguran.
            <span className="hidden lg:inline"> Drag any photo to explore.</span>
          </p>
        </div>
      </div>

      {/* Small screens: swipeable photo strip (the draggable fan needs a wide viewport) */}
      <div className="mb-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 lg:hidden">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className={cn(
              "h-44 w-44 shrink-0 snap-center rounded-md border-4 border-white object-cover shadow-card-hover",
              photo.direction === "left" ? "-rotate-1" : "rotate-1"
            )}
          />
        ))}
      </div>

      {/* Large screens: draggable photo fan */}
      <div className="relative mb-12 hidden h-[320px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[220px] w-[220px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <Photo
                    width={220}
                    height={220}
                    src={photo.src}
                    alt={photo.alt}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex w-full justify-center">
        <Button
          onClick={onViewAll}
          className="rounded-full bg-primary px-8 py-3.5 text-[0.85rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark shadow-cta"
        >
          Read All Kwentong Síkat Stories
        </Button>
      </div>
    </div>
  );
};

function getRandomNumberInRange(min, max) {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
}) => {
  const [rotation] = useState(
    () => getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1)
  );
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.08, zIndex: 9999 }}
      whileHover={{
        scale: 1.05,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.05,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md border-4 border-white bg-navy shadow-xl">
        <img
          className={cn("pointer-events-none h-full w-full select-none rounded-sm object-cover")}
          src={src}
          alt={alt}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
