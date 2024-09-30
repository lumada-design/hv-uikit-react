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
    justifyContent: "space-around",

    ":has($regular)": {
      width: 30,
      height: 30,
    },

    ":has($small)": {
      "--scaleY": "0.223",
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

    "@keyframes loading": {
      "50%": {
        transform: "scale(1, var(--scaleY, 0.6))",
        backgroundColor: `var(--customColor, ${theme.colors.secondary})`,
      },
    },

    ":nth-of-type(2)": { animationDelay: "0.22s" },
    ":nth-of-type(3)": { animationDelay: "0.44s" },
  },
  label: {},
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
