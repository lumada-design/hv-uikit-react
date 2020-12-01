const path = require("path");

const docFolder = path.resolve(__dirname, "../doc");
const corePackageSrc = path.resolve(__dirname, "../packages/core/src");
const labPackageSrc = path.resolve(__dirname, "../packages/lab/src");
const iconsPackageBin = path.resolve(__dirname, "../packages/icons/bin");

const excludePaths = [/node_modules/, /dist/];

module.exports = {
  stories: [
    "../doc/**/*.stories.@(js|mdx)",
    "../packages/core/src/**/*.stories.@(js|mdx)",
    ...(!process.env.EXCLUDE_TEST_STORIES
      ? ["../packages/core/src/**/stories/*.test.@(js|mdx)"]
      : []),
    "../packages/lab/src/**/*.stories.js",
  ],

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

    const jsRule = rules.find((rule) => rule.test.test(".js"));
    jsRule.include = [__dirname, docFolder, corePackageSrc, labPackageSrc, iconsPackageBin];
    jsRule.exclude = excludePaths;

    const babelLoader = jsRule.use.find(({ loader }) => loader.includes("babel-loader"));
    const overrideJsRule = babelLoader.options.overrides.find((rule) => rule.test.test(".js"));
    const overrideJsRulePlugins = overrideJsRule.plugins;

    // add docgen handlers
    let docgenPlugin = overrideJsRulePlugins.find(
      (plugin) =>
        plugin.includes("babel-plugin-react-docgen") ||
        (Array.isArray(plugin) &&
          plugin.length > 0 &&
          plugin[0].includes("babel-plugin-react-docgen"))
    );

    if (docgenPlugin === "babel-plugin-react-docgen") {
      const docgenPluginName = docgenPlugin;
      docgenPlugin = [docgenPluginName, { DOC_GEN_COLLECTION_NAME: "STORYBOOK_REACT_CLASSES" }];

      overrideJsRulePlugins[
        overrideJsRulePlugins.findIndex((plugin) => plugin.includes("babel-plugin-react-docgen"))
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
      // path.resolve(__dirname, "docgen/defaultValuePropsHandler"),
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      "@hv/uikit-react-core/dist": corePackageSrc,
      "@hv/uikit-react-lab/dist": labPackageSrc,
      "@hv/uikit-react-icons/dist": iconsPackageBin,
      "react-hook-form": "react-hook-form/dist/index.ie11",
    };

    return config;
  },
};
