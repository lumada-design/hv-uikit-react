# HV UI
A collection of Themes and UI Components for the Hitachi Vantara Design System.

## Why is HV UI a monorepo
Using a single repo reduces overhead from managing dependencies and the burden of writing code across packages.
It allows moving fast and getting things done more efficiently, increasing developer productivity.

### Lerna
[Lerna](https://lernajs.io/) tries to ease the management of npm links when dealing with multi package projects hosted in a single repository. It also handles execution of tasks across multiple packages and eases the pain of versioning and publishing.

Lerna calls npm install for each package inside the project and then creates symlinks between the packages that refer each other.
Each package by default gets their own node_modules folder. 

### Getting Started
Install root dependencies ([Lerna](https://github.com/lerna)).

```bash
npm i
```

###### *If you want to [link](https://docs.npmjs.com/cli/link.html) your packages globally you need to run this in the first place.*
It will create a symlink in the global folder {prefix}/lib/node_modules/<package> for each package.

```bash
npm run link
```

#### Bootstrap

Bootstrap the packages in the current Lerna repo. Installs all of their dependencies and links any cross-dependencies.

```bash
npm run bootstrap
```

#### Run dev mode

It will run all packages and startup the UI Development Environment [Storybook](https://storybook.js.org/) where you can see a list of the available components.

For Windows
```bash
npm run dev_win
```
Otherwise 
```bash
npm run dev
```


By clicking *Show Info* you can see additional information on the usage of the component.

#### Run With CRA example

Install dependencies.

```bash
npm i
```

Run the app in development mode.

```bash
npm run start
```

It will run the [CRA](https://facebook.github.io/create-react-app/) example where you can see a simple login page created with HV UI components.