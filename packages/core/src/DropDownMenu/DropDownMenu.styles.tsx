import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDropDownMenu", {
  container: {},
  baseContainer: {},
  root: {
    display: "inline-block",
    width: "auto",
  },
  icon: {},
  iconSelected: {
    boxShadow: theme.colors.shadow,
  },
  menuListRoot: {},
  menuList: {},
});
