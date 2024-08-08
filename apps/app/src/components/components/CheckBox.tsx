import { HvCheckBox } from "@hitachivantara/uikit-react-core";

export const CheckBox = () => {
  return (
    <div>
      <HvCheckBox label="Default" />
      <HvCheckBox label="Disabled" disabled />
      <HvCheckBox label="Readonly" readOnly />
      <HvCheckBox label="Invalid" status="invalid" />
    </div>
  );
};
