import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BaselineStatus } from "./baseline-status";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>React Baseline Status</h1>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <BaselineStatus featureId="a" />
        <BaselineStatus featureId="state" />
        <BaselineStatus featureId="accent-color" />
        <BaselineStatus featureId="attr" />
      </div>
    </div>
  </StrictMode>,
);
