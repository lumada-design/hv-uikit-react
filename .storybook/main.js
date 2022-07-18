const { resolve } = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const defaultPropsHandler = require("react-docgen/dist/handlers/defaultPropsHandler");

const { findByKey } = require("./utils");

const storybookFolder = resolve(__dirname);
const docFolder = resolve(__dirname, "../doc");
const corePackageSrc = resolve(__dirname, "../packages/core/src");
const labPackageSrc = resolve(__dirname, "../packages/lab/src");
const codeEditorPackageSrc = resolve(__dirname, "../packages/code-editor/src");
const vizPackagesSrc = resolve(__dirname, "../packages/viz/src");
const iconsPackageBin = resolve(__dirname, "../packages/icons/bin");
const commonThemesSrc = resolve(__dirname, "../packages/themes/src");
const templatesSrc = resolve(__dirname, "../templates");

module.exports = {
  core: {
    builder: "webpack4",
  },
  framework: "@storybook/react",
  features: {
    babelModeV7: true,
    buildStoriesJson: true,
    storyStoreV7: !process.env.V2_COMPAT_STORY_STORE,
    postcss: false,
  },

  stories: [
    "../doc/**/*.stories.@(js|mdx)",
    "../packages/core/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../packages/lab/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../packages/code-editor/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../packages/viz/src/**/*.stories.@(js|mdx|jsx|ts|tsx)",
    "../templates/**/*.stories.@(js|mdx|jsx|ts|tsx)",
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
      codeEditorPackageSrc,
      vizPackagesSrc,
      iconsPackageBin,
      templatesSrc,
    ];
    jsRule.exclude = [/node_modules/, /dist/];

    config.resolve.alias = {
      ...config.resolve.alias,

      // this is required due to the Node 16 upgrade, to guarantee only one material ui instance is used
      "@mui/material": resolve("./node_modules/@mui/material"),
      "@mui/styles": resolve("./node_modules/@mui/styles"),

      // package aliases for deep imports (/dist)
      "@hitachivantara/uikit-react-core/dist": corePackageSrc,
      "@hitachivantara/uikit-react-lab/dist": labPackageSrc,
      "@hitachivantara/uikit-react-code-editor/dist": codeEditorPackageSrc,
      "@hitachivantara/uikit-react-viz/dist": vizPackagesSrc,
      "@hitachivantara/uikit-react-icons/dist": iconsPackageBin,
      "@hitachivantara/uikit-common-themes/dist": commonThemesSrc,

      // package aliases for top-level imports
      "@hitachivantara/uikit-react-core": corePackageSrc,
      "@hitachivantara/uikit-react-lab": labPackageSrc,
      "@hitachivantara/uikit-react-code-editor": codeEditorPackageSrc,
      "@hitachivantara/uikit-react-viz": vizPackagesSrc,
      "@hitachivantara/uikit-react-icons": iconsPackageBin,

      "storybook-root": storybookFolder,
    };

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

  features: { emotionAlias: false },
};
