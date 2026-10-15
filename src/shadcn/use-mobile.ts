"use client";

import { useEffect, useState } from "react";
import { breakpoints } from "../foundation";

/** True below the kit's `medium` breakpoint (600px): the phone layout. */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const m = window.matchMedia(`(max-width: ${breakpoints.medium - 1}px)`);
    const on = () => setMobile(m.matches);
    m.addEventListener("change", on);
    on();
    return () => m.removeEventListener("change", on);
  }, []);
  return !!mobile;
}
