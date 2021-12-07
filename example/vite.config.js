import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@mui/styled-engine": path.resolve(
        __dirname,
        "node_modules",
        "@mui/styled-engine-sc"
      ),
    },
  },
});
