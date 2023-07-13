import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils";

export const { staticClasses, useClasses } = createClasses("HvActionsGeneric", {
  root: {},
  button: {
    "&:not(:last-child)": {
      marginRight: theme.space.xs,
    },
  },
  actionContainer: { display: "flex", alignItems: "center", float: "right" },
  dropDownMenu: {},
  dropDownMenuButton: {},
  dropDownMenuButtonSelected: {},
});
