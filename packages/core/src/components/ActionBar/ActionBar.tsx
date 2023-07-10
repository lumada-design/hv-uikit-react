import { HvBaseProps } from "@core/types";
import { ExtractNames } from "@core/utils";
import { useDefaultProps } from "@core/hooks";
import { staticClasses, useClasses } from "./ActionBar.styles";

export { staticClasses as actionBarClasses };

export type HvActionBarClasses = ExtractNames<typeof useClasses>;

export interface HvActionBarProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionBarClasses;
}

export const HvActionBar = (props: HvActionBarProps) => {
  const {
    classes: classesProp,
    className,
    children,
    ...others
  } = useDefaultProps("actionBar", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={cx(classes.root, className)} {...others}>
      {children}
    </div>
  );
};
