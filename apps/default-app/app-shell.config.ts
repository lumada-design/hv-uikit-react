import type { HvAppShellConfig } from "@hitachivantara/app-shell-vite-plugin";

export default {
  baseUrl: "/",
  apps: {},
  logo: {
    name: "PENTAHO",
  },
  theming: {
    themes: ["ds5", "pentahoPlus"],
    theme: "pentahoPlus",
    colorMode: "dawn",
  },

  navigationMode: "ONLY_LEFT",

  menu: [
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
      label: "Nested Views",
      target: "/nested",
    },
    {
      label: "Services Demo",
      target: "/services-demo",
      icon: {
        iconType: "uikit",
        name: "Settings",
      },
    },
    {
      label: "Providers Demo",
      target: "/providers-demo",
      icon: {
        iconType: "uikit",
        name: "Package",
      },
    },
    // ========================================
    // CONDITIONS EXAMPLES
    // Menus inherit conditions from matching views!
    // ========================================
    {
      label: "Conditions Demo",
      icon: {
        iconType: "uikit",
        name: "Eye",
      },
      submenus: [
        {
          label: "Sync True (Always Visible)",
          target: "/sync-true-demo",
          icon: {
            iconType: "uikit",
            name: "Check",
          },
        },
        {
          label: "Sync False (Always Hidden)",
          target: "/sync-false-demo",
          icon: {
            iconType: "uikit",
            name: "Close",
          },
        },
        {
          label: "Async True (0.5s delay)",
          target: "/async-true-demo",
          icon: {
            iconType: "uikit",
            name: "Clock",
          },
        },
        {
          label: "Async False (0.5s delay)",
          target: "/async-false-demo",
          icon: {
            iconType: "uikit",
            name: "ClockStop",
          },
        },
        {
          label: "Dynamic (Appears after 10s)",
          target: "/dynamic-condition-demo",
          icon: {
            iconType: "uikit",
            name: "Refresh",
          },
        },
        {
          label: "Sync True + Async True",
          target: "/multiple-conditions-demo",
          icon: {
            iconType: "uikit",
            name: "Hierarchy",
          },
        },
        {
          label: "Sync True + Sync False",
          target: "/multiple-fail-demo",
          icon: {
            iconType: "uikit",
            name: "Ban",
          },
        },
        {
          label: "Inverse Dynamic (view) + Async True",
          target: "/inverse-dynamic",
          icon: {
            iconType: "uikit",
            name: "Ban",
          },
          conditions: [
            {
              bundle: "default-app/conditions/useAsyncTrue.js",
            },
          ],
        },
        {
          label: "Nested Submenus",
          icon: {
            iconType: "uikit",
            name: "Tree",
          },
          submenus: [
            {
              label: "Sync True",
              target: "/nested-visible",
            },
            {
              label: "Sync False",
              target: "/nested-hidden",
            },
            {
              label: "Async True",
              target: "/nested-async",
            },
          ],
        },
      ],
    },

    {
      label: "Not found",
      target: "/not-found",
    },
  ],
  translations: {
    en: {
      list: "List View from config",
      asset: "Asset from config",
      intro: "Intro from ASh",
    },
  },
  header: {
    actions: [
      {
        bundle: "@self/services/headerActions/CreateNewContentDropDownMenu.js",
      },
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
      { bundle: "@self/modules/HelloDefaultApp.js" },
      { bundle: "@self/modules/ChangeContextValue.js" },
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
      // Services Demo Page
      {
        bundle: "@self/pages/ServicesDemo.js",
        route: "/services-demo",
      },
      // Providers Demo Page
      {
        bundle: "@self/pages/ProvidersDemo.js",
        route: "/providers-demo",
      },

      // ========================================
      // CONDITIONS EXAMPLES - VIEWS
      // ========================================

      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/sync-true-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useAlwaysTrue.js",
          },
        ],
      },

      // Example 2: Sync False - Never accessible (404)
      {
        bundle: "@self/pages/ShouldNotBeVisible.js",
        route: "/sync-false-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useAlwaysFalse.js",
          },
        ],
      },

      // Example 3: Async True - Accessible after delay
      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/async-true-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useAsyncTrue.js",
          },
        ],
      },

      // Example 4: Async False - Not accessible (404 after delay)
      {
        bundle: "@self/pages/ShouldNotBeVisible.js",
        route: "/async-false-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useAsyncFalse.js",
          },
        ],
      },

      // Example 5: Multiple conditions (both true)
      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/multiple-conditions-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useAlwaysTrue.js",
          },
          {
            bundle: "default-app/conditions/useAsyncTrue.js",
          },
        ],
      },

      // Example 6: Multiple conditions (one false)
      {
        bundle: "@self/pages/ShouldNotBeVisible.js",
        route: "/multiple-fail-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useAlwaysTrue.js",
          },
          {
            bundle: "default-app/conditions/useAlwaysFalse.js",
          },
        ],
      },

      // Example 7: Inverse dynamic (false after 10s)
      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/inverse-dynamic",
        conditions: [
          {
            bundle: "default-app/conditions/useInverseDynamicCondition.js",
          },
        ],
      },

      // Nested menu views
      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/nested-visible",
        conditions: [
          {
            bundle: "default-app/conditions/useAlwaysTrue.js",
          },
        ],
      },
      {
        bundle: "@self/pages/ShouldNotBeVisible.js",
        route: "/nested-hidden",
        conditions: [
          {
            bundle: "default-app/conditions/useAlwaysFalse.js",
          },
        ],
      },
      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/nested-async",
        conditions: [
          {
            bundle: "default-app/conditions/useAsyncTrue.js",
          },
        ],
      },

      // Dynamic condition example - appears after 10 seconds
      {
        bundle: "@self/pages/ShouldBeVisible.js",
        route: "/dynamic-condition-demo",
        conditions: [
          {
            bundle: "default-app/conditions/useDynamicCondition.js",
          },
        ],
      },
    ],
  },
  providers: [
    {
      bundle: "@self/providers/DefaultAppProvider.js",
      // Always visible provider (no conditions)
    },
    {
      bundle: "@self/providers/AsyncProvider.js",
      conditions: [{ bundle: "default-app/conditions/useAsyncTrue.js" }],
    },
    {
      bundle: "@self/providers/HiddenProvider.js",
      conditions: [{ bundle: "default-app/conditions/useAlwaysFalse.js" }],
    },
    {
      bundle: "@self/providers/DynamicProvider.js",
      conditions: [{ bundle: "default-app/conditions/useDynamicCondition.js" }],
    },
  ],
  services: {
    // Instance Service (bundle) - Basic hooks service consumed by ServicesDemo page and CreateNewContentDropDownMenu header action
    "default-app/services:UseCreateNewContentAction": [
      {
        instance: {
          bundle: "default-app/services/create/useCreateNewReportAction.js",
        },
        ranking: 100,
        conditions: [
          {
            bundle: "default-app/conditions/useInverseDynamicCondition.js",
          },
        ],
      },
      {
        instance: {
          bundle: "default-app/services/create/useCreateNewDashboardAction.js",
        },
        conditions: [
          {
            bundle: "default-app/conditions/useAsyncTrue.js",
          },
        ],
      },
    ],

    // Instance Service (direct values) - Simple configuration data
    "default-app/services:SimpleDataService": [
      {
        instance: {
          value: {
            appName: "Default App",
            version: "1.0.0",
            environment: "development",
            debug: true,
          },
        },
        ranking: 100,
      },
    ],

    // Factory Service (bundle) - Message service
    "default-app/services:MessageService": [
      {
        factory: {
          bundle: "default-app/services/factories/createMessageService.js",
          config: {
            prefix: "App Message: ",
          },
        },
      },
    ],

    // Component Service (bundle) - Basic notification component
    "default-app/services:BasicNotification": [
      {
        component: {
          bundle: "default-app/services/components/NotificationComponent.js",
          config: {
            message: "Service is active!",
          },
        },
        ranking: 100,
      },
    ],
  },
} satisfies HvAppShellConfig;
