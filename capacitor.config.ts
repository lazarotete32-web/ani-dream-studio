import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.anigen",
  appName: "AniGen",
  webDir: "dist/client",
  server: {
    // Load the live deployed app so auth (Google/Apple) and backend calls
    // work exactly like the web. Comment this block out to ship a fully
    // offline bundle of the built assets in `webDir`.
    url: "https://ani-dream-studio.lovable.app",
    cleartext: false,
    androidScheme: "https",
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
