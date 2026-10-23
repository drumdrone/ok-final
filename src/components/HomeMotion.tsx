"use client";

import { useEffect } from "react";

/**
 * Wires up the OK FINAL homepage design motion (ze Shuffle designu):
 *  - .okf-reveal   → fade/slide in on scroll (IntersectionObserver)
 *  - .okf-count    → count-up to data-count + data-suffix when revealed
 *  - .okf-tilt     → pointer-driven 3D tilt + glare (--okf-mx/--okf-my)
 *
 * Markup is rendered WITHOUT .okf-hidden, so without JS (and for crawlers)
 * everything is fully visible. Respects prefers-reduced-motion.
 */
export function HomeMotion() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count || "0");
      const suffix = el.dataset.suffix ?? "";
      if (!target || reduce) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".okf-reveal")
    );

    let io: IntersectionObserver | undefined;

    if (reduce) {
      reveals.forEach((el) => el.classList.remove("okf-hidden"));
      document
        .querySelectorAll<HTMLElement>(".okf-count")
        .forEach(runCount);
    } else {
      reveals.forEach((el) => el.classList.add("okf-hidden"));
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.classList.remove("okf-hidden");
            el.querySelectorAll<HTMLElement>(".okf-count").forEach(runCount);
            io?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      reveals.forEach((el) => io!.observe(el));
    }

    // 3D tilt + glare
    const cleanups: Array<() => void> = [];
    if (!reduce) {
      document.querySelectorAll<HTMLElement>(".okf-tilt").forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const onMove = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width;
          const py = (ev.clientY - r.top) / r.height;
          const rx = (0.5 - py) * 7;
          const ry = (px - 0.5) * 9;
          el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
          el.style.setProperty("--okf-mx", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--okf-my", `${(py * 100).toFixed(1)}%`);
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        parent.addEventListener("pointermove", onMove);
        parent.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          parent.removeEventListener("pointermove", onMove);
          parent.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      io?.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
