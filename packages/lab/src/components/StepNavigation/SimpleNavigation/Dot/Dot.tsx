import { HvBaseProps } from "@hitachivantara/uikit-react-core";
import { ClassNames } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import { HvStepProps } from "components/StepNavigation/DefaultNavigation";
import { StyledButton } from "./Dot.styles";
import dotClasses, { HvDotClasses } from "./dotClasses";
import { getColor, dotSizes } from "../utils";

export interface HvDotProps
  extends Pick<
      HvStepProps,
      "size" | "title" | "state" | "onClick" | "disabled"
    >,
    Omit<HvBaseProps, "title" | "onClick"> {
  /** A Jss Object used to override or extend the styles applied to the empty state StepNavigation. */
  classes?: HvDotClasses;
}

export const HvDot = ({
  classes,
  className,
  state,
  title,
  size = "sm",
  onClick,
  disabled,
}: HvDotProps) => {
  const dotSize = dotSizes[size] * (state === "Current" ? 1.5 : 1);

  return (
    <ClassNames>
      {({ css, cx }) => (
        <StyledButton
          className={cx(
            dotClasses.root,
            state === "Current" && dotClasses.active,
            (disabled ?? ["Current", "Disabled"].includes(state)) &&
              dotClasses.ghostDisabled,
            css({
              backgroundColor: getColor(state, theme),
              width: dotSize,
              height: dotSize,
              "&:hover": {
                backgroundColor: getColor(state, theme),
              },
            }),
            className,
            classes?.root,
            state === "Current" && classes?.active,
            (disabled ?? ["Current", "Disabled"].includes(state)) &&
              classes?.ghostDisabled
          )}
          aria-label={`step-${title}`}
          icon
          overrideIconColors={false}
          disabled={disabled ?? ["Current", "Disabled"].includes(state)}
          onClick={onClick}
        >
          {[]}
        </StyledButton>
      )}
    </ClassNames>
  );
};
