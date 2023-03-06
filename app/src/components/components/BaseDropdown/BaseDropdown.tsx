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
      <HvBaseDropdown
        placeholder="Select..."
        children={
          <>
            <div>Option 1</div>
            <div>Option 2</div>
            <div>Option 3</div>
          </>
        }
      />
      <HvBaseDropdown
        placeholder="Disabled"
        disabled
        children={
          <>
            <div>Option 1</div>
            <div>Option 2</div>
            <div>Option 3</div>
          </>
        }
      />
      <HvBaseDropdown readOnly placeholder="Read only" />
      <HvBaseDropdown
        disablePortal
        children={
          <>
            <div>Option 1</div>
            <div>Option 2</div>
            <div>Option 3</div>
          </>
        }
      />
      <HvBaseDropdown variableWidth />
      <HvBaseDropdown placement="left" />
      <HvBaseDropdown placement="right" />
    </div>
  );
};
