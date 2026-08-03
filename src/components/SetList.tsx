import Image from "next/image";
import { setListCategories } from "@/lib/data";
import WildflowerRule from "./WildflowerRule";

/* The marks are stored white-on-transparent so a CSS mask can pour each
   card's accent through them — same file works in wine or gold. */
function MaskedLogo({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`block bg-current ${className}`}
      style={{
        maskImage: `url('${src}')`,
        WebkitMaskImage: `url('${src}')`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

const icons = [
  // The Rumours-era wordmark
  <MaskedLogo
    key="mac-logo"
    src="/logos/fleetwood-mac.png"
    label="Fleetwood Mac"
    className="h-[22px] w-[104px]"
  />,
  /* The winged-heart logo keeps its own red and cream — tinting it gold would
     lose the mark, so it opts out of the accent system. */
  <Image
    key="petty-logo"
    src="/logos/tom-petty-heartbreakers.png"
    alt="Tom Petty and the Heartbreakers"
    width={288}
    height={153}
    unoptimized
    className="h-8 w-auto"
  />,
  // The Bella Donna script beside Petty's signature
  <div key="solo-logos" className="flex items-center gap-4">
    <MaskedLogo
      src="/logos/stevie-nicks.png"
      label="Stevie Nicks"
      className="h-7 w-[69px]"
    />
    <MaskedLogo
      src="/logos/tom-petty-solo.png"
      label="Tom Petty"
      className="h-7 w-[49px]"
    />
  </div>,
];

/*
 * Each act keeps its own voice: wine for Fleetwood Mac, gold for Tom Petty.
 * The Solo Years card braids both — Nicks and Petty away from their bands, and
 * the record that put them on the same mic.
 */
const accents = [
  {
    icon: "text-wine-300",
    bloom: "text-wine-300/70",
    bar: "bg-gradient-to-r from-wine-400 to-wine-300/20",
    hoverBorder: "hover:border-wine-300/35",
  },
  {
    icon: "text-gold-400",
    bloom: "text-gold-400/70",
    bar: "bg-gradient-to-r from-gold-500 to-gold-400/20",
    hoverBorder: "hover:border-gold-500/35",
  },
  {
    icon: "text-gold-300",
    bloom: "text-graphite/70",
    bar: "bg-gradient-to-r from-wine-400 via-gold-400 to-wine-400",
    hoverBorder: "hover:border-gold-500/35",
  },
];

export default function SetList() {
  return (
    <section id="setlist" className="bg-noir-950 py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center md:mb-12">
          <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            The Catalog
          </p>
          <h2 className="mt-3 font-heading text-3xl text-cream md:text-4xl">
            The Set List
          </h2>
          <WildflowerRule className="mx-auto mt-5 h-auto w-[260px] text-graphite/60 md:mt-6 md:w-[320px]" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {setListCategories.map((category, i) => (
            <div
              key={category.title}
              className={`overflow-hidden rounded-sm border border-noir-700/80 bg-noir-900/70 transition-all duration-500 ${accents[i].hoverBorder}`}
            >
              <div className={`h-px ${accents[i].bar}`} />

              <div className="p-6 md:p-8">
                {/* Fixed row height: the marks range from 22px to 32px tall,
                    and the titles below must sit level across the grid. */}
                <div className={`${accents[i].icon} mb-4 flex h-8 items-center justify-center md:mb-6`}>
                  {icons[i]}
                </div>

                <h3 className="font-heading text-xl text-cream">
                  {category.title}
                </h3>
                <p className="mt-1 font-body text-sm text-cream/40">
                  {category.description}
                </p>

                <div className="my-5 h-px bg-gradient-to-r from-noir-700 to-transparent md:my-6" />

                <ul className="space-y-3">
                  {category.songs.map((song) => (
                    <li
                      key={song}
                      className="flex items-start gap-3 font-body text-base text-cream/80"
                    >
                      <WildflowerRule
                        variant="bloom"
                        className={`mt-1 shrink-0 ${accents[i].bloom}`}
                      />
                      {song}
                    </li>
                  ))}
                  {/* No bloom — this is a note about the list, not another song. */}
                  <li className="flex items-start gap-3 font-body text-base italic text-cream/35">
                    <span className="w-[11px] shrink-0" aria-hidden="true" />
                    &hellip;and more
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-sm text-cream/40 md:mt-12">
          A sampling only — the songbook runs deep across both catalogs and the
          solo years, and we&rsquo;ll build a set list around your event.
        </p>
      </div>
    </section>
  );
}
