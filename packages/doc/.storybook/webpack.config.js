const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  defaultConfig.module.rules.push({
    test: /\.txt$/i,
    use: "raw-loader"
  });

  defaultConfig.module.rules.push({
    test: /\.js?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-docgen",
            [
              "module-resolver",
              {
                alias: {
                  "@hv/uikit-react-core": path.resolve(
                    __dirname,
                    "../../core/src"
                  ),
                  "@hv/uikit-react-lab": path.resolve(
                    __dirname,
                    "../../lab/src"
                  ),
                  "@hv/uikit-react-icons": path.resolve(
                      __dirname,
                      "../../icons/dist"
                  )
                }
              }
            ]
          ]
        }
      }
    ]
  });

  return defaultConfig;
};
