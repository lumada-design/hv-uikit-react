<h1 align="center">Hitachi Vantara UI Kit - React</h1>

## React components for the Hitachi Vantara Design System.

<div align="center">

Quickly build apps that follow the HV Design System's patterns and specifications.

![React 16.13](https://img.shields.io/badge/react-^16.13.1-blue.svg)
![Node 14](https://img.shields.io/badge/node-14.15-brightgreen.svg)
![License Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)
![Supported browsers: Chrome, Firefox, Safari, Edge, Internet Explorer](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge%20%7C%20ie%2011-blue.svg)
<br>
![Master Nightly build status](https://github.com/lumada-design/hv-uikit-react/workflows/Master%20Nightly/badge.svg)
![v2.x Nightly build status](https://github.com/lumada-design/hv-uikit-react/workflows/v2.x%20Nightly/badge.svg)
![v1.x Nightly build status](https://github.com/lumada-design/hv-uikit-react/workflows/v1.x%20Nightly/badge.svg)

</div>

**Attention:**
This branch hosts the latest version of **UI Kit 2.x** code that implements the **DS 1.x** specifications.

If your project's design follows **DS 3.x** you must use the **UI Kit 3.x** release. If so, please check the `master` branch.

## Installation

HV UI Kit is available as multiple npm packages. You can install them in any working **React v16.x** project.

### Package installation

Install the `@hv/uikit-react-core` package and its peer dependencies:

```shell
npm install @hv/uikit-react-core@2.* @material-ui/core@~4.8.0 plotly.js@>1.34.0
```

#### Other packages available

If you need to use any non-core community contributed package, install the `@hv/uikit-react-lab` package.

```shell
npm install @hv/uikit-react-lab@2.*
```

Also available:

- icons - `npm install @hv/uikit-react-icons@2.*`
- themes - `npm install @hv/uikit-common-themes@2.*`

The `@hv/uikit-react-icons` is installed as a dependency of `@hv/uikit-react-core` and the `@hv/uikit-common-themes` shouldn't be necessary out of a very specific use case.

## Usage

1. Wrap your application with the `HvProvider` provided by
   `@hv/uikit-react-core`.

```jsx
import { HvProvider } from "@hv/uikit-react-core"

// Do this at the root of your application
function App({ children }) {
  return <HvProvider>{children}</HvProvider>
}
```

Optionally, you can configure the active theme and locale, among others.
Check [the Provider's API documentation](https://lumada-design.github.io/uikit/v2.x/?path=/docs/foundation-provider--main) for further details.

2. Now you can start using components:

```jsx
import { HvButton } from "@hv/uikit-react-core"

function Example() {
  return <HvButton>Hello from UI Kit!</HvButton>
}
```

## Documentation

Check out our [documentation website](https://lumada-design.github.io/uikit/v2.x/).

## Changelog

Recently Updated? Please read the packages changelog: [core](/packages/core/CHANGELOG.md), [icons](/packages/icons/CHANGELOG.md), [lab](/packages/lab/CHANGELOG.md), [themes](/packages/themes/CHANGELOG.md).

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

## Team

The UI Kit is maintained by a small group of invaluable core contributors, with the support and involvement of the Hitachi Vantara community. 😄

- Diogo Mariano ([@diogofscmariano](https://github.com/diogofscmariano))
- Paulo Lagoa([@plagoa](https://github.com/plagoa))
- Francisco Guilherme ([@francisco-guilherme](https://github.com/frncisco-guilherme))
- Elio Freitas ([@eliofreitas](https://github.com/eliofreitas))
- Bruno Henriques ([@zettca](https://github.com/zettca))
- Nelson Antunes ([@nantunes](https://github.com/nantunes))
- Júlio Costa ([@jsccosta](https://github.com/jsccosta))
- Hugo Figueira ([@hugompfigueira](https://github.com/hugompfigueira))

Get involved with our development by opening an issue or submitting a pull request. Read the contributing guidelines for information on how we develop.

Join and support the project!
