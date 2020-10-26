import React, { useState } from "react";
import { LocationPin, Map } from "@hv/uikit-react-icons";
import { HvButton, HvMultiButton } from "../..";

export default {
  title: "Components/Multi Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvMultiButton } from '@hv/uikit-react-core/dist'",
    v3: true,
    maturityStatus: "stable",
    dsVersion: "3.2.1",
  },
  component: HvMultiButton,
  decorators: [
    (Story) => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    ),
  ],
};

const range = (n) => Array.from(Array(n), (v, i) => i);

export const Main = () => {
  const [val, setVal] = useState(-1);

  return (
    <HvMultiButton style={{ width: "210px" }}>
      <HvButton selected={val === 0} onClick={() => setVal(0)} startIcon={<Map />}>
        Map
      </HvButton>
      <HvButton selected={val === 1} onClick={() => setVal(1)} startIcon={<LocationPin />}>
        Satellite
      </HvButton>
    </HvMultiButton>
  );
};

export const OnlyLabels = () => {
  const [selection, setSelection] = useState(0);
  const buttons = ["Map", "Satellite"];

  const handleChange = (event, idx) => {
    setSelection(idx);
  };

  return (
    <HvMultiButton style={{ width: "210px" }}>
      {buttons.map((button, i) => (
        <HvButton
          id={button.toLowerCase()}
          selected={selection === i}
          onClick={(evt) => handleChange(evt, i)}
        >
          {button}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};

export const OnlyIcons = () => {
  const [selection, setSelection] = useState([0]);
  const buttons = [
    { name: "Map", icon: <Map /> },
    { name: "Location", icon: <LocationPin /> },
  ];

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton style={{ width: "64px" }}>
      {buttons.map(({ name, icon }, i) => (
        <HvButton
          id={name.toLowerCase()}
          icon
          aria-label={name}
          selected={selection.includes(i)}
          onClick={(evt) => handleChange(evt, i)}
        >
          {icon}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};

export const Disabled = () => {
  const [selection, setSelection] = useState([0]);

  const toggleIndex = (idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];

    setSelection(newSelection);
  };

  return (
    <HvMultiButton disabled style={{ width: "320px" }}>
      <HvButton selected={selection.includes(0)} onClick={() => toggleIndex(0)}>
        Potato
      </HvButton>
      <HvButton selected={selection.includes(1)} onClick={() => toggleIndex(1)}>
        Onion
      </HvButton>
      <HvButton selected={selection.includes(2)} onClick={() => toggleIndex(2)}>
        Carrot
      </HvButton>
      <HvButton selected={selection.includes(3)} onClick={() => toggleIndex(3)}>
        Tomato
      </HvButton>
    </HvMultiButton>
  );
};

export const DisabledItem = () => {
  const [selection, setSelection] = useState([0]);

  const toggleIndex = (idx) => {
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
      <HvButton disabled selected={selection.includes(2)} onClick={() => toggleIndex(2)}>
        Carrot
      </HvButton>
      <HvButton selected={selection.includes(3)} onClick={() => toggleIndex(3)}>
        Tomato
      </HvButton>
    </HvMultiButton>
  );
};

export const MultipleSelection = () => {
  const [selection, setSelection] = useState([0, 2, 3, 5]);
  const buttons = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <HvMultiButton style={{ width: "224px" }}>
      {buttons.map((button, i) => (
        <HvButton
          aria-label={button}
          selected={selection.includes(i)}
          onClick={(evt) => handleChange(evt, i)}
        >
          {button[0]}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};

export const VerticalOrientation = () => {
  const [selection, setSelection] = useState([0, 2, 3, 5]);

  const buttons = [
    { name: "Map", icon: <Map /> },
    { name: "Location", icon: <LocationPin /> },
    { name: "Map", icon: <Map /> },
    { name: "Location", icon: <LocationPin /> },
    { name: "Map", icon: <Map /> },
    { name: "Location", icon: <LocationPin /> },
  ];

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <div style={{ display: "flex" }}>
      <HvMultiButton icon vertical style={{ width: "32px" }}>
        {buttons.map(({ name, icon }, i) => (
          <HvButton
            aria-label={name}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {icon}
          </HvButton>
        ))}
      </HvMultiButton>
      <HvMultiButton vertical style={{ marginLeft: "20px", width: "120px" }}>
        {buttons.map(({ name, icon }, i) => (
          <HvButton
            aria-label={name}
            startIcon={icon}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {name}
          </HvButton>
        ))}
      </HvMultiButton>
    </div>
  );
};

VerticalOrientation.story = {
  parameters: {
    docs: {
      storyDescription:
        "MultiButton combinations with **vertical orientation** and **multiple selection**.",
    },
  },
};

export const EnforcedSelection = () => {
  const [selection, setSelection] = useState([0]);

  const handleChange = (event, idx) => {
    if (idx === 0) return; // enforced
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];
    setSelection(newSelection);
  };

  return (
    <div style={{ width: "600px" }}>
      <HvMultiButton>
        {range(5).map((i) => (
          <HvButton
            id={`location${i + 1 || ""}`}
            startIcon={<LocationPin />}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {`Location ${i + 1}`}
          </HvButton>
        ))}
      </HvMultiButton>
    </div>
  );
};

EnforcedSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        'MultiButton element set as enforced cannot be toggled - In this case **"Location 1" cannot be toggled on/off**.',
    },
  },
};

export const MinimumSelection = () => {
  const [selection, setSelection] = useState([1, 2]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];

    if (newSelection.length >= 2) setSelection(newSelection);
  };

  return (
    <div style={{ width: "800px" }}>
      <HvMultiButton>
        {range(5).map((i) => (
          <HvButton
            id={`location${i + 1}`}
            startIcon={<LocationPin />}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {`Location ${i + 1}`}
          </HvButton>
        ))}
      </HvMultiButton>
    </div>
  );
};

MinimumSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        "Specify a number of minimum elements that must be active - in this case a **minimum of 2**.",
    },
  },
};

export const MaximumSelection = () => {
  const [selection, setSelection] = useState([]);

  const handleChange = (event, idx) => {
    const newSelection = selection.includes(idx)
      ? selection.filter((v) => v !== idx)
      : [...selection, idx];

    if (newSelection.length <= 2) setSelection(newSelection);
  };

  return (
    <div style={{ width: "800px" }}>
      <HvMultiButton>
        {range(5).map((i) => (
          <HvButton
            id={`location${i + 1}`}
            startIcon={<LocationPin />}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {`Location ${i + 1}`}
          </HvButton>
        ))}
      </HvMultiButton>
    </div>
  );
};

MaximumSelection.story = {
  parameters: {
    docs: {
      storyDescription:
        "Specify a number of maximum elements that can be selected - in this case a **maximum of 2**.",
    },
  },
};
