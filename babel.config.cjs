const productionPlugins = [
  "@babel/plugin-transform-react-constant-elements",
  [
    "babel-plugin-transform-react-remove-prop-types",
    {
      mode: "unsafe-wrap",
    },
  ],
];

module.exports = (api) => {
  const useESModules = api != null && api.env(["legacy", "modern"]);

  let moduleFormat = "auto";
  if (api != null) {
    if (api.env("commonjs")) {
      moduleFormat = "commonjs";
    } else if (api.env(["legacy", "modern"])) {
      moduleFormat = false;
    }
  }

  const presets = [
    [
      "@babel/preset-env",
      {
        modules: moduleFormat,
        bugfixes: true,
        useBuiltIns: "usage",
        shippedProposals: api != null && api.env("modern"),
        corejs: { version: 3 },
        browserslistEnv: api != null && api.env(),
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
  ];

  const plugins = [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules,
        version: "^7.4.4",
      },
    ],
    "babel-plugin-optimize-clsx",
  ];

  if (!api.env("modern")) {
    plugins.push("@babel/plugin-transform-object-assign");
  }

  if (process.env.NODE_ENV === "production") {
    plugins.push(...productionPlugins);
  }

  const ignore = [
    /@babel[\\|/]runtime/, // Fix a Windows issue.
    "*.js.snap",
    // **/tests needed for jest, ignored in the packages' builds via command line parameter
    // **/stories needed for storybook, ignored in the packages' builds via command line parameter
  ];

  return {
    presets,
    plugins,
    ignore,
  };
};
