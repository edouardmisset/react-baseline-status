import { Suspense, use } from "react";
import canIUsePng from "./assets/can-i-use.png";
import { fetchFeature, type BaselineStatus } from "./data";
import styles from "./feature-baseline-status.module.css";
import { FeatureStatusSkeleton } from "./feature-status-skeleton";

import type { FeatureId } from "./feature-ids";
import { BrowserStatus } from "./icons/browser-icons";
import { AVAILABILITY_ICONS } from "./icons/baseline-icons";
import { MDNIcon } from "./icons/mdn";

export const STATUS_LABELS = {
  widely: "Widely available",
  newly: "Newly available",
  limited: "Limited availability",
  unknown: "Unknown",
  discouraged: "Discouraged",
} as const satisfies Record<BaselineStatus, string>;
export const BROWSER_NAMES = ["Chrome", "Edge", "Firefox", "Safari"] as const;
export type BrowserName = (typeof BROWSER_NAMES)[number];
const CAN_I_USE_BASE_URL = "https://caniuse.com/";

export function FeatureBaselineStatus({ featureId }: { featureId: FeatureId }) {
  return (
    <Suspense fallback={<FeatureStatusSkeleton />}>
      <FeatureDetails featureId={featureId} />
    </Suspense>
  );
}

function FeatureDetails({ featureId }: { featureId: FeatureId }) {
  const feature = use(fetchFeature(featureId));

  const { status, name, browsers, lowDate, description, canIUseId, discouraged } = feature;
  const discouragedSourceLink = discouraged?.according_to?.[0]?.link;
  const discouragedAlternativeIds = (discouraged?.alternatives ?? []).map(({ id }) => id);
  const discouragedAlternativesText =
    discouragedAlternativeIds.length > 0 ? discouragedAlternativeIds.join(", ") : "";
  const discouragedTitleText = `${name} is discouraged ${discouragedSourceLink ? `according to ${discouragedSourceLink}.` : ""} ${discouragedAlternativesText ? `Please use these alternatives: ${discouragedAlternativesText}` : ""}`;

  const AvailabilityIcon = AVAILABILITY_ICONS[status];
  const isNewlyAvailableWithDate = status === "newly" && lowDate;
  const caniuseUrl = `${CAN_I_USE_BASE_URL}${canIUseId ? encodeURIComponent(canIUseId) : `?search=${encodeURIComponent(name)}`}`;

  return (
    <details className={styles.baselineStatus} data-status={status} open>
      <summary className={styles.baselineSummary}>
        <h3 className={styles.baselineName}>{name}</h3>
        <div className={styles.baselineHeader}>
          <span
            className={styles.baselineTitle}
            title={status === "discouraged" ? discouragedTitleText : undefined}
          >
            <AvailabilityIcon />
            <span className={styles.baselineStatusLabel}>{STATUS_LABELS[status]}</span>
            {isNewlyAvailableWithDate ? (
              <span className={styles.baselineBadge}>{new Date(lowDate).getFullYear()}</span>
            ) : null}
          </span>
        </div>
        <div className={styles.baselineBrowsers}>
          {BROWSER_NAMES.map((browser) => (
            <BrowserStatus
              key={browser}
              name={browser}
              available={browsers[browser].status === "available"}
            />
          ))}
        </div>
      </summary>

      <div className={styles.baselineContent}>
        <p className={styles.baselineDescription}>{description}</p>
        <div className={styles.links}>
          <a
            href={`https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(name)}`}
            title="Search on MDN for documentation"
            rel="noopener noreferrer"
            target="_blank"
          >
            <MDNIcon />
          </a>
          <a
            href={caniuseUrl}
            title="Search on Can I Use for browser support"
            className={styles.canIUse}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img width={24} height={24} src={canIUsePng} alt="Can I Use" />
          </a>
          <a
            href={`https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fmodern-css.com%2F+${encodeURIComponent(name)}`}
            title="Search on Modern.css for snippets and examples"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img width={24} height={24} src="https://modern-css.com/favicon.svg" alt="Modern.css" />
          </a>
        </div>
      </div>
    </details>
  );
}
