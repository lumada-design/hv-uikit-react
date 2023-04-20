import styled from "@emotion/styled";
import { Close } from "@hitachivantara/uikit-react-icons";
import { forwardRef, Ref } from "react";
import { HvButton, HvButtonProps } from "@core/components";
import { outlineStyles } from "@core/utils";
import fade from "@core/utils/hexToRgbA";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledActionContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "space-between",
});

export const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: Ref<HTMLButtonElement>) => {
    return <HvButton {...props} ref={ref} />;
  }),
  transientOptions
)(({ $baseColor }: { $baseColor: string }) => ({
  alignSelf: "flex-end",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: fade($baseColor, 0.3),
  },
  "&:focus": {
    ...outlineStyles,
  },
}));

export const StyledClose = styled(Close)({
  width: "32px",
  height: "32px",
});

export const StyledActionsInnerContainer = styled("div")({
  flexDirection: "row",
  marginTop: "8px", // avoid overlap with close button outline focus ring
});
