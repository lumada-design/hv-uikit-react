import { clsx } from "clsx";
import {
  Level0Good,
  Level3Bad,
  HourGlass,
} from "@hitachivantara/uikit-react-icons";
import {
  HvAvatarSize,
  HvButtonProps,
  HvBaseProps,
} from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";
import { StyledRoot, StyledButton, StyledAvatar } from "./Step.styles";
import stepClasses, { HvStepClasses } from "./stepClasses";
import { getColor, getSemantic } from "../utils";

export interface HvStepProps
  extends Pick<HvButtonProps, "onClick">,
    Omit<HvBaseProps, "onClick"> {
  /** A Jss Object used to override or extend the styles applied to the empty state StepNavigation. */
  classes?: HvStepClasses;
  /** State of the step. Values = {"Pending", "Failed", "Completed", "Current", "Disabled", "Enabled"} */
  state:
    | "Pending"
    | "Failed"
    | "Completed"
    | "Current"
    | "Disabled"
    | "Enabled";
  /** Title of the step. */
  title: string;
  /** Sets one of the standard sizes of the step */
  size?: HvAvatarSize;
  /** Number of the step. */
  number?: number;
  /**
   * Define if a step is disabled/enabled.
   * If this property is not defined and the step is on state "Disabled", the step component will be disabled
   */
  disabled?: boolean;
}

/**
 * Step element of "Default" Step Navigation root component
 */
export const HvStep = ({
  className,
  classes,
  state,
  title,
  onClick,
  disabled,
  size = "md",
  number = 1,
}: HvStepProps) => {
  const iconSize = {
    xs: "XS",
    sm: "XS",
    md: "S",
    ml: "M",
    xl: "M",
  }[size];

  const squareL = {
    Pending: 16,
    Failed: 24,
    Completed: 24,
  }[state];

  const svgSize = {
    xs: squareL - 8,
    sm: squareL,
    md: squareL + 8,
    lg: squareL + 16,
    xl: squareL + 24,
  }[size];

  const backgroundColor = getColor(state, theme);

  const color = state === "Pending" ? "atmo2" : undefined;
  const semantic = state !== "Pending" ? getSemantic(state) : undefined;
  const status = state === "Current" ? "secondary_60" : undefined;

  const IconComponent = {
    Pending: HourGlass,
    Failed: Level3Bad,
    Completed: Level0Good,
  }[state];

  return (
    <StyledRoot
      className={clsx(
        className,
        stepClasses.root,
        classes?.root,
        state !== "Current" && clsx(stepClasses.notCurrent, classes?.notCurrent)
      )}
      $notCurrent={state !== "Current"}
    >
      <StyledButton
        className={clsx(
          stepClasses.ghost,
          classes?.ghost,
          state === "Current" &&
            clsx(stepClasses.ghostDisabled, classes?.ghostDisabled)
        )}
        aria-label={`step-${title}`}
        icon
        variant="secondaryGhost"
        overrideIconColors={false}
        disabled={disabled ?? ["Current", "Disabled"].includes(state)}
        onClick={onClick}
      >
        <StyledAvatar
          className={clsx(
            stepClasses.avatar,
            classes?.avatar,
            stepClasses[size],
            classes?.[size]
          )}
          backgroundColor={backgroundColor}
          status={status}
          size={size}
          $size={size}
        >
          {IconComponent ? (
            <IconComponent
              color={color}
              semantic={semantic}
              width={svgSize}
              height={svgSize}
              iconSize={iconSize}
            />
          ) : (
            number
          )}
        </StyledAvatar>
      </StyledButton>
    </StyledRoot>
  );
};
