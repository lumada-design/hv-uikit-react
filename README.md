## HV UIkit - React
#### React components for the Hitachi Vantara Design System.

![alt text](https://img.shields.io/badge/node-11.10.0-brightgreen.svg)
![alt text](https://img.shields.io/badge/license-Apache%202-blue.svg)
![alt text](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge%20%7C%20ie%2011-blue.svg)
![alt text](https://img.shields.io/badge/core--coverage-80%25-green.svg)
![alt text](https://img.shields.io/badge/lab--coverage-68%25-orange.svg)


### Installation
  - core - ```npm install @hv/uikit-react-core```
  - lab - ```npm install @hv/uikit-react-lab```
  - icons - ```npm install @hv/uikit-react-icons```

To always have the latest development version of the UIkit, even before a release, you may want to use npm with the `latest` tag.

#### npm registry
Our packages are being published to a public npm registry. If you want to use this project please make sure you have _.npmrc_ config file with one of the following lines:

```
If you want to use it for UI-KIT dependencies
@hv:registry=http://nexus.pentaho.org/repository/group-npm/

Or if you want to use it for all dependencies
registry=http://nexus.pentaho.org/repository/group-npm/
```
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

#### documentation
Interested in running our documentation just to explore what we have, but don't want to bootstrap the project? 
Please download our latest [documentation package](https://nexus.pentaho.org/#browse/search/npm=name.raw%3Duikit-react-doc) and open its index.html file.   

## Changelog
Recently Updated? Please read the packages changelog: [core](https://github.com/pentaho/hv-uikit-react/blob/alpha/packages/core/CHANGELOG.md), [lab](https://github.com/pentaho/hv-uikit-react/blob/alpha/packages/lab/CHANGELOG.md), [icons](https://github.com/pentaho/hv-uikit-react/blob/alpha/packages/icons/CHANGELOG.md), [doc](https://github.com/pentaho/hv-uikit-react/blob/alpha/packages/doc/CHANGELOG.md).

## Contributing
You need to ask to be added as a project member, to be able to contribute:

- **#ui-kit** slack channel on the [hitachivantara-eng](https://hitachivantara-eng.slack.com/messages/CFY74GK6G) workspace.
- **#ui-kit** slack channel on the [hitachi-design](https://hitachi-design.slack.com/messages/CGC1E37J9/) workspace.

Please check out our [Contribution Guidelines](https://github.com/pentaho/hv-uikit-react/blob/alpha/CONTRIBUTING.md) for detailed information.

## Examples

We provide some [examples](https://github.com/pentaho/hv-uikit-react/tree/alpha/examples) supporting several platforms.

## License
This project is licensed under the terms of the [Apache 2.0 license](https://github.com/pentaho/hv-uikit-react/blob/alpha/LICENSE.md).


