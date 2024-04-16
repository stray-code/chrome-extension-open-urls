import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "クリップボードにコピーしたURLを一括で開く",
  description: "クリップボードにコピーしたURLを一括で開きます。",
  version: "1.0.0",
  icons: {
    16: "img/icon16.png",
    48: "img/icon48.png",
    128: "img/icon128.png",
  },
  action: {
    default_popup: "src/popup/index.html",
    default_icon: "img/icon16.png",
  },
  permissions: ["clipboardRead"],
});

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
