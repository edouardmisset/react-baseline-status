import chromeIconAsset from "../assets/chrome.svg";
import edgeIconAsset from "../assets/edge.svg";
import firefoxIconAsset from "../assets/firefox.svg";
import safariIconAsset from "../assets/safari.svg";
import type { BrowserName } from "../utils/browser";
import { buildBrowserTitle, type BrowserStatusTitleParams } from "../utils/browser-title";
import styles from "./browser-icons.module.css";
import type { SVGAttributes } from "react";

const BROWSER_NAME_TO_IMAGE_SRC = {
  Chrome: chromeIconAsset,
  Edge: edgeIconAsset,
  Firefox: firefoxIconAsset,
  Safari: safariIconAsset,
} as const satisfies Record<BrowserName, string>;

export const BrowserStatus = (props: BrowserStatusTitleParams) => (
  <span
    className={styles.browser}
    data-available={props.available}
    title={buildBrowserTitle(props)}
  >
    <img
      src={BROWSER_NAME_TO_IMAGE_SRC[props.name]}
      className={styles.browserIcon}
      alt={`${props.name} ${props.available ? "Available" : "Unavailable"}`}
    />
    {props.available ? <CheckIcon /> : <CrossIcon />}
  </span>
);

type BrowserStatusIconProps = SVGAttributes<SVGElement> & {
  color: string;
  path: string;
};

function BrowserStatusIcon({ color, path, ...props }: BrowserStatusIconProps) {
  const className = [props.className, styles.browserStatus].filter(Boolean).join(" ");

  return (
    <svg {...props} className={className} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} />
      <path d={path} transform="scale(0.8) translate(3 3)" />
    </svg>
  );
}

export function CheckIcon(props: SVGAttributes<SVGElement>) {
  return (
    <BrowserStatusIcon
      {...props}
      color="#1E8E3E"
      path="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  );
}

export function CrossIcon(props: SVGAttributes<SVGElement>) {
  return (
    <BrowserStatusIcon
      {...props}
      color="#EA8600"
      path="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  );
}
