module.exports = {
  multipass: true,
  quiet: "true",
  plugins: [
    "prefixIds",
    "cleanupAttrs",
    "cleanupEnableBackground",
    "cleanupListOfValues",
    "collapseGroups",
    "convertColors",
    "convertShapeToPath",
    "convertStyleToAttrs",
    "convertTransform",
    "mergePaths",
    "minifyStyles",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    // "removeAttrs",
    "removeComments",
    "removeDesc",
    "removeDimensions",
    "removeDoctype",
    "removeEditorsNSData",
    "removeElementsByAttr",
    "removeEmptyAttrs",
    "removeEmptyContainers",
    "removeEmptyText",
    "removeHiddenElems",
    "removeMetadata",
    "removeNonInheritableGroupAttrs",
    "removeTitle",
    "removeUnusedNS",
    "removeUselessDefs",
    "removeUselessStrokeAndFill",
    "removeXMLProcInst",
    "sortAttrs",
    {
      name: "removeUselessStrokeAndFill",
      params: {
        removeNone: true,
      },
    },
    {
      name: "preset-default",
      params: {
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },
          removeUnknownsAndDefaults: {
            keepDataAttrs: false,
          },
          convertPathData: {
            floatPrecision: 10,
          },
          cleanupNumericValues: {
            floatPrecision: 2,
          },
        },
      },
    },
  ],
};
