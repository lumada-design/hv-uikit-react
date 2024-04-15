import { keyframes } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Animation taken from Material UI:
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Skeleton/Skeleton.js
const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

export const { staticClasses, useClasses } = createClasses("HvSkeleton", {
  root: {
    backgroundColor: theme.colors.atmo3,
    width: "fit-content",
    "& > *": {
      visibility: "hidden",
    },
  },
  content: {
    opacity: 0,
    animation: `${fadeIn} 0.5s ease forwards`,
  },
  circle: {
    borderRadius: theme.radii.circle,
  },
  square: {
    borderRadius: theme.radii.base,
  },
  text: {
    borderRadius: theme.radii.full,
    width: "100%",
    height: "1.5em",
  },
  pulse: {
    animation: `${pulse} 2s infinite`,
  },
  wave: {
    overflow: "hidden",
    position: "relative",
    "&::after": {
      animation: `${wave} 2s linear 0.5s infinite`,
      background: `linear-gradient(
            90deg,
            transparent,
            ${theme.colors.atmo4},
            transparent
          )`,
      content: "''",
      position: "absolute",
      transform: "translateX(-100%)",
      inset: 0,
    },
  },
});
