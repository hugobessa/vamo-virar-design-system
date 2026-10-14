"use client";

// Web counterpart of ../theme.ts: the same tokens, without React Native.
// Colours reach components as CSS variables (theme.css); these exports are
// for code that needs the raw numbers.

import { createContext, useContext, useEffect, useState } from "react";
import { fontStacks, motionBase } from "../foundation";

export { palette, themes, type Theme } from "../tokens";
export { SIDEBAR_WIDTH, breakpoints, columns, radius, shear, space, touch, type } from "../foundation";

/** Motion durations (ms) and CSS easings. */
export const motion = motionBase;

/** Font stacks (CSS `font-family` values). */
export const fonts = fontStacks;

/**
 * True inside a community that an admin disabled (marked for deletion):
 * buttons and fields turn off, except buttons marked `allowReadOnly`.
 */
export const ReadOnly = createContext(false);

/** Forces reduced motion for a subtree; `null` follows the system. Pair it with `data-reduced-motion` for the CSS side. */
export const ReducedMotionOverride = createContext<boolean | null>(null);

const query = "(prefers-reduced-motion: reduce)";

/** True when the person asked the system for less motion: animations then jump to their end state. */
export function useReducedMotion(): boolean {
  const forced = useContext(ReducedMotionOverride);
  const [system, setSystem] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia(query);
    setSystem(m.matches);
    const on = (e: MediaQueryListEvent) => setSystem(e.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return forced ?? system;
}
