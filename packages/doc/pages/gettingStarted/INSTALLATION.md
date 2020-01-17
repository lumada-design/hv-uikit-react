## HV UIkit - React
#### React components for the Hitachi Vantara Design System.

![alt text](https://img.shields.io/badge/node-12.14-brightgreen.svg)
![alt text](https://img.shields.io/badge/license-Apache%202-blue.svg)
![alt text](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge%20%7C%20ie%2011-blue.svg)
![alt text](https://img.shields.io/badge/core--coverage-80%25-green.svg)
![alt text](https://img.shields.io/badge/lab--coverage-68%25-orange.svg)

#### npm registry
Our packages are being published to a public npm registry. If you want to use this project please make sure you have _.npmrc_ config file with one of the following lines:

```
If you want to use it for UI-KIT dependencies
@hv:registry=https://nexus.pentaho.org/repository/group-npm/

Or if you want to use it for all dependencies
registry=https://nexus.pentaho.org/repository/group-npm/
```
Please check that your npmrc has this by running `npm config ls -l`, otherwise you can add it to the config by running `npm config edit`, otherwise the installation step below will not work.

### Installation
  - core - ```npm install @hv/uikit-react-core```
  - lab - ```npm install @hv/uikit-react-lab```
  - icons - ```npm install @hv/uikit-react-icons```

To always have the latest development version of the UIkit, even before a release, you may want to use npm with the `latest` tag.

#### global link
If you need to work on a component and watch the changes reflected on your application at the same time, you can [link](https://docs.npmjs.com/cli/link.html) your packages globally:

```bash
npm run link
```

It will create a symlink in the global folder {prefix}/lib/node_modules/<package> for each package.

### Getting Started
Install root dependencies.

```bash
npm i
```

#### bootstrap

Bootstrap the packages in the current repo. Installs all their dependencies and links any cross-dependencies.

```bash
npm run bootstrap
```

#### dev mode

It will run all packages and startup the UI Development Environment [Storybook](https://storybook.js.org/). There you can see a list of the available components.

```bash
npm run dev
```
