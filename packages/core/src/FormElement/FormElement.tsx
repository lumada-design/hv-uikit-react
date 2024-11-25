import { useMemo } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { useUniqueId } from "../hooks/useUniqueId";
import { HvBaseProps } from "../types/generic";
import {
  HvFormElementContext,
  HvFormElementDescriptorsContext,
  HvFormElementValueContext,
} from "./context";
import { staticClasses, useClasses } from "./FormElement.styles";
import { findDescriptors } from "./utils";

export { staticClasses as formElementClasses };

export type HvFormElementClasses = ExtractNames<typeof useClasses>;

export type HvFormStatus = "standBy" | "valid" | "invalid" | "empty";

export interface HvFormElementProps
  extends HvBaseProps<HTMLDivElement, "onChange" | "onToggle"> {
  /**
   * Name of the form element.
   *
   * Part of a name/value pair, should be the name property of the underling native input.
   */
  name?: string;
  /**
   * Current value of the form element.
   *
   * Part of a name/value pair, should be the value property of the underling native input.
   */
  value?: any;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /** Provide additional descriptive text for the form element. */
  description?: React.ReactNode;
  /** Whether the form element is disabled. */
  disabled?: boolean;
  /** Indicates that the form element is not editable. */
  readOnly?: boolean;
  /** Indicates that user input is required on the form element. */
  required?: boolean;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus;
  /** The error message to show when `status` is "invalid". */
  statusMessage?: string;
  /** The callback fired when the value changes. */
  onChange?: (event: React.FormEvent<HTMLDivElement>) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFormElementClasses;
}

export const HvFormElement = (props: HvFormElementProps) => {
  const {
    classes: classesProp,
    className,
    children,
    id,
    name,
    value,
    disabled = false,
    required = false,
    readOnly = false,
    status = "standBy",
    ...others
  } = useDefaultProps("HvFormElement", props);

  const { classes, cx } = useClasses(classesProp);

  const elementId = useUniqueId(id);

  const contextValue = useMemo(
    () => ({
      elementId,
      elementName: name,
      elementStatus: status,
      elementDisabled: disabled,
      elementRequired: required,
      elementReadOnly: readOnly,
    }),
    [disabled, elementId, name, readOnly, required, status],
  );

  const descriptors = useMemo(() => findDescriptors(children), [children]);

  return (
    <div id={id} className={cx(classes.root, className)} {...others}>
      <HvFormElementContext.Provider value={contextValue}>
        <HvFormElementValueContext.Provider value={value}>
          <HvFormElementDescriptorsContext.Provider value={descriptors}>
            {children}
          </HvFormElementDescriptorsContext.Provider>
        </HvFormElementValueContext.Provider>
      </HvFormElementContext.Provider>
    </div>
  );
};

HvFormElement.formElementType = "formelement";
