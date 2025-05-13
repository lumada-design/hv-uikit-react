# Development Guidelines

Developing UI components with a micro-frontend architecture mindset requires some efforts to ensure a cohesive and solid user experience.
This page provides guidelines and best practices to help you build a consistent user experience across products using **UI Kit** and **App Shell**.

## Events

In a micro-frontend web application, it's common for multiple UI components to be mounted concurrently, and sometimes these components need to communicate with each other. However, it's important to keep the coupling between these components to a minimum to avoid complexity and ensure maintainability.

One way to achieve this communication is through parameter passing during the mount time of the UI components. This is known as parent-child communication and is a common approach. As for child-parent communication, ad-hoc solutions via callback are often used, but they add some drawbacks regarding lifecycle management. Either way, both approaches are not ideal as they couple the components together.

Communication between UI components usually involves an user action in one component, such as a click on a button, affecting the state of other components that are currently loaded. For example, a "Mark all read" button click in the **App Shell**'s notification panel could trigger an action in the currently loaded _View_.

Unless unfeasible, the applications should rely on standard web APIs for communication. For instance, applications can emit (and listen for) [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), use a [broadcast channel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), or listen for [storage events](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).

Direct communication between UI components with callbacks registered, or using the **App Shell** as an orchestrator, should be avoided whenever possible.

### Generic development guidelines

- Prefer using custom events over other communication mechanisms.
- If any situation requires a different strategy (mostly if inter-tabs communication is needed), then it's probably worth and ok implementing by broadcasting messages or triggering storage events. Eventually the application can emit custom events on each tab.
- Any component should clean up its listeners when it is unmounted to prevent memory leaks and ensure that the callback function can be garbage collected.
- `globalThis` seems a good choice for the event target as it's safe to use in any environment (browser, node, etc).
- The event name should be unique enough to avoid collisions with other apps. A good practice is to use the app name as a prefix, for example `@hv/notifications:mark-all-read`.

## Error Handling

React's [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) are a graceful way to handle a JavaScript error so that the other parts of the application continue working. In addition to preventing the application from crashing, it allows to provide a custom fallback component and even log error information.

_Views_ should as much as possible handle errors locally in a graceful way and provide information useful to the user on how to recover from the error, instead of a generic error message.

The **App Shell** wraps any _Views_ it renders with an Error Boundary. If an error occurs in a View, the App Shell will display a generic error message and log the error to the console.

The **App Shell** doesn't wrap any other UI components with an Error Boundary imported directly between _Application Bundles_. It is up to the _Application Bundle_ to decide how to handle errors in those components.

## Views with internal routing

_Views_ can also have their own internal routing. This feature primarily aims to ease the adoption of the **App Shell** by existing applications, but can also make sense in some other cases, e.g. for bundling together a list and a detail view, when they only make sense together and can't be used independently.

Such _Views'_ route should end with a placeholder, e.g. with a `*` wildcard or with a dynamic `:id`-style segment, like in `/contacts/:id?`.

```ts
mainPanel: {
  views: [
    {
      bundle: "@hv-apps/my-app/pages/Persons.js",
      route: "/contacts/*",
    },
  ];
}
```

The **App Shell** router will then match any route that starts with `/contacts/` and render the `persons` _View_. Internally, the _View_ can define its own routing and, for instance, render a list of persons at `/contacts/` and a detail view at `/contacts/:id`.

The _View_ should use the same React Router library instance as the **App Shell**. This ensures that the **App Shell** and the _View_ share the same routing context. The _View_ should return a collection of `Route` components, wrapped in a `Routes` component.

Any navigation within the _View_ should be relative to the _View_'s route. For instance, a link to the detail view of a person with id `123` should be rendered as `<Link to="./123">`.

### Adopting App Shell for existing applications

When adapting existing applications, the existing routing solution must be configured with the base path of the _View_'s route. For instance, if the _View_'s route is `/contacts/*`, the base path should be `/contacts/`.

Remember that if the existing routing library is also React Router 6, that dependency should be marked as external, so it uses the same version as the **App Shell**. This is handled automatically by the App Shell Vite plugin.

If the application is using a different React Router major version we currently don't have a solution for adopting the **App Shell**, other than migrating the application to React Router 6.

## Static assets and API calls

_Application Bundles'_ code will be executing in the context of the **App Shell** entrypoint, which provides no proxy capabilities for backend calls intended for the embedded application's backend, nor is able to serve its static assets.

The `require.meta.url` parameter and the `require.meta.resolve` method can be used to construct URLs relative to the _Application Bundles'_ origin and used for calls loading additional resources, or invoking backend service APIs.

Example:

Instead of something like:

```ts
const BASE_URL_API = "/api/v1/";
const BASE_URL_ASSETS = "/assets/";
```

Use:

```ts
const BASE_URL_API = import.meta.resolve("@hv-apps/my-app/api/v1/");
const BASE_URL_ASSETS = import.meta.resolve("@hv-apps/my-app/assets/");
```

### Importing static assets

Vite allows [importing assets as URLs](https://vitejs.dev/guide/assets.html#importing-asset-as-url). However, the resolved public URL will be relative to the **App Shell** entrypoint, not taking into account the microfrontend's architecture and the _Application Bundles'_ origin.

As such, the functionality provided by Vite should not be used. Instead, the `require.meta.resolve` method should be used to construct URLs relative to the _Application Bundles'_ origin, as shown above.

The [vite-plugin-css-injected-by-js](https://github.com/marco-prontera/vite-plugin-css-injected-by-js) takes all the CSS generated by the build process and adds it inlined in the JS files.
It should be configured to inject the CSS code only relative to the importer, so each _View_ and _Shared Module_ will have its own CSS code injected.

```ts
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
  ],
});
```

### Data fetching

The usage of a data-fetching library, such as [SWR](https://swr.vercel.app/) or [React Query](https://react-query.tanstack.com/), is highly recommended to avoid the need to write boilerplate code for data fetching and error handling.
