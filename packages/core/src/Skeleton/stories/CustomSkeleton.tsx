import { css } from "@emotion/css";
import { HvSkeleton } from "@hitachivantara/uikit-react-core";

export const CustomSkeleton = () => {
  const classes = {
    root: css({
      animation: "myAnimation 1s infinite",

      "@keyframes myAnimation": {
        "50%": {
          boxShadow: "inset 0px 0px 60px 0px rgba(0,0,0,0.25)",
        },
      },
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
