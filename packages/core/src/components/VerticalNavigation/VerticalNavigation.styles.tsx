import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import verticalNavigationClasses from "./verticalNavigationClasses";

interface StyledRootProps {
  hasAnyChildWithData: boolean;
}

export const StyledRoot = styled("div")(
  ({ hasAnyChildWithData }: StyledRootProps) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: theme.verticalNavigation.justifyContent,

    width: "220px",

    background: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    clipPath: "inset(0px -12px 0px 0px)",

    [`&.${verticalNavigationClasses.collapsed}`]: {
      width: hasAnyChildWithData ? "66px" : "56px",

      "& > :first-of-type:not(:last-child)": {
        padding: theme.spacing(["sm", "xs", "xs", "xs"]),
      },

      "& > :not(nav:first-of-type)": {
        padding: theme.spacing(["xs", "xs", "sm", "xs"]),
      },
    },

    "& > :only-child": {
      padding: theme.space.sm,
    },
    "& > :not(nav:first-of-type)": {
      borderTop: `3px solid ${theme.colors.atmo2}`,
      padding: theme.spacing(["xs", "sm", "sm", "sm"]),
    },

    "& > :first-of-type:not(:last-child)": {
      borderTop: "none",
      padding: theme.spacing(["sm", "sm", "xs", "sm"]),
    },

    [`&.${verticalNavigationClasses.slider}`]: {
      "& > div:first-of-type": {
        borderBottom: `3px solid ${theme.colors.atmo2}`,
      },
    },
  })
);
