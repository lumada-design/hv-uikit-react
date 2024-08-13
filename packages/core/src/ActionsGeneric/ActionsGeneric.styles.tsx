import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvActionsGeneric", {
  root: {},
  button: {
    "&:not(:last-child)": {
      marginRight: theme.space.xs,
    },
    "&:hover": {
      backgroundColor: theme.alpha("base_light", 0.3),
    },
  },
  actionContainer: { display: "flex", alignItems: "center", float: "right" },
  dropDownMenu: {},
  dropDownMenuButton: {},
  dropDownMenuButtonSelected: {},
});
