import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvDropDownMenu", {
  /** Styles applied to the container. */
  container: {
    width: 32,
  },
  /** Styles applied to the BaseDropdown container. */
  baseContainer: {},
  /** Styles applied to the root. */
  root: {
    display: "inline-block",
    width: "auto",
    "&.focus-visible $icon": {
      ...outlineStyles,
    },
  },
  /** Styles applied to the icon. */
  icon: {
    position: "relative",
    width: 32,
    height: 32,
    boxSizing: "border-box",
    padding: 0,
    borderRadius: theme.dropDownMenu.borderRadius,
    border: theme.dropDownMenu.borderClosed,
  },
  /** Styles applied to the icon when selected. */
  iconSelected: {
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,

    "&:hover": {
      backgroundColor: theme.colors.atmo1,
    },

    "& svg .color0": {
      fill: theme.colors.secondary,
    },

    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
    border: theme.dropDownMenu.borderOpened,
  },
  /** Styles applied to the list root. */
  menuListRoot: {},
  /** Styles applied to the list. */
  menuList: {},
});
