<h1 align="center">Hitachi Vantara UI Kit - React</h1>

## React components for the Hitachi Vantara Design System.

<div align="center">

Quickly build apps that follow the HV Design System's patterns and specifications.

![React 16.13](https://img.shields.io/badge/react-^16.13.1-blue.svg)
![Node 16](https://img.shields.io/badge/node-16.13.1-brightgreen.svg)
![License Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)
![Supported browsers: Chrome, Firefox, Safari, Edge](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge-blue.svg)
<br>
![Master Nightly build status](https://github.com/lumada-design/hv-uikit-react/workflows/Master%20Nightly/badge.svg)

</div>

## Installation

HV UI Kit is composed of multiple mostly independent npm packages. You can install them in any working **React v16.x or x17.x** project.

### Package installation

Install the `@hitachivantara/uikit-react-core` package and its peer dependencies:

```shell
npm install @hitachivantara/uikit-react-core @material-ui/core@^4.11.0
```

#### Other packages available

If you need to use any non-core community contributed package, install the `@hitachivantara/uikit-react-lab` package.

```shell
npm install @hitachivantara/uikit-react-lab
```

Also available:

- code-editor - `npm install @hitachivantara/uikit-react-code-editor`
- icons - `npm install @hitachivantara/uikit-react-icons`
- themes - `npm install @hitachivantara/uikit-common-themes`
- visualizations - `npm install @hitachivantara/uikit-viz`

The `@hitachivantara/uikit-react-icons` is installed as a dependency of `@hitachivantara/uikit-react-core` and the `@hitachivantara/uikit-common-themes` shouldn't be necessary out of a very specific use case.

#### Installing an older version

The above commands will install the latest version of **UI Kit 3.x**. It implements the **DS 3.x** specifications.

Older v3.x packages use a different registry and import names. If needed, please follow the documentation at https://lumada-design.github.io/uikit/v3-old-registry/?path=/docs/get-started-installation--page.

If your project's design follows **DS 1.x** you must use the **UI Kit 2.x** release. Check https://lumada-design.github.io/uikit/v2.x/?path=/docs/get-started-installation--page for instructions.

## Usage

1. Wrap your application with the `HvProvider` provided by
   `@hitachivantara/uikit-react-core`.

```jsx
import { HvProvider } from "@hitachivantara/uikit-react-core";

// Do this at the root of your application
function App({ children }) {
  return <HvProvider>{children}</HvProvider>;
}
```

Optionally, you can configure the active theme and locale, among others.
Check [the Provider's API documentation](https://lumada-design.github.io/uikit/master/?path=/docs/foundation-provider--main) for further details.

2. Now you can start using components:

```jsx
import { HvButton } from "@hitachivantara/uikit-react-core";

function Example() {
  return <HvButton>Hello from UI Kit!</HvButton>;
}
```

## Documentation

Check out our [documentation website](https://lumada-design.github.io/uikit/master/).

## Changelog

Recently Updated? Please read the packages changelog: [core](/packages/core/CHANGELOG.md), [code-editor](/packages/code-editor/CHANGELOG.md), [icons](/packages/icons/CHANGELOG.md), [lab](/packages/lab/CHANGELOG.md), [themes](/packages/themes/CHANGELOG.md), [viz](/packages/viz/CHANGELOG.md).

## Contributing

Please check out our [Contribution Guidelines](/CONTRIBUTING.md) for detailed information.

You need to ask to be added as a project member, to be able to contribute:

- **#ui-kit** slack channel on the [hitachivantara-eng](https://hitachivantara-eng.slack.com/messages/CFY74GK6G) workspace.
- **#ui-kit** slack channel on the [hitachi-design](https://hitachi-design.slack.com/messages/CGC1E37J9/) workspace.

### Bugs

If you find a bug in the source code, you can help us by [submitting an issue](/CONTRIBUTING.md#submitting-an-issue) to this repo.
Even better you can [submit a Pull Request](/CONTRIBUTING.md#submitting-a-pull-request) with a fix.

### Feature Requests

You can request a new feature by [submitting an issue](/CONTRIBUTING.md#submitting-an-issue) to this repo.
Features can be **new components** or changes to **existing**.

## License

This project is licensed under the terms of the [Apache 2.0 license](/LICENSE.md).

Details for the required packages and their licenses can be obtained in https://knowledge.hitachivantara.com/Documents/Open_Source_Software.

## Team

The UI Kit is maintained by a small group of invaluable core contributors, with the support and involvement of the Hitachi Vantara community. 😄

- Elio Freitas ([@eliofreitas](https://github.com/eliofreitas))
- Francisco Guilherme ([@francisco-guilherme](https://github.com/frncisco-guilherme))
- Henrique Raposo ([@HQFOX](https://github.com/HQFOX))
- Hyorran Preigschadt ([@hyorran](https://github.com/hyorran))
- Paulo Lagoá ([@plagoa](https://github.com/plagoa))

Get involved with our development by opening an issue or submitting a pull request. Read the contributing guidelines for information on how we develop.

Join and support the project!
