import { createClasses, theme } from "@hitachivantara/uikit-react-core";

import { staticClasses as nodeClasses } from "../Node/Node.styles";

const baseClasses = Object.fromEntries(
  Object.keys(nodeClasses).map((key) => [key, {}])
) as Record<keyof typeof nodeClasses, {}>;

export const { staticClasses, useClasses } = createClasses("HvDashboardNode", {
  content: {
    display: "flex",
    justifyContent: "space-around",
    padding: theme.space.xs,
  },
  empty: {
    padding: theme.spacing("sm", 0, 0, 0),
  },
  // Spread here to know if we are overriding classes from parents
  ...baseClasses,
});
