import { HvBaseInput } from "@hitachivantara/uikit-core";

export const BaseInput = () => {
  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <HvBaseInput placeholder="Insert text" />
      <HvBaseInput placeholder="This is a disabled field" disabled />
      <HvBaseInput value="This is a readOnly field" readOnly />
      <HvBaseInput placeholder="This is an invalid field" invalid />
      <HvBaseInput placeholder="Insert text" value="Some prefilled text" />
    </div>
  );
};
