import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";
import { LocationPin } from "@hitachivantara/uikit-react-icons";

export const MaximumSelection = () => {
  const [selection, setSelection] = useState<number[]>([]);

  const handleChange = (idx: number) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];

    if (newSelection.length <= 2) setSelection(newSelection);
  };

  return (
    <div style={{ width: "800px" }}>
      <HvMultiButton>
        {[...Array(5).keys()].map((i) => (
          <HvButton
            key={`maxse-${i}`}
            startIcon={<LocationPin />}
            selected={selection.includes(i)}
            onClick={() => handleChange(i)}
          >
            {`Location ${i + 1}`}
          </HvButton>
        ))}
      </HvMultiButton>
    </div>
  );
};
