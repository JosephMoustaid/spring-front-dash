import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Lazily import `lovable-tagger` only when explicitly enabled via
// the LOVABLE_DEV_SERVER env var. The package imports `esbuild`
// at module-init time which pulls in native binaries that can
// crash (SIGBUS) on some systems/configurations. Avoid loading
// it during a normal dev start unless the sandbox is requested.
export default defineConfig(async ({ mode }) => {
  const reactPlugin = react();

  let devPlugin: any = null;
  if (mode === "development" && process.env.LOVABLE_DEV_SERVER === "true") {
    const mod = await import("lovable-tagger");
    devPlugin = mod.componentTagger();
  }

  const plugins = [
    ...(Array.isArray(reactPlugin) ? reactPlugin : [reactPlugin]),
    ...(devPlugin ? (Array.isArray(devPlugin) ? devPlugin : [devPlugin]) : []),
  ].filter(Boolean);

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
