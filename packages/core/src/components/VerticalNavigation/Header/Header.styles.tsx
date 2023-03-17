import styled from "@emotion/styled";
import verticalNavigationHeaderClasses from "./headerClasses";

export const StyledHeader = styled("div")({
    width: "100%",
    display: "flex",
    marginTop: "12px",
    justifyContent: "space-between",

    [`&.${verticalNavigationHeaderClasses.minimized}`]: {
        justifyContent: "center",
        paddingRight: 0,
      },
})