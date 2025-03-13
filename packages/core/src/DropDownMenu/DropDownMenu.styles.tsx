import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvDropDownMenu", {
  root: {},
  /** @deprecated use `classes.root` instead */
  container: {},
  baseContainer: {
    "--r": theme.radii.base,
    "&[data-popper-placement=bottom-end] .HvBaseDropdown-panel": {
      borderRadius: "var(--r) 0 var(--r) var(--r)",
    },
    "&[data-popper-placement=bottom-start] .HvBaseDropdown-panel": {
      borderRadius: "0 var(--r) var(--r) var(--r)",
    },
    "&[data-popper-placement=top-start] .HvBaseDropdown-panel": {
      borderRadius: "var(--r) var(--r) var(--r) 0",
    },
    "&[data-popper-placement=top-end] .HvBaseDropdown-panel": {
      borderRadius: "var(--r) var(--r) 0 var(--r)",
    },
  },
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
