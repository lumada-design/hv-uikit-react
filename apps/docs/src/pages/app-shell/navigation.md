# Navigation

The **App Shell** implements the [NEXT Design System's Navigation System pattern](https://designsystem.hitachivantara.com/6c705d900/p/90fb01-navigation-system/b/07cb30), which includes both a top horizontal navigation bar and a left vertical navigation bar and the menu items are defined in the **App Shell** configuration file, under the `menu` property.

Example: Add the following menu item to your configuration:

```jsonc
// ...
  menu: [
    {
      label: "Hello",
      target: "/hello"
    }
    // ...
  ]
// ...
```

Check the [configuration file reference](./config-file.md#Navigation) for more information on how to build the _Product's_ navigation menu.

You can also enable the `autoMenu` option that when set, will have the plugin trying to automatically add the configured views as menu entries. Any menu defined in the App Shell config file will be overwritten. For more details refer to the [plugin documentation](../client/packages/app-shell-vite-plugin/README.md).

## Navigation between Views

Each _View_ doesn't know the final route path it will be mounted at, as it is defined by the application that integrates it. Most noticeable, the _View_ doesn't know the path of other _Views_ it wants to navigate to.

To allow _Views_ to navigate to other _Views_, the **App Shell Navigation** provides a `useHvNavigation` hook that returns a `navigate` function.

Example: Add the following code to `pages/Hello.tsx`:

```typescript
import { useHvNavigation } from "@hitachivantara/app-shell-navigation";

export default function Hello() {
  const { navigate } = useHvNavigation();

  return (
    <div>
      <h1>Hello World!</h1>
      <button
        onClick={() =>
          navigate({ viewBundle: "/pages/Persons/Detail", pathParams: { id: 123 } })
        }
      >
        Go to Person 123
      </button>
    </div>
  );
}
```

The hook also returns `getViewRoute` function, that receives a _View_'s bundle id and optional parameters to compose a returning URL. Use it when you need to get a _View_'s URL without navigating to it.

Check the [API Reference](./api-reference.md) for more information and other navigation related functions.

### Generic development guidelines

- You can pass state from a _View_ to another using the `options.state` property of the `navigate` function. This state can be retrieved by the target _View_ using the `useLocation` hook from `react-router-dom`. Use it only for contextual information that is not to be persisted in the URL. For other cases, when the state is to be persisted in the URL and to survive a page refresh, use the query string.
- Persist in-page state, like filters on a list, using the query string. This allows the user to share the current page with others, and to bookmark it. Use the `options.replace` property to update the query string without adding a new entry to the history.
- Modal dialogs are not part of the navigation tree. As such, opening and closing a modal dialog should not be triggered by, or trigger, a navigation event. Routes are reserved for page wide updates.
- Don't rely on `history.goBack()`/`history.go(-1)` as the user may have navigated directly to the current page. You can persist state to the location when navigating and use that to go back to the previous page, or to a default when the user navigates directly to the current page.
- The hash fragment can be used for in-page navigation, like jumping to a section on a page.

### More navigation

Besides navigation between _Views_, one can use the [**App Shell** built-in actions](./header-actions.md#built-in-header-actions) to navigate to:

- multiple conceptually separate _Products_;
- a new tab with the configured url.
