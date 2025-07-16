import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDropdownMenu", {
  root: {
    flexShrink: 0,
    "& > div": {
      height: "inherit",
    },
  },
  /** @deprecated use `classes.root` instead */
  container: {},
  baseContainer: {},
  /** @deprecated use `classes.root` instead */
  icon: {},
  iconSelected: {
    boxShadow: theme.colors.shadow,
  },
  menuListRoot: {
    padding: theme.space.sm,
  },
  menuList: {},
});
