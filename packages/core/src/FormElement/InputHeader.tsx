import { forwardRef } from "react";
import {
  createClasses,
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { HvBaseInputProps } from "../BaseInput";
import { outlineStyles } from "../utils/focusUtils";
import { HvFormElementProps } from "./FormElement";

const { useClasses } = createClasses("HvInputHeader", {
  root: {
    // TODO: review these
    display: "flex",
    alignItems: "center",
    minHeight: 32,

    position: "relative",
    border: `1px solid ${theme.colors.text}`,
    borderRadius: theme.radii.base,
    backgroundColor: theme.colors.bgContainer,
    ":hover:not($disabled,$readOnly)": {
      borderColor: theme.colors.primary,
    },
    ":focus-within,:focus-visible": {
      ...outlineStyles,
    },
  },
  invalid: {
    borderColor: theme.form.errorColor,
  },
  readOnly: {
    color: theme.colors.textDisabled,
    borderColor: "currentcolor",
    backgroundColor: theme.colors.bgPage,
  },
  disabled: {
    cursor: "not-allowed",
    color: theme.colors.textDisabled,
    borderColor: "currentcolor",
    backgroundColor: theme.colors.bgPage,
  },
});

export interface HvInputHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<HvFormElementProps, "disabled" | "readOnly">,
    Pick<HvBaseInputProps, "invalid"> {
  classes?: ExtractNames<typeof useClasses>;
}

/**
 * A container for the form element inputs.
 * @internal @private
 */
export const HvInputHeader = forwardRef<
  // no-indent
  HTMLDivElement,
  HvInputHeaderProps
>(function HvInputHeader(props, ref) {
  const {
    className,
    classes: classesProp,
    invalid,
    readOnly,
    disabled,
    ...others
  } = useDefaultProps("HvInputHeader", props);
  const { classes, cx } = useClasses(classesProp, false);

  return (
    <div
      ref={ref}
      className={cx(classes.root, className, {
        [classes.invalid]: invalid,
        [classes.readOnly]: readOnly,
        [classes.disabled]: disabled,
      })}
      {...others}
    />
  );
});
