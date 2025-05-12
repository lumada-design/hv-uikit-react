# Localization

The **App Shell** utilizes the [i18next](https://www.i18next.com/) library for localization. As such, localizable values in the configuration files are provided with inline translation bundles defined using the [i18next JSON format](https://www.i18next.com/misc/json-format).

Example: localizing the application name.

```jsonc
// ...
  name: "NAME_TRANSLATION_KEY",
  translations: {
    en: {
      NAME_TRANSLATION_KEY: "My App"
    },
    es: {
      NAME_TRANSLATION_KEY: "Mi App"
    }
  }
// ...
```

Check the [configuration file reference](./config-file.md#Localization) for more information on how to provide translations.

## Application Bundles localization

_Application Bundles_ may use different localization libraries, but using i18next is the recommendation.
The **App Shell does not** provide translations to the embedded _Views_ meaning that each _Application Bundle_ must handle its own translations.

A _View_ may accidentally access the **App Shell**'s i18next instance when using the `useTranslation` hook.
Because of that, _Application Bundles_ must ensure they use its own i18next instance to avoid collision and incorrect information display.
For more information check the documentation at [i18next.com/overview/api](https://www.i18next.com/overview/api#createinstance).

An `I18nextProvider` can be used to share the i18next instance. Look at the [internal-route-candy-app sample](../client/samples/internal-route-candy-app/src/pages/Main/Main.tsx).
