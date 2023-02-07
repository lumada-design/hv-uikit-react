import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";
import { HvBaseCheckBox, HvLabel, HvFormElement } from "components";
import checkBoxClasses from "./checkBoxClasses";

export const StyledFormElement = styled(
  HvFormElement,
  transientOptions
)(({ $focusVisible }: { $focusVisible: boolean }) => ({
  display: "inline-block",

  ...($focusVisible && {
    ...outlineStyles,

    "& div": {
      backgroundColor: theme.colors.atmo3,
    },

    [`& .${checkBoxClasses.checkbox} div > svg`]: {
      outline: "none",
      boxShadow: "none",
    },
  }),
}));

export const StyledLabelContainer = styled(
  "div",
  transientOptions
)(({ $disabled, $invalid }: { $disabled: boolean; $invalid: boolean }) => ({
  cursor: "pointer",
  display: "flex",
  height: "32px",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

  "&:hover": {
    backgroundColor: theme.checkbox.hoverColor,
    borderRadius: theme.checkbox.borderRadius,

    ...($invalid && {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px",
    }),
  },

  ...($disabled && {
    cursor: "not-allowed",
  }),

  ...($invalid && {
    borderBottom: `1px solid ${theme.colors.sema4}`,
  }),
}));

export const StyledLabel = styled(
  HvLabel,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  verticalAlign: "middle",
  paddingRight: theme.spacing(1.25),
  whiteSpace: "nowrap",
  ...theme.typography.body,
  cursor: "pointer",
  height: "32px",
  lineHeight: "32px",
  width: "100%",

  ...($disabled && {
    color: theme.colors.atmo5,
    cursor: "not-allowed",
  }),
}));

export const StyledBaseCheckBox = styled(
  HvBaseCheckBox,
  transientOptions
)(({ $invalid }: { $invalid: boolean }) => ({
  height: "32px",

  ...($invalid && {
    borderBottom: `1px solid ${theme.colors.sema4}`,
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  }),
}));
