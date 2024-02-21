import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

import viteTsconfigPaths from "vite-tsconfig-paths"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths(), eslint()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
