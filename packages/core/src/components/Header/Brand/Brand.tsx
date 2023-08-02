import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";

import { BrandRoot, BrandSeparator, BrandName } from "./Brand.styles";
import headerBrandClasses, { HvHeaderBrandClasses } from "./brandClasses";

export interface HvHeaderBrandProps extends HvBaseProps {
  logo?: React.ReactNode;
  name?: string;
  classes?: HvHeaderBrandClasses;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvHeaderBrand = (props: HvHeaderBrandProps) => {
  const { classes, logo, name, className, ...others } = useDefaultProps(
    "HvHeaderBrand",
    props
  );

  return (
    <BrandRoot
      className={clsx(classes?.root, headerBrandClasses.root, className)}
      {...others}
    >
      {logo}
      {logo && name && (
        <BrandSeparator
          className={clsx(classes?.separator, headerBrandClasses.separator)}
        />
      )}
      {name && <BrandName variant="label">{name}</BrandName>}
    </BrandRoot>
  );
};
