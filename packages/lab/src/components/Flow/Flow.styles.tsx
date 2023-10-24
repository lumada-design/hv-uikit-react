import { createClasses, theme } from "@hitachivantara/uikit-react-core";

import { flowNodeClasses } from "./Node";

export const { staticClasses, useClasses } = createClasses("HvFlow", {
  root: {
    height: "100%",
    "& .react-flow__handle": {
      backgroundColor: theme.colors.secondary_60,
      width: 8,
      height: 8,
      zIndex: theme.zIndices.overlay,
    },
    "& .react-flow__handle-connecting": {
      backgroundColor: theme.colors.negative_20,
      width: 12,
      height: 12,
      "&.react-flow__handle-left": {
        translate: "0 4px",
      },
    },
    "& .react-flow__handle-valid": {
      backgroundColor: theme.colors.positive_20,
      width: 12,
      height: 12,
      "&.react-flow__handle-left": {
        translate: "0 4px",
      },
    },
    [`& .selected > .${flowNodeClasses.root}`]: {
      border: `1px solid ${theme.colors.secondary_60}`,
      borderRadius: theme.radii.round,
      boxSizing: "border-box",
    },
  },
});
