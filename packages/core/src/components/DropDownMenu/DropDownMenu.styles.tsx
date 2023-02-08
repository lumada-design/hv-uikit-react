import styled from "@emotion/styled";
import { HvBaseDropdown, HvButton, HvPanel } from "components";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import baseDropdownClasses from "../BaseDropdown/baseDropdownClasses";

export const StyledRoot = styled("div")({
  [`. ${baseDropdownClasses.root}`]: {
    display: "inline-block",
    width: "auto",
    "&.focus-visible $icon": {
      ...outlineStyles,
    },
  },
});

export const StyledBaseDropDown = styled((props) => (
  <HvBaseDropdown {...props} />
))({
  width: 32,
});

export const StyledButton = styled(
  HvButton,
  transientOptions
)(({ $open }: { $open: boolean }) => ({
  position: "relative",
  boxSizing: "content-box",
  padding: 0,

  borderRadius: theme.dropDownMenu.borderRadius,
  border: theme.dropDownMenu.borderClosed,
  borderBottom: "none",

  ...($open && {
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.shadows[1],

    "&:hover": {
      backgroundColor: theme.colors.atmo1,
    },

    "& svg .color0": {
      fill: theme.colors.acce1,
    },

    borderRadius: "2px 2px 0px 0px",
    border: theme.dropDownMenu.borderOpened,
    borderBottom: "none",
  }),
}));

export const StyledPanel = styled(HvPanel)({
  border: theme.dropDownMenu.borderOpened,
  borderRadius: theme.dropDownMenu.borderRadius,
});
