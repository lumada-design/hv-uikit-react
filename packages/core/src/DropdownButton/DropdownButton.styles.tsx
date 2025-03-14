import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { buttonClasses } from "../Button";

// TODO: review override
const disabledStyle = {
  [`&,&.${buttonClasses.subtle},&.${buttonClasses.ghost}`]: {
    backgroundColor: theme.colors.bgDisabled,
    borderColor: theme.colors.bgDisabled,
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
    "--r": theme.radii.base,
    backgroundColor: theme.colors.bgContainer,
    "&[data-popper-placement*='top']": {
      borderRadius: "0px 0px var(--r) var(--r)",
    },
    "&[data-popper-placement*='bottom']": {
      borderRadius: "var(--r) var(--r) 0px 0px",
    },
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
});
