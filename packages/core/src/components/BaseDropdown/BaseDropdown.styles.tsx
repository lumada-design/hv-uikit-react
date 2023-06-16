import { CSSProperties } from "@emotion/serialize";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "@core/components";
import { outlineStyles } from "@core/utils";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRoot = styled("div")({
  width: "100%",
  position: "relative",
});

export const StyledAnchor = styled(
  "div",
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  display: "inline-block",
  width: "100%",

  ...($disabled && {
    cursor: "not-allowed",
    "&:focus": {
      outline: "none",
    },
  }),
}));

export const StyledHeaderRoot = styled(
  "div",
  transientOptions
)(
  ({
    $disabled,
    $readOnly,
    $opened,
    $openedUp,
    $openedDown,
  }: {
    $disabled: boolean;
    $readOnly: boolean;
    $opened: boolean;
    $openedUp: boolean;
    $openedDown: boolean;
  }) => ({
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    background: theme.colors.atmo1,
    boxSizing: "border-box",
    border: `1px solid ${theme.baseDropdown.borderColor}`,
    borderRadius: theme.radii.base,
    "&:hover": {
      border: `1px solid ${theme.baseDropdown.hoverBorderColor}`,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
      border: `1px solid ${theme.baseDropdown.hoverBorderColor}`,
    },

    ...($disabled && {
      cursor: "not-allowed",
      pointerEvents: "none",
      border: `1px solid ${theme.baseDropdown.disabledBorderColor}`,
      background: theme.baseDropdown.disabledBackgroundColor,
      "&:hover": {
        border: `1px solid ${theme.baseDropdown.disabledBorderColor}`,
      },
    }),

    ...($readOnly && {
      cursor: "not-allowed",
      pointerEvents: "none",
      border: theme.baseDropdown.readOnlyBorder,
      background: theme.baseDropdown.readOnlyBackgroundColor,
      userSelect: "text",
      "&:focus-visible": {
        outline: "none",
        border: theme.baseDropdown.readOnlyBorder,
      },
    }),

    ...($opened && {
      border: `1px solid ${theme.baseDropdown.openBorderColor}`,
      boxShadow: theme.baseDropdown.shadow,
      "&:hover": {
        border: `1px solid ${theme.baseDropdown.openBorderColor}`,
        boxShadow: theme.baseDropdown.shadow,
      },
    }),

    ...($openedUp && {
      borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
    }),

    ...($openedDown && {
      borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
    }),
  })
);

export const StyledSelection = styled("div")({
  display: "flex",
  alignItems: "center",
  height: "30px",
  boxSizing: "border-box",
  paddingLeft: theme.space.xs,
});

export const StyledPlaceholder = styled(
  HvTypography,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ...(theme.typography.body as CSSProperties),
  color: theme.baseDropdown.placeholderColor,

  ...($disabled && {
    color: theme.colors.secondary_60,
  }),
}));

export const StyledAdornment = styled("div")({
  position: "absolute",
  pointerEvents: "none",
  top: -1,
  right: -1,
});

export const StyledContainer = styled("div")({
  zIndex: theme.zIndices.popover,
  width: "auto",
});

export const StyledExtension = styled(
  "div",
  transientOptions
)(
  ({
    $leftPosition,
    $openShadow,
    $floatLeft,
    $floatRight,
  }: {
    $leftPosition: boolean;
    $openShadow: boolean;
    $floatLeft: boolean;
    $floatRight: boolean;
  }) => ({
    height: theme.dropDownMenu.extensionHeight,
    backgroundColor: theme.colors.atmo1,
    borderTop: "none",
    borderBottom: "none",
    borderRight: `1px solid ${theme.dropDownMenu.extensionBorderColor}`,
    borderLeft: `1px solid ${theme.dropDownMenu.extensionBorderColor}`,

    ...($leftPosition && {
      marginLeft: "auto",
    }),

    ...($openShadow && {
      boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
    }),

    ...($floatLeft && {
      float: "left",
    }),

    ...($floatRight && {
      float: "right",
    }),
  })
);

export const StyledPanel = styled(
  "div",
  transientOptions
)(({ $popperPlacement }: { $popperPlacement: string }) => ({
  position: "relative",
  boxShadow: theme.baseDropdown.shadow,
  backgroundColor: theme.colors.atmo1,
  border: `1px solid ${theme.baseDropdown.openBorderColor}`,
  ...($popperPlacement === "top" && {
    top: 1,
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
  }),
  ...($popperPlacement === "bottom" && {
    top: -1,
    borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
  }),
}));
