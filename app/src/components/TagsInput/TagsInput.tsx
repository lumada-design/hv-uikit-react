import { HvTagsInput } from "@hitachivantara/uikit-core";

export const TagsInput = () => {
  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <HvTagsInput placeholder="Insert text" />
      <HvTagsInput
        placeholder="Insert text"
        value={[
          {
            disabled: true,
            label: "tag 1",
          },
          {
            disabled: true,
            label: "tag 2",
          },
          {
            disabled: true,
            label: "tag 3",
          },
        ]}
        disabled
      />
      <HvTagsInput
        placeholder="Insert text"
        value={["tag 1", "tag 2", "tag  3"]}
        readOnly
      />
      <HvTagsInput
        placeholder="Insert text"
        status="invalid"
        statusMessage="Oh no!"
      />
      <HvTagsInput placeholder="Insert text" multiline style={{ width: 200 }} />
    </div>
  );
};
