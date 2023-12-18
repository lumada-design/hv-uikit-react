import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";
import { HvBaseProps } from "@core/types/generic";
import { HvTypography } from "@core/Typography";

import { staticClasses, useClasses } from "./Brand.styles";

export { staticClasses as headerBrandClasses };

export type HvHeaderBrandClasses = ExtractNames<typeof useClasses>;

export interface HvHeaderBrandProps extends HvBaseProps {
  logo?: React.ReactNode;
  name?: string;
  classes?: HvHeaderBrandClasses;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvHeaderBrand = (props: HvHeaderBrandProps) => {
  const {
    classes: classesProp,
    logo,
    name,
    className,
    ...others
  } = useDefaultProps("HvHeaderBrand", props);

  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={cx(classes.root, className)} {...others}>
      {logo}
      {logo && name && <div className={classes.separator} />}
      {name && (
        <HvTypography className={classes.brandName} variant="label">
          {name}
        </HvTypography>
      )}
    </div>
  );
};
