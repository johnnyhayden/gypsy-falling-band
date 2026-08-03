import Image from "next/image";
import { band } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-noir-800 bg-noir-950 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          <div className="text-center md:text-left">
            {/* Same inline cut as the navbar, a step larger the way the typeset mark
                it replaces was — the footer set it at text-lg/xl against the bar's
                text-xs/sm/base. Heights follow the bar's rule: match the width the
                type occupied, then take 15% back off, which lands it near 199/218px.
                Centred on its own under md, where the footer column stacks. */}
            {/* eager despite being below the fold: the navbar already fetched this
                exact URL, so lazy saves nothing — and Next tracks images by src, so
                a lazy entry here shadows the navbar's and trips the LCP warning. */}
            <Image
              src="/logo-inline.png"
              alt={band.name}
              width={512}
              height={88}
              loading="eager"
              unoptimized
              className="mx-auto h-[30px] w-auto md:mx-0 md:h-[33px]"
            />
            <p className="mt-2 font-body text-sm text-cream/40">{band.city}</p>
            {/* Spelled out, not just hung off the envelope icon — a promoter
                scanning the page should be able to read the booking address
                (or copy it) without hunting for a mailto. */}
            <a
              href={`mailto:${band.email}`}
              className="mt-1 inline-block font-body text-sm text-cream/40 transition-colors duration-300 hover:text-gold-300"
            >
              {band.email}
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <a
                href={band.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/50 transition-colors duration-300 hover:text-gold-300"
                aria-label={`Instagram ${band.instagram}`}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              <a
                href={`mailto:${band.email}`}
                className="text-cream/50 transition-colors duration-300 hover:text-gold-300"
                aria-label={`Email ${band.name}`}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            <p className="font-body text-xs text-cream/30">{band.instagram}</p>
          </div>
        </div>

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent md:my-8" />

        <p className="text-center font-body text-xs text-cream/30">
          &copy; {new Date().getFullYear()} {band.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
