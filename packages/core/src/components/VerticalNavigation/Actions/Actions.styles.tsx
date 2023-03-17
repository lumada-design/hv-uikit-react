import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import actionsClasses  from "./actionsClasses";

export const StyledRoot = styled("div")({
    display: "block",
    background: theme.colors.atmo1,
    marginTop: theme.verticalNavigation.actionsMarginTop,

    "& :not(:last-child)": {
      // theme.verticalNavigation.actionsMarginTop,
      marginBottom: "8px",
    },

    [`&.${actionsClasses.hide}`] : {
      display: "none"
    }
})