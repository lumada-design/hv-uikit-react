import {
  Radio as MuiRadio,
  radioClasses as MuiRadioClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";

export const StyledRadio = styled(
  MuiRadio,
  transientOptions
)(({ $focusVisible }: { $focusVisible: boolean }) => ({
  padding: theme.baseRadio.padding,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.baseRadio.hoverColor,
    borderRadius: theme.baseRadio.hoverBorderRadius,
  },
  borderRadius: theme.baseRadio.borderRadius,

  [`&.${MuiRadioClasses.disabled}`]: {
    cursor: "not-allowed",
    pointerEvents: "initial",
    "& svg": {
      "& path:nth-child(2)": {
        fill: theme.baseRadio.disabledColor,
      },
    },
  },
  ...($focusVisible && {
    "& svg": {
      borderRadius: theme.baseRadio.focusBorderRadius,
      ...outlineStyles,
    },
  }),
}));
