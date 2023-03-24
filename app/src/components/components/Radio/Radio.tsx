import { HvRadio } from "@hitachivantara/uikit-react-core";

export const Radio = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <HvRadio label="Default" />
      <HvRadio label="Disabled" disabled />
      <HvRadio label="Readonly" readOnly />
      <HvRadio label="Invalid" status="invalid" />
    </div>
  );
};
