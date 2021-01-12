const { resolve } = require("path");

// NOTE: This webpack config is only used by the eslint-plugin-import

const corePackageSrc = resolve(__dirname, "../packages/core/src");
const codeEditorPackageSrc = resolve(__dirname, "../packages/code-editor/src");
const iconsPackageBin = resolve(__dirname, "../packages/icons/bin");
const labPackageSrc = resolve(__dirname, "../packages/lab/src");
const commonThemesSrc = resolve(__dirname, "../packages/themes/src");

module.exports = {
  context: resolve(__dirname, ".."),
  resolve: {
    modules: [resolve(__dirname, "../node_modules")],
    alias: {
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
    },
    extensions: [".js", ".ts", ".tsx", ".d.ts", ".json"],
  },
};
