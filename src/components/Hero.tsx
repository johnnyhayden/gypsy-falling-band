import Image from "next/image";
import { band } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/*
       * The band photo is square, so a full-bleed cover crop eats the outer two
       * players on a phone. Below the hero-over switch it gets its own band at the
       * top, on a fixed aspect so the strip is always deep enough to hold every
       * face — capped at 900px and faded at the edges, so a wide window doesn't
       * force a letterbox slot too shallow for the heads. Above the switch it goes
       * full-bleed behind the mark as intended.
       */}
      <div className="relative mx-auto aspect-[1.2/1] w-full shrink-0 sm:aspect-[2.9/1] sm:max-w-[900px] min-[901px]:[mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)] hero-over:absolute hero-over:inset-0 hero-over:aspect-auto hero-over:max-w-none hero-over:[mask-image:none]">
        <Image
          src="/band-photo-july2026.jpg"
          alt="Gold Dust & Wildflowers"
          fill
          className="object-cover object-top sm:object-[center_2%] hero-over:object-top"
          priority
          quality={85}
          sizes="100vw"
        />

        {/* Duotone: plum through the shadows, warm gold in the highlights, so the
            black-and-white photograph joins the palette instead of sitting outside it */}
        <div className="absolute inset-0 bg-wine-600 opacity-30 mix-blend-color" />
        <div className="absolute inset-0 bg-gold-500 opacity-[0.18] mix-blend-overlay" />

        <div className="absolute inset-0 bg-gradient-to-b from-noir-950/60 via-transparent to-noir-950 hero-over:from-noir-950/75 hero-over:via-noir-950/50" />

        {/* A soft pool of shade under the mark — a torso-height backdrop is still busy
            for hairline line art, and the drop shadow alone can't hold it up. Centred
            on the mark's new lower position so it backs the logo instead of dimming
            the faces above it. */}
        <div
          className="absolute inset-0 hidden hero-over:block"
          style={{
            background:
              "radial-gradient(44% 38% at 50% 66%, rgba(11, 8, 16, 0.72) 0%, rgba(11, 8, 16, 0.35) 55%, transparent 78%)",
          }}
        />
      </div>

      <div className="gold-dust pointer-events-none absolute inset-0 z-[1] opacity-70" />

      {/* Tight vertical rhythm on phones: photo band plus mark plus both calls to
          action have to clear an 844px viewport without pushing the buttons under
          the fold, so everything scales up rather than down.
       *
       * Once the mark sits over the photo, every face in the frame is in its top
       * half — centering the mark drops it straight onto the singer standing
       * mid-frame. So there the stack is anchored to the bottom instead, which
       * lands the mark across the band's torsos and leaves all six faces clear. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-10 pt-6 text-center hero-over:min-h-[100svh] hero-over:justify-end hero-over:pb-[11svh] hero-over:pt-28">
        <p className="anim-rise font-body text-xs uppercase tracking-[0.34em] text-gold-300 hero-over:text-sm">
          {band.city}
        </p>

        <Image
          src="/gdw-logo.png"
          alt="Gold Dust & Wildflowers — a Fleetwood Mac and Tom Petty tribute band"
          width={1089}
          height={1122}
          priority
          className="anim-rise anim-delay-1 mt-5 h-auto w-[196px] drop-shadow-[0_0_36px_rgba(212,160,23,0.16)] sm:mt-6 sm:w-[200px] hero-over:mt-7 hero-over:w-[300px] xl:hero-over:w-[324px]"
        />

        <p className="anim-rise anim-delay-2 mt-5 max-w-md font-heading text-base italic leading-relaxed text-cream/80 sm:mt-6 sm:max-w-3xl hero-over:mt-8 hero-over:text-2xl">
          Two catalogs. Fleetwood Mac &amp; Tom Petty. Every song you already know.
        </p>

        <div className="anim-rise anim-delay-3 mt-7 flex gap-3 sm:gap-4 hero-over:mt-10">
          <a
            href="#video"
            className="inline-flex items-center justify-center rounded-sm bg-gold-500 px-5 py-3.5 font-body text-sm font-bold tracking-wide text-noir-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_36px_rgba(184,134,11,0.35)] sm:px-9 sm:py-4 sm:text-base"
          >
            Watch the band
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-sm border border-cream/35 px-5 py-3.5 font-body text-sm font-medium tracking-wide text-cream transition-all duration-300 hover:border-cream/70 hover:bg-cream/5 sm:px-9 sm:py-4 sm:text-base"
          >
            Book the band
          </a>
        </div>
      </div>
    </section>
  );
}
