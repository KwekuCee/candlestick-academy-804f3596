// Client-only startup: cross-domain session, subdomain/saved-route redirects, splash screen.
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSavedActiveRoute, saveActiveRoute } from "./BrandLogo";
import {
  ADMIN_PORTAL_DOMAIN,
  STUDENT_PORTAL_DOMAIN,
  hydrateCrossDomainSession,
  isMasterAdminAuthenticated,
} from "./exnessStore";
import { MobileCandlestickSplash } from "./PWAInstallPrompt";

const PORTAL_PREFIXES = ["/dashboard", "/admin", "/courses", "/lessons", "/quiz", "/progress", "/sessions", "/trades", "/signals", "/settings"];

export function ClientBoot() {
  const router = useRouter();
  const [showOpener, setShowOpener] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    void hydrateCrossDomainSession();
    const host = window.location.hostname.toLowerCase();
    const path = window.location.pathname;
    const full = path + window.location.search + window.location.hash;
    let dest: string | null = null;
    if ((host === ADMIN_PORTAL_DOMAIN || host.startsWith("master.")) && path === "/") {
      dest = "/login";
    } else if ((host === STUDENT_PORTAL_DOMAIN || host.startsWith("student.") || host.startsWith("stu.")) && path === "/") {
      dest = "/login";
    } else if (path === "/" && !window.location.search && !window.location.hash) {
      // The apex homepage is always the logout destination, never a saved private page.
    } else {
      saveActiveRoute(full);
    }
    if (dest) void router.navigate({ href: dest, replace: true } as any);

    try {
      if (PORTAL_PREFIXES.some((p) => path.startsWith(p)) && localStorage.getItem("candlesticks_portal_theme") === "light") setTheme("light");
    } catch {
      /* ignore */
    }

    const unsub = router.subscribe("onResolved", ({ toLocation }) => {
      saveActiveRoute(toLocation.href);
    });
    const onTrigger = () => {
      try {
        setTheme(localStorage.getItem("candlesticks_portal_theme") === "light" ? "light" : "dark");
      } catch {
        setTheme("dark");
      }
      setShowOpener(true);
    };
    window.addEventListener("candlesticks_trigger_opener", onTrigger);
    return () => {
      unsub();
      window.removeEventListener("candlesticks_trigger_opener", onTrigger);
    };
  }, [router]);

  return showOpener ? <MobileCandlestickSplash theme={theme} onFinish={() => setShowOpener(false)} /> : null;
}
