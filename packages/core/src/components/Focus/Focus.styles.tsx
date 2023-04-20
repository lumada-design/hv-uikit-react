import styled from "@emotion/styled";
import { outlineStyles } from "@core/utils/focusUtils";

export const StyledFocusWrapper = styled("div")({
  position: "relative",
});

export const StyledFalseFocus = styled("div")({
  width: "98%",
  height: "98%",
  position: "absolute",
  zIndex: "1",
  ...outlineStyles,
  "@media (-webkit-min-device-pixel-ratio:0)": {
    ...outlineStyles,
  },
  top: 0,
  left: "0.5%",
  backgroundColor: "transparent",
  pointerEvents: "none",
});
