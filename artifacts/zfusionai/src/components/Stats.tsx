import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 40, suffix: "%", label: "Workflow time saved", sublabel: "via custom automation" },
  { value: 3, suffix: "x", label: "More qualified leads", sublabel: "with conversion-first sites" },
  { value: 99.9, suffix: "%", label: "Uptime guaranteed", sublabel: "across deployed systems", decimals: 1 },
  { value: 100, suffix: "+", label: "Custom systems delivered", sublabel: "for UAE businesses" },
];

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals)
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
}

export default function Stats() {
  return (
    <section id="results" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Results
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Numbers that move businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 hover:bg-card/60 transition-colors group min-w-0"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-orange-300 mb-4 whitespace-nowrap">
                <Counter to={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </div>
              <div className="text-base font-semibold text-white">{stat.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
