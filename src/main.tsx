import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BaselineStatus } from "./baseline-status";
import styles from "./baseline-status.module.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className={styles["main"]}>
      <h1>React Baseline Status</h1>
      <section className={styles["baseline-status-list"]}>
        <BaselineStatus featureId="a" />
        <BaselineStatus featureId="state" />
        <BaselineStatus featureId="accent-color" />
        <BaselineStatus featureId="attr" />
      </section>
    </main>
  </StrictMode>,
);
