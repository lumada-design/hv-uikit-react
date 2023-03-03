const mappableVariants = new Map([
  ["3xlTitle", "display"],
  ["xlTitle", "title1"],
  ["mTitle", "title2"],
  ["xsTitle", "title3"],
  ["highlightText", "label"],
  ["normalText", "body"],
  ["vizText", "caption1"],
]);

export const mapVariant = (variant: string) => {
  const mappedVariant = mappableVariants.get(variant);
  if (mappedVariant) {
    console.warn(
      `The typography variant ${variant} is deprecated. You should use ${mappedVariant} instead.`
    );
    return mappedVariant;
  }
  return variant;
};
