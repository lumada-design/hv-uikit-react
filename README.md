## HV UIkit - React 
#### React components for the Hitachi Vantara Design System.

### Getting started

You have the following options to get UIkit:

- Clone the repo to get all source files including build scripts: `git clone https://10.76.48.133/hv-design-system/ui/react.git`  
- Install with [npm](https://npmjs.com) any of the available packages:
  - core - ```npm install @hv/uikit-react-core```
  - lab - ```npm install @hv/uikit-react-lab```
  - icons - ```npm install @hv/uikit-react-icons```

### Developers

To always have the latest development version of UIkit, even before a release, you may want to use npm with the `latest` tag.

- Ex: ```npm install @hv/uikit-react-core@latest```

#### npm registry
Our packages are being published to a private npm registry. If you want to use this project please make sure you have _.npmrc_ config file with the following line:

```
registry = http://10.177.178.252:8081/repository/group-npm/
```
#### global link
###### *If you want to [link](https://docs.npmjs.com/cli/link.html) your packages globally you need to run this in the first place.*

```bash
npm run link
```

It will create a symlink in the global folder {prefix}/lib/node_modules/<package> for each package.

#### Bootstrap

Bootstrap the packages in the current repo. Installs all of their dependencies and links any cross-dependencies.

```bash
npm run bootstrap
```

#### Run dev mode

It will run all packages and startup the UI Development Environment [Storybook](https://storybook.js.org/) where you can see a list of the available components.

```bash
npm run dev
```

### Examples

We provide bootstrap examples for several platforms:

```bash
cd examples
```

#### Why monorepo and Lerna?
Using a single repo reduces overhead from managing dependencies and the burden of writing code across packages.

[Lerna](https://lernajs.io/) tries to ease the management of npm links when dealing with multi package projects hosted in a single repository. It also handles execution of tasks across multiple packages and eases the pain of versioning and publishing.
