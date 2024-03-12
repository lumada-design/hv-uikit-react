import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";

const buttons = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MultipleSelection = () => {
  const [selection, setSelection] = useState([0, 2, 3, 5]);

  const handleChange = (idx: number) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton style={{ width: "224px" }}>
      {buttons.map((button, i) => (
        <HvButton
          key={`${buttons[i]}`}
          aria-label={button}
          selected={selection.includes(i)}
          onClick={() => handleChange(i)}
        >
          {button[0]}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};
