# App Shell configuration

As already mentioned, the **App Shell** configuration file holds the application's configuration, and it can be either a JSON or a TypeScript (recommended) file.

## Module locations

Properties that reference modules' locations can be:

- A **bare-specifier**, such as `@hv-apps/my-app/pages/Hello.js`. The bare-specifier prefix must be mapped to a URL (`baseUrl`) in the [`apps` property](#application-bundles-registration).
- A fully qualified URL, like `http://localhost:3001/pages/Hello.js`, which directly points to the module’s location.

During development, the following additional module location can also be used:

- A bare-specifier with a `@self` prefix, like `@self/pages/Hello.js`, refers to the module within the current Application Bundle.

## Internationalization

Properties that receive text values can be internationalized by using a key that is present on the bundle of the [`translations` property](#localization).

If a value, used in any of the internationalizable properties, is not present on the translations bundle then it will be used as is.

## Configuration Properties

### Application Identity

#### _name_

Specifies the product name displayed in the header and in the browser tab. Supports internationalization.

#### _baseUrl_

The base path for the product, required when it isn't hosted at the root of the hosting service. Defaults to "/" if not present.

#### _logo_

Defines the product logo. It includes:

- **name**: Either `HITACHI`, `LUMADA`, or `PENTAHO+`. Defaults to `HITACHI`.
- **description**: The descriptive text of the logo, that is also subject to internationalization.

If you don't want to add a logo to the header, explicitly set the menu item `logo` to `null`.

### Application Bundles Registration

#### _apps_

Key-value object of _Application Bundles_ IDs and their respective locations. Used by the **App Shell** to generate the importmap and thus allowing the import of ES Modules from different _Application Bundles_.

Example:

```jsonc
// ...
  apps: {
      "@hv-apps/an-app": "http://localhost:3001/",
      "@hv-apps/another-app": "http://localhost:5001/"
  }
// ...
```

See [Registering other _Application Bundles_](./other-apps.md) for more information.

### Main Panel

#### _mainPanel_

Defines the main panel content properties. Accepts the following:

- _**views**_: Array of _View_ items. Each _View_ item is defined by the following set of values:
  - **bundle**: The module location of the _View_. **Required**.
  - **route**: Defines the route of the _View_. **Required**.
  - **config**: Bag of properties that will be sent to the exported component as properties. These are defined by the component itself. See example in our simple-app [configuration file](../client/samples/simple-app/app-shell.config.json) and [basic usage](../client/samples/simple-app/src/pages/SecondPage/SecondPage.tsx).
  - **views**: Array of nested _View_ items. **route** will be appended to the parent route. See [Nested Views](./views.md#nested-views) for more information.

The mainPanel also accepts any of the [UI Kit's HVContainer props](https://lumada-design.github.io/uikit/master/?path=/docs/components-container--main), for configuring the container that wraps the _Views_. Note that the _maxWidth_ prop defaults to `"xl"` in the **App Shell**, instead of `false` as in the UI Kit.

The same properties can be used on any top-level _View_ item, and they will override the ones defined at the _mainPanel_ for that particular _View_. Nested _Views_ are not wrapped by a container, so these properties are not applicable.

Example:

```jsonc
// ...
  mainPanel:
    {
      maxWidth: "sm",
      views: [
        {
          bundle: "@hv-apps/my-app/pages/Hello.js",
          route: "/hello",
          config: {
            name: "John"
          }
        },
        {
          bundle: "@hv-apps/another-app/pages/Person.js",
          route: "/contacts/:name",
          maxWidth: "lg",
          fixed: true
        }
        // ...
      ]
    }
// ...
```

See [Views and Routes](./views.md) for more information.

### Navigation

#### _menu_

Describes the _Product's_ menus, with each item potentially having submenus and associated icons.

It's an array where each menu item is defined by the following set of values:

- _**label**_: The menu label (visible by the users at the browser). **Required**. Supports internationalization.
- _**target**_: The route value defined at the view.
- _**icon**_: The icon associated with the app.
  - _**iconType**_: Type of icon to be used (at this moment the only possible value is `uikit`).
  - _**name**_: Name of the icon to be used (as identified at [UI Kit's icons library](https://lumada-design.github.io/uikit/master/?path=/docs/foundation-icons--main))
- _**submenus**_: Array of sub menu items.
  - the props for this object are the same as the top menu:
    - label
    - target
    - icon
    - submenus

> **WARNING:** At the moment, **`target` and `submenus` properties should not be used together in the definition of a menu item**.

To give more context, when we use the Vertical Navigation panel and perform a menu item click, it needs to know if it should navigate to the given target or open its submenu tree. Since this is done by explicitly checking which property exists. Also, when navigating to a URL, **App Shell** will try its best to find which menu should be selected and as such, having both target and submenus property can lead to behaviour inconsistency.

Example:

```jsonc
// ...
  menu: [
    {
      label: "Page 1",
      icon: {
        iconType: "uikit",
        name: "Open"
      },
      submenus: [
        {
          label: "Sub Page 1",
          target: "/subpage1",
          icon: {
            iconType: "uikit",
            name: "Close"
          }
        },
        {
          label: "Sub Page 2",
          submenus: [
            // ...
          ]
        }
      ]
    },
    {
      label: "Page 2",
      target: "/page2"
    }
    // ...
  ]
// ...
```

See [Navigation](./navigation.md) for more information.

#### _navigationMode_

Determines the layout of the navigation. The possible options are:

`TOP_AND_LEFT` - In this mode, the first level of menu items will be displayed on the top (inside the header), and the remaining items will be displayed inside a vertical navigation panel on the left.

**Note** This is the default option when none is provided.

`ONLY_TOP` - In this mode all navigation will be presented on the top. With this mode, only two levels of menus will be displayed: the first one inside the header, and the second one will appear below the header on an extra navigation bar.

`ONLY_LEFT` - In this mode, all the menu structure will be displayed on the left vertical navigation panel. No items will appear on the top.

### Header Customization

#### _header_

Defines all customizations that can be applied to the Header of the **App Shell**:

- _**actions**_: _Header Actions_ that will be displayed on the Header. It is composed of an array of objects where each object has the following options:
  - _**bundle**_: The module location of the _Header Action_. **Required**.
  - _**config**_: Bag of properties that will be sent to the exported component as props. These are defined by the component itself.

Example:

```jsonc
// ...
  header: {
    actions: [
      {
        bundle: "@hv/user-notifications-client/index.js",
        config: {
          showCount: false
        }
      },
      {
        bundle: "@hv/theming-client/colorModeSwitcher.js"
      }
      // ...
    ]
  }
// ...
```

See [Header Actions](./header-actions.md) for more information and see the available **App Shell** built-in actions.

### Shared Context

#### _providers_

This prop defines the _Providers_ that will wrap all the _Views_ and _Shared Modules_. It is an array of objects where each object has the following options:

- _**bundle**_: The module location of the _Provider_. **Required**.

See [Sharing State](./state.md) for more information.

### Localization

#### _translations_

This property defines bundles of translations that need to be added in runtime to **App Shell** translation bundle.
These are **NOT** available to the _Views_.

Being an object, it is required to have as root the language (en, pt, etc..) of the bundle:

Example:

```jsonc
 // ...
  name: "translationKey",
  logo: {
    name: "HITACHI",
    description: "logoDesc"
  },
  menu: [
    {
      label: "pageOne",
      target: "/page1"
    }
    // ...
  ],
  translations: {
    en: {
      translationKey: "An Amazing App",
      logoDesc: "Company logo",
      pageOne: "Page One"
    },
    pt: {
      translationKey: "Uma App Fantástica",
      logoDesc: "Logo da empresa",
      pageOne: "Página Um"
    }
  }
 // ...
```

In the example above, the name of the application, that appears on the browser tab and on the header,
defines a key that exists on the translations bundle and so will be translated by **App Shell** accordingly.
The same happens with other localized properties (like the logo description or menu labels).

See [Localization](./localization.md) for more information.

### Theme Configuration

#### _theming_

This property defines the theme of the _Product_, and it supports both the base UI Kit themes and custom themes.

The config object for it has the following options:

- _**themes**_: Array of available themes. The base UI Kit themes are identified by "ds5", "ds3", and "pentahoPlus" and the custom themes are identified by module to be loaded. Defaults to `["ds5"]`.
- _**theme**_: The active theme. It is the name defined in the theme definition, not the module name. Defaults to the first theme in the themes array.
- _**colorMode**_: The color mode of the theme. Defaults to the default color mode of the theme. UI Kit base themes support "dawn" and "wicked" color modes (defaulting to "dawn"). Custom themes define their own color modes.

See [Theming](./theming.md) for more information.

## Other features

## Tokens

When using the **JSON format**, the configuration can use tokens that are to be replaced at build time, and they must be wrapped, at the beginning and at the end, by `@@` sequence. This can be used anywhere in the configuration file.

```jsonc
// ...
  apps: {
     "@hv/user-notifications-client": "@@USER_NOTIFICATIONS_URL@@"
  }
// ...
```

To complete the token replacement, final values should be set at app `vite.config.ts` file

```ts
return {
  plugins: [
    react(),
    tsconfigPaths(),
    HvAppShellVitePlugin({
      mode,
      configTokensToReplace: [
        {
          token: "USER_NOTIFICATIONS_URL",
          value: "http://localhost:8080",
        },
      ],
    }),
  ],
  // ...
};
```

## Env variables

When using the **Typescript format**, the configuration can use environment variables that are to be replaced at build time.

```jsonc
// ...
  apps: {
    "@hv/user-notifications-client": env.VITE_USER_NOTIFICATIONS_URL || "http://localhost:8080"
  }
// ...
```

These variables should be set at `.env` files like explained [here](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used) and declared as below example:

```
VITE_USER_NOTIFICATIONS_URL="http://example:7070"
```

---

➡️ **Next step**: [Notifications](./notifications.md)

[Documentation Index](./README.md)
