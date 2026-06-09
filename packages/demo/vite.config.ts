import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/react-baseline-status/",
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "react-baseline-status": resolve(__dirname, "../component/src/index.ts"),
    },
  },
  plugins: [react()],
});
