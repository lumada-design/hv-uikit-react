import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
  menuListRoot: {
    backgroundColor: "transparent",
  },
  menuList: {},
});
