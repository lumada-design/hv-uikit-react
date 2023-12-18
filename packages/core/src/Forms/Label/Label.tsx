import { useContext } from "react";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";
import { HvTypography, HvTypographyProps } from "@core/Typography";

import { HvFormElementContext } from "../FormElement";
import { findDescriptors } from "../FormElement/utils/FormUtils";
import { staticClasses, useClasses } from "./Label.styles";

export { staticClasses as labelClasses };

export type HvLabelClasses = ExtractNames<typeof useClasses>;

export interface HvLabelProps extends HvTypographyProps<"label"> {
  /** Id to be applied to the root node */
  id?: string;
  /** The text to be shown by the label. */
  label?: React.ReactNode;
  /** The id of the form element the label is bound to. */
  htmlFor?: string;
  /** If `true` the label is displayed with a disabled style. */
  disabled?: boolean;
  /** If `true`, the label will indicate that the form element is required (an `*` after the label text). */
  required?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvLabelClasses;
}

/**
 * Provides the user with a recognizable name for a given form element.
 */
export const HvLabel = (props: HvLabelProps) => {
  const {
    id,
    classes: classesProp,
    className,
    children,
    label,
    disabled,
    required,
    htmlFor: htmlForProp,
    ...others
  } = useDefaultProps("HvLabel", props);

  const { classes, cx } = useClasses(classesProp);

  const { elementId, elementDisabled, elementRequired } =
    useContext(HvFormElementContext);

  const localDisabled = disabled || elementDisabled;
  const localRequired = required || elementRequired;

  const localId = id ?? setId(elementId, "label");

  const forId = htmlForProp || findDescriptors(children)?.input?.[0]?.id;

  return (
    <>
      <HvTypography
        id={localId}
        className={cx(
          classes.root,
          {
            [classes.labelDisabled]: !!localDisabled,
            [classes.childGutter]: !!(children && label),
          },
          className
        )}
        variant="label"
        component="label"
        htmlFor={forId}
        {...others}
      >
        {label}
        {localRequired && <span aria-hidden="true">*</span>}
      </HvTypography>
      {children}
    </>
  );
};
