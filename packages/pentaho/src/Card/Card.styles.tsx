import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCard", {
  root: {
    "--card-padding": theme.space.sm,
    "--card-radius": "16px",

    position: "relative",
    display: "block",
    padding: "var(--card-padding)",
    backgroundColor: theme.colors.atmo1,
    borderRadius: "var(--card-radius)",
    border: `1px solid ${theme.colors.atmo3}`,
    boxShadow: "0 4px 6px 0 rgba(65,65,65,0.06)",
  },
});
