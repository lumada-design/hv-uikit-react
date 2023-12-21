import { HvSwitch } from "@hitachivantara/uikit-react-core";

export const Switch = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <HvSwitch label="Default" />
      <HvSwitch label="Disabled" disabled />
      <HvSwitch label="Readonly" readOnly />
      <HvSwitch label="Invalid" status="invalid" />
    </div>
  );
};
