import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3002,
    },
    base: "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@pkg": path.resolve(__dirname, "../../packages"),
      },
    },
  };
});