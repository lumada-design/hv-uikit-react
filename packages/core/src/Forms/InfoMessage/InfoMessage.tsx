import { useContext } from "react";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvTypography, HvTypographyProps } from "../../Typography";
import { ExtractNames } from "../../utils/classes";
import { setId } from "../../utils/setId";
import { HvFormElementContext } from "../FormElement";
import { staticClasses, useClasses } from "./InfoMessage.styles";

export { staticClasses as infoMessageClasses };

export type HvInfoMessageClasses = ExtractNames<typeof useClasses>;

export interface HvInfoMessageProps extends HvTypographyProps<"label"> {
  /** If `true` the label is disabled. */
  disabled?: boolean;
  /** If `true` the info message won't have margins. */
  disableGutter?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvInfoMessageClasses;
}

/**
 * Provides the user with additional descriptive text for the form element.
 */
export const HvInfoMessage = (props: HvInfoMessageProps) => {
  const {
    id,
    classes: classesProp,
    className,
    children,
    disabled,
    disableGutter = false,
    ...others
  } = useDefaultProps("HvInfoMessage", props);

  const { classes, cx } = useClasses(classesProp);

  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "description");

  return (
    <HvTypography
      id={localId}
      className={cx(
        classes.root,
        {
          [classes.infoDisabled]: !!localDisabled,
          [classes.gutter]: !disableGutter,
        },
        className,
      )}
      variant="body"
      component="label"
      {...others}
    >
      {children}
    </HvTypography>
  );
};
