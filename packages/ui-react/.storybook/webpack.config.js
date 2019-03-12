const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.txt$/i,
    use: "raw-loader"
  });
  defaultConfig.resolve.extensions.push(".ts", ".tsx");

  return defaultConfig;
};
