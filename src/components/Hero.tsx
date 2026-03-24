import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background band photo */}
      <Image
        src="/band-photo.jpg"
        alt="Gypsy Falling Band performing live"
        fill
        className="object-cover object-[center_calc(50%-40px)]"
        priority
        quality={85}
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-noir-950" />

      {/* Radial spotlight effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(184, 134, 11, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        {/* Decorative top line */}
        <div className="w-24 h-px bg-gold-400 mx-auto mb-8 opacity-60" />

        <p className="font-body text-gold-300 text-sm md:text-base tracking-[0.3em] uppercase mb-6">
          Nashville, Tennessee
        </p>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream tracking-wide leading-[1.1]">
          GYPSY
          <br />
          <span className="text-gold-400">FALLING</span>
        </h1>

        <div className="divider-gold max-w-xs mx-auto my-8" />

        <p className="font-body text-lg md:text-xl text-gold-200/80 max-w-2xl mx-auto leading-relaxed mb-12">
          Nashville&apos;s Premier Tribute to the Legends of
          <br className="hidden sm:block" />
          <span className="text-cream font-medium">
            Fleetwood Mac
          </span>{" "}
          and{" "}
          <span className="text-cream font-medium">Tom Petty</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#booking"
            className="inline-flex items-center justify-center bg-gold-500 text-noir-950 font-body font-bold text-base tracking-wide px-10 py-4 rounded transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(184,134,11,0.3)]"
          >
            Book the Band
          </a>
          <a
            href="#setlist"
            className="inline-flex items-center justify-center border-2 border-cream/40 text-cream font-body font-medium text-base tracking-wide px-10 py-4 rounded transition-all duration-300 hover:border-cream hover:bg-cream/5"
          >
            View the Set List
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-body">
            Scroll
          </span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
