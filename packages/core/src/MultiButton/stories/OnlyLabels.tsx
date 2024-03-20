import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";

export const OnlyLabels = () => {
  const [selection, setSelection] = useState(0);

  return (
    <HvMultiButton style={{ width: "210px" }}>
      {["Map", "Satellite"].map((button, i) => (
        <HvButton
          key={button}
          selected={selection === i}
          onClick={() => setSelection(i)}
        >
          {button}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};
