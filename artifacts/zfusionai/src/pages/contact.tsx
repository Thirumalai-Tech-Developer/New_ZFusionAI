import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/Contact";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";

const faqs = [
  {
    q: "How do we start the process?",
    a: "We begin with a free 30-minute discovery call to understand your business goals. If there's a fit, we follow up with a technical proposal and a clear roadmap."
  },
  {
    q: "What information do you need for an accurate quote?",
    a: "A high-level feature list, any existing systems we need to integrate with, and your ideal timeline. If you don't have a spec, we can help you build one during a scoping phase."
  },
  {
    q: "What is your typical response time?",
    a: "We respond to all new inquiries within one business day. Active clients get access to a dedicated Slack/Teams channel for real-time communication."
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. We are happy to sign a mutual Non-Disclosure Agreement before discussing any sensitive intellectual property."
  }
];

export default function ContactPage() {
  useSEO("Contact Us | ZFusionAI", "Get in touch with ZFusionAI for custom software and AI development in Dubai.");

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/contact-hero.png" 
            alt="Network Visual" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4 font-semibold">Contact Us</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Let's Build Something <span className="text-primary">Great</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below, and an engineering lead will review your requirements and reach out within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <div className="bg-background">
        <ContactForm />
      </div>

      {/* Trust Strip */}
      <section className="py-16 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-8 font-semibold">Why Teams Choose Us</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <span className="text-white font-medium text-lg">100% In-house Code</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <span className="text-white font-medium text-lg">Dubai Based Team</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <span className="text-white font-medium text-lg">Enterprise Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Engagement FAQ</h2>
            <p className="text-muted-foreground">Common questions about working with us.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </PageLayout>
  );
}
