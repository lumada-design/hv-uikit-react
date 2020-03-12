const path = require("path");

module.exports = ({ config, mode }) => {
  // Extend defaultConfig as you need.

  const rules = config.module.rules;

  const fileLoaderRule = rules.find(rule => rule.test.test(".svg"));
  fileLoaderRule.exclude = path.resolve(__dirname, "../samples/templates");

  config.module.rules.push({
    test: /\.txt$/i,
    use: "raw-loader"
  });

  config.module.rules.push({
    test: /\.svg$/,
    include: path.resolve(__dirname, "../samples/templates"),
    use: "@svgr/webpack"
  });

  config.module.rules.push({
    test: /\.js?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            [
              "babel-plugin-react-docgen",
              {
                handlers: ["react-docgen-deprecation-handler", "../../../.storybook/defaultPropsHandler", "../../../.storybook/defaultValuePropsHandler"] // optional array of custom handlers (use the string name of the package in the array)
              }
            ],
            [
              "module-resolver",
              {
                alias: {
                  "@hv/uikit-react-core/dist": path.resolve(
                    __dirname,
                    "../../core/src"
                  ),
                  "@hv/uikit-react-lab/dist": path.resolve(
                    __dirname,
                    "../../lab/src"
                  ),
                  "@hv/uikit-react-icons/dist": path.resolve(
                    __dirname,
                    "../../icons/bin"
                  )
                }
              }
            ]
          ]
        }
      }
    ]
  });

  return config;
};
