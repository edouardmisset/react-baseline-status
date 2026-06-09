import { Suspense, use } from "react";
import { fetchFeature } from "./data";
import styles from "./feature-baseline-status.module.css";
import { FeatureStatusSkeleton } from "./feature-status-skeleton";

import type { FeatureId } from "./feature-ids";
import { BrowserStatus } from "./icons/browser-icons";
import { AVAILABILITY_ICONS } from "./icons/baseline-icons";
import { MDNIcon } from "./icons/mdn";
import { BROWSER_NAMES } from "./utils/browser";
import { STATUS_LABELS, buildStatusTooltip } from "./utils/status-tooltip";

export { BROWSER_NAMES } from "./utils/browser";
export type { BrowserName } from "./utils/browser";
export { STATUS_LABELS } from "./utils/status-tooltip";

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
  const statusTooltip = buildStatusTooltip({ status, name, lowDate, browsers });
  const caniuseUrl = canIUseId
    ? `${CAN_I_USE_BASE_URL}${encodeURIComponent(canIUseId)}`
    : `${CAN_I_USE_BASE_URL}?search=${encodeURIComponent(name)}`;

  return (
    <details className={styles.baselineStatus} data-status={status} open>
      <summary className={styles.baselineSummary}>
        <h3 className={styles.baselineName}>{name}</h3>
        <div className={styles.baselineHeader}>
          <span className={styles.baselineTitle}>
            <AvailabilityIcon />
            <span className={styles.baselineStatusLabel} title={statusTooltip}>
              {STATUS_LABELS[status]}
            </span>
          </span>
        </div>
        <div className={styles.baselineBrowsers}>
          {BROWSER_NAMES.map((browser) => {
            const implementation = browsers[browser];

            return (
              <BrowserStatus
                key={browser}
                name={browser}
                featureName={name}
                available={implementation.status === "available"}
                date={implementation.date}
                version={implementation.version}
              />
            );
          })}
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
