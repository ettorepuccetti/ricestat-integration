import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config();

export default defineConfig({
  test: { setupFiles: ["./unittest/setup.ts"] },
  resolve: {
    alias: {
      "~": "/src",
    },
  },
});
