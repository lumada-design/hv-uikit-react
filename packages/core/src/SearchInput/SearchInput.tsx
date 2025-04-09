import { forwardRef } from "react";
import { useDefaultProps } from "@hitachivantara/uikit-react-utils";

import { HvAdornment } from "../FormElement";
import { HvIcon } from "../icons";
import { HvInput, HvInputProps } from "../Input";
import { useClasses } from "./SearchInput.styles";

export interface HvSearchInputProps extends HvInputProps<HTMLInputElement> {}

/**
 * A search input component that allows the user to enter a search term.
 *
 * This component extends the `HvInput` component, please check its documentation for more information on the available props.
 *
 * @extends HvInput
 */
export const HvSearchInput = forwardRef<
  React.ComponentRef<"input">,
  HvSearchInputProps
>(function HvSearchInput(props, ref) {
  const { classes: classesProp, ...others } = useDefaultProps(
    "HvSearchInput",
    props,
  );

  const { classes } = useClasses(classesProp);

  return (
    <HvInput
      ref={ref}
      type="search"
      disableSearchButton
      startAdornment={<HvAdornment icon={<HvIcon compact name="Search" />} />}
      classes={classes}
      {...others}
    />
  );
});
