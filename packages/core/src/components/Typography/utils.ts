export const typographyVariants = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
] as const;

export type HvTypographyVariants = (typeof typographyVariants)[number];

/** @deprecated */
export type HvTypographyLegacyVariants =
  | "5xlTitle"
  | "4xlTitle"
  | "3xlTitle"
  | "xxlTitle"
  | "xlTitle"
  | "lTitle"
  | "mTitle"
  | "sTitle"
  | "xsTitle"
  | "xxsTitle"
  | "sectionTitle"
  | "highlightText"
  | "normalText"
  | "placeholderText"
  | "link"
  | "disabledText"
  | "selectedNavText"
  | "vizText"
  | "vizTextDisabled"
  | "xsInlineLink";

type Variant = HvTypographyVariants | HvTypographyLegacyVariants;

const mappableVariants = new Map<Variant, HvTypographyVariants>([
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

export const mapVariant = (variant: Variant, theme?: string) => {
  const mappedVariant = mappableVariants.get(variant);

  if (theme !== "ds3") {
    if (mappedVariant) {
      // eslint-disable-next-line no-console
      console.warn(
        `The typography variant ${variant} is deprecated. You should use ${mappedVariant} instead.`
      );
      return mappedVariant;
    }
    if (isLegacyVariant(variant)) {
      // eslint-disable-next-line no-console
      console.warn(`The typography variant ${variant} is deprecated.`);
    }
  }

  return variant;
};
