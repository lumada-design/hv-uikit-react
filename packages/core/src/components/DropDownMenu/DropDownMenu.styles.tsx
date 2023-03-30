import styled from "@emotion/styled";
import { HvBaseDropdown, HvButton, HvPanel } from "components";
import { transientOptions } from "utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";

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
    boxShadow: theme.colors.shadow,

    "&:hover": {
      backgroundColor: theme.colors.atmo1,
    },

    "& svg .color0": {
      fill: theme.colors.secondary,
    },

    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
    border: theme.dropDownMenu.borderOpened,
    borderBottom: "none",
  }),
}));

export const StyledPanel = styled(HvPanel)({
  border: theme.dropDownMenu.borderOpened,
  borderRadius: theme.dropDownMenu.borderRadius,
});
