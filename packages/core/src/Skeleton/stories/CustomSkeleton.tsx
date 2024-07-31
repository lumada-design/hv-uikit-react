import { css } from "@emotion/css";
import { keyframes } from "@emotion/react";
import { HvSkeleton } from "@hitachivantara/uikit-react-core";

export const CustomSkeleton = () => {
  const myAnimation = keyframes`
      0%, 100% {
        box-shadow: inset 0px 0px 60px 0px rgba(0,0,0,0.50);
      }
      50% {
        box-shadow: inset 0px 0px 60px 0px rgba(0,0,0,0.25);
      }
    `;

  const classes = {
    root: css({
      animation: `${myAnimation} 1s infinite`,
    }),
  };

  return (
    <HvSkeleton
      width={300}
      height={100}
      animation={undefined}
      variant="square"
      classes={{ root: classes.root }}
    />
  );
};
