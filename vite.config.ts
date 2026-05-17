import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-baseline-status/",
  build: {
    target: "esnext",
  },
  fmt: {
    ignorePatterns: [],
  },
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [react()],
});
