import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvFlowParamsNode", {
  paramsContainer: {
    borderTop: `1px solid ${theme.colors.atmo4}`,
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    padding: theme.space.sm,
  },
});
