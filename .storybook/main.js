const path = require("path");

var NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const docFolder = path.resolve(__dirname, "../doc");
const corePackageSrc = path.resolve(__dirname, "../packages/core/src");
const labPackageSrc = path.resolve(__dirname, "../packages/lab/src");
const iconsPackageBin = path.resolve(__dirname, "../packages/icons/bin");
const codeEditorPackageSrc = path.resolve(__dirname, "../packages/codeEditor/src");

const excludePaths = [/node_modules/, /dist/];

const excludingTests = !!process.env.EXCLUDE_TEST_STORIES;

const searchPaths = [];
searchPaths.push("../doc/**/*.stories.@(js|mdx)");
searchPaths.push("../packages/core/src/**/*.stories.@(js|mdx)");
searchPaths.push("../packages/lab/src/**/*.stories.@(js|mdx)");
searchPaths.push("../packages/codeEditor/src/**/*.stories.@(js|mdx)");

if (!excludingTests) {
  searchPaths.push("../packages/core/src/**/stories/*.test.@(js|mdx)");
}

module.exports = {
  // to avoid a manual setup, we must keep the "stories" suffix at least for mdx
  // see https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/docspage.md#story-file-names
  stories: searchPaths,
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
    "./.storybook/themes/register",
  ],

  webpackFinal: async (config) => {
    const rules = config.module.rules;

    // Fix for https://github.com/storybooks/storybook/issues/3346
    // 6.0 already have https://github.com/storybookjs/storybook/pull/8822
    const jsRule = config.module.rules.find((rule) => rule.test.test(".js"));
    jsRule.include = [
      __dirname,
      docFolder,
      corePackageSrc,
      labPackageSrc,
      iconsPackageBin,
      codeEditorPackageSrc,
    ];
    jsRule.exclude = excludePaths;
    const babelLoader = jsRule.use.find(({ loader }) => loader === "babel-loader");
    babelLoader.options.sourceType = "unambiguous";

    // add docgen handlers
    const babelLoaderPlugins = babelLoader.options.plugins;

    let docgenPlugin = babelLoaderPlugins.find(
      (plugin) =>
        plugin.includes("babel-plugin-react-docgen") ||
        (Array.isArray(plugin) &&
          plugin.length > 0 &&
          plugin[0].includes("babel-plugin-react-docgen"))
    );

    if (docgenPlugin === "babel-plugin-react-docgen") {
      const docgenPluginName = docgenPlugin;
      docgenPlugin = [docgenPluginName, { DOC_GEN_COLLECTION_NAME: "STORYBOOK_REACT_CLASSES" }];

      babelLoaderPlugins[
        babelLoaderPlugins.findIndex((plugin) => plugin.includes("babel-plugin-react-docgen"))
      ] = docgenPlugin;
    }

    let docgenPluginOptions;

    if (docgenPlugin.length > 1) {
      docgenPluginOptions = docgenPlugin[1];
    } else {
      docgenPluginOptions = { DOC_GEN_COLLECTION_NAME: "STORYBOOK_REACT_CLASSES" };
      docgenPlugin.push(docgenPluginOptions);
    }

    if (docgenPluginOptions.handlers == null) {
      docgenPluginOptions.handlers = [];
    }

    docgenPluginOptions.handlers = [
      ...docgenPluginOptions.handlers,
      "react-docgen-deprecation-handler",
      path.resolve(__dirname, "docgen/defaultPropsHandler"),
      path.resolve(__dirname, "docgen/defaultValuePropsHandler"),
    ];

    // patch Storybook's sortProps because it doesn't handle wrapped components
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /(.*)addon-docs\/dist\/frameworks\/react\/propTypes\/sortProps(\.*)/,
        function (resource) {
          resource.request = path.resolve(__dirname, "patches/sortProps.js");
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

    // rule for txt files
    rules.push({
      test: /\.txt$/i,
      use: "raw-loader",
    });

    // specific rule for templates' svg files
    const fileLoaderRule = rules.find((rule) => rule.test.test(".svg"));
    fileLoaderRule.exclude = path.resolve(__dirname, "../samples/templates");

    rules.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, "../samples/templates"),
      use: "@svgr/webpack",
    });

    // not sure it is really needed, as stories can import components
    // using relative paths
    config.resolve.alias = {
      ...config.resolve.alias,
      "@hv/uikit-react-core/dist": corePackageSrc,
      "@hv/uikit-react-lab/dist": labPackageSrc,
      "@hv/uikit-react-icons/dist": iconsPackageBin,
      "react-hook-form": "react-hook-form/dist/index.ie11",
      "@hv/uikit-react-codeEditor/dist": codeEditorPackageSrc,
    };

    return config;
  },
};
