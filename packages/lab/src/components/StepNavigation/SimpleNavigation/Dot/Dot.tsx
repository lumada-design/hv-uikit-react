import {
  ExtractNames,
  HvBaseProps,
  HvButton,
} from "@hitachivantara/uikit-react-core";

import { theme } from "@hitachivantara/uikit-styles";

import { HvStepProps } from "../../DefaultNavigation";
import { getColor, dotSizes } from "../utils";
import { staticClasses, useClasses } from "./Dot.styles";

export { staticClasses as dotClasses };

export type HvDotClasses = ExtractNames<typeof useClasses>;

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
  classes: classesProp,
  className,
  state,
  title,
  size = "sm",
  onClick,
  disabled,
}: HvDotProps) => {
  const { classes, cx, css } = useClasses(classesProp);

  const dotSize = dotSizes[size] * (state === "Current" ? 1.5 : 1);

  return (
    <HvButton
      className={cx(
        css({
          backgroundColor: getColor(state, theme),
          width: dotSize,
          height: dotSize,
          "&:hover": {
            backgroundColor: getColor(state, theme),
          },
        }),
        classes.root,
        {
          [classes.active]: state === "Current",
          [classes.ghostDisabled]:
            disabled ?? ["Current", "Disabled"].includes(state),
        },
        className
      )}
      aria-label={`step-${title}`}
      icon
      overrideIconColors={false}
      disabled={disabled ?? ["Current", "Disabled"].includes(state)}
      onClick={onClick}
    >
      {[]}
    </HvButton>
  );
};
