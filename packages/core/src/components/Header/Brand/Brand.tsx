import { HvTypography as HvTypography } from "components";
import { HvBaseProps } from "types";
import { BrandRoot, BrandSeparator } from "./Brand.styles";

export type HvBrandProps = HvBaseProps & {
  logo?: React.ReactNode;
  name?: string;
};

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HvBrand = ({ logo, name, className }: HvBrandProps) => {
  return (
    <BrandRoot className={className}>
      {logo}
      {logo && name && <BrandSeparator />}
      {name && <HvTypography variant="label">{name}</HvTypography>}
    </BrandRoot>
  );
};
