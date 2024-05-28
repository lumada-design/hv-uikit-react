import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "../Button";
import { createClasses } from "../utils/classes";

const disabledStyle = {
  backgroundColor: theme.colors.bgDisabled,
  borderColor: "transparent",
  [`&.${buttonClasses.subtle}`]: {
    backgroundColor: theme.colors.bgDisabled,
    borderColor: "transparent",
    "&:hover": { backgroundColor: theme.colors.bgDisabled },
  },
  [`&.${buttonClasses.ghost}`]: {
    backgroundColor: theme.colors.bgDisabled,
    borderColor: "transparent",
    "&:hover": { backgroundColor: theme.colors.bgDisabled },
  },
};

export const { staticClasses, useClasses } = createClasses("HvDropdownButton", {
  root: {
    userSelect: "none",
    position: "relative",

    [`&:not(.${buttonClasses.icon})`]: {
      width: "100%",
      minWidth: "unset",
      justifyContent: "flex-start",
      paddingLeft: theme.space.xs,
    },
  },
  disabled: {
    ...disabledStyle,
  },
  readOnly: {
    userSelect: "text",
    ...disabledStyle,
  },
  open: {
    backgroundColor: theme.colors.bgSurface,
  },
  openUp: {
    borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
  },
  openDown: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
  },
  selection: {
    color: "inherit",
    flex: 1,
    textAlign: "start",
    overflow: "clip visible",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholder: {},
  arrowContainer: {
    marginRight: theme.spacing(-2),
  },
  arrow: {
    transition: "rotate 0.2s ease",
  },
});
