import { forwardRef, useMemo, useRef } from "react";
import { useForkRef } from "@mui/material";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-utils";

import { HvAdornment } from "../FormElement";
import { HvIcon } from "../icons";
import { HvInput, HvInputProps } from "../Input";
import { changeInputValue } from "../Input/utils";
import { staticClasses, useClasses } from "./NumberInput.styles";

export { staticClasses as numericInputClasses };

export type HvNumberInputClasses = ExtractNames<typeof useClasses>;

export interface HvNumberInputProps extends HvInputProps<HTMLInputElement> {}

/**
 * A number input component that allows the user to enter a number and displays two buttons to decrease / increase the value.
 *
 * This component extends the `HvInput` component, please check its documentation for more information on the available props.
 *
 * @extends HvInput
 */
export const HvNumberInput = forwardRef<
  // no-indent
  HTMLInputElement,
  HvNumberInputProps
>(function HvNumberInput(props, ref) {
  const {
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvNumberInput", props);

  const { classes, cx } = useClasses(classesProp);

  const inputRef = useRef<HTMLInputElement>(null);
  const forkedRef = useForkRef(ref, inputRef);

  const buttons = useMemo(() => {
    const handleIncrease = () => {
      if (inputRef.current) {
        inputRef.current.stepUp();
        changeInputValue(inputRef.current, inputRef.current.value);
      }
    };

    const handleDecrease = () => {
      if (inputRef.current) {
        inputRef.current.stepDown();
        changeInputValue(inputRef.current, inputRef.current.value);
      }
    };

    return (
      <>
        <HvAdornment icon={<HvIcon name="Remove" />} onClick={handleDecrease} />
        <HvAdornment icon={<HvIcon name="Add" />} onClick={handleIncrease} />
      </>
    );
  }, []);

  return (
    <HvInput
      ref={forkedRef}
      type="number"
      className={cx(classes.root, className)}
      endAdornment={buttons}
      classes={{
        adornmentsBox: classes.adornmentsBox,
      }}
      disableClear
      {...others}
    />
  );
});
