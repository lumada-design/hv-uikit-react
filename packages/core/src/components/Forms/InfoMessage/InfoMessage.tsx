import { HvBaseProps } from "../../../types";
import { StyledTypography } from "./InfoMessage.styles";
import { HvFormElementContext } from "../FormElement";
import { useContext } from "react";
import { setId } from "utils";
import clsx from "clsx";

export type HvInfoMessageProps = HvBaseProps & {
  /** If `true` the label is disabled. */
  disabled?: boolean;
  /** If `true` the info message won't have margins. */
  disableGutter?: boolean;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    infoDisabled?: string;
    gutter?: string;
  };
};

/**
 * Provides the user with additional descriptive text for the form element.
 */
export const HvInfoMessage = ({
  id,
  classes,
  className,
  children,
  disabled,
  disableGutter = false,
  ...others
}: HvInfoMessageProps) => {
  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "description");

  return (
    <StyledTypography
      id={localId}
      className={clsx(
        className,
        classes?.root,
        localDisabled && classes?.infoDisabled,
        !disableGutter && classes?.gutter
      )}
      variant="body"
      as="label"
      $infoDisabled={!!localDisabled}
      $gutter={!disableGutter}
      {...others}
    >
      {children}
    </StyledTypography>
  );
};
