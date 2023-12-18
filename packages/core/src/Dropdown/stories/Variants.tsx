import { HvDropdown } from "@hitachivantara/uikit-react-core";

export const Variants = () => (
  <>
    <HvDropdown required label="Required" />
    <HvDropdown disabled label="Disabled" />
    <HvDropdown readOnly label="Read-only" />
    <HvDropdown status="invalid" label="Invalid" />
  </>
);
