import clsx from "clsx";
import clamp from "lodash/clamp";
import { HvBaseProps } from "../../types";
import {
  StyledProgressBar,
  StyledProgressBarContainer,
  StyledProgressContainer,
  StyledRoot,
  StyledValue,
} from "./ProgressBar.styles";
import progressBarClasses, { HvProgressBarClasses } from "./progressBarClasses";

export type HvProgressBarStatus = "inProgress" | "completed" | "error";

/**
 * ProgressBar provides feedback about a process that is taking place in the application.
 */
export type HvProgressBarProps = HvBaseProps & {
  /** The value of the progress bar. */
  value: number;
  /**
   * The status of the progress bar.
   *
   * inProgress is black, error is red and completed is green.
   *
   * When uncontrolled and unspecified it will default to "inProgress".
   */
  status?: HvProgressBarStatus;
  /** Aria Properties passed on to the progress bar. */
  labelProps?: object;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvProgressBarClasses;
};

export const HvProgressBar = (props: HvProgressBarProps) => {
  const {
    className,
    classes,
    value = 0,
    status = "inProgress",
    labelProps,
    ...others
  } = props;

  const clampedValue = clamp(value, 0, 100);

  return (
    <StyledRoot
      className={clsx(
        className,
        progressBarClasses.root,
        classes?.root,
        progressBarClasses.progress,
        classes?.progress
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
      {...others}
    >
      <StyledProgressContainer>
        <StyledValue
          className={clsx(
            progressBarClasses.progressBarLabel,
            classes?.progressBarLabel
          )}
          variant="caption2"
          style={{ width: `${clampedValue}%` }}
          {...labelProps}
        >
          {`${clampedValue}%`}
        </StyledValue>
        <StyledProgressBarContainer>
          <StyledProgressBar
            style={{ width: `${clampedValue}%` }}
            className={clsx(
              progressBarClasses.progressBar,
              classes?.progressBar
            )}
            $status={status}
          />
        </StyledProgressBarContainer>
      </StyledProgressContainer>
    </StyledRoot>
  );
};
