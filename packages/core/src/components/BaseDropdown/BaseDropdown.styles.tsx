import { CSSProperties } from "@emotion/serialize";
import styled from "@emotion/styled";
import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

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
    border: `1px solid ${theme.baseDropdown.borderColor}`,
    borderRadius: "2px",
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
      borderRadius: "0px 0px 2px 2px",
    }),

    ...($openedDown && {
      borderRadius: "2px 2px 0px 0px",
    }),
  })
);

export const StyledSelection = styled("div")({
  display: "flex",
  alignItems: "center",
  height: theme.spacing(3.75),
  padding: `0px ${theme.spacing(3.75)} 0px ${theme.spacing(1.25)}`,
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
    color: theme.colors.atmo5,
  }),
}));

const iconsStyles: CSSProperties = {
  position: "absolute",
  pointerEvents: "none",
  top: -1,
  right: -1,
};

export const StyledDropUpXS = styled(DropUpXS)({
  ...iconsStyles,
});

export const StyledDropDownXS = styled(
  DropDownXS,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  ...iconsStyles,

  ...($disabled && {
    "& svg": {
      "& path": {
        fill: theme.colors.atmo5,
      },
    },
  }),
}));

export const StyledContainer = styled("div")({
  zIndex: theme.zIndices.tooltip,
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

export const StyledPanel = styled("div")({
  position: "relative",
  boxShadow: theme.baseDropdown.shadow,
});
