import { Typography as HvTypography } from "../../Typography";
import { HeaderBrandRoot, HeaderBrandSeparator } from "./HeaderBrand.styles";

export const HeaderBrand = ({ logo, name, className }: HeaderBrandProps) => {
  return (
    <HeaderBrandRoot className={className}>
      {logo}
      {logo && name && <HeaderBrandSeparator />}
      {name && <HvTypography variant="label">{name}</HvTypography>}
    </HeaderBrandRoot>
  );
};

HeaderBrand.displayName = "HeaderBrand";
