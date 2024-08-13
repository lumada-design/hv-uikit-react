import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "../Button";

const disabledStyle = {
  backgroundColor: theme.colors.atmo3,
  borderColor: theme.colors.atmo3,
  [`&.${buttonClasses.subtle}`]: {
    backgroundColor: theme.colors.atmo3,
    borderColor: theme.colors.atmo3,
    "&:hover": { backgroundColor: theme.colors.atmo3 },
  },
  [`&.${buttonClasses.ghost}`]: {
    backgroundColor: theme.colors.atmo3,
    borderColor: theme.colors.atmo3,
    "&:hover": { backgroundColor: theme.colors.atmo3 },
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
    backgroundColor: theme.colors.atmo1,
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
    overflow: "auto",
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
