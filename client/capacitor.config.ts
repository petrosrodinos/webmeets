import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.webmeets.app",
  appName: "client",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
