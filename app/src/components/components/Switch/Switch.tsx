import { HvBaseSwitch } from "@hitachivantara/uikit-core";

export const Switch = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <HvBaseSwitch />
      <HvBaseSwitch />
      <HvBaseSwitch defaultChecked />
      <HvBaseSwitch readOnly />
      <HvBaseSwitch />
      <HvBaseSwitch disabled />
      <HvBaseSwitch defaultChecked disabled />
      <HvBaseSwitch required />
    </div>
  );
};
