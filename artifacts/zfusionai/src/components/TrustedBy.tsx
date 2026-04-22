export default function TrustedBy() {
  const logos = [
    { name: "Helix Labs", icon: <div className="text-2xl font-bold tracking-tighter">HELIX/LABS</div> },
    { name: "Northwind", icon: <div className="text-2xl font-semibold tracking-tight italic">northwind</div> },
    { name: "Cobalt", icon: <div className="text-xl font-semibold tracking-[0.3em]">COBALT</div> },
    { name: "Mira", icon: <div className="text-3xl font-light tracking-tight">m·ira</div> },
    { name: "Verda", icon: <div className="text-2xl font-serif italic">Verda &amp; Co.</div> },
    { name: "Stratum", icon: <div className="text-xl font-bold uppercase tracking-[0.25em]">Stratum</div> },
    { name: "Quanta", icon: <div className="text-2xl font-black tracking-tighter">QUANTA</div> },
    { name: "Loom", icon: <div className="text-2xl font-medium lowercase">/loom</div> },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          TRUSTED BY INNOVATIVE COMPANIES ACROSS THE UAE
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex whitespace-nowrap items-center min-w-full">
            {logos.map((logo, i) => (
              <div 
                key={`logo-1-${i}`} 
                className="mx-12 text-muted-foreground/40 hover:text-white/60 transition-colors duration-300 grayscale flex-shrink-0"
              >
                {logo.icon}
              </div>
            ))}
          </div>
          <div className="animate-marquee flex whitespace-nowrap items-center min-w-full absolute top-0">
            {logos.map((logo, i) => (
              <div 
                key={`logo-2-${i}`} 
                className="mx-12 text-muted-foreground/40 hover:text-white/60 transition-colors duration-300 grayscale flex-shrink-0"
              >
                {logo.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
}
