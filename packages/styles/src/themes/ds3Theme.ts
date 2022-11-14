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
      height: 44,
      borderTop: `4px solid ${theme.colors.sema4}`,
    },
  },
}));

export default ds3Theme;
