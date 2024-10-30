import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDropDownMenu", {
  container: {},
  baseContainer: {
    "&[data-popper-placement=bottom-end] .HvBaseDropdown-panel": {
      borderRadius: `${theme.radii.base} 0 ${theme.radii.base} ${theme.radii.base}`,
    },
    "&[data-popper-placement=bottom-start] .HvBaseDropdown-panel": {
      borderRadius: `0 ${theme.radii.base} ${theme.radii.base} ${theme.radii.base}`,
    },
    "&[data-popper-placement=top-start] .HvBaseDropdown-panel": {
      borderRadius: `${theme.radii.base} ${theme.radii.base} ${theme.radii.base} 0`,
    },
    "&[data-popper-placement=top-end] .HvBaseDropdown-panel": {
      borderRadius: `${theme.radii.base} ${theme.radii.base} 0 ${theme.radii.base}`,
    },
  },
  root: {
    display: "inline-block",
    width: "auto",
  },
  icon: {},
  iconSelected: {
    boxShadow: theme.colors.shadow,
  },
  menuListRoot: {
    padding: theme.space.sm,
  },
  menuList: {},
});
