# @hitachivantara/uikit-common-themes

A collection of themes for use with Hitachi Vantara Components.

## Installation

Install the package in your project directory with:

```sh
npm install @hitachivantara/uikit-common-themes
```

## JSON to SCSS

The themes are defined using the JSON format but not all the project consume JSON directly. For these cases a script
(ran in the build step) converts the JSON themes into SCSS.

The base of this script is [json-to-scss](https://www.npmjs.com/package/json-to-scss)
The script was modified as the JSON attributes are set in camel case and the SCSS uses kebab case. For that reason
a tgz is set in the lib folder.
