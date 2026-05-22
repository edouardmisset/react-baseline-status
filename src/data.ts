import type { BrowserName } from "./feature-baseline-status";
import type { FeatureId } from "./feature-ids";

const BASELINE_STATUS = ["widely", "newly", "limited", "unknown", "discouraged"] as const;
export type BaselineStatus = (typeof BASELINE_STATUS)[number];

const BROWSER_STATUS = ["available"] as const;
type BrowserStatus = (typeof BROWSER_STATUS)[number] | undefined;

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
  browsers: Record<BrowserName, BrowserImplementationDetails>;
  description?: string;
  canIUseId?: string;
}

const cache = new Map<FeatureId, Promise<FeatureData>>();
const API_BASE = `https://api.webstatus.dev/v1`;

export function fetchFeature(id: FeatureId): Promise<FeatureData> {
  const existing = cache.get(id);
  if (existing) return existing;

  const promise = loadFeature(id);
  cache.set(id, promise);
  return promise;
}

async function loadFeature(id: FeatureId): Promise<FeatureData> {
  try {
    const [feature, featureMetadata] = await Promise.allSettled([
      fetch(`${API_BASE}/features/${id}`),
      fetch(`${API_BASE}/features/${id}/feature-metadata`),
    ]);

    if (featureMetadata.status !== "fulfilled")
      throw new Error(`API Error ${featureMetadata.status}`);
    if (feature.status !== "fulfilled") throw new Error(`API Error ${feature.status}`);

    const featureJson = await feature.value.json();
    const metadataJson = await featureMetadata.value.json();
    const { low_date = "", status = "unknown" } = featureJson.baseline ?? {};
    const { description = "", can_i_use = [] } = metadataJson ?? {};

    const { items: [{ id: canIUseId } = {}] = [] } = can_i_use;

    return {
      id,
      status,
      lowDate: low_date,
      name: featureJson.name ?? id,
      browsers: buildMajorBrowserImplementations(featureJson),
      description,
      canIUseId,
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
): Record<BrowserName, BrowserImplementationDetails> => {
  const buildBrowserImplementationDetails = (browser: string): BrowserImplementationDetails =>
    (json.browser_implementations ?? {})[browser] ?? {
      date: "",
      version: "",
      status: undefined,
    };

  return {
    Chrome: buildBrowserImplementationDetails("chrome"),
    Edge: buildBrowserImplementationDetails("edge"),
    Firefox: buildBrowserImplementationDetails("firefox"),
    Safari: buildBrowserImplementationDetails("safari"),
  };
};
