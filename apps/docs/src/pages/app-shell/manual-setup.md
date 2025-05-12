# Manual setup

This page provides detailed information and an how-to-install the `@hitachivantara/app-shell` package.

The [automatic setup](../README.md#automatic-setup) is the recommended approach when you are starting a new project, but these instructions are provided for those who want to manually install the **App Shell** package or need to upgrade an existing project.

Currently, it only covers projects that use [vite](https://vitejs.dev/) as a build tool. Support for other build tools is intended for the near future.
A [vite plugin](../client/packages/app-shell-vite-plugin/README.md) is provided to speed up the development process.

To create a new **App Shell** app manually:

1. Create a new vite app with Typescript and React. _Make sure to select Typescript and React in the vite options._
```shell
  npm create vite@latest
```

2. Install `@hitachivantara/app-shell-vite-plugin` packages.

```shell
  npm install -D @hitachivantara/app-shell-vite-plugin
```

- Optionally if you need to perform navigation at any bundle, `@hitachivantara/app-shel-navigation` is required to be installed.
```shell
  npm install @hitachivantara/app-shel-navigation
```



3. Replace the content of the `vite.config.ts` file with the code below:

```javascript
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tsconfigPaths from "vite-tsconfig-paths";
  import { HvAppShellVitePlugin } from "@hitachivantara/app-shell-vite-plugin";

  export default defineConfig(({ mode }) => {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
        HvAppShellVitePlugin({ 
          mode,         
          modules: [
            "src/App"
          ]    
        })
      ],
    };
  });
```

4. Now create a new file named `app-shell.config.ts` in the root directory. This file holds the configuration of your application. For now, add the following configuration:

```typescript
  import type { AppShellVitePluginOptions, HvAppShellConfig } from "@hitachivantara/app-shell-vite-plugin";
  
  export default (
    _opts: AppShellVitePluginOptions,
    env: Record<string, string>
  ): HvAppShellConfig => ({
    name: "MyApp",
    menu: [
      {
        label: "Home",
        target: "/"
      }
    ],
    logo: { name: "HITACHI" },
    mainPanel: {
      views: [
        {
          bundle: "@self/App.js",
          route: "/"
        }
      ]
    }
  });
```

  For more information about the **App Shell** configuration check the [configuration file reference](./config-file.md).

5. The file `src/App.tsx` can be removed as the vite plugin will add it automatically as a virtual resource if not present.
However, if you still see the need to have it in your app, then replace its content with the code below:

```javascript
  import HvAppShell from "@hitachivantara/app-shell-ui";

  const App = () => {
    return (
      <HvAppShell
        configUrl={`${document.baseURI}app-shell.config.json`}
      />
    );
  };

  export default App;
```

6. You are good to go! Run your brand new **App Shell** app! :rocket:

```shell
  npm run dev
```

![quick start result](./images/quick-start.png)

You can also check our [sample apps](../client/samples/) as reference.

___
➡️ **Next step**: [Base Concepts](./base-concepts.md).

[Documentation Index](./README.md).
