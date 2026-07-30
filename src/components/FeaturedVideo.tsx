"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { featuredVideo } from "@/lib/data";
import WildflowerRule from "./WildflowerRule";

/* Minimal typings for the parts of the IFrame API we touch. */
interface YTPlayer {
  setOption: (module: string, option: string, value: unknown) => void;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    config: {
      host: string;
      videoId: string;
      width: string;
      height: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady?: (event: { target: YTPlayer }) => void;
        onApiChange?: (event: { target: YTPlayer }) => void;
      };
    }
  ) => YTPlayer;
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const w = window as unknown as {
        YT?: YTNamespace & { Player?: unknown };
        onYouTubeIframeAPIReady?: () => void;
      };
      if (w.YT?.Player) {
        resolve(w.YT);
        return;
      }
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve(w.YT as YTNamespace);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export default function FeaturedVideo() {
  const [playing, setPlaying] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    let cancelled = false;
    let player: YTPlayer | undefined;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      /*
       * The API replaces this inner div with its iframe, so it lives inside a
       * React-owned wrapper that React never needs to reconcile against.
       */
      const target = document.createElement("div");
      mountRef.current.appendChild(target);
      player = new YT.Player(target, {
        host: "https://www.youtube-nocookie.com",
        videoId: featuredVideo.id,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, rel: 0 },
        events: {
          /*
           * No URL param can force captions off — cc_load_policy only forces
           * them on, and a viewer's sticky CC preference wins otherwise.
           * onApiChange fires when the captions module loads; deselecting the
           * track there (setOption over unloadModule — unload alone doesn't
           * stick, the sticky preference reloads it) is what turns them off.
           * Both module names, since it's "cc" on some player builds.
           */
          onApiChange: (event) => {
            for (const module of ["captions", "cc"]) {
              try {
                event.target.setOption(module, "track", {});
              } catch {
                /* module not loaded under this name */
              }
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [playing]);

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
            <div
              ref={mountRef}
              aria-label={featuredVideo.title}
              className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full"
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
