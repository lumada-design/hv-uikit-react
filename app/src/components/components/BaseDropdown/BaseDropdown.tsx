import { HvBaseDropdown } from "@hitachivantara/uikit-react-core";

export const BaseDropdown = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        rowGap: "10px",
      }}
    >
      <HvBaseDropdown placeholder="Select...">
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </HvBaseDropdown>
      <HvBaseDropdown placeholder="Disabled" disabled>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </HvBaseDropdown>
      <HvBaseDropdown readOnly placeholder="Read only" />
      <HvBaseDropdown disablePortal>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </HvBaseDropdown>
      <HvBaseDropdown variableWidth />
      <HvBaseDropdown placement="left" />
      <HvBaseDropdown placement="right" />
    </div>
  );
};
