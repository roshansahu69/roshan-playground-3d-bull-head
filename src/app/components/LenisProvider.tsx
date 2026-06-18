"use client";
import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(isTouchDevice);
  }, []);

  // If we detect a mobile/touch device, we bypass Lenis and use native scroll
  if (isTouch === true) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
