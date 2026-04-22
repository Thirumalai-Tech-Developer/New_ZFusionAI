import PageLayout from "@/components/PageLayout";
import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Agreement to Terms",
    body: `By accessing or using zfusionai.info and any services provided by ZFusionAI ("we", "us", "our"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.`,
  },
  {
    title: "2. Services",
    body: `ZFusionAI provides custom AI development, web development, mobile application development, business automation, cloud deployment and ongoing support services. The exact scope, deliverables, timeline and price for each engagement are defined in a separate written proposal or statement of work.`,
  },
  {
    title: "3. Pricing & Payments",
    body: `Website development packages start at AED 599 and may vary based on project scope, hosting requirements, domain registration, third-party services, and any premium integrations. Hosting and domain costs are billed at cost without markup. Unless otherwise agreed in writing, projects require 50% payment upfront and 50% on delivery. All prices are exclusive of VAT where applicable.`,
  },
  {
    title: "4. Project Timelines",
    body: `Estimated delivery timelines are provided in good faith and depend on timely client feedback, content delivery, and approvals. Delays caused by the client may extend the project timeline accordingly.`,
  },
  {
    title: "5. Revisions & Change Requests",
    body: `Each package includes a defined number of revision rounds. Additional revisions or changes outside the agreed scope will be quoted separately at our standard hourly rate.`,
  },
  {
    title: "6. Intellectual Property",
    body: `Upon full payment, ownership of the final delivered work transfers to the client, excluding third-party assets, libraries and tools that retain their original licenses. ZFusionAI reserves the right to display completed work in its portfolio and marketing materials unless explicitly restricted in writing.`,
  },
  {
    title: "7. Confidentiality",
    body: `Both parties agree to keep confidential any non-public information shared during the engagement. We are happy to sign a Non-Disclosure Agreement (NDA) before discussing sensitive project details.`,
  },
  {
    title: "8. Hosting & Third-Party Services",
    body: `Clients are responsible for paying directly for any hosting provider, domain registrar, SaaS subscriptions, payment processors, or APIs used in connection with their project. We do not assume liability for third-party service outages, price changes, or policy changes.`,
  },
  {
    title: "9. Warranty & Support",
    body: `We warrant our work to be free from material defects for 30 days post-delivery and will fix any qualifying bugs at no cost. Support beyond 30 days is offered through optional support packages. We do not warrant uninterrupted, error-free operation in all environments.`,
  },
  {
    title: "10. Limitation of Liability",
    body: `To the maximum extent permitted by law, ZFusionAI's total liability for any claim arising out of or relating to our services shall not exceed the total amount paid by the client for that specific project. We are not liable for indirect, incidental, or consequential damages.`,
  },
  {
    title: "11. Termination",
    body: `Either party may terminate an engagement with written notice. The client remains responsible for payment of all work completed up to the termination date. Pre-paid amounts for work not yet performed will be refunded pro-rata.`,
  },
  {
    title: "12. Governing Law",
    body: `These Terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai. Any disputes shall be resolved in the courts of Dubai, UAE.`,
  },
  {
    title: "13. Changes to Terms",
    body: `We may update these Terms from time to time. Continued use of our website or services after changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "14. Contact",
    body: `Questions about these Terms can be sent to support@zfusionai.info or +971 54 202 66 53.`,
  },
];

export default function TermsPage() {
  useSeo({
    title: "Terms & Conditions | ZFusionAI",
    description:
      "Terms and conditions governing the use of ZFusionAI services and website.",
  });

  return (
    <PageLayout>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              Legal
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-5 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Last updated: April 2026. Please read these terms carefully before engaging
              ZFusionAI for any service.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {s.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
