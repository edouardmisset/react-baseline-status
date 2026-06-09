import type { BrowserName } from "./browser";
import { formatMonthAndYear } from "./date";

export type BrowserStatusTitleParams = {
  name: BrowserName;
  featureName: string;
  available: boolean;
  date: string;
  version: string;
};

export function buildBrowserTitle({
  name,
  featureName,
  available,
  date,
  version,
}: BrowserStatusTitleParams) {
  return available
    ? `${name} implemented ${featureName} on ${formatMonthAndYear(date)} in version ${version || "an unknown version"}`
    : `${name} hasn't implemented ${featureName} yet`;
}
