import PageLayout from "@/components/PageLayout";
import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introduction",
    body: `ZFusionAI ("we", "us", "our") respects your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have when interacting with our website zfusionai.info or our services.`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect information you voluntarily provide through contact forms, email, WhatsApp, or phone — typically your name, email address, phone number, company name and project details. We also collect basic technical data automatically (IP address, browser type, pages visited) to operate and improve the website.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use your information to respond to inquiries, deliver services, send proposals and invoices, provide ongoing support, improve our website, and comply with legal obligations. We do not sell your personal data to anyone.`,
  },
  {
    title: "4. Cookies & Analytics",
    body: `Our website may use essential cookies to function properly and analytics cookies (such as Google Analytics) to understand visitor behavior. You can disable cookies in your browser settings, though some features may not work as expected.`,
  },
  {
    title: "5. Data Sharing",
    body: `We share your data only with trusted third-party service providers required to operate our business (e.g., email, hosting, analytics, payment processing). These providers are bound by their own privacy policies and may not use your data for unrelated purposes. We may also disclose information when legally required.`,
  },
  {
    title: "6. Data Security",
    body: `We use industry-standard security measures to protect your information, including encryption in transit (HTTPS), access controls, and secure infrastructure. No method of transmission over the internet is 100% secure, but we work hard to protect your data.`,
  },
  {
    title: "7. Data Retention",
    body: `We retain your personal information only as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. Inquiry data not converted to a project is typically deleted within 12 months.`,
  },
  {
    title: "8. Your Rights",
    body: `You have the right to access, correct, or delete the personal data we hold about you, and to withdraw consent for marketing communications at any time. Send requests to support@zfusionai.info.`,
  },
  {
    title: "9. Children's Privacy",
    body: `Our services are intended for businesses and individuals over 18. We do not knowingly collect personal data from children.`,
  },
  {
    title: "10. International Transfers",
    body: `Your data may be processed and stored outside the UAE by our service providers. Where this happens, we ensure appropriate safeguards are in place.`,
  },
  {
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will post the updated date at the top of this page. Continued use of our website after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "12. Contact",
    body: `For privacy-related questions, contact support@zfusionai.info or +971 54 202 66 53.`,
  },
];

export default function PrivacyPage() {
  useSeo({
    title: "Privacy Policy | ZFusionAI",
    description: "How ZFusionAI collects, uses and protects your personal information.",
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
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Last updated: April 2026. We're committed to protecting your privacy and
              being transparent about how we handle your data.
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
