import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ["crypto-js"],
  },
  build: {
    outDir: "dist", // Ensure Vercel looks in the correct folder
    rollupOptions: {
      // input: {
      //   main: "src/main.tsx",
      //   specific: "src/widget/widget-main.tsx", // Point to an entry in the folder
      // },
      output: {
        entryFileNames: "assets/[name].js", // for entry files
        chunkFileNames: "assets/[name].js", // for chunks
        assetFileNames: "assets/[name].[ext]", // for static assets
        // Define custom chunk names if necessary
        manualChunks: {
          "my-widget": ["src/widget/widget-main.tsx"],
        },
      },
    },
  },
});
