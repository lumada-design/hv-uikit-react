# Development Guidelines

Developing UI components with a micro-frontend architecture mindset requires some efforts to ensure a cohesive and solid user experience. This page provides guidelines and best practices to help you build a consistent user experience across all Hitachi Vantara products.

## UI design and UX

The **App Shell** implements several of the [NEXT Design System](https://designsystem.hitachivantara.com) patterns and uses the [NEXT UI Kit library](https://lumada-design.github.io/uikit/master/) to do so. All _Views_ and other UI components should be built using the UI Kit and must comply with the NEXT Design System.

### Design System

As a part of the Product Design group, the Design System team is responsible, in collaboration with the Product teams, for defining reference Design patterns, guidelines and methodologies, producing reusable patterns that reduce design and implementation effort, while ensuring a consistent user experience across the Hitachi Vantara products.

### UI Kit

The [UI Kit library](https://lumada-design.github.io/uikit/master/) provides a collection of **reusable React components** aligned with the **Design System** specifications. It is a **living library** that is constantly evolving and growing.

- **Components**: UI Kit building blocks for creating your apps.
- **Widgets**: Complex components that address specific common use cases; users can use them as-is or copy them and customize to their needs.
- **Templates**: UI Kit provides a set of templates with common use cases found along Hitachi Vantara's portfolio to help teams accelerate the development of their apps.

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

React's [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) are a graceful way to handle a JavaScript error so that the other parts of the application continue working. In addition to preventing the application from crashing, it allows to provide a custom fallback component and even log error information.

_Views_ should as much as possible handle errors locally in a graceful way and provide information useful to the user on how to recover from the error, instead of a generic error message.

The **App Shell** wraps any _Views_ it renders with an Error Boundary. If an error occurs in a View, the App Shell will display a generic error message and log the error to the console.

The **App Shell** doesn't wrap any other UI components with an Error Boundary imported directly between _Application Bundles_. It is up to the _Application Bundle_ to decide how to handle errors in those components.

## Views with internal routing

_Views_ can also have their own internal routing. This feature primarily aims to ease the adoption of the **App Shell** by existing applications, but can also make sense in some other cases, e.g. for bundling together a list and a detail view, when they only make sense together and can't be used independently.

Such _Views'_ route should end with a placeholder, e.g. with a `*` wildcard or with a dynamic `:id`-style segment, like in `/contacts/:id?`.

```jsonc
// ...
  mainPanel: {
    views: [
      {
        bundle: "@hv-apps/my-app/pages/Persons.js",
        route: "/contacts/*"
      }
      // ...
    ]
  }
// ...
```

The **App Shell** router will then match any route that starts with `/contacts/` and render the `persons` _View_. Internally, the _View_ can define its own routing and, for instance, render a list of persons at `/contacts/` and a detail view at `/contacts/:id`.

The _View_ should use the same React Router library instance as the **App Shell**. This ensures that the **App Shell** and the _View_ share the same routing context. The _View_ should return a collection of `Route` components, wrapped in a `Routes` component.

Any navigation within the _View_ should be relative to the _View_'s route. For instance, a link to the detail view of a person with id `123` should be rendered as `<Link to="./123">`.

A concrete usage of this can be found [here](../client/samples/README.md#internal-route-candy-app).

### Adopting App Shell for existing applications

When adapting existing applications, the existing routing solution must be configured with the base path of the _View_'s route. For instance, if the _View_'s route is `/contacts/*`, the base path should be `/contacts/`.

Remember that if the existing routing library is also React Router 6, that dependency should be marked as external, so it uses the same version as the **App Shell**. This is handled automatically by the [App Shell's Vite plugin](../client/packages/app-shell-vite-plugin).

If the application is using a different React Router major version we currently don't have a solution for adopting the **App Shell**, other than migrating the application to React Router 6.
