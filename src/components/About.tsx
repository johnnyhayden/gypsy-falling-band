import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative bg-noir-900 py-24 md:py-32 overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a017' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section label */}
        <p className="text-gold-400 text-sm tracking-[0.3em] uppercase font-body font-medium mb-4">
          The Story
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-16">
          Nashville Pedigree,
          <br />
          <span className="text-gold-400">Arena-Ready Sound</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div className="space-y-6">
            <p className="font-body text-lg md:text-xl text-cream/90 leading-relaxed">
              Recreating the band&apos;s legendary persona, from period-accurate
              equipment to spot-on characterizations and musical performances.
              Gypsy Falling takes you back to a time when music was still an unbridled
              cultural experience and bands weren&apos;t afraid to put on a show.
            </p>

            <div className="divider-gold max-w-[200px] my-8" />

            <p className="font-body text-base md:text-lg text-cream/70 leading-relaxed">
              This isn&apos;t a hobby group. With collective decades of
              professional performance experience on Nashville stages and beyond,
              Gypsy Falling Band brings an authenticity that audiences feel from
              the first note — the unmistakable 12-string jangle, soaring
              three-part harmonies, and a deep, reverent respect for the source
              material.
            </p>

            <p className="font-body text-base md:text-lg text-cream/70 leading-relaxed">
              Relive the rock and roll magic with Gypsy Falling Band.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-noir-700">
              <div>
                <p className="font-heading text-3xl md:text-4xl text-gold-400">
                  6
                </p>
                <p className="font-body text-sm text-cream/50 mt-1">
                  Musicians
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl text-gold-400">
                  2
                </p>
                <p className="font-body text-sm text-cream/50 mt-1">
                  Legendary Acts
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl text-gold-400">
                  40+
                </p>
                <p className="font-body text-sm text-cream/50 mt-1">
                  Songs Deep
                </p>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="relative">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/band-photo.jpg"
                alt="Gypsy Falling Band"
                fill
                className="object-cover object-center"
              />
              {/* Gold border accent */}
              <div className="absolute inset-0 border border-gold-500/20 rounded-lg" />
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
