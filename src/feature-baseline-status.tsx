import { Suspense, use } from "react";
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
const CAN_I_USE_BASE_URL = `https://caniuse.com/`;

export function FeatureBaselineStatus({ featureId }: { featureId: FeatureId }) {
  return (
    <Suspense fallback={<FeatureStatusSkeleton />}>
      <FeatureDetails featureId={featureId} />
    </Suspense>
  );
}

function FeatureDetails({ featureId }: { featureId: FeatureId }) {
  const feature = use(fetchFeature(featureId));

  const { status, name, browsers, lowDate, description, canIUseId } = feature;

  const AvailabilityIcon = AVAILABILITY_ICONS[status];
  const isNewlyAvailableWithDate = status === "newly" && lowDate;
  const caniuseUrl = canIUseId
    ? `${CAN_I_USE_BASE_URL}${encodeURIComponent(canIUseId)}`
    : `${CAN_I_USE_BASE_URL}?search=${encodeURIComponent(name)}`;

  return (
    <details className={styles.baselineStatus} data-status={status} open>
      <summary className={styles.baselineSummary}>
        <div className={styles.baselineHeader}>
          <span className={styles.baselineTitle}>
            <AvailabilityIcon />
            <span className={styles.baselineStatusLabel}>{STATUS_LABELS[status]}</span>
            {isNewlyAvailableWithDate ? (
              <span className={styles.baselineBadge}>{new Date(lowDate).getFullYear()}</span>
            ) : null}
          </span>
        </div>
        <h3 className={styles.baselineName}>
          <strong>
            <code>{name}</code>
          </strong>
        </h3>
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
            <img width={24} height={24} src="assets/can-i-use.png" alt="Can I Use" />
          </a>
        </div>
      </div>
    </details>
  );
}
