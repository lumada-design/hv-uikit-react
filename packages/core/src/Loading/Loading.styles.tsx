import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvLoading", {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space.xs,
  },
  barContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",

    ":has($regular)": {
      width: 30,
      height: 30,
    },

    ":has($small)": {
      "--height": "40%",
      width: 18,
      height: 18,
    },
  },
  loadingBar: {
    backgroundColor: "currentcolor",
    display: "inline-block",
    animation: "loading 1s ease-in-out infinite",
    // TODO: make this the default when it has better support
    width: "round(up, 0.11em, 2px)",
    height: "100%",

    "@keyframes loading": {
      "50%": {
        height: "var(--height, 60%)",
        backgroundColor: `var(--customColor, ${theme.colors.text})`,
      },
    },

    ":nth-of-type(2)": { animationDelay: "0.22s" },
    ":nth-of-type(3)": { animationDelay: "0.44s" },
  },
  label: {
    ...theme.typography.caption1,
  },
  overlay: {},
  blur: {},
  hidden: { display: "none" },
  small: {
    width: 2,
  },
  regular: {
    width: 4,
  },
  smallColor: {},
  regularColor: {},
});
