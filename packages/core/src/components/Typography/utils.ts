const mappableVariants = new Map([
  ["3xlTitle", "display"],
  ["xlTitle", "title1"],
  ["mTitle", "title2"],
  ["xsTitle", "title3"],
  ["highlightText", "label"],
  ["normalText", "body"],
  ["vizText", "caption1"],
]);

const isLegacyVariant = (variant: string) => {
  return [
    "5xlTitle",
    "4xlTitle",
    "3xlTitle",
    "xxlTitle",
    "xlTitle",
    "lTitle",
    "mTitle",
    "sTitle",
    "xsTitle",
    "xxsTitle",
    "sectionTitle",
    "highlightText",
    "normalText",
    "placeholderText",
    "link",
    "disabledText",
    "selectedNavText",
    "vizText",
    "vizTextDisabled",
    "xsInlineLink",
  ].includes(variant);
};

export const mapVariant = (variant: string) => {
  const mappedVariant = mappableVariants.get(variant);
  if (mappedVariant) {
    console.warn(
      `The typography variant ${variant} is deprecated. You should use ${mappedVariant} instead.`
    );
    return mappedVariant;
  }
  if (isLegacyVariant(variant)) {
    console.warn(`The typography variant ${variant} is deprecated.`);
  }
  return variant;
};
