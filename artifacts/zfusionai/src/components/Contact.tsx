import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
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
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone"),
  service: z.string().min(1, "Please select a service"),
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
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const watchedService = watch("service");

  const onSubmit = async (data: FormValues) => {
    try {
      await emailjs.send(
        'service_n0r67hf',
        'template_3ug43fc',
        {
          logo: "https://zfusionai.info/logo.png",
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          reply_to: data.email,
        },
        'ry0JB8inWV59UgCnE'
      );

      toast.success("Inquiry sent successfully", {
        description: `Thanks ${data.name.split(" ")[0]} — we’ll contact you within one business day.`,
      });

      reset();
    } catch (error) {
      toast.error("Failed to send inquiry", {
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block text-sm uppercase tracking-[0.2em] text-primary mb-4">
              Contact
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Let's talk business
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Tell us about your project. Websites, apps, AI systems or
              automation platforms — we’re ready.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Office</p>
                  <p className="text-white font-medium">Dubai, UAE</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a
                    href="tel:+971554712353"
                    className="text-white font-medium hover:text-primary"
                  >
                    +971 55 471 2353
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:support@zfusionai.info"
                    className="text-white font-medium hover:text-primary"
                  >
                    support@zfusionai.info
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="text-white font-medium">
                    Mon - Fri · 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                    className="h-12 bg-background/60 border-white/10 text-white"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="Your email"
                    className="h-12 bg-background/60 border-white/10 text-white"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
              <Input
                {...register("phone")}
                placeholder="Phone number"
                className="h-12 bg-background/60 border-white/10 text-white"
              />
              <label className="block text-sm font-medium text-white mb-2">
                  Services
                </label>
              <Select
                value={watchedService}
                onValueChange={(v) =>
                  setValue("service", v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-12 bg-background/60 border-white/10 text-white">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>

                <SelectContent>
                  {services.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.service && (
                <p className="text-xs text-red-400 -mt-3">
                  {errors.service.message}
                </p>
              )}
              <label className="block text-sm font-medium text-white mb-2">
                  Message
              </label>
              <Textarea
                {...register("message")}
                rows={6}
                placeholder="Tell us about your project..."
                className="bg-background/60 border-white/10 text-white resize-none"
              />

              {errors.message && (
                <p className="text-xs text-red-400 -mt-3">
                  {errors.message.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-full bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
                {!isSubmitting && (
                  <ArrowRight className="ml-2 h-5 w-5" />
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We respond within one business day.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}