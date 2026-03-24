import { setListCategories } from "@/lib/data";

const icons = [
  // Vinyl for Mac
  <svg key="vinyl" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="6" strokeWidth={1.5} strokeDasharray="2 3" />
  </svg>,
  // Lightning bolt for Petty
  <svg key="bolt" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Microphone for Duets
  <svg key="mic" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 1a4 4 0 00-4 4v6a4 4 0 008 0V5a4 4 0 00-4-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 10v1a7 7 0 01-14 0v-1M12 18v4m-3 0h6" />
  </svg>,
];

export default function SetList() {
  return (
    <section id="setlist" className="bg-noir-900 py-24 md:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--color-gold-500) 0px, var(--color-gold-500) 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold-400 text-sm tracking-[0.3em] uppercase font-body font-medium mb-4">
            The Catalog
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream">
            Our <span className="text-gold-400">Set List</span>
          </h2>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {setListCategories.map((category, i) => (
            <div
              key={category.title}
              className="group bg-noir-800/80 border border-noir-700 rounded-xl p-8 hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/[0.03] group-hover:to-transparent transition-all duration-500" />

              <div className="relative">
                {/* Icon */}
                <div className="text-gold-400 mb-6">{icons[i]}</div>

                {/* Title */}
                <h3 className="font-heading text-2xl text-gold-400 mb-2">
                  {category.title}
                </h3>
                <p className="font-body text-sm text-cream/40 mb-6">
                  {category.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-gold-500/40 to-transparent mb-6" />

                {/* Songs */}
                <ul className="space-y-3">
                  {category.songs.map((song) => (
                    <li
                      key={song}
                      className="font-body text-base text-cream/80 flex items-start gap-3"
                    >
                      <span className="text-gold-500 mt-1.5 text-xs">&#9830;</span>
                      {song}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-body text-sm text-cream/40 mt-12">
          This is a sampling of our catalog — we perform 30+ songs across both
          legendary acts. Custom set lists available for your event.
        </p>
      </div>
    </section>
  );
}
