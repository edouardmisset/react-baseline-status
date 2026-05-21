import { Suspense, use } from "react";
import { fetchFeature, type BaselineStatus } from "./data";
import styles from "./feature-baseline-status.module.css";
import { FeatureStatusSkeleton } from "./feature-status-skeleton";

import type { FeatureId } from "./feature-ids";
import { BrowserStatus } from "./icons/browser-icons";
import { AVAILABILITY_ICONS } from "./icons/baseline-icons";
import { MDNIcon } from "./icons/mdn";
import { formatMonthAndYear } from "./utils/date";

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

const SUPPORTED_BROWSERS_LIST_FORMATTER = new Intl.ListFormat("en-US", {
  style: "long",
  type: "conjunction",
});

const MONTH_COUNT_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "month",
  unitDisplay: "long",
});

function getElapsedMonthCount(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  const now = new Date();
  let elapsedMonths =
    (now.getFullYear() - parsedDate.getFullYear()) * 12 + (now.getMonth() - parsedDate.getMonth());

  if (now.getDate() < parsedDate.getDate()) elapsedMonths--;

  return Math.max(elapsedMonths, 0);
}

function buildStatusTooltip({
  status,
  name,
  lowDate,
  browsers,
}: {
  status: BaselineStatus;
  name: string;
  lowDate?: string;
  browsers: Record<BrowserName, { status: "available" | undefined }>;
}) {
  if (status === "widely") {
    return "Available in all major browser for more than 30 months";
  }

  if (status === "newly") {
    const monthAndYear = formatMonthAndYear(lowDate ?? "");
    const elapsedMonthCount = getElapsedMonthCount(lowDate ?? "");

    return `Available in all major since ${monthAndYear}${elapsedMonthCount === null ? "" : ` (${MONTH_COUNT_FORMATTER.format(elapsedMonthCount)})`}`;
  }

  if (status === "limited") {
    const supportedBrowsers = BROWSER_NAMES.filter(
      (browser) => browsers[browser].status === "available",
    );

    if (supportedBrowsers.length === 0) {
      return `No browser currently support ${name}`;
    }

    return `Only ${SUPPORTED_BROWSERS_LIST_FORMATTER.format(supportedBrowsers)} support ${name}.`;
  }

  return STATUS_LABELS.unknown;
}

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
