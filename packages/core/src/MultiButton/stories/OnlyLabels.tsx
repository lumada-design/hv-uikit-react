import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";

export const OnlyLabels = () => {
  const [selection, setSelection] = useState(0);
  const buttons = ["Map", "Satellite"];

  return (
    <HvMultiButton style={{ width: "210px" }}>
      {buttons.map((button, i) => (
        <HvButton
          key={`${buttons[i]}`}
          selected={selection === i}
          onClick={() => setSelection(i)}
        >
          {button}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};
