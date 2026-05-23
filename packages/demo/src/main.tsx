import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FeatureBaselineStatus } from "react-baseline-status";
import type { FeatureId } from "react-baseline-status";
import "./global.css";
import styles from "./main.module.css";

const FEATURED_IDS = [
  // Web Platform
  "customizable-select",
  // JavaScript
  "temporal",
  "intl-relative-time-format",
  // CSS
  "masonry",
  "accent-color",
  "attr",
  "nesting",
  "contrast-color",
  "view-transitions",
  "subgrid",
  "cascade-layers",
  // HTML
  "popover-hint",
  "popover",
  "dialog",
  "search",
] as const satisfies FeatureId[];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className={styles.main}>
      <h1>React Baseline Status</h1>
      <section className={styles.baselineStatusList}>
        {FEATURED_IDS.map((id) => (
          <FeatureBaselineStatus key={id} featureId={id} />
        ))}
      </section>
    </main>
  </StrictMode>,
);
