import { BaseProps } from "types/base";
import { Typography as HvTypography } from "../../Typography";
import { HeaderBrandRoot, HeaderBrandSeparator } from "./HeaderBrand.styles";

export interface HeaderBrandProps extends BaseProps {
  logo?: React.ReactNode;
  name?: string;
}

/**
 * Header component is used to render a header bar with logo and brand name, navigation and actions.
 */
export const HeaderBrand = ({
  logo,
  name,
  className,
}: HeaderBrandProps): JSX.Element => {
  return (
    <HeaderBrandRoot className={className}>
      {logo}
      {logo && name && <HeaderBrandSeparator />}
      {name && <HvTypography variant="label">{name}</HvTypography>}
    </HeaderBrandRoot>
  );
};
