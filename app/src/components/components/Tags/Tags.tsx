import { HvTag } from "@hitachivantara/uikit-react-core";

export const Tags = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
        <HvTag label="Label" type="categorical" color="cviz1" />
        <HvTag label="Label" type="categorical" color="cviz2" />
        <HvTag label="Label" type="categorical" color="cviz3" />
        <HvTag label="Label" type="categorical" color="cviz4" />
        <HvTag label="Label" type="categorical" color="cviz5" />
        <HvTag label="Label" type="categorical" color="#22FF45" />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <HvTag label="Label" type="semantic" color="sema7" />
        <HvTag label="Label" type="semantic" color="sema8" />
        <HvTag label="Label" type="semantic" color="sema9" />
        <HvTag label="Label" type="semantic" color="sema20" />
      </div>
    </div>
  );
};
