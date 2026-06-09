export const BROWSER_NAMES = ["Chrome", "Edge", "Firefox", "Safari"] as const;

export type BrowserName = (typeof BROWSER_NAMES)[number];
