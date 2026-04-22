import { motion } from "framer-motion";
import { Brain, Globe, Smartphone, Workflow, Cloud, Headset } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Development",
    description: "Custom artificial intelligence solutions to automate complex processes and extract insights from your data.",
    features: ["Machine Learning Models", "NLP & Chatbots", "Computer Vision", "Predictive Analytics", "OpenAI/LLM Integration"],
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Website Development",
    description: "High-performance, scalable web applications built with modern frameworks for exceptional user experiences.",
    features: ["React / Next.js Frontends", "Scalable Backends", "E-commerce Platforms", "SaaS Applications", "Web Portals"],
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications designed for engagement and retention.",
    features: ["iOS & Android Apps", "React Native / Flutter", "App UI/UX Design", "API Integration", "App Store Optimization"],
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: "Business Automation",
    description: "Streamline operations with custom software that connects your existing tools and eliminates manual work.",
    features: ["Workflow Optimization", "Custom ERP/CRM", "API Integrations", "Data Synchronization", "RPA Solutions"],
  },
  {
    icon: <Cloud className="h-8 w-8" />,
    title: "Cloud & Deployment",
    description: "Secure, scalable cloud infrastructure tailored to your application's specific performance needs.",
    features: ["AWS / Azure / GCP", "Serverless Architecture", "Docker & Kubernetes", "CI/CD Pipelines", "Database Optimization"],
  },
  {
    icon: <Headset className="h-8 w-8" />,
    title: "Support & Maintenance",
    description: "Long-term partnership ensuring your software remains secure, updated, and performing optimally.",
    features: ["24/7 Monitoring", "Security Updates", "Performance Tuning", "Bug Fixes", "Feature Enhancements"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Engineering <span className="text-primary">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We don't just write code; we build scalable, secure, and high-performance systems that drive measurable business outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden group relative">
                {/* Top Glowing Border Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-8 relative z-10 flex flex-col h-full">
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-flex text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-grow">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
