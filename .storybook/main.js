const { resolve } = require("path");
const NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const defaultPropsHandler = require("react-docgen/dist/handlers/defaultPropsHandler");

const { findByKey } = require("./utils");

const storybookFolder = resolve(__dirname);
const docFolder = resolve(__dirname, "../doc");
const corePackageSrc = resolve(__dirname, "../packages/core/src");
const codeEditorPackageSrc = resolve(__dirname, "../packages/code-editor/src");
const iconsPackageBin = resolve(__dirname, "../packages/icons/bin");
const labPackageSrc = resolve(__dirname, "../packages/lab/src");
const themesPackageSrc = resolve(__dirname, "../packages/themes/src");
const vizPackagesSrc = resolve(__dirname, "../packages/viz/src");

module.exports = {
  core: {
    builder: "webpack4",
  },
  framework: "@storybook/react",
  features: {
    babelModeV7: true,
    buildStoriesJson: true,
    storyStoreV7: !process.env.V2_COMPAT_STORY_STORE,
  },

  stories: [
    "../doc/**/*.stories.@(js|mdx)",
    "../packages/core/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../packages/lab/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../packages/code-editor/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../packages/viz/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    !process.env.EXCLUDE_TEST_STORIES && "../packages/*/src/**/stories/*.test.@(js|mdx|jsx|ts|tsx)",
  ].filter(Boolean),

  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    __dirname + "/theme/addon/register",
  ],

  webpackFinal: async (config) => {
    const rules = config.module.rules;

    const jsRule = rules.find((rule) => rule.test.test(".js"));
    jsRule.include = [
      __dirname,
      docFolder,
      corePackageSrc,
      labPackageSrc,
      iconsPackageBin,
      codeEditorPackageSrc,
      vizPackagesSrc
    ];
    jsRule.exclude = [/node_modules/, /dist/];

    config.resolve.alias = {
      ...config.resolve.alias,

      // this is required due to the Node 16 upgrade, to guarantee only one material ui instance is used
      "@material-ui": resolve("./node_modules/@material-ui"),

      // package aliases for deep imports (/dist)
      "@hitachivantara/uikit-react-core/dist": corePackageSrc,
      "@hitachivantara/uikit-react-code-editor/dist": codeEditorPackageSrc,
      "@hitachivantara/uikit-react-icons/dist": iconsPackageBin,
      "@hitachivantara/uikit-react-lab/dist": labPackageSrc,
      "@hitachivantara/uikit-common-themes/dist": themesPackageSrc,
      "@hitachivantara/uikit-react-viz/dist": vizPackagesSrc,

      // package aliases for top-level imports
      "@hitachivantara/uikit-react-core": corePackageSrc,
      "@hitachivantara/uikit-react-code-editor": codeEditorPackageSrc,
      "@hitachivantara/uikit-react-icons": iconsPackageBin,
      "@hitachivantara/uikit-react-lab": labPackageSrc,
      "@hitachivantara/uikit-react-viz": vizPackagesSrc,

      "storybook-root": storybookFolder,
    };

    // patch Storybook's sortProps because it doesn't handle wrapped components
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /(.*)addon-docs\/(.*)\/frameworks\/react\/propTypes\/sortProps(\.*)/,
        function (resource) {
          resource.request = resolve(__dirname, "patches/sortProps.js");
          if (resource.resource) {
            resource.resource = resource.request;
          }
        }
      )
    );

    config.plugins.push(
      new MonacoWebpackPlugin({
        // see https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: [
          // "javascript",
          "json",
          // "typescript", // needed for JavaScript, adds the required HTML worker
          "yaml",
        ],
      })
    );

    return config;
  },

  babel: async (options) => {
    const docgenConfig = findByKey(options, "DOC_GEN_COLLECTION_NAME");
    docgenConfig.handlers = [defaultPropsHandler];

    return {
      ...options,
    };
  },
};
