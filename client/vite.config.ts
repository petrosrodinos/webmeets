import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      assets: "/src/assets",
      lib: "/src/lib",
      pages: "/src/pages",
      hooks: "/src/hooks",
      store: "/src/store",
      enums: "/src/enums",
      types: "/src/types",
      interfaces: "/src/interfaces",
      "validation-schemas": "/src/validation-schemas",
      services: "/src/services",
      constants: "/src/constants",
      router: "/src/router",
    },
  },
  server: {
    open: true,
  },
});
