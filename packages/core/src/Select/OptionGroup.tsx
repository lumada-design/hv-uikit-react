import { forwardRef } from "react";
import { OptionGroup, OptionGroupProps } from "@mui/base/OptionGroup";
import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { createClasses, ExtractNames } from "../utils/classes";

const { staticClasses, useClasses } = createClasses("HvOptionGroup", {
  root: {
    listStyle: "none",
    ...theme.typography.label,
  },
});

export { staticClasses as optionGroupClasses };

export type HvOptionGroupClasses = ExtractNames<typeof useClasses>;

export interface HvOptionGroupProps extends OptionGroupProps {
  classes?: HvOptionGroupClasses;
}

export const HvOptionGroup = forwardRef<HTMLLIElement, HvOptionGroupProps>(
  (props, ref) => {
    const {
      className,
      classes: classesProp,
      ...others
    } = useDefaultProps("HvOptionGroup", props);
    const { classes, cx } = useClasses(classesProp);

    return (
      <OptionGroup
        ref={ref}
        className={cx(classes.root, className)}
        {...others}
      />
    );
  },
);
