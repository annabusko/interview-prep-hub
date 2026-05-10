import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), tailwindcss()],
  base: "/interview-prep-hub/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
