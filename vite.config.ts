import { defineConfig } from "vite";
import { visualizer } from 'rollup-plugin-visualizer';
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    visualizer(),
    react(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase from default 500kb to 1000kb
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            return 'vendor'; // Other dependencies
          }
          
          // App chunks
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          if (id.includes('/components/gallery/')) {
            return 'gallery-components';
          }
          // Let other chunks be automatic
        }
      }
    }
  }
}));
