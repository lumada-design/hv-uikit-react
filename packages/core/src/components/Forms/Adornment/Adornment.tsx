import { useContext, forwardRef, MouseEventHandler, ForwardedRef } from "react";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Adornment.styles";
import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  HvFormStatus,
} from "../FormElement";

const noop = () => {};

export { staticClasses as adornmentClasses };

export type HvAdornmentClasses = ExtractNames<typeof useClasses>;

export interface HvAdornmentProps
  extends HvBaseProps<
    HTMLDivElement | HTMLButtonElement,
    "onMouseDown" | "onKeyDown"
  > {
  /** The icon to be added into the input. */
  icon: React.ReactNode;
  /** When the adornment should be displayed. */
  showWhen?: HvFormStatus;
  /** Function to be executed when this element is clicked. */
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  /** If this property is defined the adornment visibility will be exclusively controlled by this value. */
  isVisible?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvAdornmentClasses;
}

/**
 * Allows to add a decorative icon or an action to a form element, usually on the right side of an input.
 * E.g., the reveal password button.
 *
 * In addition to the showWhen feature, which uses the form element's context validation state to determine
 * its visibility, this component also ensures that it does not steal focus from the input and that it is
 * not accessible using the keyboard.
 *
 * As such, its functionality, if any, for accessibility purposes must be provided through an alternative mean,
 * or by using a regular icon button or toggle button instead.
 */
export const HvAdornment = forwardRef<
  HTMLDivElement | HTMLButtonElement,
  HvAdornmentProps
>(
  (
    {
      id,
      classes: classesProp,
      className,
      icon,
      showWhen = undefined,
      onClick,
      isVisible = undefined,
      ...others
    },
    ref
  ) => {
    const { classes, cx } = useClasses(classesProp);

    const { elementStatus = "" } = useContext(HvFormElementContext);

    const { input } = useContext(HvFormElementDescriptorsContext);

    const displayIcon =
      isVisible ?? (showWhen === undefined || elementStatus === showWhen);

    const isClickable = !!onClick;

    return isClickable ? (
      <button
        id={id}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        type="button"
        tabIndex={-1}
        aria-controls={input?.[0]?.id}
        className={cx(
          classes.root,
          classes.adornment,
          classes.adornmentButton,
          { [classes.hideIcon]: !displayIcon },
          className
        )}
        onClick={onClick}
        onMouseDown={(event) => event.preventDefault()}
        onKeyDown={noop}
        {...others}
      >
        <div className={classes.icon}>{icon}</div>
      </button>
    ) : (
      <div
        id={id}
        ref={ref as ForwardedRef<HTMLDivElement>}
        className={cx(
          classes.root,
          classes.adornment,
          classes.adornmentIcon,
          { [classes.hideIcon]: !displayIcon },
          className
        )}
        role="presentation"
        {...others}
      >
        <div className={classes.icon}>{icon}</div>
      </div>
    );
  }
);
