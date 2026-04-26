import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Industries", href: "/industries" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-2xl ${
          isScrolled
            ? "bg-white/1 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0">
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/brand/logo_compressed.png"
                  alt="ZFusionAI"
                  className="relative h-full w-full object-contain drop-shadow-[0_0_10px_rgba(255,122,0,0.5)]"
                />
              </div>
              <img
                src="/brand/wordmark_compressed.png"
                alt="ZFusionAI"
                className="h-20 md:h-20 lg:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,122,0,0.4)]"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`text-sm font-medium cursor-pointer transition-colors ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Link href="/contact" className="inline-flex">
              <Button
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-5 xl:px-6 shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] transition-all duration-300 group"
              >
                Get Proposal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold cursor-pointer transition-colors ${
                      location === link.href ? "text-primary" : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <Link href="/contact" className="w-full inline-flex justify-center mt-4">
                <Button
                  size="lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,122,0,0.3)]"
                >
                  Get Proposal
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
