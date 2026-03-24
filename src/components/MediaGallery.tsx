import { videoPlaceholders, photoPlaceholders } from "@/lib/data";

export default function MediaGallery() {
  const gradients = [
    "from-wine-600/30 to-noir-800",
    "from-gold-500/20 to-noir-800",
    "from-wine-500/20 via-noir-800 to-gold-500/10",
    "from-noir-700 to-wine-600/20",
    "from-gold-500/15 to-wine-500/15",
    "from-wine-500/25 to-noir-900",
  ];

  return (
    <section id="media" className="bg-noir-950 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-gold-400 text-sm tracking-[0.3em] uppercase font-body font-medium mb-4">
          See &amp; Hear
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
          The <span className="text-gold-400">Experience</span>
        </h2>
        <p className="font-body text-lg text-cream/60 max-w-xl mb-16">
          From the &ldquo;Stop Draggin&rsquo; My Heart Around&rdquo; duet to
          high-energy anthems like &ldquo;The Chain&rdquo; — see what a Gypsy
          Falling show looks and sounds like.
        </p>

        {/* Video section */}
        <h3 className="font-heading text-2xl text-cream/80 mb-8">
          Featured Performances
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {videoPlaceholders.map((video, i) => (
            <div
              key={video.title}
              className="group relative aspect-video bg-noir-800 rounded-lg overflow-hidden border border-noir-700 hover:border-gold-500/30 transition-all duration-500"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-60`}
              />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400/60 flex items-center justify-center group-hover:bg-gold-500/30 group-hover:border-gold-400 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-gold-400 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-heading text-base text-cream">
                  {video.title}
                </p>
                <p className="font-body text-sm text-cream/50">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Photo gallery */}
        <h3 className="font-heading text-2xl text-cream/80 mb-8">
          Gallery
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photoPlaceholders.map((photo, i) => (
            <div
              key={photo.label}
              className={`group relative overflow-hidden rounded-lg border border-noir-700 hover:border-gold-500/30 transition-all duration-500 ${
                i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              {/* Gradient placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i]}`}
              />

              {/* Noise texture */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-body text-sm text-cream/30 uppercase tracking-widest">
                    {photo.type === "live" ? "Live Shot" : "Promo"}
                  </p>
                  <p className="font-heading text-lg text-cream/20 mt-1">
                    {photo.label}
                  </p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/5 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
