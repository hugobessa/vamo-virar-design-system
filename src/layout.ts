// How much room a screen has, and what to do with it. Phones get the
// one-column layout the app was designed on; from a tablet up the content
// sits in a centred column with wider margins, and on a wide window the
// detail screens split into two columns and lists into two. On the web, a
// wide window also gets a sidebar with the communities (see app/_layout).

import { createContext, useContext } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { SIDEBAR_WIDTH, breakpoints, columns, space } from "./foundation";

/** Forces the width the layout is computed from (Storybook's phone frame); `null` follows the window. */
export const WidthOverride = createContext<number | null>(null);

/** True under the root layout while the sidebar is on screen, so screens know the window is narrower than it looks. */
export const SidebarShown = createContext(false);

export { SIDEBAR_WIDTH, breakpoints, columns } from "./foundation";

/** Whether the window is wide enough for the sidebar; only the root layout decides to show it. */
export function useSidebarFits(): boolean {
  const forced = useContext(WidthOverride);
  const { width } = useWindowDimensions();
  return Platform.OS === "web" && (forced ?? width) >= breakpoints.sidebar;
}

export function useLayout() {
  const forced = useContext(WidthOverride);
  const sidebar = useContext(SidebarShown);
  const { width: window } = useWindowDimensions();
  const width = forced ?? window;
  /** Room left for the screen once the sidebar has taken its share. */
  const content = sidebar ? width - SIDEBAR_WIDTH : width;
  const compact = content < breakpoints.medium;
  const wide = content >= breakpoints.wide;
  return {
    width,
    content,
    sidebar,
    /** Phone layout: stacked buttons, bottom sheets, full-width column. */
    compact,
    /** Room for two columns side by side. */
    wide,
    /** Side padding of the content column. */
    gutter: compact ? space.l : wide ? space.xxl : space.xl,
    /** Lists of cards: two abreast when there is room. */
    listColumns: wide ? 2 : 1,
  };
}
