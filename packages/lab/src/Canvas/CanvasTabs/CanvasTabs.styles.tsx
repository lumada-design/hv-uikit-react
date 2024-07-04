import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCanvasTabs", {
  root: {
    height: 48,
    display: "flex",
  },
  list: {
    display: "flex",
    width: "100%",
  },
  tab: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: `16px 16px 0 0 `,
    backgroundColor: theme.colors.atmo2,
    color: theme.colors.secondary_60,
    overflow: "hidden",
    width: "100%",
    "& svg .color0": {
      fill: "currentcolor",
    },
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus": {
      backgroundColor: theme.colors.atmo1,
    },
    "&$selected": {
      backgroundColor: theme.colors.atmo1,
      ...theme.typography.label,
    },
  },
  selected: {},
});
