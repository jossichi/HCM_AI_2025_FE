import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/video": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/frames": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
    port: 3000, // Tùy chọn: chạy frontend trên port 3000
    open: true, // Tự động mở trình duyệt
  },
});
