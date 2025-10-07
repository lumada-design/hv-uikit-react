import react from "@vitejs/plugin-react";
import unoCSS from "unocss/vite";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { HvAppShellVitePlugin } from "@hitachivantara/app-shell-vite-plugin";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    unoCSS({ mode: "per-module" }),
    cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
    HvAppShellVitePlugin({
      mode,
      type: "app",
      disableAppsKeyNormalization: true,
      modules: [
        "src/providers/DefaultAppProvider",
        "src/modules/HelloDefaultApp",
        "src/modules/ChangeContextValue",
        "src/pages/AssetInventory",
        "src/pages/ListView",
        "src/pages/Notifications",
        "src/pages/Details",
        "src/pages/Breadcrumb",
        "src/pages/Navigation",
        "src/pages/Theming",
        "src/pages/TabLayout",
        "src/pages/DisplayDefaultAppContext",
        "src/services/headerActions/CreateNewContentDropDownMenu",
        "src/pages/ServicesDemo",
        "src/services/create/useCreateNewReportAction",
        "src/services/create/useCreateNewDashboardAction",
        "src/services/factories/createMessageService",
        "src/services/components/NotificationComponent",
      ],
    }),
  ],
  server: { port: 5181 },
  preview: { port: 5181 },
}));
