import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";

const cols = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Why ZFusionAI", href: "/about" },
      { name: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Development", href: "/services#ai-development" },
      { name: "Website Development", href: "/services#web-development" },
      { name: "Mobile Apps", href: "/services#mobile-apps" },
      { name: "Automation", href: "/services#business-automation" },
      { name: "Cloud Services", href: "/services#cloud-deployment" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Contact", href: "/contact" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  const [location, setLocation] = useLocation();

  const handleHashLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };
    if (location === targetPath) {
      scrollToHash();
    } else {
      setLocation(targetPath);
      setTimeout(scrollToHash, 250);
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/">
              <div className="flex items-center gap-2.5 mb-5 cursor-pointer">
                <div className="relative h-14 w-14 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
                  <img
                    src="/brand/logo_compressed.png"
                    alt="ZFusionAI"
                    className="relative h-full w-full object-contain drop-shadow-[0_0_10px_rgba(255,122,0,0.5)]"
                  />
                </div>
                <img
                  src="/brand/wordmark_compressed.png"
                  alt="ZFusionAI"
                  className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,122,0,0.4)]"
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Custom AI, websites, apps and automation for businesses in Dubai,
              UAE. We build the systems your business actually needs to scale.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href="mailto:support@zfusionai.info"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" /> support@zfusionai.info
              </a>
              <a
                href="tel:+971554712353"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" /> +971 55 471 2353
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Dubai, UAE
              </div>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {link.href.includes("#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleHashLink(e, link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-left cursor-pointer inline-block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span className="text-sm text-muted-foreground hover:text-primary transition-colors text-left cursor-pointer inline-block">
                          {link.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Service Areas
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Dubai</li>
              <li>Abu Dhabi</li>
              <li>Sharjah</li>
              <li>Ajman</li>
              <li>Ras Al Khaimah</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground text-center">
          <div className="flex gap-6">
            <Link href="/privacy">
              <span className="hover:text-primary transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span className="hover:text-primary transition-colors cursor-pointer">
                Terms & Conditions
              </span>
            </Link>
          </div>
          <div>© 2026 ZFusionAI. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
