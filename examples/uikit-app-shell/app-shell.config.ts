import type { HvAppShellConfig } from "@hitachivantara/app-shell";

export default (): HvAppShellConfig => ({
  name: "uikit-app-shell",

  apps: [
    {
      id: "@self",
      baseUrl: "/",
      views: [{ bundle: "src/pages/Home", route: "/" }],
      modules: [],
    },
    {
      id: "@self",
      baseUrl: "/",
      views: [{ bundle: "src/pages/Page2", route: "/page2" }],
      modules: [],
    },
  ],

  menu: [
    { label: "Home", target: "/" },
    { label: "Page 2", target: "/page2" },
  ],
});
