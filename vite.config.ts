import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["src/test/**", "src/env.d.ts"],
      outDir: "dist",
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
});
