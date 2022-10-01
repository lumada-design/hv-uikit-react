import {
  HvHeader,
  HvHeaderBrand,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export const Header: React.FC = () => {
  return (
    <HvHeader>
      <HvHeaderBrand />
      <HvHeaderBrand>
        <HvTypography variant="label">Lumada App</HvTypography>
      </HvHeaderBrand>
    </HvHeader>
  );
};

if (process.env.NODE_ENV !== "production") {
  Header.displayName = "Header";
}
