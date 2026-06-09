import type { BaselineStatus } from "../data";
import { BROWSER_NAMES, type BrowserName } from "./browser";
import { formatMonthAndYear } from "./date";

export const STATUS_LABELS = {
  widely: "Widely available",
  newly: "Newly available",
  limited: "Limited availability",
  unknown: "Unknown",
  discouraged: "Discouraged",
} as const satisfies Record<BaselineStatus, string>;

const SUPPORTED_BROWSERS_LIST_FORMATTER = new Intl.ListFormat("en-US", {
  style: "long",
  type: "conjunction",
});

const MONTH_COUNT_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "month",
  unitDisplay: "long",
});

type BuildStatusTooltipParams = {
  status: BaselineStatus;
  name: string;
  lowDate?: string;
  browsers: Record<BrowserName, { status: "available" | undefined }>;
};

export function getElapsedMonthCount(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  const now = new Date();
  let elapsedMonths =
    (now.getFullYear() - parsedDate.getFullYear()) * 12 + (now.getMonth() - parsedDate.getMonth());

  if (now.getDate() < parsedDate.getDate()) elapsedMonths--;

  return Math.max(elapsedMonths, 0);
}

export function buildStatusTooltip({ status, name, lowDate, browsers }: BuildStatusTooltipParams) {
  if (status === "widely") {
    return "Available in all major browsers for more than 30 months";
  }

  if (status === "newly") {
    const monthAndYear = formatMonthAndYear(lowDate ?? "");
    const elapsedMonthCount = getElapsedMonthCount(lowDate ?? "");

    return `Available in all major browsers since ${monthAndYear}${elapsedMonthCount === null ? "" : ` (${MONTH_COUNT_FORMATTER.format(elapsedMonthCount)})`}`;
  }

  if (status === "limited") {
    const supportedBrowsers = BROWSER_NAMES.filter(
      (browser) => browsers[browser].status === "available",
    );

    if (supportedBrowsers.length === 0) {
      return `No browsers currently support ${name}`;
    }

    return `Only ${SUPPORTED_BROWSERS_LIST_FORMATTER.format(supportedBrowsers)} support ${name}.`;
  }

  return STATUS_LABELS.unknown;
}
