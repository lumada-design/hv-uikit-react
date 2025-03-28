import type { HvAppShellConfig } from "@hitachivantara/app-shell-vite-plugin";

const {
  VITE_SAMPLE_APP_URL = "https://lumada-design.github.io/modules/sample-app/",
  VITE_USER_INFORMATION_URL = "http://localhost:8081/",
  VITE_USER_NOTIFICATIONS_URL = "http://localhost:8080/",
} = process.env;

export default {
  baseUrl: "/",
  apps: {
    "@hv/sample-app": VITE_SAMPLE_APP_URL,
    "@hv/user-information-client": VITE_USER_INFORMATION_URL,
    "@hv/user-notifications-client": VITE_USER_NOTIFICATIONS_URL,
  },
  theming: {
    themes: ["ds5", "pentahoPlus"],
    theme: "pentahoPlus",
    colorMode: "dawn",
  },
  menu: [
    {
      label: "Default App",
      submenus: [
        {
          label: "asset",
          icon: {
            iconType: "uikit",
            name: "Desktop",
          },
          submenus: [
            {
              label: "asset",
              target: "/asset-inventory",
              icon: {
                iconType: "uikit",
                name: "Cards",
              },
            },
            {
              label: "list",
              target: "/list-view",
              icon: {
                iconType: "uikit",
                name: "List",
              },
            },
          ],
        },
        {
          label: "asset",
          target: "/asset-inventory",
          icon: {
            iconType: "uikit",
            name: "Cards",
          },
        },
        {
          label: "list",
          target: "/list-view",
          icon: {
            iconType: "uikit",
            name: "List",
          },
        },
        {
          label: "notifications",
          target: "/notifications",
          icon: {
            iconType: "uikit",
            name: "Alert",
          },
        },
        {
          label: "Multi-level Breadcrumb",
          target: "/breadcrumb",
        },
        {
          label: "Theming",
          target: "/theming",
          icon: {
            iconType: "uikit",
            name: "ColorPicker",
          },
        },
        {
          label: "Display Context",
          target: "/displayContext",
        },
        {
          label: "Nested Views",
          target: "/nested",
        },
      ],
    },
    {
      label: "Not found",
      target: "/not-found",
    },
    {
      label: "Menu breadcrumb",
      target: "/breadcrumb",
    },
    {
      label: "Navigation",
      target: "/navigation",
    },
    { label: "Simple App Home", target: "/simple-app/home" },
    { label: "Candy App Context", target: "/candy-route/displayContext" },
    {
      label: "Candy-Default App Context",
      target: "/candy-route/displayDefaultAppContext",
    },
  ],
  translations: {
    en: {
      list: "List View from config",
      asset: "Asset from config",
      intro: "Intro from ASh",
    },
  },
  logo: {
    name: "LUMADA",
  },
  header: {
    actions: [
      {
        bundle: "@hv/user-notifications-client/index.js",
        config: {
          showCount: false,
        },
      },
      { bundle: "@hv/user-information-client/index.js" },
      { bundle: "@hv/theming-client/colorModeSwitcher.js" },
      {
        bundle: "@hv/app-switcher-client/toggle.js",
        config: {
          title: "Apps",
          apps: [
            {
              label: "App 1",
              description: "Application 1",
              url: "#",
              target: "NEW",
              icon: { iconType: "uikit", name: "Dummy" },
            },
            {
              label: "App 2",
              description: "Application 2",
              url: "#",
              target: "SELF",
              icon: { iconType: "uikit", name: "Warehouse" },
            },
            {
              label: "App 3",
              url: "#",
              target: "NEW",
            },
          ],
        },
      },
      {
        bundle: "@hv/help-client/button.js",
        config: {
          url: "https://www.hitachivantara.com/",
          description: "Hitachi Vantara Help Link",
        },
      },
      { bundle: "@hv/sample-app/headerActions/HelloSimpleApp.js" },
      { bundle: "@self/modules/HelloDefaultApp.js" },
      { bundle: "@self/modules/ChangeContextValue.js" },
      { bundle: "@hv/sample-app/headerActions/ChangeDefaultAppContext.js" },
    ],
  },
  mainPanel: {
    views: [
      // @self app
      {
        bundle: "@self/pages/AssetInventory.js",
        route: "/asset-inventory",
      },
      {
        bundle: "@self/pages/ListView.js",
        route: "/list-view",
      },
      {
        bundle: "@self/pages/Notifications.js",
        route: "/notifications",
        config: {
          initialNotificationText: "This is a test notification",
        },
      },
      {
        bundle: "@self/pages/Details.js",
        route: "/details/:cardId/:cardText",
      },
      {
        bundle: "@self/pages/Breadcrumb.js",
        route: "/breadcrumb",
      },
      {
        bundle: "@self/pages/Navigation.js",
        route: "/navigation",
      },
      {
        bundle: "@self/pages/Theming.js",
        route: "/theming",
      },
      {
        bundle: "@self/pages/DisplayDefaultAppContext.js",
        route: "/displayContext",
      },
      {
        bundle: "@self/pages/TabLayout.js",
        route: "/nested",

        maxWidth: "lg",

        views: [
          {
            bundle: "@self/pages/ListView.js",
            route: "/list-view",
          },
          {
            bundle: "@self/pages/AssetInventory.js",
            route: "/asset-inventory",
          },
          {
            bundle: "@self/pages/Theming.js",
            route: "/",
          },
        ],
      },
      // Simple App
      {
        bundle: "@hv/sample-app/pages/Home.js",
        route: "/simple-app/home",
      },
      // Scoped Simple App
      {
        bundle: "@hv/sample-app/pages/Home.js",
        route: "/scoped-home",
      },
      // Candy App
      {
        bundle: "@hv/sample-app/pages/Main.js",
        route: "/candy-route/*",
      },
    ],
  },
  providers: [
    { bundle: "@self/providers/DefaultAppProvider.js" },
    { bundle: "@hv/sample-app/providers/CandyAppProvider.js" },
  ],
} satisfies HvAppShellConfig;
