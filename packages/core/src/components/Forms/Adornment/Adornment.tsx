import { useContext, forwardRef, MouseEventHandler, ForwardedRef } from "react";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledRoot, StyledIcon, StyledButton } from "./Adornment.styles";
import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  HvFormStatus,
} from "../FormElement";
import adornmentClasses, { HvAdornmentClasses } from "./adornmentClasses";

const preventDefault = (event) => event.preventDefault();
const noop = () => {};

export type HvAdornmentProps = HvBaseProps<
  HTMLDivElement | HTMLButtonElement,
  { onMouseDown; onKeyDown }
> & {
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
};

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
      classes,
      className,
      icon,
      showWhen = undefined,
      onClick,
      isVisible = undefined,
      ...others
    },
    ref
  ) => {
    const { elementStatus = "" } = useContext(HvFormElementContext);

    const { input } = useContext(HvFormElementDescriptorsContext);

    const displayIcon =
      isVisible ?? (showWhen === undefined || elementStatus === showWhen);

    const isClickable = !!onClick;

    return isClickable ? (
      <StyledButton
        id={id}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        type="button"
        tabIndex={-1}
        aria-controls={input?.[0]?.id}
        className={clsx(
          className,
          adornmentClasses.root,
          classes?.root,
          adornmentClasses.adornment,
          classes?.adornment,
          adornmentClasses.adornmentButton,
          classes?.adornmentButton,
          !displayIcon && clsx(adornmentClasses.hideIcon, classes?.hideIcon)
        )}
        onClick={onClick}
        onMouseDown={preventDefault}
        onKeyDown={noop}
        $hideIcon={!displayIcon}
        {...others}
      >
        <StyledIcon className={clsx(adornmentClasses.icon, classes?.icon)}>
          {icon}
        </StyledIcon>
      </StyledButton>
    ) : (
      <StyledRoot
        id={id}
        ref={ref as ForwardedRef<HTMLDivElement>}
        className={clsx(
          className,
          adornmentClasses.root,
          classes?.root,
          adornmentClasses.adornment,
          classes?.adornment,
          adornmentClasses.adornmentIcon,
          classes?.adornmentIcon,
          !displayIcon && clsx(adornmentClasses.hideIcon, classes?.hideIcon)
        )}
        $hideIcon={!displayIcon}
        role="presentation"
        {...others}
      >
        <StyledIcon className={clsx(adornmentClasses.icon, classes?.icon)}>
          {icon}
        </StyledIcon>
      </StyledRoot>
    );
  }
);
