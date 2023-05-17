import styled from "@emotion/styled";
import {
  HvBaseDropdown,
  HvBaseDropdownProps,
  HvButton,
  HvButtonProps,
  HvPanel,
  HvPanelProps,
} from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import { Ref, forwardRef } from "react";

export const StyledBaseDropDown = styled((props: HvBaseDropdownProps) => (
  <HvBaseDropdown {...props} />
))({
  width: 32,
});

export const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: Ref<HTMLButtonElement>) => {
    return <HvButton {...props} ref={ref} />;
  }),
  transientOptions
)(({ $open }: { $open: boolean }) => ({
  position: "relative",
  boxSizing: "content-box",
  padding: 0,

  borderRadius: theme.dropDownMenu.borderRadius,
  border: theme.dropDownMenu.borderClosed,

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
  }),
}));

export const StyledPanel = styled((props: HvPanelProps) => (
  <HvPanel {...props} />
))({
  border: theme.dropDownMenu.borderOpened,
  borderRadius: theme.dropDownMenu.borderRadius,
});
