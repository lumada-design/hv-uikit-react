import styled from "@emotion/styled";
import { Close } from "@hitachivantara/uikit-icons";
import { HvButton } from "components";
import { outlineStyles } from "utils";
import fade from "utils/hexToRgbA";

export const StyledActionContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
});

export const StyledButton = styled((props) => <HvButton {...props} />)(
  ({ $baseColor }: { $baseColor: string }) => ({
    alignSelf: "flex-end",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: fade($baseColor, 0.3),
    },
    "&:focus": {
      ...outlineStyles,
    },
  })
);

export const StyledClose = styled(Close)({
  width: "32px",
  height: "32px",
});

export const StyledActionsInnerContainer = styled("div")({
  flexDirection: "row",
  marginTop: "8px", // avoid overlap with close button outline focus ring
});
