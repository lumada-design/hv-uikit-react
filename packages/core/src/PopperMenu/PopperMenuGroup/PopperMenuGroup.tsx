import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../../types/generic";
import { HvTypography } from "../../Typography";
import { staticClasses, useClasses } from "./PopperMenuGroup.styles";

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
    ...others
  } = useDefaultProps("HvPopperMenuGroup", props);

  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={cx(classes.root, className)} {...others}>
      {title && <HvTypography variant="captionLabel">{title}</HvTypography>}
      {children}
    </div>
  );
};
