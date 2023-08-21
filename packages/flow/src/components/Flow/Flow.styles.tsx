import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvFlow", {
  root: {
    "& .react-flow__handle": {
      backgroundColor: theme.colors.secondary,
      width: 8,
      height: 8,
      zIndex: theme.zIndices.overlay,
    },
    "& .react-flow__handle-connecting": {
      backgroundColor: theme.colors.negative,
      width: 12,
      height: 12,
      "&.react-flow__handle-top": {
        top: -6,
      },
      "&.react-flow__handle-bottom": {
        bottom: -6,
      },
    },
    "& .react-flow__handle-valid": {
      backgroundColor: theme.colors.positive,
      width: 12,
      height: 12,
      "&.react-flow__handle-top": {
        top: -6,
      },
      "&.react-flow__handle-bottom": {
        bottom: -6,
      },
    },
  },
});
