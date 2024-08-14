import { HvDropdown } from "@hitachivantara/uikit-react-core";

const values = [
  { label: "value 1" },
  { label: "value 2" },
  { label: "value 3" },
  { label: "value 4" },
];

export const Variants = () => (
  <>
    <HvDropdown required label="Required" values={values} />
    <HvDropdown disabled label="Disabled" values={values} />
    <HvDropdown readOnly label="Read-only" values={values} />
    <HvDropdown status="invalid" label="Invalid" values={values} />
    <HvDropdown label="Empty" />
  </>
);
