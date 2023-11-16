import type { HvAppShellConfig } from "@hitachivantara/app-shell";

export default (): HvAppShellConfig => ({
  name: "uikit-app-shell",

  apps: [
    {
      id: "@self",
      baseUrl: "/",
      views: [{ bundle: "src/pages/Project", route: "/project" }],
      modules: [],
    },
  ],

  menu: [{ label: "key_Project", target: "/project" }],

  translations: {
    en: {
      key_Project: "Project",
    },
  },
});
