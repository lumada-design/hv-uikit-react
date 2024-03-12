import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";
import { LocationPin } from "@hitachivantara/uikit-react-icons";

export const EnforcedSelection = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (idx: number) => {
    if (idx === 0) return; // enforced
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <div style={{ width: "600px" }}>
      <HvMultiButton>
        {[...Array(5).keys()].map((i) => (
          <HvButton
            key={`ef-${i}`}
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
