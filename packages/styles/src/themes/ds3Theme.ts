import { colors, makeTheme } from "..";

const ds3Theme = makeTheme((theme) => ({
  colors: {
    modes: {
      dawn: { ...colors.light },
      wicked: { ...colors.dark },
    },
  },
  components: {
    dropdown: {
      borderRadius: "none",
    },
    header: {
      color: theme.colors.sema4,
      height: "44px",
      borderTopThickness: "4px",
      borderTopColor: `${theme.colors.sema4}`,
      selectedItemBorderTopColor: theme.colors.acce3,
      selectedItemBorderTopThickness: "2px",
      selectedItemBorderBottomColor: "transparent",
      selectedItemBorderBottomThickness: "0px",
      shadow: theme.shadows.md,
    },
  },
}));

export default ds3Theme;
