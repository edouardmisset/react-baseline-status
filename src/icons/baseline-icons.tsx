import type { BaselineStatus } from "../data";
import type { FC, SVGAttributes } from "react";

const iconSize = "var(--size-3)";

export const WidelyIcon = (props: SVGAttributes<SVGElement>) => (
  <svg height={iconSize} {...props} viewBox="0 0 500 284" fill="none">
    <path fill="var(--bs-color-widely)" d="m0 142 34-34 108 108L358 0l34 34-250 250L0 142Z" />
    <path
      fill="var(--bs-color-widely-secondary)"
      d="m222 80-34 34-46-46-74 74-34-34L142 0l80 80ZM278 204l80 80 142-142L392 34l-34 34 74 74-74 74-46-46-34 34Z"
    />
  </svg>
);

export const NewlyIcon = (props: SVGAttributes<SVGElement>) => (
  <svg height={iconSize} {...props} fill="none" viewBox="0 59.17 284 156.07">
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

export const LimitedIcon = (props: SVGAttributes<SVGElement>) => (
  <svg height={iconSize} {...props} viewBox="0 0 500 284" fill="none">
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

export const NoDataIcon = (props: SVGAttributes<SVGElement>) => (
  <svg height={iconSize} {...props} viewBox="0 0 36 20" aria-hidden="true">
    <path fill="var(--baseline-icon-no_data)" d="M18 8L20 10L18 12L16 10L18 8Z" />
    <path
      fill="var(--baseline-icon-no_data)"
      d="M28 2L26 4L32 10L26 16L22 12L20 14L26 20L36 10L28 2Z"
    />
    <path fill="var(--baseline-icon-no_data)" d="M10 0L2 8L4 10L10 4L14 8L16 6L10 0Z" />
    <path fill="var(--baseline-icon-no_data)" d="M26 0L28 2L10 20L0 10L2 8L10 16L26 0Z" />
  </svg>
);

export const DiscouragedIcon = (props: SVGAttributes<SVGElement>) => (
  <svg height={iconSize} {...props} viewBox="0 0 36 20" fill="none">
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

export const AVAILABILITY_ICONS = {
  limited: LimitedIcon,
  widely: WidelyIcon,
  newly: NewlyIcon,
  unknown: NoDataIcon,
} as const satisfies Record<BaselineStatus, FC<SVGAttributes<SVGElement>>>;
