import clsx from "clsx";
import clamp from "lodash/clamp";

import { HvBaseProps } from "types";
import {
  StyledProgressBar,
  StyledProgressBarContainer,
  StyledProgressContainer,
  StyledRoot,
  StyledValue,
} from "./ProgressBar.styles";

export type ProgressBarStatus = "inProgress" | "completed" | "error";

/**
 * ProgressBar provides feedback about a process that is taking place in the application.
 */
export type ProgressBarProps = HvBaseProps & {
  /** The value of the progress bar. */
  value: number;
  /**
   * The status of the progress bar.
   *
   * inProgress is black, error is red and completed is green.
   *
   * When uncontrolled and unspecified it will default to "inProgress".
   */
  status?: ProgressBarStatus;
  /** Aria Properties passed on to the progress bar. */
  labelProps?: object;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    progress?: string;
    progressBar?: string;
    progressBarLabel?: string;
  };
};

export const ProgressBar = (props: ProgressBarProps) => {
  const {
    className,
    classes,
    value = 0,
    status = "inProgress",
    labelProps,
    ...others
  } = props;

  const clampedValue = clamp(value, 0, 100);

  // className={clsx(className, classes.root, classes.progress)}

  return (
    <StyledRoot
      className={clsx(className, classes?.root, classes?.progress)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
      {...others}
    >
      <StyledProgressContainer>
        <StyledValue
          className={clsx(classes?.progressBarLabel)}
          variant="caption2"
          style={{ width: `${clampedValue}%` }}
          {...labelProps}
        >
          {`${clampedValue}%`}
        </StyledValue>
        <StyledProgressBarContainer>
          <StyledProgressBar
            style={{ width: `${clampedValue}%` }}
            className={classes?.progressBar}
            status={status}
          />
        </StyledProgressBarContainer>
      </StyledProgressContainer>
    </StyledRoot>
  );
};
