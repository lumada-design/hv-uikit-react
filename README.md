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

## Installation

HV UI Kit is available as multiple npm packages. You can install them in any working **React v16.x** project.

### Configuring the npm registry

The packages are being published to a corporate Hitachi Vantara npm registry.
To be able to use them, you need to associate the `@hv` scope with that registry using `npm config`:

```shell
npm config set @hv:registry https://repo.orl.eng.hitachivantara.com/artifactory/api/npm/uikit-npm-release-orl/
```

You can check if your `~/.npmrc` is already configured by running `npm config ls`.

### Package installation

Install the `@hv/uikit-react-core` package and its peer dependencies:

```shell
npm install @hv/uikit-react-core @material-ui/core@^4.11.0 plotly.js-basic-dist@^1.55.2
```

#### Other packages available

If you need to use any non-core community contributed package, install the `@hv/uikit-react-lab` package.

```shell
npm install @hv/uikit-react-lab
```

Also available:

- code-editor - `npm install @hv/uikit-react-code-editor`
- icons - `npm install @hv/uikit-react-icons`
- themes - `npm install @hv/uikit-common-themes`

The `@hv/uikit-react-icons` is installed as a dependency of `@hv/uikit-react-core` and the `@hv/uikit-common-themes` shouldn't be necessary out of a very specific use case.

#### Installing an older version

The above commands will install the latest version of **UI Kit 3.x**. It implements the **DS 3.x** specifications.

If your project's design follows **DS 1.x** you must use the **UI Kit 2.x** release. Install it by suffixing "@2.\*" to the package names:

```shell
npm install @hv/uikit-react-core@2.*
```

The peer dependencies will also be different:

```shell
npm install @material-ui/core@~4.8.0 plotly.js@>1.34.0
```

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
Check [the Provider's API documentation](https://lumada-design.github.io/uikit/master/?path=/docs/foundation-provider--main) for further details.

2. Now you can start using components:

```jsx
import { HvButton } from "@hv/uikit-react-core"

function Example() {
  return <HvButton>Hello from UI Kit!</HvButton>
}
```

## Documentation

Check out our [documentation website](https://lumada-design.github.io/uikit/master/).

## Changelog

Recently Updated? Please read the packages changelog: [core](/packages/core/CHANGELOG.md), [code-editor](/packages/code-editor/CHANGELOG.md), [icons](/packages/icons/CHANGELOG.md), [lab](/packages/lab/CHANGELOG.md), [themes](/packages/themes/CHANGELOG.md).

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
