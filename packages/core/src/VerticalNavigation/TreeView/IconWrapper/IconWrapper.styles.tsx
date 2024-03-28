import styled from "@emotion/styled";

interface StyledIconsContainerProps {
  hasAnyChildWithData?: boolean;
}

export const StyledIconsContainer = styled("div")(
  ({ hasAnyChildWithData }: StyledIconsContainerProps) => ({
    display: "flex",

    [`> div:first-of-type`]: {
      marginLeft: hasAnyChildWithData ? "auto" : "unset",
    },

    [`> div:nth-of-type(2)`]: {
      width: "14px",
      marginLeft: "auto",
    },
  }),
);

export const SpacerDiv = styled("div")({});
