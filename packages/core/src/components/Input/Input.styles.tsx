import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Success } from "@hitachivantara/uikit-icons";
import {
  HvAdornment,
  HvBaseInput,
  HvFormElement,
  HvLabel,
  HvSuggestions,
} from "components";

export const StyledFormElement = styled(HvFormElement)({
  display: "block",
});

export const StyledLabelContainer = styled("div")({
  display: "flex",
  alignItems: "flex-start",
});

export const StyledLabel = styled(HvLabel)({
  paddingBottom: "6px",
  display: "block",
});

export const StyledSuccess = styled(Success)({
  width: "30px",
  height: "30px",
});

export const StyledSuggestions = styled(HvSuggestions)({
  width: "100%",
  position: "relative",
  "& .root .list &": {
    width: "100%",
  },
});

export const StyledAdornmentsBox = styled("div")({
  display: "flex",
  flexDirection: "row",
  height: "30px",
  justifyContent: "center",
  marginRight: 1,
});

export const StyledAdornmentButton = styled(HvAdornment)(
  ({ $iconClear }: { $iconClear?: boolean }) => ({
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer",
    ...($iconClear && {
      display: "none",
    }),
  })
);

export const StyledInputExtension = styled("div")({
  height: theme.spacing(1),
  backgroundColor: theme.colors.atmo1,
  boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
});

export const StyledBaseInput = styled(HvBaseInput)({
  "& .input": {
    "&::-ms-clear": {
      display: "none",
    },
  },
  ":hover": {
    "& .iconClear": {
      display: "block",
    },
  },
  "&.inputRoot": {
    "&:focus-within .iconClear": {
      display: "block",
    },
  },
  "& .inputRootFocused": {
    "& .iconClear": {
      display: "block",
    },
  },
  "& .inputRootMultiline": {
    padding: 0,
  },
  "& .inputBorderContainer": {
    ".hasSuggestions &": {
      display: "none",
    },
  },
  "& .inputRootDisabled": {
    cursor: "not-allowed",
  },
});
