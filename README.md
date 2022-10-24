<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui">
    <img src="https://user-images.githubusercontent.com/14975353/194580478-9d952473-7d06-4572-b5e4-232cb8f67cc2.png" alt="Hitach logo" width="100" />
  </a>
</p>

<h1 align="center">Hitachi Vantara UI Kit</h1>

<p align="center">React UI library for the Hitachi Vantara Design System.
</p>

<div align="center">

<br>

![React 17.02](https://img.shields.io/badge/react-^17.02.1-blue.svg)
![Node 16](https://img.shields.io/badge/node-16.13.1-brightgreen.svg)
![License Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)
![Supported browsers: Chrome, Firefox, Safari, Edge](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge-blue.svg)

![Master Nightly build status](https://github.com/lumada-design/hv-uikit-react/workflows/Master%20Nightly/badge.svg)

</div>

## Why use the UI Kit?

- **Ready to go**: Start your project with over 50 high-quality React components out of the box.
- **Composable**: Compose your UI with reusable building blocks.
- **Accessible**: UI Kit follows WAI-ARIA standards, helping you to reach the largest audience possible with less effort.
- **Themeable**: Use Hitachi Vantara Design System or customize it using the theming features.

## Packages

- `@hitachivantara/uikit-react-core` – core components library

## Installing 🚀

UI Kit is available as an [npm package](https://www.npmjs.com/package/@hitachivantara).  
All you need to do is install the `@hitachivantara/uikit-react-core` package and its peer dependencies:

```sh
# With yarn
yarn add @hitachivantara/uikit-react-core @emotion/react @emotion/styles

# With npm
npm install @hitachivantara/uikit-react-core @emotion/react @emotion/styles
```

## Usage

To start using the components, wrap your application with the `HvProvider`.

```jsx
import { HvProvider, HvButton } from "@hitachivantara/uikit-react-core";

const App = () => (
  <HvProvider>
    <HvButton>Hello from UI Kit!</HvButton>
  </HvProvider>
);
```

## Documentation

See our documentation site [here](https://lumada-design.github.io/uikit/master/?path=/docs) for full how-to docs and guidelines

## Team ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/francisco-guilherme"><img src="https://avatars.githubusercontent.com/u/14975353?v=4" width="64px;" alt=""/><br /><sub><b>Francisco Guilherme</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/HQFOX"><img src="https://avatars.githubusercontent.com/u/19229133?v=4" width="64px;" alt=""/><br /><sub><b>Henrique Raposo</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/plagoa"><img src="https://avatars.githubusercontent.com/u/7498785?v=4" width="64px;" alt=""/><br /><sub><b>Paulo Lagoá</b></sub></a><br /></td>
  </tr>
</table>

## Contributing

Please check out our [Contribution Guidelines](/CONTRIBUTING.md) and let's build a better UI Kit together.

We welcome all contributions. You can help us fixing bugs or submit any new ideas, as [pull requests](https://github.com/lumada-design/hv-uikit-react/blob/master/CONTRIBUTING.md#submitting-a-pull-request) or as [GitHub issues](https://github.com/lumada-design/hv-uikit-react/blob/master/CONTRIBUTING.md#submitting-an-issue).

Join and support the project!

## Contributors 🤟

<a href="https://github.com/lumada-design/hv-uikit-react/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lumada-design/hv-uikit-react" />
</a>

## License

This project is licensed under the terms of the [Apache 2.0 license](/LICENSE.md).

Details for the required packages and their licenses can be obtained in https://knowledge.hitachivantara.com/Documents/Open_Source_Software.
