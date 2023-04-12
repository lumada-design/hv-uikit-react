import styled from "@emotion/styled";

interface StyledIconsContainerProps {
  hasExpandableItems?: boolean;
}

export const StyledIconsContainer = styled("div")(
  ({ hasExpandableItems }: StyledIconsContainerProps) => ({
    display: "flex",

    [`> div:first-of-type`]: {
      marginLeft: hasExpandableItems ? "auto" : "unset",
    },

    [`> div:nth-of-type(2)`]: {
      width: "14px",
      marginLeft: "auto",
    },
  })
);

export const SpacerDiv = styled("div")({});
