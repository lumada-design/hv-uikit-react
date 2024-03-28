import { createClasses, theme } from "@hitachivantara/uikit-react-core";

import { staticClasses as baseNodeClasses } from "./BaseNode.styles";

const baseClasses = Object.fromEntries(
  Object.keys(baseNodeClasses).map((key) => [key, {}]),
) as Record<keyof typeof baseNodeClasses, {}>;

export const { staticClasses, useClasses } = createClasses("HvFlowNode", {
  subtitleContainer: {
    minHeight: 48,
    padding: theme.spacing(
      theme.space.xs,
      theme.space.xs,
      theme.space.xs,
      theme.space.sm,
    ),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {},
  actionsButton: {
    gap: 0,
  },
  paramsContainer: {
    borderTop: `1px solid ${theme.colors.atmo4}`,
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    padding: theme.space.sm,
  },
  // Spread here to know if we are overriding classes from parents
  ...baseClasses,
});
