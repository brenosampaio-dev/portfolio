"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Safety net for the fadeUp reveal: because `.reveal` uses opacity:0 + fill:both,
 * content would stay invisible if the animation never plays (e.g. a backgrounded
 * tab). This pins everything visible shortly after each navigation, re-armed per
 * route so the transition still plays on a fresh load. Mirrors the prototype.
 */
export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove("anim-done");
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        window.scrollTo(0, 0);
      }
    }
    const t = setTimeout(() => {
      document.body.classList.add("anim-done");
    }, 900);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
