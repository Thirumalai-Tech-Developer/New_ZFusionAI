import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Faq, Step } from "@/seo/content";

/**
 * Free-trial "how to start" steps plus a visible FAQ. The same data feeds the
 * page's HowTo/FAQPage JSON-LD, so answer engines see matching content.
 */
export default function TrialSection({
  id,
  heading,
  intro,
  steps,
  faqs,
  faqHeading,
  accent = "emerald",
}: {
  id: string;
  heading: string;
  intro: string;
  steps: Step[];
  faqs: Faq[];
  faqHeading: string;
  accent?: "emerald" | "cyan";
}) {
  const accentText = accent === "cyan" ? "text-cyan-700 dark:text-cyan-400" : "text-emerald-700 dark:text-emerald-400";
  const accentBorder = accent === "cyan" ? "border-cyan-500/20" : "border-emerald-500/20";
  const button =
    accent === "cyan"
      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-black"
      : "bg-[#25D366] hover:bg-[#1faa4e] text-white";

  return (
    <>
      <section className="container mx-auto px-6 md:px-12 py-16" aria-labelledby={`${id}-heading`}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id={`${id}-heading`} className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
            {heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">{intro}</p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className={`p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-xl border ${accentBorder} text-left space-y-2`}>
              <div className={`text-xs font-mono ${accentText}`}>STEP {String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">{step.title}</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link
            href="/login?next=/dashboard"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 ${button}`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Start free: 1,000 messages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 py-16 max-w-4xl" aria-labelledby={`${id}-faq-heading`}>
        <h2 id={`${id}-faq-heading`} className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 dark:text-white text-center mb-10">
          {faqHeading}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className={`group p-5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-xl border ${accentBorder} text-left`}>
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-slate-950 dark:text-white">
                <h3 className="text-base">{faq.q}</h3>
                <span className={`${accentText} transition-transform group-open:rotate-45 text-xl leading-none`}>+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
