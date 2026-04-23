import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  "AI Development",
  "Website Development",
  "Mobile App",
  "Business Automation",
  "Cloud & Deployment",
  "Support & Maintenance",
  "Other / Not Sure",
];

const budgets = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
];

const serviceAreas = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "All UAE",
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Inquiry received", {
      description: `Thanks ${data.name.split(" ")[0]} — our team will respond within one business day.`,
    });
    reset();
  };

  const watchedService = watch("service");
  const watchedBudget = watch("budget");

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Contact
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Let's talk business
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Tell us about your project. Whether it's a website, app, AI system,
              or full automation platform — we'll respond within one business day.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Office</div>
                  <div className="text-white font-medium">Dubai, UAE</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <a
                    href="tel:+971554712353"
                    className="text-white font-medium hover:text-primary transition-colors"
                  >
                    +971 55 471 2353
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a
                    href="mailto:support@zfusionai.info"
                    className="text-white font-medium hover:text-primary transition-colors"
                  >
                    support@zfusionai.info
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Hours</div>
                  <div className="text-white font-medium">
                    Mon – Fri · 9:00 AM – 6:00 PM
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sat by appointment · Sun closed
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="text-sm text-muted-foreground mb-3">
                Service areas
              </div>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-white/10 bg-white/5 text-white"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-white/10 bg-card/40 backdrop-blur-sm p-6 md:p-10 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="Your full name"
                    className="bg-background/60 border-white/10 text-white h-12"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Company
                  </label>
                  <Input
                    {...register("company")}
                    placeholder="Company name"
                    className="bg-background/60 border-white/10 text-white h-12"
                  />
                  {errors.company && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="you@company.com"
                    className="bg-background/60 border-white/10 text-white h-12"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone
                  </label>
                  <Input
                    {...register("phone")}
                    placeholder="+971 ..."
                    className="bg-background/60 border-white/10 text-white h-12"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Service needed
                  </label>
                  <Select
                    value={watchedService}
                    onValueChange={(v) =>
                      setValue("service", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="bg-background/60 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.service.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Budget
                  </label>
                  <Select
                    value={watchedBudget}
                    onValueChange={(v) =>
                      setValue("budget", v, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="bg-background/60 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.budget.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={5}
                  className="bg-background/60 border-white/10 text-white resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1.5">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base shadow-[0_0_30px_rgba(255,122,0,0.4)] hover:shadow-[0_0_50px_rgba(255,122,0,0.6)] transition-all duration-300 group disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
                {!isSubmitting && (
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We respond within one business day. Mutual NDAs available on
                request.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
