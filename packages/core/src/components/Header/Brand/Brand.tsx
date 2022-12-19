import { Typography as HvTypography } from "components";
import { HvBaseProps } from "types";
import { BrandRoot, BrandSeparator } from "./Brand.styles";

export type BrandProps = HvBaseProps & {
  logo?: React.ReactNode;
  name?: string;
};

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const Brand = ({ logo, name, className }: BrandProps) => {
  return (
    <BrandRoot className={className}>
      {logo}
      {logo && name && <BrandSeparator />}
      {name && <HvTypography variant="label">{name}</HvTypography>}
    </BrandRoot>
  );
};
