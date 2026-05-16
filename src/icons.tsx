import chromeIconAsset from "./assets/chrome.svg";
import edgeIconAsset from "./assets/edge.svg";
import firefoxIconAsset from "./assets/firefox.svg";
import safariIconAsset from "./assets/safari.svg";
import type { BaselineStatus } from "./data";
import styles from "./baseline-status.module.css";

const baselineIconSize = `var(--size-5)`;
const statusIconSize = `var(--size-4)`;

export const WidelyIcon = () => (
  <svg width={baselineIconSize} height={baselineIconSize} viewBox="0 0 500 284" fill="none">
    <path fill="var(--bs-color-widely)" d="m0 142 34-34 108 108L358 0l34 34-250 250L0 142Z" />
    <path
      fill="var(--bs-color-widely-secondary)"
      d="m222 80-34 34-46-46-74 74-34-34L142 0l80 80ZM278 204l80 80 142-142L392 34l-34 34 74 74-74 74-46-46-34 34Z"
    />
  </svg>
);
export const NewlyIcon = () => (
  <svg width={baselineIconSize} height={baselineIconSize} fill="none" viewBox="0 59.17 284 156.07">
    <path
      fill="var(--bs-color-newly-secondary)"
      d="m78.893 59.167 15.774 15.608L78.893 90.383l-15.786 -15.62zm31.548 31.216 15.774 15.608 -15.774 15.608 -15.774 -15.62zm126.226 0 15.774 15.608 -15.774 15.608 -15.786 -15.62zm31.548 31.216L284 137.208l-15.786 15.608 -15.774 -15.62zm-31.548 31.217 15.774 15.596 -15.774 15.62 -15.786 -15.62zm-31.559 31.204 15.786 15.62 -15.786 15.596 -15.775 -15.609zm-31.548 -31.204 15.773 15.596 -15.786 15.62 -15.774 -15.62zM47.333 90.383l15.774 15.608 -15.774 15.608 -15.774 -15.62z"
    />
    <path
      fill="var(--bs-color-newly)"
      d="m205.107 59.167 15.786 15.608 -142 140.462L0 137.208l15.774 -15.62 63.119 62.433z"
    />
  </svg>
);
export const LimitedIcon = () => (
  <svg width={baselineIconSize} height={baselineIconSize} viewBox="0 0 500 284" fill="none">
    <path
      fill="var(--bs-color-limited)"
      d="M142.007 0 222 80l-34 34-79.993-80 34-34ZM108 250 358 0l34 34-250 250-34-34ZM391.992 250 312 170l-34 34 79.992 80 34-34Z"
    />
    <path
      fill="var(--bs-color-limited-secondary)"
      d="M108.007 34 142 68l-74 74 74 74-34 34L0 142 108.007 34ZM358 68l74 74-74 74 33.992 34L500 142 392 34l-34 34Z"
    />
  </svg>
);
export const NoDataIcon = () => (
  <svg width={baselineIconSize} height={baselineIconSize} viewBox="0 0 36 20" aria-hidden="true">
    <path fill="var(--baseline-icon-no_data)" d="M18 8L20 10L18 12L16 10L18 8Z" />
    <path
      fill="var(--baseline-icon-no_data)"
      d="M28 2L26 4L32 10L26 16L22 12L20 14L26 20L36 10L28 2Z"
    />
    <path fill="var(--baseline-icon-no_data)" d="M10 0L2 8L4 10L10 4L14 8L16 6L10 0Z" />
    <path fill="var(--baseline-icon-no_data)" d="M26 0L28 2L10 20L0 10L2 8L10 16L26 0Z" />
  </svg>
);
export const DiscouragedIcon = () => (
  <svg width={baselineIconSize} height={baselineIconSize} viewBox="0 0 36 20" fill="none">
    <path d="M10 0L12 2L10 4L8 2L10 0Z" fill="var(--bs-color-unknown)" />
    <path d="M26 0L28 2L26 4L24 2L26 0Z" fill="var(--bs-color-unknown)" />
    <path d="M14 4L16 6L14 8L12 6L14 4Z" fill="var(--bs-color-unknown)" />
    <path d="M30 4L32 6L30 8L28 6L30 4Z" fill="var(--bs-color-unknown)" />
    <path d="M34 8L36 10L34 12L32 10L34 8Z" fill="var(--bs-color-unknown)" />
    <path d="M14 12L16 14L14 16L12 14L14 12Z" fill="var(--bs-color-unknown)" />
    <path d="M30 12L32 14L30 16L28 14L30 12Z" fill="var(--bs-color-unknown)" />
    <path d="M10 16L12 18L10 20L8 18L10 16Z" fill="var(--bs-color-unknown)" />
    <path d="M26 16L28 18L26 20L24 18L26 16Z" fill="var(--bs-color-unknown)" />
    <path d="M6 12L8 14L6 16L4 14L6 12Z" fill="var(--bs-color-unknown)" />
    <path d="M22 12L24 14L22 16L20 14L22 12Z" fill="var(--bs-color-unknown)" />
    <path d="M2 8L4 10L2 12L0 10L2 8Z" fill="var(--bs-color-unknown)" />
    <path d="M18 8L20 10L18 12L16 10L18 8Z" fill="var(--bs-color-unknown)" />
    <path d="M6 4L8 6L6 8L4 6L6 4Z" fill="var(--bs-color-unknown)" />
    <path d="M22 4L24 6L22 8L20 6L22 4Z" fill="var(--bs-color-unknown)" />
  </svg>
);

export const availabilityIcons = {
  limited: LimitedIcon,
  widely: WidelyIcon,
  newly: NewlyIcon,
  unknown: NoDataIcon,
} as const satisfies Record<BaselineStatus, React.FC>;

export const CheckIcon = () => (
  <svg
    height={statusIconSize}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1px"
    fill="#1E8E3E"
  >
    <circle cx="12" cy="12" r="10" fill="none" stroke="#1E8E3E" />
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
      transform="scale(0.8) translate(3 3)"
    />
  </svg>
);
export const InfoIcon = () => (
  <svg height={statusIconSize} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" />
    <path
      d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      transform="scale(0.8) translate(3 3)"
    />
  </svg>
);
export const CrossIcon = () => (
  <svg height={statusIconSize} viewBox="0 0 24 24" fill="#EA8600">
    <circle cx="12" cy="12" r="10" fill="none" stroke="#EA8600" />
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      transform="scale(0.8) translate(3 3)"
    />
  </svg>
);

const BROWSERS = ["Chrome", "Edge", "Firefox", "Safari"] as const;
type BrowserName = (typeof BROWSERS)[number];

const BROWSER_NAME_TO_IMAGE_SRC = {
  Chrome: chromeIconAsset,
  Edge: edgeIconAsset,
  Firefox: firefoxIconAsset,
  Safari: safariIconAsset,
} as const satisfies Record<BrowserName, string>;

export const BrowserStatus = ({ name, available }: { name: BrowserName; available: boolean }) => (
  <span className={styles.browser} data-available={available}>
    <img
      src={BROWSER_NAME_TO_IMAGE_SRC[name]}
      className={styles["browser-icon"]}
      alt={`${name} ${available ? "Available" : "Unavailable"}`}
    />
    {available ? <CheckIcon /> : <CrossIcon />}
  </span>
);
