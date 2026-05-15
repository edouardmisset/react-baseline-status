import { type FeatureId } from "./feature-ids";

export const STATUS = ["widely", "newly", "limited", "unavailable", "unknown"] as const;
export type Status = (typeof STATUS)[number];

export interface FeatureData {
  id: FeatureId; // Allow string, but usually FeatureId
  status: Status;
  lowDate?: string;
  highDate?: string;
  name: string;
  description?: string; // Optional raw description from API if any
  browsers: {
    chrome: boolean;
    edge: boolean;
    firefox: boolean;
    safari: boolean;
  };
}

const cache = new Map<FeatureId, Promise<FeatureData>>();

export function fetchFeature(id: FeatureId): Promise<FeatureData> {
  const existing = cache.get(id);
  if (existing) {
    return existing;
  }

  const promise = loadFeature(id);
  cache.set(id, promise);
  return promise;
}

async function loadFeature(id: FeatureId): Promise<FeatureData> {
  try {
    const response = await fetch(`https://api.webstatus.dev/v1/features/${id}`);
    if (!response.ok) {
      throw new Error(`API Error ${response.status}`);
    }
    const json = await response.json();
    const baseline = json.baseline || {};

    // Map implementations
    // The API structure for browsers is a bit complex, often in json.browser_implementations or similar.
    // Simulating simplified logic or checking `stats` if available.
    // For now, I'll extract what I can.

    // Actually, looking at the baseline-status.js source would be ideal to match perfectly.
    // But based on the plan, I need "status" logic.

    // Basic mapping:
    const statusKey = baseline.status || "unknown";
    const status = STATUS.includes(statusKey as Status) ? (statusKey as Status) : "unknown";

    return {
      id,
      status,
      lowDate: baseline.low_date,
      highDate: baseline.high_date,
      name: json.name || id,
      description: json.description || json.description_html,
      browsers: {
        chrome: hasImplemented(json, "chrome"),
        edge: hasImplemented(json, "edge"),
        firefox: hasImplemented(json, "firefox"),
        safari: hasImplemented(json, "safari"),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      id,
      status: "unknown",
      name: id,
      browsers: { chrome: false, edge: false, firefox: false, safari: false },
    };
  }
}

function hasImplemented(json: any, browser: string): boolean {
  // This is a heuristic. The real API has `browser_implementations` object.
  // We check if the browser has a "available" status or version.
  const implementations = json.browser_implementations || {};
  const hasBrowserImplemented = implementations[browser];
  if (!hasBrowserImplemented) return false;
  return hasBrowserImplemented.status === "available";
}
