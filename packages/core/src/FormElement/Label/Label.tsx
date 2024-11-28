import { useContext } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvTypography, HvTypographyProps } from "../../Typography";
import { setId } from "../../utils/setId";
import { HvFormElementContext } from "../context";
import { findDescriptors } from "../utils";
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
    id: idProp,
    classes: classesProp,
    className,
    children,
    label,
    disabled: disabledProp,
    required: requiredProp,
    htmlFor: htmlForProp,
    ...others
  } = useDefaultProps("HvLabel", props);

  const { classes, cx } = useClasses(classesProp);

  const context = useContext(HvFormElementContext);

  const disabled = disabledProp ?? context.disabled;
  const required = requiredProp ?? context.required;
  const id = idProp ?? setId(context.id, "label");

  const forId = htmlForProp || findDescriptors(children)?.input?.[0]?.id;

  return (
    <>
      <HvTypography
        id={id}
        className={cx(
          classes.root,
          {
            [classes.labelDisabled]: !!disabled,
            [classes.childGutter]: !!(children && label),
          },
          className,
        )}
        variant="label"
        component="label"
        htmlFor={forId}
        {...others}
      >
        {label}
        {required && <span aria-hidden="true">*</span>}
      </HvTypography>
      {children}
    </>
  );
};
