# Registering other _Application Bundles_

> This is an extension of the [configuration file reference](./config-file.md#application-bundles-registration) on how to register _Application Bundles_.

In order to reference _Views_ and _Shared Modules_ from other _Application Bundles'_, one must be registered in the **App Shell**'s configuration.

Note that, during development, the project is acting both as host (i.e. **App Shell** entrypoint) and as remote (_Application Bundle_), so its own modules can be referenced using the [`@self` **base-specifier**](./config-file.md#module-locations) to make life easier to developers. At build time, the generated configuration will contain the application's registration and its referenced modules will have their full module IDs.

Other applications must always be referenced by their complete module IDs.

Example: registering another _Application Bundle_.

```jsonc
// ...
  apps: {
    "@hv-apps/another-app": "http://localhost:3001/",
  }
// ...
```

When registered, the _Application Bundle_'s contents can then be referenced as "subpaths" of its module ID.

```jsonc
// ...
  mainPanel: {
    views: [
      {
        bundle: "@hv-apps/another-app/pages/Other.js",
        route: "/hello"
      }
    ]
  }
// ...
```

```typescript
import { getName } from "@hv-apps/another-app/modules/nameGenerator.js";

export default function Hello() {
  return <h1>Hello {getName()}!</h1>;
}
```
