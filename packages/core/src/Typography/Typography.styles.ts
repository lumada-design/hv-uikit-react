import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { useClasses, staticClasses } = createClasses("HvTypography", {
  root: {
    fontFamily: theme.fontFamily.body,
  },
  disabled: {
    color: theme.colors.secondary_60,
  },
  isLink: {
    color: theme.colors.primary,
    textDecoration: "underline",
  },
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // variants
  display: { ...theme.typography.display },
  title1: { ...theme.typography.title1 },
  title2: { ...theme.typography.title2 },
  title3: { ...theme.typography.title3 },
  title4: { ...theme.typography.title4 },
  body: { ...theme.typography.body },
  label: { ...theme.typography.label },
  caption1: { ...theme.typography.caption1 },
  caption2: { ...theme.typography.caption2 },
  // legacy variants
  "5xlTitle": { ...theme.typography["5xlTitle"] },
  "4xlTitle": { ...theme.typography["4xlTitle"] },
  // @ts-ignore non-existent variant
  "3xlTitle": { ...theme.typography["3xlTitle"] },
  xxlTitle: { ...theme.typography.xxlTitle },
  xlTitle: {},
  lTitle: { ...theme.typography.lTitle },
  mTitle: {},
  sTitle: { ...theme.typography.sTitle },
  xsTitle: {},
  xxsTitle: { ...theme.typography.xxsTitle },
  sectionTitle: {
    ...theme.typography.sectionTitle,
    textTransform: "uppercase",
  },
  highlightText: {},
  normalText: {},
  placeholderText: { ...theme.typography.placeholderText },
  link: {
    ...theme.typography.link,
    cursor: "pointer",
    textDecoration: "underline",
  },
  disabledText: { ...theme.typography.disabledText },
  selectedNavText: { ...theme.typography.selectedNavText },
  vizText: {},
  vizTextDisabled: { ...theme.typography.vizTextDisabled },
  xsInlineLink: { ...theme.typography.xsInlineLink },
});
