import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

const hover = () => ({
  background: theme.verticalNavigation.hoverColor,
});

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationAction",
  {
    action: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "32px",
      color: theme.colors.secondary,

      // hover
      "&:hover": hover(),

      "&:focus": {
        outline: "none",
        ...hover(),
      },

      "&:focus-visible": {
        ...outlineStyles,
      },

      // cursor
      cursor: "pointer",
      "& *": {
        cursor: "pointer",
      },
    },
    noIcon: {
      paddingLeft: theme.space.xs,
    },
    minimized: {
      justifyContent: "center",
      paddingRight: 0,
    },
  }
);
