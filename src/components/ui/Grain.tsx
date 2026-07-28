/**
 * One grain layer for the whole document. Never per-section, never per-pane.
 *
 * It sits above the panes in the stack (z-index 9999) so blurred surfaces
 * still carry texture instead of reading as plastic. If a pane looks plastic,
 * either the grain ended up underneath it or the pane fill opacity is too high.
 *
 * feTurbulence runs once when the browser rasterises this element. The stepped
 * animation translates the rasterised result and never re-runs the filter.
 * Movement, opacity and the compositor isolation are all in globals.css.
 */
export default function Grain() {
  return (
    <svg className="grain" aria-hidden="true" focusable="false">
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
