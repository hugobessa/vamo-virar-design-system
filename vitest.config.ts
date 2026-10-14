import { defineConfig } from "vitest/config";

// The colour tokens are plain data, so their contrast checks run in Node.
export default defineConfig({ test: { include: ["src/**/*.test.ts"], environment: "node" } });
