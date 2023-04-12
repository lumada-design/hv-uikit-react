import { getClasses } from "~/utils";

export interface HvTypographyClasses {
  root?: string;
  noWrap?: string;
  // Variants
  display?: string;
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  body?: string;
  label?: string;
  caption1?: string;
  caption2?: string;
  "5xlTitle"?: string;
  "4xlTitle"?: string;
  "3xlTitle"?: string;
  xxlTitle?: string;
  xlTitle?: string;
  lTitle?: string;
  mTitle?: string;
  sTitle?: string;
  xsTitle?: string;
  xxsTitle?: string;
  sectionTitle?: string;
  highlightText?: string;
  normalText?: string;
  placeholderText?: string;
  link?: string;
  disabledText?: string;
  selectedNavText?: string;
  vizText?: string;
  vizTextDisabled?: string;
  xsInlineLink?: string;
}

const classKeys: string[] = [
  "root",
  "noWrap",
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
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
];

const typographyClasses = getClasses<HvTypographyClasses>(
  classKeys,
  "HvTypography"
);

export default typographyClasses;
