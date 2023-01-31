import { HvTypography as HvTypography } from "components";
import { HvBaseProps } from "../../../types";
import { BrandRoot, BrandSeparator } from "./Brand.styles";
import { brandClasses, HvBrandClasses } from ".";
import clsx from "clsx";

export type HvBrandProps = HvBaseProps & {
  logo?: React.ReactNode;
  name?: string;
  classes?: HvBrandClasses;
};

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvBrand = ({ logo, name, className }: HvBrandProps) => {
  return (
    <BrandRoot className={clsx(brandClasses.root, className)}>
      {logo}
      {logo && name && <BrandSeparator />}
      {name && <HvTypography variant="label">{name}</HvTypography>}
    </BrandRoot>
  );
};
