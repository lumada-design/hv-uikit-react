<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui">
    <img src="https://user-images.githubusercontent.com/14975353/194580478-9d952473-7d06-4572-b5e4-232cb8f67cc2.png" alt="Hitach logo" width="100" />
  </a>
</p>

<h1 align="center">Hitachi Vantara UI Kit</h1>

<p align="center">React UI library for the Hitachi Vantara Design System.
</p>

<div align="center">

![React 17](https://img.shields.io/badge/react-17-blue.svg)
![Node 16](https://img.shields.io/badge/node-16.13.1-brightgreen.svg)
![License Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)
![Supported browsers: Chrome, Firefox, Safari, Edge](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge-blue.svg)
<br>
![Master Nightly build status](https://github.com/lumada-design/hv-uikit-react/workflows/Master%20Nightly/badge.svg)

</div>

## Why use the UI Kit?

- **Ready to go**: Start your project with over 50 high-quality React components out of the box.
- **Composable**: Compose your UI with reusable building blocks.
- **Accessible**: UI Kit follows WAI-ARIA standards, helping you to reach the largest audience possible with less effort.
- **Themeable**: Use Hitachi Vantara Design System or customize it using the theming features.

## Installing 🚀

UI Kit is available as an npm package.
All you need to do is install the `@hitachivantara/uikit-react-core` package and its peer dependencies:

```shell
npm install @hitachivantara/uikit-react-core @mui/material @mui/styles @emotion/react @emotion/styled
```

### Other packages available

If you need to use any non-core community contributed component, install the `@hitachivantara/uikit-react-lab` package.

```shell
npm install @hitachivantara/uikit-react-lab
```

Also available:

- **Viz** - `npm install @hitachivantara/uikit-react-viz`
- **Icons** - `npm install @hitachivantara/uikit-react-icons`
  - installed as a dependency of `uikit-react-core`
- **Themes** - `npm install @hitachivantara/uikit-common-themes`
  - shouldn't be necessary out of a very specific use case.
- **Compat** - `npm install @hitachivantara/uikit-react-compat`
- **Code Editor** - `npm install @hitachivantara/uikit-react-code-editor`

### Installing an older version

Older versions use a different registry and import names. If needed, please follow the documentation at https://lumada-design.github.io/uikit/v3-old-registry/?path=/docs/get-started-installation--page.

If your project's design follows **DS 1.x** you must use the **UI Kit 2.x** release. Check https://lumada-design.github.io/uikit/v2.x/?path=/docs/get-started-installation--page for instructions.

## Usage

1. Wrap your application with the `HvProvider` provided by `@hitachivantara/uikit-react-core`.

```jsx
import { HvProvider } from "@hitachivantara/uikit-react-core";

// Do this at the root of your application
function App({ children }) {
  return <HvProvider>{children}</HvProvider>;
}
```

Optionally, you can configure the active theme and locale, among others.
Check <LinkTo kind="Guides/Provider" story="Main" className="sbdocs sbdocs-a">the Provider's API documentation</LinkTo> for further details.

2. Now you can start using components:

```jsx
import { HvButton } from "@hitachivantara/uikit-react-core";

function Example() {
  return <HvButton>Hello from UI Kit!</HvButton>;
}
```

3. For a fully functioning setup, you'll also need to setup a <LinkTo kind="Guides/CSS Baseline" story="Page" className="sbdocs sbdocs-a">CSS Baseline</LinkTo>
   and ensure <LinkTo kind="Guides/Typography" story="Description" className="sbdocs sbdocs-a">the loading of the Open Sans font</LinkTo>.

## Documentation

See our [documentation site](https://lumada-design.github.io/uikit/master/) here for full how-to docs and guidelines

## Changelog

Recently Updated? Please read the packages changelog: [core](/packages/core/CHANGELOG.md), [lab](/packages/lab/CHANGELOG.md), [compat](/packages/compat/CHANGELOG.md), [code-editor](/packages/code-editor/CHANGELOG.md), [viz](/packages/viz/CHANGELOG.md), [icons](/packages/icons/CHANGELOG.md), [themes](/packages/themes/CHANGELOG.md).

## Contributing

Please check out our [Contribution Guidelines](/CONTRIBUTING.md) and let's build a better UI Kit together.

We welcome all contributions. You can help us fixing bugs or submit any new ideas, as [pull requests](https://github.com/lumada-design/hv-uikit-react/blob/master/CONTRIBUTING.md#submitting-a-pull-request) or as [GitHub issues](https://github.com/lumada-design/hv-uikit-react/blob/master/CONTRIBUTING.md#submitting-an-issue).

Join and support the project!

## Team

The UI Kit is maintained by a small group of invaluable core contributors, with the support and involvement of the Hitachi Vantara community. 😄

- Francisco Guilherme ([@francisco-guilherme](https://github.com/frncisco-guilherme))
- Henrique Raposo ([@HQFOX](https://github.com/HQFOX))
- Márcia Esteves ([@MEsteves22](https://github.com/MEsteves22))
- Paulo Lagoá ([@plagoa](https://github.com/plagoa))

## License

This project is licensed under the terms of the [Apache 2.0 license](/LICENSE.md).

Details for the required packages and their licenses can be obtained in https://knowledge.hitachivantara.com/Documents/Open_Source_Software.
