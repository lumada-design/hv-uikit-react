import { colors, makeTheme } from "theme";

const theme = makeTheme((themeVars) => ({
  colors: {
    modes: {
      dawn: { ...colors.common, ...colors.light },
      wicked: { ...colors.common, ...colors.dark },
    },
  },
  components: {
    dropdown: {
      borderRadius: "none",
    },
    header: {
      height: "44px",
      borderTop: `4px solid ${themeVars.colors.sema4}`,
      shadow: themeVars.shadows.md,
    },
    tag: {
      borderRadius: "none",
    },
  },
}));

export default theme;
