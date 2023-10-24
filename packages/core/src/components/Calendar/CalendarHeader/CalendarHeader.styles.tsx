import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvCalendarHeader", {
  root: {
    marginTop: theme.spacing("xs"),
    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.colors.secondary_80}`,
    "&:hover, &:focus": {
      borderBottom: `1px solid ${theme.colors.secondary}`,
    },
  },
  invalid: {},
  headerDayOfWeek: {
    color: theme.colors.secondary_80,
    paddingLeft: theme.spacing("xs"),
  },
  headerDate: {},
  input: {
    border: "none",
    backgroundColor: "transparent",
    padding: `5px ${theme.spacing("xs")}`,
    fontFamily: theme.fontFamily.body,

    color: theme.colors.secondary_80,
    fontSize: theme.fontSizes.base,
    lineHeight: theme.lineHeights.base,
    fontWeight: theme.fontWeights.normal,
    width: "100%",
    "&::placeholder": {
      color: theme.colors.secondary_60,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  inputBorderContainer: {
    backgroundColor: theme.colors.negative,
    height: 1,
    marginTop: -1,
  },
  invalidMessageStyling: {
    display: "flex",
    alignItems: "center",
    color: theme.colors.negative,
  },
});
