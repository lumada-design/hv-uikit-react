import {
  HvHeader,
  HvHeaderBrand,
  HvHeaderActions,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

// import { ThemeSwitcher } from "../ThemeSwitcher";

export const Header: React.FC = () => {
  return (
    <HvHeader>
      <HvHeaderBrand />
      <HvHeaderBrand>
        <HvTypography variant="label">Lumada App</HvTypography>
      </HvHeaderBrand>
      <HvHeaderActions>
        {/* <ThemeSwitcher /> */}
      </HvHeaderActions>
    </HvHeader>
  );
};

if (process.env.NODE_ENV !== "production") {
  Header.displayName = "Header";
}
