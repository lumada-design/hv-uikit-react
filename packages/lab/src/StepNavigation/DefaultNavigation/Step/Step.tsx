import {
  ExtractNames,
  HvAvatar,
  HvBaseProps,
  HvButtonBase,
  HvButtonBaseProps,
  HvSize,
} from "@hitachivantara/uikit-react-core";
import {
  HourGlass,
  IconSize,
  IconType,
  Level0Good,
  Level3Bad,
} from "@hitachivantara/uikit-react-icons";

import { getColor, getSemantic } from "../utils";
import { useClasses } from "./Step.styles";

type HvStepClasses = ExtractNames<typeof useClasses>;

export interface HvStepProps
  extends Pick<HvButtonBaseProps, "onClick">,
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
  size?: HvSize;
  /** Number of the step. */
  number?: number;
  /**
   * Define if a step is disabled/enabled.
   * If this property is not defined and the step is on state "Disabled", the step component will be disabled
   */
  disabled?: boolean;
}

const iconSizeObject: Record<HvSize, IconSize> = {
  xs: "XS",
  sm: "XS",
  md: "S",
  lg: "M",
  xl: "M",
};

const stateObject: Record<string, number> = {
  Pending: 16,
  Failed: 24,
  Completed: 24,
};

const iconStateObject: Record<string, IconType> = {
  Pending: HourGlass,
  Failed: Level3Bad,
  Completed: Level0Good,
};

/**
 * Step element of "Default" Step Navigation root component
 */
export const HvStep = ({
  className,
  classes: classesProp,
  state,
  title,
  onClick,
  disabled,
  size = "md",
  number = 1,
}: HvStepProps) => {
  const { classes, cx } = useClasses(classesProp);

  const iconSize = iconSizeObject[size];
  const squareL = stateObject[state];
  const svgSize = {
    xs: squareL - 8,
    sm: squareL,
    md: squareL + 8,
    lg: squareL + 16,
    xl: squareL + 24,
  }[size];

  const backgroundColor = getColor(state);

  const color = state === "Pending" ? "atmo2" : getSemantic(state);
  const status = state === "Current" ? "secondary_60" : undefined;
  const IconComponent = iconStateObject[state];

  return (
    <HvButtonBase
      className={cx(classes.root, className, {
        [classes.notCurrent]: state !== "Current",
      })}
      aria-label={title}
      disabled={disabled ?? ["Current", "Disabled"].includes(state)}
      onClick={onClick}
    >
      <HvAvatar
        className={cx(classes.avatar, classes[size])}
        backgroundColor={backgroundColor}
        status={status}
        size={size}
      >
        {IconComponent ? (
          <IconComponent
            color={color}
            style={{ fontSize: svgSize }}
            size={iconSize}
          />
        ) : (
          number
        )}
      </HvAvatar>
    </HvButtonBase>
  );
};
