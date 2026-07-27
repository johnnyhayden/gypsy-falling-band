"use client";

import { useState } from "react";
import Image from "next/image";
import { featuredVideo } from "@/lib/data";
import WildflowerRule from "./WildflowerRule";

export default function FeaturedVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="bg-noir-950 py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center md:mb-10">
          <p className="font-body text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Watch
          </p>
          <h2 className="mt-3 font-heading text-3xl text-cream md:text-4xl">
            Hear it for yourself
          </h2>
          <WildflowerRule className="mx-auto mt-5 h-auto w-[260px] text-graphite/60 md:mt-6 md:w-[320px]" />
        </div>

        <div className="relative aspect-video overflow-hidden rounded-sm border border-noir-700 bg-noir-900">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?autoplay=1&rel=0`}
              title={featuredVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            /*
             * Click-to-play poster rather than a live iframe: YouTube's player pulls
             * roughly a megabyte on load, and this way the play control matches the
             * rest of the page instead of arriving in YouTube's red.
             */
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${featuredVideo.title}`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src={`https://i.ytimg.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-noir-950/20" />

              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/70 bg-noir-950/40 backdrop-blur-[2px] transition-all duration-300 group-hover:border-gold-300 group-hover:bg-noir-950/60 group-hover:shadow-[0_0_40px_rgba(212,160,23,0.3)]">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-gold-300"
                  aria-hidden="true"
                >
                  <path d="M6 3.6 20 12 6 20.4z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <p className="mt-5 text-center font-body text-sm text-cream/45">
          {featuredVideo.title}
        </p>
      </div>
    </section>
  );
}
