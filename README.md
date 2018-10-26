# HV UI
A collection of Themes and UI Components for the Hitachi Vantara Design System.

## Why is HV UI a monorepo
Using a single repo reduces overhead from managing dependencies and the burden of writing code across packages.
It allows moving fast and getting things done more efficiently, increasing developer productivity.

### Lerna
[Lerna](https://lernajs.io/) tries to ease the management of npm links when dealing with multi package projects hosted in a single repository. It also handles execution of tasks across multiple packages and eases the pain of versioning and publishing.

Lerna calls yarn/npm install for each package inside the project and then creates symlinks between the packages that refer each other.
However, each package by default gets their own node_modules folder. That is a lot of duplication…

### Yarn Workspaces
[Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/) are a way to setup a package architecture. It allows to setup multiple packages in such a way that we only need to run yarn install once to install all of them in a single pass.

It enables faster installation by preventing package duplication across Workspaces, creates symlinks between Workspaces that depend on each other, and will ensure the consistency and correctness of all directories.

### Why Lerna + Yarn Workspaces
- Yarn handles the dependencies.
- Lerna handles tasks that affect multiple packages (build/test/lint).

### Getting Started

You need to disable SSL verification for now since the git server doesn't have proper certificates

```bash
git config --global http.sslVerify false
```

Clone this repo:

```bash
git clone https://gitlab-edge.eng.hitachivantara.com/hv-design-system/hv-ui.git
```

Install dependencies running this command:

```bash
yarn install
```

Start all pacakges in dev mode (with automic build on code changes)

```bash
lerna run start --parallel
```

Build all packages

```bash
lerna run build
```

### TODO
- Publish packages