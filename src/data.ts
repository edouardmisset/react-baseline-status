import { type FeatureId } from "./feature-ids";

export const BASELINE_STATUS = ["widely", "newly", "limited", "unknown"] as const;
export type BaselineStatus = (typeof BASELINE_STATUS)[number];

export const BROWSER_STATUS = ["available"] as const;
export type BrowserStatus = (typeof BROWSER_STATUS)[number] | undefined;

type BrowserImplementationDetails = {
  date: string;
  version: string;
  status: BrowserStatus;
};

export interface FeatureData {
  id: FeatureId; // Allow string, but usually FeatureId
  status: BaselineStatus;
  lowDate?: string;
  name: string;
  browsers: {
    chrome: BrowserImplementationDetails;
    edge: BrowserImplementationDetails;
    firefox: BrowserImplementationDetails;
    safari: BrowserImplementationDetails;
  };
}

const cache = new Map<FeatureId, Promise<FeatureData>>();

export function fetchFeature(id: FeatureId): Promise<FeatureData> {
  const existing = cache.get(id);
  if (existing) return existing;

  const promise = loadFeature(id);
  cache.set(id, promise);
  return promise;
}

async function loadFeature(id: FeatureId): Promise<FeatureData> {
  try {
    const response = await fetch(`https://api.webstatus.dev/v1/features/${id}`);
    if (!response.ok) throw new Error(`API Error ${response.status}`);

    const json = await response.json();
    const { low_date = "", status = "unknown" } = json.baseline || {};

    return {
      id,
      status,
      lowDate: low_date,
      name: json.name || id,
      browsers: buildMajorBrowserImplementations(json),
    };
  } catch (err) {
    console.error(err);
    return {
      id,
      status: "unknown",
      name: id,
      browsers: buildMajorBrowserImplementations(),
    };
  }
}

const buildMajorBrowserImplementations = (
  json: any = {},
): Record<keyof FeatureData["browsers"], BrowserImplementationDetails> => {
  const buildBrowserImplementationDetails = (browser: string): BrowserImplementationDetails =>
    (json.browser_implementations || {})[browser] || {
      date: "",
      version: "",
      status: undefined,
    };

  return {
    chrome: buildBrowserImplementationDetails("chrome"),
    edge: buildBrowserImplementationDetails("edge"),
    firefox: buildBrowserImplementationDetails("firefox"),
    safari: buildBrowserImplementationDetails("safari"),
  };
};
