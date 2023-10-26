import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvFlowDaNode", {
  subtitleContainer: {
    minHeight: 48,
    padding: theme.spacing(
      theme.space.xs,
      theme.space.xs,
      theme.space.xs,
      theme.space.sm
    ),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
});
