import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../../types/generic";
import { HvTypography } from "../../Typography";
import { staticClasses, useClasses } from "./Group.styles";

export { staticClasses as PopperMenuGroupClasses };

export type HvPopperMenuGroupClasses = ExtractNames<typeof useClasses>;

export interface HvPopperMenuGroupProps
  extends HvBaseProps<HTMLDivElement, "title"> {
  title?: React.ReactNode;
  classes?: HvPopperMenuGroupClasses;
}

export const HvPopperMenuGroup = (props: HvPopperMenuGroupProps) => {
  const {
    className,
    classes: classesProp,
    title,
    children,
  } = useDefaultProps("HvPopperMenuGroup", props);

  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={cx(classes.root, className)}>
      {title && (
        <HvTypography variant="captionLabel" className={classes.title}>
          {title}
        </HvTypography>
      )}
      {children}
    </div>
  );
};
