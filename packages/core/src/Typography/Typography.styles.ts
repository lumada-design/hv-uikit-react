import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { useClasses, staticClasses } = createClasses("HvTypography", {
  root: {
    fontFamily: theme.fontFamily.body,
    color: "inherit",
  },
  disabled: {
    color: theme.colors.textDisabled,
  },
  isLink: {
    cursor: "pointer",
    color: theme.colors.primary,
    textDecoration: "underline",
  },
  externalLinkIcon: {
    " svg": {
      margin: 0,
      marginTop: -3,
      fontSize: "inherit",
    },
  },
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // variants
  display: {},
  title1: {},
  title2: {},
  title3: {},
  title4: {},
  body: {},
  label: {},
  captionLabel: {},
  caption1: {},
  caption2: {},
  // legacy variants
  // TODO: remove (legacy or all variants) in v6 in favour of dynamic variants
  "5xlTitle": {},
  "4xlTitle": {},
  // @ts-ignore non-existent variant
  "3xlTitle": {},
  xxlTitle: {},
  xlTitle: {},
  lTitle: {},
  mTitle: {},
  sTitle: {},
  xsTitle: {},
  xxsTitle: {},
  sectionTitle: {
    textTransform: "uppercase",
  },
  highlightText: {},
  normalText: {},
  placeholderText: {},
  link: {
    cursor: "pointer",
    textDecoration: "underline",
  },
  disabledText: {},
  selectedNavText: {},
  vizText: {},
  vizTextDisabled: {},
  xsInlineLink: {},
});
