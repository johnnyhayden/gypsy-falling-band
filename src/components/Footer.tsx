export default function Footer() {
  return (
    <footer className="bg-noir-950 border-t border-noir-800 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-heading text-2xl tracking-[0.15em] text-cream mb-2">
              GYPSY <span className="text-gold-400">FALLING</span>
            </p>
            <p className="font-body text-sm text-cream/40">
              Nashville, Tennessee
            </p>
          </div>

          {/* Social + contact */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/pettynicksofnash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/50 hover:text-gold-400 transition-colors duration-300"
                aria-label="Follow us on Instagram @pettynicksofnash"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:johnnyhayden+pettynicks@gmail.com"
                className="text-cream/50 hover:text-gold-400 transition-colors duration-300"
                aria-label="Email us"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            <p className="font-body text-xs text-cream/30">
              @pettynicksofnash
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-8 opacity-30" />

        {/* Copyright */}
        <p className="font-body text-xs text-cream/30 text-center">
          &copy; {new Date().getFullYear()} Gypsy Falling Band. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
