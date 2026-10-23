"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type ViewTransitionLike = {
  finished: Promise<void>;
  skipTransition: () => void;
};

/**
 * Crossfades public page content on client navigations.
 * Header and footer stay outside this node, so they do not fade.
 * Admin routes and prefers-reduced-motion swap instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const pathnameRef = useRef(pathname);
  const resolveRef = useRef<(() => void) | null>(null);
  const currentRef = useRef<ViewTransitionLike | null>(null);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    const resolve = resolveRef.current;
    resolveRef.current = null;
    resolve?.();
  }, [pathname]);

  useEffect(() => {
    const begin = (from: string, to: string) => {
      if (from === to) return;
      if (isAdmin(from) || isAdmin(to)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const start = (
        document as Document & {
          startViewTransition?: (update: () => Promise<void>) => ViewTransitionLike;
        }
      ).startViewTransition;
      if (!start) return;

      // Arm the resolver before startViewTransition. Next can commit the new
      // page before the update callback runs, and the callback would otherwise
      // miss it and hold the old snapshot until the timeout.
      let settled = false;
      let release: () => void = () => {};
      const gate = new Promise<void>((resolve) => {
        release = () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timer);
          if (resolveRef.current === release) resolveRef.current = null;
          resolve();
        };
      });
      const timer = window.setTimeout(release, 4000);
      resolveRef.current = release;

      try {
        currentRef.current?.skipTransition();
      } catch {
        // The previous transition already finished.
      }

      try {
        const transition = start(() => gate);
        currentRef.current = transition;
        transition.finished.finally(() => {
          if (currentRef.current === transition) currentRef.current = null;
        });
      } catch {
        release();
      }
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }
      begin(window.location.pathname, url.pathname);
    };

    const onPopState = () => {
      begin(pathnameRef.current, window.location.pathname);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState, true);
    };
  }, []);

  return <div className="okf-page">{children}</div>;
}

function isAdmin(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}
