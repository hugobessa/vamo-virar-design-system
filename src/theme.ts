import { createContext, useContext, useEffect, useState } from "react";
import { AccessibilityInfo, Easing, Platform, useColorScheme } from "react-native";
import { fontStacks, motionBase } from "./foundation";
import { themes, type Theme } from "./tokens";

export { palette, themes, type Theme } from "./tokens";

/** Forces a colour scheme for a subtree (Storybook, screenshots); `null` follows the system. */
export const SchemeOverride = createContext<"light" | "dark" | null>(null);

export function useTheme(): Theme {
  const forced = useContext(SchemeOverride);
  const system = useColorScheme();
  return (forced ?? system) === "dark" ? themes.dark : themes.light;
}

export { radius, shear, space, touch, type } from "./foundation";

/**
 * Motion tokens. Four durations and two easings cover the whole product:
 * `out` for things that move into place, `overshoot` for the "stamp" of a
 * brand box or a pressed button. The CSS strings are for the landing page
 * and Storybook; the `Easing` functions are for React Native's Animated.
 */
export const motion = {
  ...motionBase,
  easing: {
    out: Easing.bezier(0.2, 0, 0, 1),
    overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  },
};

/** Forces reduced motion for a subtree (Storybook); `null` follows the system. */
export const ReducedMotionOverride = createContext<boolean | null>(null);

/** True when the person asked the system for less motion: animations then jump to their end state. */
export function useReducedMotion(): boolean {
  const forced = useContext(ReducedMotionOverride);
  const [system, setSystem] = useState(false);
  useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((v) => alive && setSystem(!!v))
      .catch(() => {});
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", (v) => setSystem(!!v));
    return () => {
      alive = false;
      sub.remove();
    };
  }, []);
  return forced ?? system;
}

/** Typefaces (see `fontStacks` in foundation.ts). Native falls back to the system font until the fonts are bundled with the app. */
export const fonts = {
  condensed: Platform.select({ web: fontStacks.condensed, default: undefined }),
  display: Platform.select({ web: fontStacks.display, default: undefined }),
  text: Platform.select({ web: fontStacks.text, default: undefined }),
};
