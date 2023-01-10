import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import clsx from "clsx";
import { outlineStyles } from "utils/focusUtils";

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

export const StyledComp = (Element) =>
  styled(({ className }) => (
    <Element.type
      {...Element.props}
      className={clsx(
        className,
        Element.props.selected && "selected",
        Element.props.disabledClass && "disabled",
        Element.props.focusDisabled && "focusDisabled"
      )}
    />
  ))({
    "&.focusDisabled": {
      outline: "none",
      "& *:focus": {
        outline: "none",
      },
      "& *": {
        outline: "none !important",
      },
    },
    "&.focused": {
      ...outlineStyles,
      "@media (-webkit-min-device-pixel-ratio:0)": {
        ...outlineStyles,
      },
    },
  });
