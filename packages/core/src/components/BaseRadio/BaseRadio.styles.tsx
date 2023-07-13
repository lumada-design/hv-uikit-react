import {
  Radio as MuiRadio,
  radioClasses as MuiRadioClasses,
} from "@mui/material";

import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRadio = styled(
  MuiRadio,
  transientOptions
)(({ $focusVisible }: { $focusVisible: boolean }) => ({
  padding: 0,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.baseRadio.hoverColor,
    borderRadius: theme.baseRadio.hoverBorderRadius,
  },
  borderRadius: 0,

  [`&.${MuiRadioClasses.disabled}`]: {
    cursor: "not-allowed",
    pointerEvents: "initial",
    "& svg": {
      "& path:nth-of-type(2)": {
        fill: theme.colors.secondary_60,
      },
    },
  },
  ...($focusVisible && {
    "& svg": {
      borderRadius: "8px",
      ...outlineStyles,
    },
  }),
}));
