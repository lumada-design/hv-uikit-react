import styled from "@emotion/styled";
import {
  HvRadio,
  HvRadioGroup,
  HvRadioGroupProps,
  HvRadioProps,
} from "@core/components";
import { theme } from "@hitachivantara/uikit-styles";
import dotPaginationClasses from "./dotPaginationClasses";
import { CurrentStep, OtherStep } from "@hitachivantara/uikit-react-icons";

export const StyledRadioGroup = styled((props: HvRadioGroupProps) => (
  <HvRadioGroup {...props} />
))({
  display: "flex",
  justifyContent: "center",

  [`& .${dotPaginationClasses.horizontal}`]: {
    marginLeft: 0,
    width: "auto",
  },
});

export const StyledRadio = styled((props: HvRadioProps) => (
  <HvRadio {...props} />
))({
  [`&.${dotPaginationClasses.radioRoot}`]: {
    marginLeft: "8px",
  },

  [`& .${dotPaginationClasses.radio}`]: {
    height: "16px",

    "&:hover": {
      backgroundColor: theme.colors.neutral_20,
      borderRadius: "100%",
    },
  },
});

export const StyledOtherStep = styled(OtherStep)({
  width: "16px",
  height: "16px",
});

export const StyledCurrentStep = styled(CurrentStep)({
  width: "16px",
  height: "16px",
});
