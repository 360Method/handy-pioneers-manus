/**
 * The small 360° mark used in the "delivered by Handy Pioneers" pills.
 *
 * This used to be a 20x20 PNG served off Manus's CDN. It is inline SVG now:
 * a mark this small has no business being a network request that can 403, and
 * currentColor lets it inherit whatever the pill is already coloured.
 */
export default function Method360Mark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="360 degrees"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {/* open ring, gap at the top right, with an arrowhead: a full sweep round the home */}
      <path d="M18.4 6.6a9 9 0 1 0 2.3 4.2" />
      <path d="M20.9 5.2v5.9h-5.9" strokeLinejoin="round" />
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontSize="7.4"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        360
      </text>
    </svg>
  );
}
