import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";

export const DisabledItem = () => {
  const [selection, setSelection] = useState([0]);

  const toggleIndex = (idx: number) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];

    setSelection(newSelection);
  };

  return (
    <HvMultiButton style={{ width: "320px" }}>
      <HvButton selected={selection.includes(0)} onClick={() => toggleIndex(0)}>
        Potato
      </HvButton>
      <HvButton selected={selection.includes(1)} onClick={() => toggleIndex(1)}>
        Onion
      </HvButton>
      <HvButton
        disabled
        selected={selection.includes(2)}
        onClick={() => toggleIndex(2)}
      >
        Carrot
      </HvButton>
      <HvButton selected={selection.includes(3)} onClick={() => toggleIndex(3)}>
        Tomato
      </HvButton>
    </HvMultiButton>
  );
};
