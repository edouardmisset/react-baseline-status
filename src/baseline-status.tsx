"use client";

import { Suspense, use } from "react";
import { fetchFeature, type BaselineStatus } from "./data";
import styles from "./baseline-status.module.css";
import type { FeatureId } from "./feature-ids";
import { availabilityIcons, BrowserStatus } from "./icons";

interface BaselineStatusProps {
  featureId: FeatureId;
}

export function BaselineStatus({ featureId }: BaselineStatusProps) {
  return (
    <Suspense
      fallback={<div className={`${styles["baseline-status"]} ${styles["baseline-skeleton"]}`} />}
    >
      <FeatureDetails featureId={featureId} />
    </Suspense>
  );
}

function FeatureDetails({ featureId }: { featureId: FeatureId }) {
  const data = use(fetchFeature(featureId));

  const { status, name, browsers, lowDate } = data;

  const Icon = availabilityIcons[status];

  return (
    <details className={styles["baseline-status"]} data-status={status}>
      <summary className={styles["baseline-summary"]}>
        <div className={styles["baseline-header"]}>
          <span className={styles["baseline-title"]}>
            <Icon width="var(--size-5)" height="var(--size-5)" />
            {getStatusLabel(status, lowDate)}
          </span>
        </div>
        <h3 className={styles["baseline-name"]}>
          <strong>
            <code>{name}</code>
          </strong>
        </h3>
        <div className={styles["baseline-browsers"]}>
          <BrowserStatus name="Chrome" available={browsers.chrome.status === "available"} />
          <BrowserStatus name="Edge" available={browsers.edge.status === "available"} />
          <BrowserStatus name="Firefox" available={browsers.firefox.status === "available"} />
          <BrowserStatus name="Safari" available={browsers.safari.status === "available"} />
        </div>
      </summary>

      <div className={styles["baseline-content"]}>
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

function getStatusLabel(status: BaselineStatus, lowDate?: string) {
  const labels = {
    widely: "Widely available",
    newly: "Newly available",
    limited: "Limited availability",
    unknown: "Unknown",
  } as const satisfies Record<BaselineStatus, string>;
  return (
    <>
      <span className={styles["baseline-status-label"]}>{labels[status]}</span>
      {status === "newly" && lowDate && (
        <span className={styles["baseline-badge"]}>{new Date(lowDate).getFullYear()}</span>
      )}
    </>
  );
}
