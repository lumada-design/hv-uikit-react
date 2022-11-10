import { colors, makeTheme } from "..";

const theme = makeTheme((themeVars) => ({
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
      borderTop: `4px solid ${themeVars.colors.sema4}`,
    },
  },
}));

export default theme;
