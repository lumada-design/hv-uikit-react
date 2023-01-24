import { HvBaseDropdown } from "@hitachivantara/uikit-core";

export const BaseDropdown = () => {
  return (
    <div style={{ width: "50%" }}>
      <HvBaseDropdown
        placeholder="Select..."
        children={
          <>
            <div>TESTE TESTE TESTE</div>
            <div>TESTE TESTE TESTE</div>
            <div>TESTE TESTE TESTE</div>
          </>
        }
      />
      <br />
      <HvBaseDropdown
        placeholder="Disabled"
        disabled
        children={
          <>
            <div>TESTE TESTE TESTE</div>
            <div>TESTE TESTE TESTE</div>
            <div>TESTE TESTE TESTE</div>
          </>
        }
      />
      <br />
      <HvBaseDropdown readOnly placeholder="Read only" />
      <br />
      <HvBaseDropdown
        disablePortal
        children={
          <>
            <div>TESTE TESTE TESTE</div>
            <div>TESTE TESTE TESTE</div>
            <div>TESTE TESTE TESTE</div>
          </>
        }
      />
      <HvBaseDropdown defaultExpanded />
      <HvBaseDropdown variableWidth />
      <HvBaseDropdown placement="left" />
      <HvBaseDropdown placement="right" />
    </div>
  );
};
