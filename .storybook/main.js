const { resolve } = require("path");
const NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { findByKey } = require("./utils");

const storybookFolder = resolve(__dirname);
const docFolder = resolve(__dirname, "../doc");
const corePackageSrc = resolve(__dirname, "../packages/core/src");
const codeEditorPackageSrc = resolve(__dirname, "../packages/code-editor/src");
const iconsPackageBin = resolve(__dirname, "../packages/icons/bin");
const labPackageSrc = resolve(__dirname, "../packages/lab/src");
const commonThemesSrc = resolve(__dirname, "../packages/themes/src");

module.exports = {
  stories: [
    "../doc/**/*.stories.@(js|mdx)",
    "../packages/core/src/**/*.stories.@(js|mdx)",
    "../packages/lab/src/**/*.stories.@(js|mdx)",
    "../packages/code-editor/src/**/*.stories.@(js|mdx)",
    !process.env.EXCLUDE_TEST_STORIES && "../packages/*/src/**/stories/*.test.@(js|mdx)",
  ].filter(Boolean),

  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        viewport: false,
        backgrounds: false,
      },
    },
    __dirname + "/theme/addon/register",
  ],

  webpackFinal: async (config) => {
    const rules = config.module.rules;

    rules.push({
      test: /\.js?$/,
      include: /node_modules\/highlight.js/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                require.resolve("@babel/preset-env"),
                {
                  modules: "commonjs",
                },
              ],
            ],
          },
        },
      ],
    });

    const jsRule = rules.find((rule) => rule.test.test(".js"));
    jsRule.include = [
      __dirname,
      docFolder,
      corePackageSrc,
      labPackageSrc,
      iconsPackageBin,
      codeEditorPackageSrc,
    ];
    jsRule.exclude = [/node_modules/, /dist/];

    config.resolve.alias = {
      ...config.resolve.alias,

      // package aliases for deep imports (/dist)
      "@hv/uikit-react-core/dist": corePackageSrc,
      "@hv/uikit-react-code-editor/dist": codeEditorPackageSrc,
      "@hv/uikit-react-icons/dist": iconsPackageBin,
      "@hv/uikit-react-lab/dist": labPackageSrc,
      "@hv/uikit-common-themes/dist": commonThemesSrc,

      // package aliases for top-level imports
      "@hv/uikit-react-core": corePackageSrc,
      "@hv/uikit-react-code-editor": codeEditorPackageSrc,
      "@hv/uikit-react-icons": iconsPackageBin,
      "@hv/uikit-react-lab": labPackageSrc,

      "storybook-root": storybookFolder,
    };

    // patch Storybook's sortProps because it doesn't handle wrapped components
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /(.*)addon-docs\/dist\/frameworks\/react\/propTypes\/sortProps(\.*)/,
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
    const docgen = findByKey(options, "DOC_GEN_COLLECTION_NAME");

    docgen.handlers = [
      "react-docgen-deprecation-handler",
      resolve(__dirname, "./docgen/defaultPropsHandler"),
      // `${CONFIG_PATH}/docgen/defaultValuePropsHandler`
    ];

    return {
      ...options,
    };
  },
};
