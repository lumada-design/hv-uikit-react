import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvCard", {
  root: {
    position: "relative",
    display: "block",
    padding: theme.space.sm,
    backgroundColor: theme.colors.atmo1,
    borderRadius: 16,
    border: `1px solid ${theme.colors.atmo3}`,
    boxShadow: "0 4px 6px 0 rgba(65,65,65,0.06)",
  },
});
