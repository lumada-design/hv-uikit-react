import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";
import { LocationPin, Map } from "@hitachivantara/uikit-react-icons";

const buttons = [
  { name: "Map", icon: <Map /> },
  { name: "Location", icon: <LocationPin /> },
];

export const OnlyIcons = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (idx: number) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton style={{ width: "64px" }}>
      {buttons.map(({ name, icon }, i) => (
        <HvButton
          key={`${buttons[i].name}`}
          icon
          aria-label={name}
          selected={selection.includes(i)}
          onClick={() => handleChange(i)}
        >
          {icon}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};
