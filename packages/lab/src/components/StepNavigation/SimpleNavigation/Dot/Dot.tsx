import { clsx } from "clsx";
import { HvBaseProps } from "@hitachivantara/uikit-react-core";
import { StyledButton } from "./Dot.styles";
import dotClasses, { HvDotClasses } from "./dotClasses";
import { getColor, dotSizes } from "../utils";
import { ClassNames } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import { HvStepProps } from "components/StepNavigation/DefaultNavigation";

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
      {({ css }) => (
        <StyledButton
          className={clsx(
            className,
            classes?.root,
            dotClasses.root,
            css({
              backgroundColor: getColor(state, theme),
              width: dotSize,
              height: dotSize,
              "&:hover": {
                backgroundColor: getColor(state, theme),
              },
            }),
            state === "Current" && clsx(dotClasses.active, classes?.active),
            (disabled ?? ["Current", "Disabled"].includes(state)) &&
              clsx(dotClasses.ghostDisabled, classes?.ghostDisabled)
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
