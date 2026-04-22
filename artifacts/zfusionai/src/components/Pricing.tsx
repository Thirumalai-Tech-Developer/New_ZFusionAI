import { motion } from "framer-motion";
import { Check, Sparkles, Rocket, Crown } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter Website",
    icon: Sparkles,
    price: "599",
    currency: "AED",
    suffix: "starting",
    highlight: false,
    description:
      "A polished business website to get you online quickly. Perfect for new ventures and small teams.",
    features: [
      "Up to 5 custom-designed pages",
      "Mobile-first responsive design",
      "Contact form with email delivery",
      "Basic on-page SEO setup",
      "WhatsApp & social integrations",
      "1 round of content revisions",
      "Delivery in 7-10 days",
    ],
  },
  {
    name: "Business Website",
    icon: Rocket,
    price: "1,499",
    currency: "AED",
    suffix: "starting",
    highlight: true,
    description:
      "A conversion-focused site with CMS, blog, analytics and full SEO foundation for growing businesses.",
    features: [
      "Up to 12 pages with custom design",
      "Headless CMS (edit content yourself)",
      "Blog / news section",
      "Advanced SEO + schema markup",
      "Performance optimization (90+ Lighthouse)",
      "Analytics & conversion tracking",
      "WhatsApp + lead capture flows",
      "2 rounds of revisions",
      "Delivery in 2-3 weeks",
    ],
  },
  {
    name: "Custom / E-commerce",
    icon: Crown,
    price: "Custom",
    currency: "",
    suffix: "quote",
    highlight: false,
    description:
      "Full-scale platforms — e-commerce, booking systems, dashboards, AI features and bespoke integrations.",
    features: [
      "Unlimited pages & custom modules",
      "E-commerce / booking / membership",
      "Custom integrations & APIs",
      "AI features (chat, search, recommendations)",
      "Admin dashboard",
      "Multi-language support",
      "Dedicated project manager",
      "Ongoing support packages",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Website Building <span className="text-primary">starting at AED 599</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Honest pricing for every stage of business. Final cost may vary based on your
            chosen <span className="text-white font-medium">hosting plan</span>,{" "}
            <span className="text-white font-medium">domain name</span>, and any premium
            third-party services you require.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  tier.highlight
                    ? "border-primary/50 bg-gradient-to-b from-primary/10 via-card to-card shadow-[0_0_40px_rgba(255,122,0,0.15)]"
                    : "border-white/10 bg-card/60 backdrop-blur"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                    Most Popular
                  </div>
                )}

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${
                    tier.highlight
                      ? "bg-primary text-black shadow-[0_0_20px_rgba(255,122,0,0.5)]"
                      : "bg-primary/10 text-primary border border-primary/20"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <div className="mb-6 flex items-baseline gap-2">
                  {tier.currency && (
                    <span className="text-sm font-semibold text-muted-foreground">
                      {tier.currency}
                    </span>
                  )}
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{tier.suffix}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    className={`w-full rounded-full ${
                      tier.highlight
                        ? "bg-primary text-black hover:bg-primary/90"
                        : "bg-card border border-white/10 text-white hover:bg-white/5"
                    }`}
                  >
                    {tier.highlight ? "Start Your Project" : "Get a Quote"}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          All prices are exclusive of VAT. Hosting (typically AED 200-800/year) and domain
          registration (typically AED 40-200/year) are billed at cost. We recommend the
          best provider for your specific needs and never mark up infrastructure.
        </p>
      </div>
    </section>
  );
}
