import { useContext } from "react";
import clsx from "clsx";
import { StyledTypography } from "./Label.styles";
import { HvBaseProps } from "../../../types";
import { HvFormElementContext } from "../FormElement";
import { findDescriptors } from "../FormElement/utils/FormUtils";
import { setId } from "utils";
import labelClasses, { HvLabelClasses } from "./labelClasses";

export type HvLabelProps = HvBaseProps & {
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
};

/**
 * Provides the user with a recognizable name for a given form element.
 */
export const HvLabel = ({
  id,
  classes,
  className,
  children,
  label,
  disabled,
  required,
  htmlFor: htmlForProp,
  ...others
}: HvLabelProps) => {
  const { elementId, elementDisabled, elementRequired } =
    useContext(HvFormElementContext);

  const localDisabled = disabled || elementDisabled;
  const localRequired = required || elementRequired;

  const localId = id ?? setId(elementId, "label");

  const forId = htmlForProp || findDescriptors(children)?.input?.[0]?.id;

  return (
    <>
      <StyledTypography
        id={localId}
        className={clsx(
          className,
          labelClasses.root,
          classes?.root,
          localDisabled &&
            clsx(labelClasses.labelDisabled, classes?.labelDisabled),
          children &&
            label &&
            clsx(labelClasses.childGutter, classes?.childGutter)
        )}
        variant="label"
        component="label"
        // @ts-ignore
        htmlFor={forId}
        $labelDisabled={!!localDisabled}
        $childGutter={!!(children && label)}
        {...others}
      >
        {label}
        {localRequired && <span aria-hidden="true">*</span>}
      </StyledTypography>
      {children}
    </>
  );
};
