import { HvBaseRadio } from "@hitachivantara/uikit-core";

export const Radio = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <HvBaseRadio />
      <HvBaseRadio />
      <HvBaseRadio defaultChecked />
      <HvBaseRadio readOnly />
      <HvBaseRadio />
      <HvBaseRadio disabled />
      <HvBaseRadio defaultChecked disabled />
      <HvBaseRadio required />
    </div>
  );
};
