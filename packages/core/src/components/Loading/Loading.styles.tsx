import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { transientOptions } from "utils/transientOptions";

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
    background-color: ${theme.colors.secondary};
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

export const StyledRoot = styled("div")(({ hidden }: { hidden: boolean }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  ...(hidden && {
    display: "none",
  }),
}));

export const StyledBarContainer = styled("div")({
  display: "flex",
});

export const StyledLabel = styled(HvTypography)({
  marginTop: "15px",
});

export const StyledBar = styled(
  "div",
  transientOptions
)(({ $variant }: { $variant: string }) => ({
  display: "inline-block",

  ...($variant === "regular" && {
    animation: `${regularAnimation} 1s ease-in-out infinite`,
    ...regular,
  }),
  ...($variant === "regularColor" && {
    animation: `${regularColorAnimation} 1s ease-in-out infinite`,
    ...regular,
  }),
  ...($variant === "small" && {
    animation: `${smallAnimation} 1s ease-in-out infinite`,
    ...small,
  }),
  ...($variant === "smallColor" && {
    animation: `${smallColorAnimation} 1s ease-in-out infinite`,
    ...small,
  }),

  "@keyframes loading-small": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1,0.223)",
    },
    "100%": {},
  },
}));
