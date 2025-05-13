# App Shell

The **App Shell** is a [micro-frontend](https://micro-frontends.org) framework for building Hitachi Vantara applications.
Together with the **UI Kit**, it aims to provide a consistent user experience across Hitachi Vantara applications, by adopting the Design System patterns and addressing architectural key concepts of **composability** and **portability**.

At its core, **App Shell** consists of:

1. A [Vite](https://vite.dev) [plugin](https://github.com/lumada-design/hv-uikit-react/tree/master/packages/app-shell-vite-plugin) that enhances development and handles building of the micro-frontend [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
2. Routing [utilities](TODO) and [configuration](TODO), built on top of [react-router](https://reactrouter.com) that brings the application modules together.
3. A collection of common UI patterns, such as navigation system (header, vertical navigation) and notifications.

The **App Shell** is comprised of the following packages:

- [`@hitachivantara/app-shell-events`](https://npm.im/@hitachivantara/app-shell-events)
- [`@hitachivantara/app-shell-navigation`](https://npm.im/@hitachivantara/app-shell-navigation)
- [`@hitachivantara/app-shell-shared`](https://npm.im/@hitachivantara/app-shell-shared)
- [`@hitachivantara/app-shell-ui`](https://npm.im/@hitachivantara/app-shell-ui)
- [`@hitachivantara/app-shell-vite-plugin`](https://npm.im/@hitachivantara/app-shell-vite-plugin)
