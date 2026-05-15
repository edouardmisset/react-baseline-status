"use client";

import { Suspense, use } from "react";
import { fetchFeature, type Status } from "./data";
import "./baseline-status.css";
import type { FeatureId } from "./feature-ids";
import { availabilityIcons, BrowserStatus } from "./icons";

interface BaselineStatusProps {
  featureId: FeatureId;
}

export function BaselineStatus({ featureId }: BaselineStatusProps) {
  return (
    <Suspense fallback={<div className="baseline-status baseline-skeleton" />}>
      <FeatureDetails featureId={featureId} />
    </Suspense>
  );
}

function FeatureDetails({ featureId }: { featureId: FeatureId }) {
  const data = use(fetchFeature(featureId));

  const { status, name, description, browsers, lowDate } = data;

  const Icon = availabilityIcons[status];

  return (
    <details className="baseline-status" data-status={status}>
      <summary className="baseline-summary">
        <div className="baseline-header">
          <span className="baseline-title">
            <Icon />
            {getStatusLabel(status, lowDate)}
          </span>
        </div>
        <h3 className="baseline-logo">
          <strong>{name}</strong>
        </h3>
        <div className="baseline-browsers">
          <BrowserStatus name="Chrome" available={browsers.chrome} />
          <BrowserStatus name="Edge" available={browsers.edge} />
          <BrowserStatus name="Firefox" available={browsers.firefox} />
          <BrowserStatus name="Safari" available={browsers.safari} />
        </div>
      </summary>

      <div className="baseline-content">
        <h3>{name}</h3>
        {description ? <p>{description}</p> : <p>{getDefaultDescription(status, lowDate)}</p>}
        <div style={{ marginTop: "1rem", fontSize: "0.9em", color: "#666" }}>
          <a
            href={`https://webstatus.dev/features/${featureId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on WebStatus.dev
          </a>
        </div>
      </div>
    </details>
  );
}

function getStatusLabel(status: Status, lowDate?: string) {
  const labels = {
    widely: "Widely available",
    newly: "Newly available",
    limited: "Limited availability",
    unavailable: "Unavailable",
    unknown: "Unknown",
  } as const satisfies Record<Status, string>;
  return (
    <>
      {labels[status]}
      {status === "newly" && lowDate && (
        <span className="baseline-badge">{new Date(lowDate).getFullYear()}</span>
      )}
    </>
  );
}

function getDefaultDescription(status: Status, date?: string) {
  if (status === "widely") {
    return `This feature is well established and works across many devices and browser versions.${
      date ? ` It’s been available across browsers since ${new Date(date).getFullYear()}.` : ""
    }`;
  }
  if (status === "newly") {
    return `Since ${
      date ? new Date(date).getFullYear() : "recently"
    }, this feature works across the latest devices and browser versions. Support may be missing from older versions.`;
  }
  return "We currently don’t have detailed description for this feature.";
}
