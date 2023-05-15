import { useMemo } from "react";
import { clsx } from "clsx";
import { HvBaseProps } from "@core/types";
import { useUniqueId } from "@core/hooks";
import { findDescriptors } from "./utils/FormUtils";
import { HvFormElementContextProvider } from "./context/FormElementContext";
import { HvFormElementValueContextProvider } from "./context/FormElementValueContext";
import { HvFormElementDescriptorsContextProvider } from "./context/FormElementDescriptorsContext";
import formElementClasses, { HvFormElementClasses } from "./formElementClasses";

export type HvFormStatus = "standBy" | "valid" | "invalid" | "empty";

export interface HvFormElementProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
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

export const HvFormElement = ({
  classes,
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
}: HvFormElementProps) => {
  const elementId = useUniqueId(id, "hvformelement");

  const contextValue = useMemo(
    () => ({
      elementId,
      elementName: name,
      elementStatus: status,
      elementDisabled: disabled,
      elementRequired: required,
      elementReadOnly: readOnly,
    }),
    [disabled, elementId, name, readOnly, required, status]
  );

  const descriptors = useMemo(() => findDescriptors(children), [children]);

  return (
    <div
      id={id}
      className={clsx(className, formElementClasses.root, classes?.root)}
      {...others}
    >
      <HvFormElementContextProvider value={contextValue}>
        <HvFormElementValueContextProvider value={value}>
          <HvFormElementDescriptorsContextProvider value={descriptors}>
            {children}
          </HvFormElementDescriptorsContextProvider>
        </HvFormElementValueContextProvider>
      </HvFormElementContextProvider>
    </div>
  );
};

HvFormElement.formElementType = "formelement";
