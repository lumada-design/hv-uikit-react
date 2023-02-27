import styled from "@emotion/styled";
import { HvRadio, HvRadioGroup } from "components";
import { theme } from "@hitachivantara/uikit-styles";
import dotPaginationClasses from "./dotPaginationClasses";
import { CurrentStep, OtherStep } from "@hitachivantara/uikit-react-icons";

export const StyledRadioGroup = styled((props) => <HvRadioGroup {...props} />)({
  display: "flex",
  justifyContent: "center",

  [`& .${dotPaginationClasses.horizontal}`]: {
    marginLeft: 0,
    width: "auto",
  },
});

export const StyledRadio = styled((props) => <HvRadio {...props} />)({
  [`&.${dotPaginationClasses.radioRoot}`]: {
    marginLeft: "8px",
  },

  [`& .${dotPaginationClasses.radio}`]: {
    height: "16px",

    "&:hover": {
      backgroundColor: theme.colors.sema7,
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
