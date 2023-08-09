# @hitachivantara/uikit-react-icons

NEXT Design System icons packaged as a set of React components.

## Installation

Install the package in your project directory with:

```sh
npm install @hitachivantara/uikit-react-icons
```

## Adding New Icons

1. Copy the `.svg` to the `assets` directory.
2. Run `npm run optimize` to optimize the icons (using `svgo`).
3. Run `npm run build` to convert the SVGs to React components & build the package.

## File structure

```sh
icons/
├── assets # optimized `.svg` assets
├── bin    # `.tsx` icon components
├── dist   # built artifacts (by `vite build`)
└── src    # .svg to React component generator scripts
```
