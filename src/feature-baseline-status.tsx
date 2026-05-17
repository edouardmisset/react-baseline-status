"use client";

import { Suspense, use } from "react";
import { fetchFeature, type BaselineStatus } from "./data";
import styles from "./feature-baseline-status.module.css";

import type { FeatureId } from "./feature-ids";
import { BrowserStatus } from "./icons/browser-icons";
import { AVAILABILITY_ICONS } from "./icons/baseline-icons";

export const STATUS_LABELS = {
  widely: "Widely available",
  newly: "Newly available",
  limited: "Limited availability",
  unknown: "Unknown",
} as const satisfies Record<BaselineStatus, string>;
export const BROWSER_NAMES = ["Chrome", "Edge", "Firefox", "Safari"] as const;
export type BrowserName = (typeof BROWSER_NAMES)[number];

export const FeatureStatusSkeleton: React.FC = () => (
  <div className={`${styles.baselineStatus}`}>
    <div className={styles.baselineSummary}>
      <div className={`${styles.skeletonBox} ${styles.baselineStatusSkeleton}`} />
      <div className={`${styles.skeletonBox} ${styles.featureNameSkeleton}`} />
      <div className={`${styles.skeletonBox} ${styles.browsersSkeleton}`} />
    </div>
  </div>
);

export function FeatureBaselineStatus({ featureId }: { featureId: FeatureId }) {
  return (
    <Suspense fallback={<FeatureStatusSkeleton />}>
      <FeatureDetails featureId={featureId} />
    </Suspense>
  );
}

function FeatureDetails({ featureId }: { featureId: FeatureId }) {
  const data = use(fetchFeature(featureId));

  const { status, name, browsers, lowDate } = data;

  const AvailabilityIcon = AVAILABILITY_ICONS[status];
  const isNewlyAvailableWithDate = status === "newly" && lowDate;

  return (
    <details className={styles.baselineStatus} data-status={status}>
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
        <a
          href={`https://webstatus.dev/features/${featureId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on WebStatus.dev
        </a>
      </div>
    </details>
  );
}
