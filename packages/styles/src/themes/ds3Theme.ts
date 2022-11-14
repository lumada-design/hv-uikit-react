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
      height: "44px",
      borderTop: `4px solid ${theme.colors.sema4}`,
      shadow: theme.shadows.md,
    },
  },
}));

export default ds3Theme;
