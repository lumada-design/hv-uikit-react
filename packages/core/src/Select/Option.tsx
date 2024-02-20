import { useRef } from "react";
import { useOption } from "@mui/base/useOption";
import { OptionOwnProps } from "@mui/base/Option";
import { useForkRef } from "@mui/material/utils";

import { HvListItem, HvListItemProps } from "../ListContainer";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { fixedForwardRef } from "../types/generic";
import { ExtractNames, createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

const { staticClasses, useClasses } = createClasses("HvOption", {
  root: {},
  highlighted: {
    ...outlineStyles,
  },
});

export { staticClasses as optionClasses };

export type HvOptionClasses = ExtractNames<typeof useClasses>;

export interface HvOptionProps<OptionValue extends {}>
  extends Omit<HvListItemProps, "value" | "disabled">,
    Pick<OptionOwnProps<OptionValue>, "disabled" | "label" | "value"> {
  classes?: HvOptionClasses;
}

export const HvOption = fixedForwardRef(function HvOption<
  OptionValue extends {}
>(props: HvOptionProps<OptionValue>, ref: React.Ref<HTMLLIElement>) {
  const {
    classes: classesProp,
    className,
    disabled = false,
    label,
    value,
    children,
    ...others
  } = useDefaultProps("HvOption", props);
  const { classes, cx } = useClasses(classesProp);

  const optionRef = useRef<HTMLElement>(null);
  const rootRef = useForkRef(optionRef, ref);

  const computedLabel =
    label ??
    (typeof children === "string"
      ? children
      : optionRef.current?.textContent?.trim());

  const { getRootProps, selected, highlighted } = useOption({
    disabled,
    label: computedLabel,
    rootRef,
    value,
  });

  return (
    <HvListItem
      ref={ref}
      selected={selected}
      className={cx(classes.root, className, {
        [classes.highlighted]: highlighted,
      })}
      {...getRootProps()}
      {...others}
    >
      {children}
    </HvListItem>
  );
});
