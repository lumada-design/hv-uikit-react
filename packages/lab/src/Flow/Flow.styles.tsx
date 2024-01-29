import { createClasses, theme } from "@hitachivantara/uikit-react-core";

import { flowBaseNodeClasses } from "./Node";

export const { staticClasses, useClasses } = createClasses("HvFlow", {
  root: {
    height: "100%",
    [`& .selected > .${flowBaseNodeClasses.root}`]: {
      border: `1px solid ${theme.colors.secondary_60}`,
      borderRadius: theme.radii.round,
      boxSizing: "border-box",
    },
  },
});
