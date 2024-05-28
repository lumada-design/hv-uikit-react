import { keyframes } from "@emotion/react";
import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const interval = 0.11;

const bars = {
  "&:nth-of-type(1)": {
    animationDelay: "0",
  },
  "&:nth-of-type(2)": {
    animationDelay: `${interval * 2}s`,
  },
  "&:nth-of-type(3)": {
    animationDelay: `${interval * 4}s`,
  },
};

const small = {
  width: "2px",
  height: "18px",
  margin: "0px 2px",
  ...bars,
};

const regular = {
  width: "4px",
  height: "30px",
  margin: "0 3px",
  ...bars,
};

const regularAnimation = keyframes`
  0% { 
    transform: scale(1);
    background-color: ${theme.colors.brand};
  }
  50% { 
    transform: scale(1, 0.6); 
    background-color: ${theme.colors.text};
  }
`;

const regularColorAnimation = keyframes`
  0% { 
    transform: scale(1);
  }
  50% { 
    transform: scale(1, 0.6); 
  }
`;

const smallAnimation = keyframes`
  0% { 
    transform: scale(1);
  }
  50% { 
    transform: scale(1, 0.223); 
  }
  100%: {},
`;

const smallColorAnimation = keyframes`
  0% { 
    transform: scale(1);
  }
  50% { 
    transform: scale(1, 0.223); 
  }
`;

export const { staticClasses, useClasses } = createClasses("HvLoading", {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  barContainer: { display: "flex" },
  loadingBar: {
    display: "inline-block",

    "@keyframes loading-small": {
      "0%": {
        transform: "scale(1)",
      },
      "50%": {
        transform: "scale(1,0.223)",
      },
      "100%": {},
    },
  },
  label: { marginTop: "15px" },
  overlay: {},
  blur: {},
  hidden: { display: "none" },
  small: { animation: `${smallAnimation} 1s ease-in-out infinite`, ...small },
  regular: {
    animation: `${regularAnimation} 1s ease-in-out infinite`,
    ...regular,
  },
  smallColor: {
    animation: `${smallColorAnimation} 1s ease-in-out infinite`,
    ...small,
  },
  regularColor: {
    animation: `${regularColorAnimation} 1s ease-in-out infinite`,
    ...regular,
  },
});
