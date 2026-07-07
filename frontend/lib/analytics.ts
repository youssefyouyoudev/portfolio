export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  };

  w.gtag?.("event", name, props ?? {});
  w.plausible?.(name, props ? { props } : undefined);
}
