import { HvBaseCheckBox } from "@hitachivantara/uikit-react-core";

export const CheckBox = () => {
  return (
    <div>
      <HvBaseCheckBox />
      <HvBaseCheckBox semantic />
      <HvBaseCheckBox defaultChecked />
      <HvBaseCheckBox readOnly />
      <HvBaseCheckBox indeterminate />
      <HvBaseCheckBox disabled />
      <HvBaseCheckBox defaultChecked disabled />
      <HvBaseCheckBox required />
    </div>
  );
};
