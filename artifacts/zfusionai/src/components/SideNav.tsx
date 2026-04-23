import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "HOME" },
  { id: "services", label: "SERVICES" },
  { id: "process", label: "HOW WE WORK" },
  { id: "pricing", label: "PRICING" },
  { id: "contact", label: "CONTACT" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group relative flex items-center justify-end"
            aria-label={label}
          >
            <span
              className={`absolute right-7 text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 pointer-events-none whitespace-nowrap rounded-md bg-card/95 backdrop-blur px-2 py-1 border border-white/10 ${
                isActive ? "text-primary" : "text-white"
              }`}
            >
              {label}
            </span>
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-1.5 h-12 bg-primary shadow-[0_0_12px_rgba(255,122,0,0.6)]"
                  : "w-1 h-7 bg-white/30 group-hover:bg-white/70 group-hover:h-9"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
