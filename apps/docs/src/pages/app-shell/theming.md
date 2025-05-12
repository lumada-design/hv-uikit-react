# Theming

The **App Shell** allows the customization of the _Product_'s look and feel by supporting any UI Kit theme, including the DS5 or DS3 base themes or a custom theme, and allowing to change its theme and color mode through the configuration file.

## Custom Themes

Custom themes are a _Shared Module_ that exports a UI Kit theme definition. For more information on theme structures, refer to the [UI Kit documentation](https://lumada-design.github.io/uikit/master/?path=/docs/guides-theming--main). You can also explore the [custom-themes sample](../client/samples/custom-themes) for additional guidance.

## Configuration

The **App Shell** configuration file allows to specify the available themes, active theme, and active color mode.

UI Kit base themes are identified as "ds5", "ds3", and "pentahoPlus", while custom themes are identified by the module identifier to be loaded.

### Examples

Changing the default theme (DS5) color mode:

```jsonc
// ...
  theming: {
    colorMode: "wicked"
  }
// ...
```

Using the DS3 theme in wicked mode:

```jsonc
// ...
  theming: {
    themes: ["ds3"],
    theme: "ds3", //redundant as it is the first (and only) theme in the themes array
    colorMode: "wicked"
  }
// ...
```

Using a custom theme (while keeping DS5 available as well):

```jsonc
// ...
  theming: {
    themes: ["ds5", "@hv-apps/custom-themes/tatooine.js"],
    theme: "tatooine"
  }
// ...
```

> **_NOTE_**: When using both `themes` and `theme` properties, the value defined on the latter must exist on the array of custom themes otherwise it will use the first successfully loaded custom theme or, if none managed to be loaded, it will use the default theme (ds5).

## Triggering Color Mode change

The **App Shell** listens to the CustomEvent `@hv/app-shell:theme:trigger` to allow changes in the color mode in runtime.

When dispatching this event, the detail object should include:

- `colorMode`: The theme color mode. If it doesn't exist on the theme, then **App Shell** will simply cycle to the next color mode, if any exists, otherwise will keep the one currently active.

For event dispatching, utilize the `globalThis` variable and below is an example on how to trigger the change:

```javascript
const customEvent =
  new CustomEvent() <
  HvAppShellEventTheme >
  (HvAppShellEventThemeTrigger,
  {
    detail: {
      colorMode,
    },
  });
globalThis.dispatchEvent(customEvent);
```

For more examples, explore the [theming playground sample](../client/samples/default-app/src/pages/Theming/Theming.tsx).

## Color Mode Switcher

The **App Shell** provides a built-in Color Mode Switcher _Header Action_ that can be used to change the active color mode. It will cycle through the available color modes of the active theme, effectively toggling between light and dark modes on the DS3, DS5, and Pentaho+ themes.

It can be enabled by adding the `@hv/theming-client/colorModeSwitcher.js` module to the `header.actions` array of the configuration file.

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

---

[Documentation Index](./README.md)
