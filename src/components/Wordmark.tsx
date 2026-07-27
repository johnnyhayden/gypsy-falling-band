/*
 * The wordmark is the band's mark — there is no logo image. It is typeset, so it
 * scales to whatever slot it is dropped into and stays crisp over the photo.
 *
 * The two words split across the palette the same way the show does: the name in
 * cream, the second word in gold. Callers set the size.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading tracking-[0.1em] ${className}`}>
      GYPSY <span className="text-gold-400">FALLIN’</span>
    </span>
  );
}
