import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FaqSection = React.forwardRef(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-20 min-h-[850px] w-full flex flex-col justify-center bg-gradient-to-b from-transparent via-stone-100/60 to-transparent font-sans",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-[#E55C14] mb-3">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-[#0D1F2D] tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-base text-slate-600 font-light leading-relaxed">{description}</p>
            )}
          </motion.div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-3">
            {items.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>

          {/* Contact Section */}
          {contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md mx-auto mt-16 p-8 rounded-2xl bg-white border border-stone-200/80 text-center shadow-lg"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#FEF3EC] text-[#E55C14] mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <p className="text-base font-semibold text-[#0D1F2D] mb-1">
                {contactInfo.title}
              </p>
              <p className="text-sm text-slate-500 mb-5 font-light">
                {contactInfo.description}
              </p>
              <Button
                onClick={contactInfo.onContact}
                className="bg-[#E55C14] hover:bg-[#cc4f0f] text-white rounded-full px-8 py-2.5 font-semibold text-sm shadow-md"
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

// Internal FaqItem component
const FaqItem = React.forwardRef(
  ({ question, answer, index }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, delay: index * 0.08 }}
        className={cn(
          "group rounded-2xl border transition-all duration-200 ease-in-out overflow-hidden",
          isOpen
            ? "bg-white border-[#E55C14]/40 shadow-md"
            : "bg-white/80 border-stone-200 hover:bg-white hover:border-stone-300"
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-7 py-5 flex items-center justify-between text-left focus:outline-none transition-colors"
        >
          <h3
            className={cn(
              "text-base sm:text-lg font-semibold transition-colors duration-200 pr-4",
              isOpen ? "text-[#E55C14]" : "text-[#0D1F2D] group-hover:text-[#E55C14]"
            )}
          >
            {question}
          </h3>
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "p-1.5 rounded-full flex-shrink-0 transition-colors duration-200",
              isOpen ? "bg-[#FEF3EC] text-[#E55C14]" : "text-stone-400 group-hover:text-stone-600"
            )}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
            >
              <div className="px-7 pb-6 pt-1">
                <motion.p
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="text-sm sm:text-base text-slate-600 leading-relaxed font-light"
                >
                  {answer}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
FaqItem.displayName = "FaqItem";

export { FaqSection };
