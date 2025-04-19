import { StandardProperties } from "csstype";

import { DeepString } from "./common";

interface CSSProperties extends StandardProperties<string | number> {}

/**
 * Supported typography overrides based on CSS properties.
 */
type HvThemeTypographyProps = Pick<
  CSSProperties,
  | "color"
  | "fontSize"
  | "letterSpacing"
  | "lineHeight"
  | "fontWeight"
  | "textDecoration"
>;

/**
 * Supported typography variants across DS3 and DS5.
 */
type HvTypographyVariants =
  | "display"
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "label"
  | "body"
  | "captionLabel"
  | "caption1"
  | "caption2"
  // Legacy (DS3)
  | "5xlTitle"
  | "4xlTitle"
  | "xxlTitle"
  | "lTitle"
  | "sTitle"
  | "xxsTitle"
  | "sectionTitle"
  | "placeholderText"
  | "link"
  | "disabledText"
  | "selectedNavText"
  | "vizTextDisabled"
  | "xsInlineLink"
  | (string & {});

/**
 * Typography configuration mapped to supported variants.
 */
export type HvThemeTypography = {
  typography: Record<HvTypographyVariants, HvThemeTypographyProps>;
};

/**
 * Base structure of all typography style values as stringified entries.
 */
const typographyProps: DeepString<HvThemeTypographyProps> = {
  color: "string",
  fontSize: "string",
  letterSpacing: "string",
  lineHeight: "string",
  fontWeight: "string",
  textDecoration: "string",
};

/**
 * Deep stringified version of `HvThemeTypography`.
 * Used to define schema or fallback values for all variants.
 */
export const typographySpec: DeepString<HvThemeTypography> = {
  typography: {
    // DS5 tokens
    display: { ...typographyProps },
    title1: { ...typographyProps },
    title2: { ...typographyProps },
    title3: { ...typographyProps },
    title4: { ...typographyProps },
    label: { ...typographyProps },
    body: { ...typographyProps },
    captionLabel: { ...typographyProps },
    caption1: { ...typographyProps },
    caption2: { ...typographyProps },

    // Legacy DS3 tokens
    "5xlTitle": { ...typographyProps },
    "4xlTitle": { ...typographyProps },
    xxlTitle: { ...typographyProps },
    lTitle: { ...typographyProps },
    sTitle: { ...typographyProps },
    xxsTitle: { ...typographyProps },
    sectionTitle: { ...typographyProps },
    placeholderText: { ...typographyProps },
    link: { ...typographyProps },
    disabledText: { ...typographyProps },
    selectedNavText: { ...typographyProps },
    vizTextDisabled: { ...typographyProps },
    xsInlineLink: { ...typographyProps },
  },
};
