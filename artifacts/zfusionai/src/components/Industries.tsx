import { motion } from "framer-motion";
import {
  Building2,
  HeartPulse,
  ShoppingBag,
  HardHat,
  Truck,
  UtensilsCrossed,
  Landmark,
  GraduationCap,
  Plane,
  Briefcase,
  Factory,
  Car,
} from "lucide-react";

const industries = [
  { name: "Real Estate", icon: Building2 },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Retail & E-commerce", icon: ShoppingBag },
  { name: "Construction", icon: HardHat },
  { name: "Logistics", icon: Truck },
  { name: "Hospitality", icon: UtensilsCrossed },
  { name: "Finance", icon: Landmark },
  { name: "Education", icon: GraduationCap },
  { name: "Travel & Tourism", icon: Plane },
  { name: "Professional Services", icon: Briefcase },
  { name: "Manufacturing", icon: Factory },
  { name: "Automotive", icon: Car },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Industries
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Built for industries that move fast
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            We work with businesses across the UAE — delivering tailored systems
            for every sector.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 hover:bg-card/70 transition-all duration-300 cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-white">{industry.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
