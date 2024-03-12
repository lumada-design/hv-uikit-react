import { useState } from "react";
import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";
import { LocationPin, Map } from "@hitachivantara/uikit-react-icons";

const buttons = [
  { name: "Map", icon: <Map />, key: 1 },
  { name: "Location", icon: <LocationPin />, key: 2 },
  { name: "Map", icon: <Map />, key: 3 },
  { name: "Location", icon: <LocationPin />, key: 4 },
  { name: "Map", icon: <Map />, key: 5 },
  { name: "Location", icon: <LocationPin />, key: 6 },
];

export const VerticalOrientation = () => {
  const [selection, setSelection] = useState([0, 2, 3, 5]);

  const handleChange = (idx: number) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <div style={{ display: "flex" }}>
      <HvMultiButton vertical style={{ width: "32px" }}>
        {buttons.map(({ name, icon }, i) => (
          <HvButton
            key={`${buttons[i].key}`}
            aria-label={name}
            selected={selection.includes(i)}
            onClick={() => handleChange(i)}
          >
            {icon}
          </HvButton>
        ))}
      </HvMultiButton>
      <HvMultiButton vertical style={{ marginLeft: "20px", width: "120px" }}>
        {buttons.map(({ name, icon }, i) => (
          <HvButton
            key={`${buttons[i].key}`}
            aria-label={name}
            startIcon={icon}
            selected={selection.includes(i)}
            onClick={() => handleChange(i)}
          >
            {name}
          </HvButton>
        ))}
      </HvMultiButton>
    </div>
  );
};
