import {
  HvHeader,
  HvHeaderBrand,
  HvHeaderActions,
  HvText,
} from "@hitachivantara/uikit-react-core";

import ThemeSwitcher from "../ThemeSwitcher";

const Header: React.FC = () => {
  return (
    <HvHeader>
      <HvHeaderBrand />
      <HvHeaderBrand>
        <HvText as="h4">Lumada App</HvText>
      </HvHeaderBrand>
      <HvHeaderActions>
        <ThemeSwitcher />
      </HvHeaderActions>
    </HvHeader>
  );
};

export default Header;

if (process.env.NODE_ENV !== "production") {
  Header.displayName = "Header";
}
