import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FeatureBaselineStatus } from "./feature-baseline-status";
import "./global.css";
import styles from "./main.module.css";
import { FeatureStatusSkeleton } from "./feature-status-skeleton";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className={styles.main}>
      <h1>React Baseline Status</h1>
      <section className={styles.baselineStatusList}>
        <FeatureStatusSkeleton />
        <FeatureBaselineStatus featureId="a" />
        <FeatureBaselineStatus featureId="state" />
        <FeatureBaselineStatus featureId="accent-color" />
        <FeatureBaselineStatus featureId="attr" />
      </section>
    </main>
  </StrictMode>,
);
