import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "ZFusionAI delivered our entire customer portal in seven weeks. It replaced three legacy systems and our support load dropped by half. They behaved like an internal team, not a vendor.",
    name: "Khalid Al Mansoori",
    role: "Operations Director",
    company: "Mansoori Group, Dubai",
  },
  {
    quote:
      "We needed a serious AI partner — not a hype shop. Their automation cut our document processing time from days to minutes. Worth every dirham.",
    name: "Sara Hashimi",
    role: "Head of Digital",
    company: "Aurelia Real Estate",
  },
  {
    quote:
      "The website ZFusionAI built for us tripled our qualified inquiries in three months. Clean engineering, fast load times, and a team that actually answers calls.",
    name: "Rami Khoury",
    role: "Managing Director",
    company: "Khoury Logistics LLC",
  },
  {
    quote:
      "Their team rebuilt our internal CRM and integrated it with our accounting platform in record time. Communication was sharp the entire way through.",
    name: "Fatima Al Suwaidi",
    role: "CTO",
    company: "Sandstone Hospitality",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[index];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Trusted by leaders across the UAE
          </h2>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-sm p-6 sm:p-8 md:p-14 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
            <Quote className="h-10 w-10 text-primary/50 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                  "{t.quote}"
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 font-bold text-black">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-primary" : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/40 text-white hover:bg-card hover:border-primary/30 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/40 text-white hover:bg-card hover:border-primary/30 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
