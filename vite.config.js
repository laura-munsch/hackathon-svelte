import path from "path-browserify";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  resolve: {
    dedupe: ["svelte"],
    alias: {
      path: "path-browserify",
      "@": path.resolve("./src"),
    },
  },
});
