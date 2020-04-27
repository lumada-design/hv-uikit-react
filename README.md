<h1 align="center">HV UIKIT - React</h1>

#### React components for the Hitachi Vantara Design System.

<div align="center">

![alt text](https://img.shields.io/badge/node-12.14-brightgreen.svg)
![alt text](https://img.shields.io/badge/license-Apache%202-blue.svg)
![alt text](https://img.shields.io/badge/plataforms-chrome%20%7C%20firefox%20%7C%20safari%20%7C%20edge%20%7C%20ie%2011-blue.svg)
![alt text](https://img.shields.io/badge/core--coverage-80%25-green.svg)
![alt text](https://img.shields.io/badge/lab--coverage-68%25-orange.svg)
![CI](https://github.com/pentaho/hv-uikit-react/workflows/CI/badge.svg?branch=next)

</div>

#### npm registry

Our packages are being published to an Hitachi Vantara npm registry. If you want to use this project please make sure you have _.npmrc_ config file with one of the following lines:

```
@hv:registry=https://nexus.pentaho.org/repository/group-npm/
```

Please check that your npmrc has this by running `npm config ls -l`; otherwise you can add it to the config by running `npm config edit`, or the installation step below will not work.

### Installation

- core - `npm install @hv/uikit-react-core`
- lab - `npm install @hv/uikit-react-lab`
- icons - `npm install @hv/uikit-react-icons`

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

#### doc

It will startup the UI Development Environment [Storybook](https://storybook.js.org/). There you can see a list of the available components.

```bash
npm run doc
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

## License

This project is licensed under the terms of the [Apache 2.0 license](https://github.com/pentaho/hv-uikit-react/blob/alpha/LICENSE.md).

## Team

An overview of the founding team and core contributors to Hitachi Vantara UI-KIT.

The UI Kit is maintained by a small group of invaluable core contributors, with the massive support and involvement of the community. 😄

- Diogo Mariano ([@diogofscmariano](https://github.com/diogofscmariano))
- Tiago Santos ([@tiago-ssantos](https://github.com/tiago-ssantos))
- Francisco Guilherme ([@francisco-guilherme](https://github.com/frncisco-guilherme))
- Elio Freitas ([@eliofreitas](https://github.com/eliofreitas))
- João Gonçalves ([@JoaoEnesGoncalves](https://github.com/JoaoEnesGoncalves))
- Bruno Henriques ([@zettca](https://github.com/zettca))
- Nelson Antunes ([@nantunes](https://github.com/nantunes))
- Júlio Costa ([@jsccosta](https://github.com/jsccosta))
- Hugo Figueira ([@hugompfigueira](https://github.com/hugompfigueira))

Get involved with our development by opening an issue or submitting a pull request. Read the contributing guidelines for information on how we develop.

Join and support the project!
