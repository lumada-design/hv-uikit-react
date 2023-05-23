<p align="center">
 <a href="https://lumada-design.github.io/uikit/master">
    <img src="https://user-images.githubusercontent.com/14975353/229386613-8f17d06d-9530-4e77-a173-dcb7587a85ea.png" alt="UI Kit logo" width="250" />
  </a>
</p>

<h4 align="center">React UI library for the Next Design System.
</h4>

<br/>

<div align="center">

![License](https://img.shields.io/badge/license-Apache%202-blue.svg)
![React](https://img.shields.io/badge/react->=17-blue.svg)
![Node](https://img.shields.io/badge/node-16-brightgreen.svg)
![Master Nightly](https://github.com/lumada-design/hv-uikit-react/workflows/Master%20Nightly/badge.svg)

</div>

<br/>

**NEXT UI Kit** is Hitachi Vantara open source React component library that gives you the foundation to build your application faster and consistently.

## Why use the UI Kit?

- **Ready to go**: Start your project with over 50 high-quality React components out of the box.
- **Composable**: Compose your application UI with reusable building blocks.
- **Accessible**: UI Kit follows WAI-ARIA standards for all components.
- **Themeable**: Use Next Design System or customize it to match your design needs.

Check the [project status](https://lumada-design.github.io/uikit/master/?path=/docs/overview-project-status--page) so you can stay up-to-date on the project development, available packages, components status and supported versions.

## Installation 🚀

**NEXT UI Kit** uses [Emotion](https://emotion.sh) as its default styling engine and [MUI](https://mui.com) as a core dependency.  
To use it in your project, run the following command:

```sh
npm install @hitachivantara/uikit-react-core @emotion/react @emotion/styled @mui/material
```

Check the other available [packages](https://lumada-design.github.io/uikit/master/?path=/docs/overview-project-status--page#packages) to use any non-core or community contributed component.

#### Migrating to v5

This [guide](<(https://lumada-design.github.io/uikit/master/?path=/story/overview-migration-from-v4-x--pages)>) explains how and why to migrate from UI Kit v4 to v5.
If you are using an older version follow the documentation for the supported [versions](https://lumada-design.github.io/uikit/master/?path=/docs/overview-project-status--page#versions).

## Usage

1. Wrap your application with the `HvProvider` provided by `@hitachivantara/uikit-react-core`.

```jsx
import { HvProvider } from "@hitachivantara/uikit-react-core";

// Do this at the root of your application
function App({ children }) {
  return <HvProvider>{children}</HvProvider>;
}
```

Optionally, you can configure the active theme and color mode, among others.
Check <LinkTo kind="Guides/Provider" story="Main" className="sbdocs sbdocs-a">the [Provider's](https://lumada-design.github.io/uikit/master/?path=/docs/guides-provider--main) documentation</LinkTo> for more information.

2. Now you can start using components:

```jsx
import { HvButton } from "@hitachivantara/uikit-react-core";

function Example() {
  return <HvButton>Hello from UI Kit!</HvButton>;
}
```

3. For a fully functioning setup, you'll also need to ensure the loading of the Open Sans font. Check the [Get started](https://lumada-design.github.io/uikit/master/?path=/docs/overview-get-started--page) section for further details.

## Examples

We provide [example](https://github.com/lumada-design/hv-uikit-react/tree/next-mirage/examples) projects that can get you quickly started with UI Kit:

- [Vite.js with TypeScript](https://github.com/lumada-design/hv-uikit-react/tree/next-mirage/examples/uikit-vite-ts)

We'll keep working toward providing more examples.

## Documentation

See our documentation site [here](https://lumada-design.github.io/uikit/master/?path=/docs) for full how-to docs and guidelines

## Team ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/zettca"><img src="https://avatars.githubusercontent.com/u/638946?v=4" width="64px;" alt=""/><br /><sub><b>Bruno Henriques</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/francisco-guilherme"><img src="https://avatars.githubusercontent.com/u/14975353?v=4" width="64px;" alt=""/><br /><sub><b>Francisco Guilherme</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/HQFOX"><img src="https://avatars.githubusercontent.com/u/19229133?v=4" width="64px;" alt=""/><br /><sub><b>Henrique Raposo</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/MEsteves22"><img src="https://avatars.githubusercontent.com/u/43220251?v=4" width="64px;" alt=""/><br /><sub><b>Márcia Esteves</b></sub></a><br /></td>
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

This project is licensed under the terms of the [Apache 2.0 license](/LICENSE).
