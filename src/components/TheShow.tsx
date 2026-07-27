import WildflowerRule from "./WildflowerRule";

export default function TheShow() {
  return (
    <section id="show" className="bg-noir-900 py-14 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
          The Show
        </p>

        <p className="mt-4 font-heading text-2xl leading-snug text-cream md:mt-5 md:text-4xl">
          Gypsy Fallin’ celebrates the music of{" "}
          <span className="text-wine-300">Fleetwood Mac</span> and{" "}
          <span className="text-gold-300">Tom Petty</span> in one live show.
        </p>

        <WildflowerRule className="mx-auto my-8 h-auto w-[260px] text-graphite/55 md:my-10 md:w-[300px]" />

        <p className="font-body text-base leading-relaxed text-cream/75 md:text-lg">
          Fleetwood Mac is at the heart of what we do, with strong female
          vocals, layered harmonies, and the songs that made the band timeless.
          We also bring a substantial set of Tom Petty favorites, adding more
          energy, variety, and rock-and-roll drive to the show.
        </p>

        {/* The callout is the hinge between the two catalogs, so the rule beside it
            runs wine into gold — the same act-keyed pairing used everywhere else. */}
        <blockquote className="relative my-8 pl-7 md:my-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-wine-400 via-wine-300 to-gold-400"
          />
          <p className="font-heading text-xl italic leading-relaxed text-cream/90 md:text-2xl">
            From the harmonies of Fleetwood Mac to the unmistakable hooks of Tom
            Petty, the two catalogs come together naturally in a show filled
            with songs audiences already know and love.
          </p>
        </blockquote>

        <p className="font-body text-base leading-relaxed text-cream/75 md:text-lg">
          Gypsy Fallin’ focuses on the sound and feel of the music
          rather than impersonation. We are experienced musicians bringing these
          songs to life with authentic vocals, thoughtful arrangements, and
          respect for what made them great.
        </p>
      </div>
    </section>
  );
}
