/*
 * The typeset stand-in for the drawn lockup in the hero. The lockup is a full
 * three-part composition — name, chain rule, tribute line — and below about 40px
 * tall its hairline outlines and small-caps tagline stop resolving, so the navbar
 * and the footer set the name instead of shrinking the artwork past legibility.
 *
 * Cream throughout, with no second colour: the lockup carries no gold, and a gold
 * word here would contradict the mark this is standing in for. Both call sites put
 * hover:text-gold-300 on the wrapping anchor, so the accent still arrives on hover.
 *
 * Callers set the size.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading tracking-[0.1em] ${className}`}>
      FLEETWOOD MUSIC CITY
    </span>
  );
}
