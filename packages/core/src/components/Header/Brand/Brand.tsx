import { HvBaseProps } from "../../../types";
import { BrandRoot, BrandSeparator, BrandName } from "./Brand.styles";
import headerBrandClasses, { HvHeaderBrandClasses } from "./brandClasses";
import clsx from "clsx";

export type HvHeaderBrandProps = HvBaseProps & {
  logo?: React.ReactNode;
  name?: string;
  classes?: HvHeaderBrandClasses;
};

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvHeaderBrand = ({
  classes,
  logo,
  name,
  className,
  ...others
}: HvHeaderBrandProps) => {
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
