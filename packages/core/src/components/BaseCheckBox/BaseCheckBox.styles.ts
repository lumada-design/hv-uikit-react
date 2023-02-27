import {
  Checkbox as MuiCheckBox,
  checkboxClasses as MuiCheckBoxClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { outlineStyles } from "utils";

export const StyledCheckedBox = styled(
  MuiCheckBox,
  transientOptions
)(({ $focusVisible }: { $focusVisible: boolean }) => ({
  padding: 0,
  borderRadius: theme.baseCheckBox.borderRadius,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.baseCheckBox.hoverColor,
  },

  ...($focusVisible && {
    "& svg": {
      ...outlineStyles,
    },
  }),

  // Override Mui styling: https://mui.com/material-ui/api/checkbox/#css
  [`&.${MuiCheckBoxClasses.disabled}`]: {
    // Ensure more specificity than .MuiButtonBase-root.Mui-disabled and .MuiIconButton-root.Mui-disabled
    [`&.${MuiCheckBoxClasses.root}`]: {
      cursor: "not-allowed",
      pointerEvents: "initial",
    },

    "& svg": {
      "& path:nth-of-type(2)": {
        fill: theme.colors.atmo5,
      },
    },
  },
}));
