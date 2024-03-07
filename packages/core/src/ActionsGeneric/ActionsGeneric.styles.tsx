import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvActionsGeneric", {
  root: {
    display: "flex",
    gap: theme.space.xs,
  },
  button: {
    "&:hover": {
      backgroundColor: theme.alpha("base_light", 0.3),
    },
  },
  actionContainer: { alignItems: "center", float: "right" },
  dropDownMenu: {},
  dropDownMenuButton: {},
  dropDownMenuButtonSelected: {},
});
