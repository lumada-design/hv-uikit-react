# Hitachi Vantara App Shell

The **App Shell** is a set of shared client-side modules for common user-focused UI components and services. Together with the [Hitachi NEXT UI Kit](https://github.com/lumada-design/hv-uikit-react), it aims to provide a consistent user experience across all Hitachi Vantara applications, adopting the NEXT Design System and addressing Lumada Architecture key concepts of Composability and Portability.

At its core, it consists of a collection of UI patterns shared by all products within the platform, providing a consistent set of interaction patterns that persist across all products. These include navigation, notifications, user information, and other common UX.

It also provides services that support the integration and communication between embedded applications, as well as guidelines and strategies for building web apps with multiple teams that ship features independently.

## Background

Lumada Solutions are comprised of multiple independent applications, each with separate deployed web UIs. To users, it should look and feel like a single application, while for developers it should be possible to share and reuse functionality across applications. User interface and user experience design can't be an afterthought, as it may lead to inconsistent and disjointed experiences across applications.

Micro-frontend is an architectural style that enables independently deliverable frontend applications to be composed into a greater whole. It defines a set of techniques, strategies, and recipes for building modern web apps with multiple teams that can ship features independently (source: [https://micro-frontends.org](https://micro-frontends.org)).

## Getting Started

### Coming from a Beta Version?

Ensure a seamless upgrade to v1.x of the App Shell by following the [Migration Guide](docs/migrationFromBeta.md).

### Prerequisites

To get started, you'll need a **Node.js** development environment using version **18.x** or higher.

### Automatic setup

We recommend using the `@hitachivantara/hv-uikit-cli` to create a new app, which sets up everything automatically for you. To create a new project, run the following command:

```shell
npx @hitachivantara/hv-uikit-cli@latest create
```

When prompted confirm the usage of the **App Shell**.

Once the installation is complete, you can:

- Change directory to the newly created project folder.
- Install the dependencies with `npm install`.
- Run `npm run dev` to start the development server.
- Visit http://localhost:5173 to view the app.

### Manual setup

If you prefer to set up the project manually, you can follow the steps in [this page](docs/manual-setup.md).

## Documentation

For more information about **App Shell**, start at the [Base Concepts](docs/base-concepts.md) or check the [documentation index](docs/README.md).

For users migrating from pre-release versions of **App Shell** (0.x.x), see the [Migration Guide](docs/migrationFromBeta.md).
