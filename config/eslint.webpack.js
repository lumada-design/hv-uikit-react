const { resolve } = require("path");

// NOTE: This webpack config is only used by the eslint-plugin-import

const corePackageSrc = resolve(__dirname, "../packages/core/src");
const iconsPackageBin = resolve(__dirname, "../packages/icons/bin");
const labPackageSrc = resolve(__dirname, "../packages/lab/src");
const commonThemesSrc = resolve(__dirname, "../packages/themes/src");

module.exports = {
  context: resolve(__dirname, ".."),
  resolve: {
    modules: [resolve(__dirname, "../node_modules")],
    alias: {
      // package aliases for deep imports (/dist)
      "@hitachivantara/uikit-react-core/dist": corePackageSrc,
      "@hitachivantara/uikit-react-icons/dist": iconsPackageBin,
      "@hitachivantara/uikit-react-lab/dist": labPackageSrc,
      "@hitachivantara/uikit-common-themes/dist": commonThemesSrc,

      // package aliases for top-level imports
      "@hitachivantara/uikit-react-core": corePackageSrc,
      "@hitachivantara/uikit-react-icons": iconsPackageBin,
      "@hitachivantara/uikit-react-lab": labPackageSrc,
    },
    extensions: [".js", ".ts", ".tsx", ".d.ts", ".json"],
  },
};
