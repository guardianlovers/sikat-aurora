import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FaqSection = React.forwardRef(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("w-full py-16 font-sans lg:py-20", className)} {...props}>
        <div className="mx-auto w-full max-w-7xl px-6 md:px-9">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="mb-3 flex items-center justify-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
              <span aria-hidden="true" className="h-px w-6 bg-primary/40" />
              FAQ
            </p>
            <h2 className="mb-4 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-[2.1rem]">
              {title}
            </h2>
            {description && (
              <p className="mx-auto max-w-[54ch] text-sm leading-[1.7] text-ink sm:text-[0.93rem]">{description}</p>
            )}
          </motion.div>

          {/* FAQ items */}
          <div className="mx-auto max-w-3xl border-t border-navy/15">
            {items.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} index={index} />
            ))}
          </div>

          {/* Contact */}
          {contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-16 max-w-md rounded-lg border border-navy/10 bg-white p-8 text-center shadow-card"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary-soft p-3 text-primary">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mb-1.5 font-display text-[1.2rem] font-semibold text-navy">{contactInfo.title}</p>
              <p className="mb-6 text-sm leading-relaxed text-ink">{contactInfo.description}</p>
              <Button
                onClick={contactInfo.onContact}
                className="rounded-md bg-primary px-7 py-3 text-[0.82rem] font-semibold text-white hover:bg-primary-dark"
              >
                {contactInfo.buttonText}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);
FaqSection.displayName = "FaqSection";

// Internal accordion item — button controls the answer panel via aria-expanded/aria-controls
const FaqItem = React.forwardRef(({ question, answer, index }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const panelId = React.useId();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.25) }}
      className="group border-b border-navy/10"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        <h3
          className={cn(
            "font-display text-[1.05rem] font-semibold transition-colors duration-200 sm:text-[1.15rem]",
            isOpen ? "text-primary" : "text-navy group-hover:text-primary"
          )}
        >
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex-shrink-0 transition-colors duration-200",
            isOpen ? "text-primary" : "text-ink/50 group-hover:text-primary"
          )}
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.25, ease: "easeOut" } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
          >
            <p className="max-w-[68ch] pb-6 pr-8 text-sm leading-[1.75] text-ink sm:text-[0.93rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FaqItem.displayName = "FaqItem";

export { FaqSection };
