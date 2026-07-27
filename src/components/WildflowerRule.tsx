/*
 * The house mark, pulled straight out of the logo's wreath: a hairline stem with a
 * few leaves and one cosmos bloom whose heart is gold. Gold dust, wildflower — the
 * whole band name in one drawing, so it earns its place as the section divider.
 *
 * Strokes are currentColor so callers set the mood; only the bloom's heart is
 * pinned to gold. Petal dimensions are jittered by hand — evenly generated petals
 * read as clip art, and this mark has to look drawn.
 */

/** Petals sit clear of the calyx ring so the gold heart stays legible when small. */
const PETAL_INSET = 3.9;

const PETALS = [
  { angle: 0, rx: 1.45, ry: 5.1 },
  { angle: 35, rx: 1.55, ry: 4.7 },
  { angle: 73, rx: 1.4, ry: 5.3 },
  { angle: 108, rx: 1.5, ry: 4.9 },
  { angle: 144, rx: 1.45, ry: 5.2 },
  { angle: 181, rx: 1.6, ry: 4.6 },
  { angle: 217, rx: 1.4, ry: 5.1 },
  { angle: 252, rx: 1.5, ry: 4.8 },
  { angle: 289, rx: 1.45, ry: 5.3 },
  { angle: 324, rx: 1.55, ry: 4.7 },
];

const LEAF = "M0 0 C -1.7 -2.3, -1.5 -5.3, 0.6 -7.5 C 2.5 -5.1, 2.2 -2, 0 0 Z";
const LEAF_VEIN = "M0 -0.5 C 0.2 -2.7, 0.4 -5.1, 0.6 -7";

function Leaf({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(1.5)`}>
      <path d={LEAF} />
      <path d={LEAF_VEIN} strokeWidth={0.5} opacity={0.6} />
    </g>
  );
}

export default function WildflowerRule({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "bloom";
  className?: string;
}) {
  /*
   * At bullet size a ten-petal daisy turns to mush, so the list marker keeps only
   * the part that carries the meaning: the gold heart inside its ring.
   */
  if (variant === "bloom") {
    return (
      <svg
        viewBox="0 0 12 12"
        width={11}
        height={11}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
        className={className}
      >
        <circle cx={6} cy={6} r={2.4} fill="var(--color-gold-400)" stroke="none" />
        <circle cx={6} cy={6} r={4.6} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 34"
      width={320}
      height={34}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Two uneven strokes running into the bloom — never a straight border rule */}
      <path d="M6 19.6 C 46 17.5, 84 19.6, 122 17.9 C 133 17.4, 141 17.2, 146 17.1" />
      <path d="M174 17.1 C 180 17.2, 189 17.5, 200 18 C 238 19.7, 275 17.6, 314 19.5" />

      {/* Leaves alternate above and below the stem, the way they do in the wreath */}
      <Leaf x={62} y={18.7} angle={-38} />
      <Leaf x={101} y={18.6} angle={206} />
      <Leaf x={220} y={18.5} angle={148} />
      <Leaf x={258} y={18.7} angle={32} />

      <g transform="translate(160 17)">
        {PETALS.map((petal) => (
          <ellipse
            key={petal.angle}
            cx={0}
            cy={-(petal.ry + PETAL_INSET)}
            rx={petal.rx}
            ry={petal.ry}
            transform={`rotate(${petal.angle})`}
          />
        ))}
        <circle cx={0} cy={0} r={2.2} fill="var(--color-gold-400)" stroke="none" />
        <circle cx={0} cy={0} r={3.3} />
      </g>
    </svg>
  );
}
