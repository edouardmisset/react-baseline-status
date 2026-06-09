import type { BrowserName } from "./browser";

export type BrowserImplementationDetails = {
  date: string;
  version: string;
  status: "available" | undefined;
};

const EMPTY_IMPLEMENTATION: BrowserImplementationDetails = {
  date: "",
  version: "",
  status: undefined,
};

function buildBrowserImplementationDetails(
  json: any,
  browser: string,
): BrowserImplementationDetails {
  return (json.browser_implementations ?? {})[browser] ?? EMPTY_IMPLEMENTATION;
}

export const buildMajorBrowserImplementations = (
  json: any = {},
): Record<BrowserName, BrowserImplementationDetails> => {
  return {
    Chrome: buildBrowserImplementationDetails(json, "chrome"),
    Edge: buildBrowserImplementationDetails(json, "edge"),
    Firefox: buildBrowserImplementationDetails(json, "firefox"),
    Safari: buildBrowserImplementationDetails(json, "safari"),
  };
};
