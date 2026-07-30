"use client";

import { useState, useEffect } from "react";
import { band, navLinks } from "@/lib/data";
import Wordmark from "./Wordmark";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-500/10 bg-noir-950/95 py-3 backdrop-blur-md"
          : // A scrim rather than nothing — over the hero photo the wordmark has to
            // sit on something, and the corrugated backdrop is bright in places.
            // On a phone the bar rides 15px higher: the photo starts at the top of
            // the frame there, so every pixel the wordmark climbs is a pixel further
            // off the back row's faces.
            "bg-gradient-to-b from-noir-950/80 to-transparent pb-5 pt-[5px] sm:pt-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          className="text-cream transition-colors hover:text-gold-300"
          aria-label={`${band.name} — back to top`}
        >
          {/* Eighteen characters against the thirteen the bar was last sized for, so
              the mark steps back down a size — at md the four links and the Instagram
              icon start at the halfway mark, and the old text-lg ran into them. */}
          <Wordmark className="text-xs sm:text-sm md:text-base" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-[0.15em] text-cream/70 transition-colors duration-300 hover:text-gold-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={band.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/70 transition-colors hover:text-gold-300"
            aria-label={`Instagram ${band.instagram}`}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="text-cream transition-colors hover:text-gold-300 md:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 top-0 flex flex-col items-center justify-center gap-8 bg-noir-950/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-6 top-6 text-cream transition-colors hover:text-gold-300"
          aria-label="Close menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <Wordmark className="mb-4 text-lg text-cream" />

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-heading text-2xl text-cream transition-colors hover:text-gold-300"
          >
            {link.label}
          </a>
        ))}

        <a
          href={band.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-cream/70 transition-colors hover:text-gold-300"
          aria-label={`Instagram ${band.instagram}`}
        >
          <InstagramIcon className="h-7 w-7" />
        </a>
      </div>
    </nav>
  );
}
