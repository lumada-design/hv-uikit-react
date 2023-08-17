import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationSlider",
  {
    root: {
      display: "flex",
      alignItems: "center",
      borderLeft: theme.verticalNavigation.inactiveBorderLeft,
      minHeight: "48px",
      marginBottom: "8px",
      "& > button": {
        marginLeft: "auto",
      },
    },
    listItemSelected: {
      background: theme.colors.atmo3,
      borderLeft: theme.verticalNavigation.activeBorderLeft,
      "& *": {
        background: theme.colors.atmo3,
      },
    },
    listItemFocus: {
      background: theme.colors.atmo3,
      "& *": {
        background: theme.colors.atmo3,
      },
    },
  }
);
