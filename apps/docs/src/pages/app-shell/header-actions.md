# Header Actions

The **App Shell** allows to add actions to the right-hand side of the header. These actions are defined in the **App Shell** configuration file, under the `header.actions` property and will be displayed in the same order as they are declared on the configuration file. Being this a dynamic component, if one action can't be loaded by **App Shell**, it will adjust accordingly to the ones that were successfully loaded.

## Example

Create `src/header/SayHelloButton.tsx` with the following code:

```typescript
export default function Hello({ planet = "Earth" }: { planet: string }) {
  return <button onClick={() => alert(`Hello ${planet}!`)}>Say Hello</button>;
}
```

Add the _Header Action_ to your configuration:

```jsonc
// ...
  header: {
    actions: [
      {
        bundle: "@hv-apps/my-app/header/SayHelloButton.js",
        config: {
          planet: "Mars",
        }
      }
      // ...
    ]
  }
// ...
```

## Built-in Header Actions

##### App Switcher

The **App Shell** provides an App Switcher _Header Action_ that opens a panel with a list of available _Products_, implementing the NEXT Design System's [App Switcher pattern](https://designsystem.hitachivantara.com/6c705d900/v/0/p/63dcb0-app-launcher--switcher/b/325296).

To use this action, the bundle must be defined as `@hv/app-switcher-client/toggle.js` and the config object for it has the following options:

- _**title**_: The App Switcher panel title. Supports internationalization.
- _**apps**_: Array of apps that are included at the app switcher panel. Each App has the following properties:
    - _**label**_: Title of the app. **Required**. Supports internationalization.
    - _**description**_: Description of the app. Supports internationalization.
    - _**url**_: URL to be used for navigation when clicking the button. **Required**. Supports internationalization.
    - _**target**_: `NEW` or `SELF`. If value provided is `NEW`, it will open the provided url in a new tab. If value is `SELF`, will navigate in the current browser tab. **Required**.
    - _**icon**_: The icon associated with the app.
        - _**iconType**_: Type of icon to be used (at this moment the only possible value is `uikit`).
        - _**name**_: Name of the icon to be used (as identified at [UI Kit's icons library](https://lumada-design.github.io/uikit/master/?path=/docs/foundation-icons--main))

Example:

```jsonc
// ...
  header: {
    actions: [
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
              icon: {
                iconType: "uikit",
                name: "Dummy"
              }
            },
            {
              label: "App 2",
              description: "Application 2",
              url: "#",
              target: "SELF",
              icon: {
                iconType: "uikit",
                name: "Warehouse"
              }
            },
            {
              label: "App 3",
              url: "#",
              target: "NEW"
            }
          ]
        }
      }
      // ...
    ]
  }
// ...
```

##### Help Button

To use this action, the bundle must be defined as `@hv/help-client/button.js` and the config object for it has the following options:

- _**url**_: URL to be used for navigation when clicking the button. **Required**. Supports internationalization.
- _**description**_: Description of the button. Supports internationalization. If no value is provided the fallback value will be `url`.

Example:

```jsonc
// ...
  header: {
    actions: [
      {
        bundle: "@hv/help-client/button.js",
        config: {
          url: "https://www.hitachivantara.com/",
          description: "Hitachi Vantara Help Link"
        }
      }
      // ...
    ]
  }
// ...
```

##### Color Mode Switcher

To use this action, the bundle must be defined as `@hv/theming-client/colorModeSwitcher.js`. It has no config options.

Example:

```jsonc
// ...
  header: {
    actions: [
      {
        bundle: "@hv/theming-client/colorModeSwitcher.js"
      }
      // ...
    ]
  }
// ...
```

See [Theming](./theming.md) for more information.

___
[Documentation Index](./README.md)
