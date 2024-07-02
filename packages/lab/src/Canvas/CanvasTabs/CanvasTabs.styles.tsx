import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCanvasTabs", {
  root: {
    height: 48,
    display: "flex",
  },
  tab: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: `16px 16px 0 0 `,
    backgroundColor: "#F1F5F9",
    color: "#94A3B8",
    "& svg .color0": {
      fill: "currentcolor",
    },
    "&:hover": {
      cursor: "pointer",
    },
    "&.selected": {
      backgroundColor: theme.colors.atmo1,
      ...theme.typography.label,
    },
  },
});
