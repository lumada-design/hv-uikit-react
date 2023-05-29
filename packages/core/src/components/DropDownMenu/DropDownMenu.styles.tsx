import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "@core/utils";
import { CSSInterpolation } from "@emotion/serialize";
import dropDownMenuClasses, {
  HvDropDownMenuClasses,
} from "./dropDownMenuClasses";

export const styles: Partial<
  Record<keyof HvDropDownMenuClasses, CSSInterpolation>
> = {
  container: {
    width: 32,
  },
  root: {
    display: "inline-block",
    width: "auto",
    [`&.focus-visible .${dropDownMenuClasses.icon}`]: {
      ...outlineStyles,
    },
  },
  icon: {
    position: "relative",
    boxSizing: "content-box",
    padding: 0,
    borderRadius: theme.dropDownMenu.borderRadius,
    border: theme.dropDownMenu.borderClosed,
  },
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
  menuListRoot: {
    border: theme.dropDownMenu.borderOpened,
    borderRadius: theme.dropDownMenu.borderRadius,
  },
};
