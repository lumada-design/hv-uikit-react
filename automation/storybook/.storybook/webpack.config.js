const path = require("path");

module.exports = ({ config, mode }) => {
  // Extend defaultConfig as you need.

  config.module.rules.push({
    test: /\.txt$/i,
    use: "raw-loader"
  });

  config.module.rules.push({
    test: /\.js?$/,
    exclude: /node_modules\/(?!(uniqid)\/).*/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties", "react-docgen"]
        }
      }
    ]
  });

  return config;
};
