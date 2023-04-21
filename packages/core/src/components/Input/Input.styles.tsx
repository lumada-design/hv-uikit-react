import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Success } from "@hitachivantara/uikit-react-icons";
import {
  HvAdornment,
  HvBaseInput,
  HvFormElement,
  HvLabel,
  HvSuggestions,
  HvSuggestionsProps,
  baseInputClasses,
  suggestionsClasses,
  HvBaseInputProps,
  HvFormElementProps,
} from "@core/components";
import inputClasses from "./inputClasses";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledFormElement = styled((props: HvFormElementProps) => (
  <HvFormElement {...props} />
))({
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

export const StyledSuggestions = styled((props: HvSuggestionsProps) => (
  <HvSuggestions {...props} />
))({
  width: "100%",
  position: "relative",
  [`& .${suggestionsClasses.root} .${suggestionsClasses.list} &`]: {
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

export const StyledAdornmentButton = styled(
  HvAdornment,
  transientOptions
)(({ $iconClear }: { $iconClear?: boolean }) => ({
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
  ...($iconClear && {
    display: "none",
  }),
}));

export const StyledInputExtension = styled("div")({
  height: theme.space.xs,
  backgroundColor: theme.colors.atmo1,
  boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
});

export const StyledBaseInput = styled((props: HvBaseInputProps) => (
  <HvBaseInput {...props} />
))(() => ({
  [`& .${baseInputClasses.input}`]: {
    "&::-ms-clear": {
      display: "none",
    },
  },
  ":hover": {
    [`& .${inputClasses.iconClear}`]: {
      display: "block",
    },
  },
  [`&.${baseInputClasses.inputRoot}`]: {
    [`&:focus-within .${inputClasses.iconClear}`]: {
      display: "block",
    },
  },
  [`& .${baseInputClasses.inputRootFocused}`]: {
    [`& .${inputClasses.iconClear}`]: {
      display: "block",
    },
  },
  [`& .${baseInputClasses.inputRootMultiline}`]: {
    padding: 0,
  },
  [`& .${baseInputClasses.inputBorderContainer}`]: {
    [`.${inputClasses.hasSuggestions} &`]: {
      display: "none",
    },
  },
  [`& .${baseInputClasses.inputRootDisabled}`]: {
    cursor: "not-allowed",
  },
}));
