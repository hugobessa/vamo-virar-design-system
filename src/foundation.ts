// Platform-neutral design constants (no React or React Native imports), shared
// by the React Native kit (theme.ts, layout.ts) and the web kit (web/).

export const space = { xs: 4, s: 8, m: 12, l: 16, xl: 24, xxl: 40, huge: 72 };
export const radius = 12;
/** Minimum touch target (accessibility). */
export const touch = 48;
/** Shear applied to brand boxes and display type (guide: -11.3°). */
export const shear = "-11.3deg";

/** Motion durations (ms) and easings as CSS strings; theme.ts adds the React Native `Easing` functions. */
export const motionBase = {
  /** Hover, press, chip toggles. */
  fast: 120,
  /** Most transitions: a card appearing, a tab pill sliding. */
  base: 200,
  /** A section revealing, a banner sliding in. */
  slow: 320,
  /** One beat of a longer story (the phone demo, a counter filling). */
  story: 600,
  /** Gap between items that enter one after another. */
  stagger: 60,
  css: {
    out: "cubic-bezier(0.2, 0, 0, 1)",
    overshoot: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
};

/**
 * Font stacks for the web. The guide asks for Transducer (Condensed Black for
 * headlines, Extended Black for the wordmark and subtitles) and Gotham
 * (running text), all licensed Adobe Fonts. Barlow Condensed, Archivo and
 * Montserrat are open stand-ins; swap the names here once the licences are in.
 */
export const fontStacks = {
  /** Headlines: heavy and condensed, upper case, tight tracking. */
  condensed: '"Barlow Condensed", "Arial Narrow", Impact, sans-serif',
  /** Wordmark and subtitles: heavy and wide. */
  display: '"Archivo", "Arial Black", sans-serif',
  /** Running text and UI labels. */
  text: '"Montserrat", system-ui, -apple-system, "Segoe UI", sans-serif',
};

export const type = {
  display: { fontSize: 72, lineHeight: 66, fontWeight: "900" as const, letterSpacing: -1 },
  h1: { fontSize: 48, lineHeight: 46, fontWeight: "900" as const, letterSpacing: -0.5 },
  h2: { fontSize: 32, lineHeight: 32, fontWeight: "900" as const, letterSpacing: -0.25 },
  h3: { fontSize: 20, lineHeight: 26, fontWeight: "700" as const, letterSpacing: 0 },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" as const },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: "600" as const },
  small: { fontSize: 14, lineHeight: 20, fontWeight: "400" as const },
  eyebrow: { fontSize: 13, lineHeight: 16, fontWeight: "700" as const, letterSpacing: 2 },
};

export const SIDEBAR_WIDTH = 280;

/** Window widths (in points) at which the layout changes. */
export const breakpoints = {
  /** Below this the layout is a phone's: full width, stacked buttons, bottom sheets. */
  medium: 600,
  /** The content column (window minus sidebar) from which detail screens split in two and lists go two abreast. */
  wide: 900,
  /** The window from which the web app shows the sidebar. */
  sidebar: 1024,
};

/** Width caps of a screen's content column, gutters included. */
export const columns = {
  /** Forms and reading: one comfortable measure. */
  reading: 760,
  /** Boards and two-column detail screens. */
  board: 1040,
};
