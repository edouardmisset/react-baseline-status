import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FeatureBaselineStatus } from "./feature-baseline-status";
import "./global.css";
import styles from "./main.module.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className={styles.main}>
      <h1>React Baseline Status</h1>
      <section className={styles.baselineStatusList}>
        {/* Web Platform */}
        <FeatureBaselineStatus featureId="customizable-select" />

        {/* JavaScript */}
        <FeatureBaselineStatus featureId="temporal" />
        <FeatureBaselineStatus featureId="intl-relative-time-format" />

        {/* CSS */}
        <FeatureBaselineStatus featureId="masonry" />
        <FeatureBaselineStatus featureId="accent-color" />
        <FeatureBaselineStatus featureId="attr" />
        <FeatureBaselineStatus featureId="nesting" />
        <FeatureBaselineStatus featureId="contrast-color" />
        <FeatureBaselineStatus featureId="view-transitions" />
        <FeatureBaselineStatus featureId="subgrid" />
        <FeatureBaselineStatus featureId="cascade-layers" />

        {/* HTML */}
        <FeatureBaselineStatus featureId="popover-hint" />
        <FeatureBaselineStatus featureId="popover" />
        <FeatureBaselineStatus featureId="dialog" />
        <FeatureBaselineStatus featureId="search" />
      </section>
    </main>
  </StrictMode>,
);
