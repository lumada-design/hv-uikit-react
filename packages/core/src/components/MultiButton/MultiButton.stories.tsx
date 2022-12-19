import { useState } from "react";
import { range } from "lodash";
import { Meta, StoryObj } from "@storybook/react";
import { LocationPin, Map } from "@hitachivantara/uikit-icons";

import { Button } from "components";
import { MultiButton, MultiButtonProps } from "./MultiButton";

const meta: Meta<typeof MultiButton> = {
  title: "Inputs/MultiButton",
  component: MultiButton,
};
export default meta;

export const Main: StoryObj<MultiButtonProps> = {
  args: {
    disabled: false,
    vertical: false,
    variant: "secondarySubtle",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ vertical, disabled, variant }) => {
    {
      const [val, setVal] = useState(-1);

      return (
        <MultiButton
          style={{ width: "210px" }}
          vertical={vertical}
          disabled={disabled}
          variant={variant}
        >
          <Button
            key="1"
            startIcon={<Map />}
            selected={val === 0}
            onClick={() => setVal(0)}
          >
            Map
          </Button>
          <Button
            key="2"
            selected={val === 1}
            onClick={() => setVal(1)}
            startIcon={<LocationPin />}
          >
            Satellite
          </Button>
        </MultiButton>
      );
    }
  },
};

export const OnlyLabels: StoryObj<MultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState(0);
    const buttons = ["Map", "Satellite"];

    const handleChange = (event, idx) => {
      setSelection(idx);
    };

    return (
      <MultiButton style={{ width: "210px" }}>
        {buttons.map((button, i) => (
          <Button
            id={button.toLowerCase()}
            key={`${buttons[i]}`}
            selected={selection === i}
            onClick={(evt) => handleChange(evt, i)}
          >
            {button}
          </Button>
        ))}
      </MultiButton>
    );
  },
};

export const OnlyIcons: StoryObj<MultiButtonProps> = {
  render: () => {
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
      <MultiButton style={{ width: "64px" }}>
        {buttons.map(({ name, icon }, i) => (
          <Button
            id={name.toLowerCase()}
            key={`${buttons[i].name}`}
            icon
            aria-label={name}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {icon}
          </Button>
        ))}
      </MultiButton>
    );
  },
};

export const Disabled: StoryObj<MultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState([0]);

    const toggleIndex = (idx) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];

      setSelection(newSelection);
    };

    return (
      <MultiButton disabled style={{ width: "320px" }}>
        <Button selected={selection.includes(0)} onClick={() => toggleIndex(0)}>
          Potato
        </Button>
        <Button selected={selection.includes(1)} onClick={() => toggleIndex(1)}>
          Onion
        </Button>
        <Button selected={selection.includes(2)} onClick={() => toggleIndex(2)}>
          Carrot
        </Button>
        <Button selected={selection.includes(3)} onClick={() => toggleIndex(3)}>
          Tomato
        </Button>
      </MultiButton>
    );
  },
};

export const DisabledItem: StoryObj<MultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState([0]);

    const toggleIndex = (idx) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];

      setSelection(newSelection);
    };

    return (
      <MultiButton style={{ width: "320px" }}>
        <Button selected={selection.includes(0)} onClick={() => toggleIndex(0)}>
          Potato
        </Button>
        <Button selected={selection.includes(1)} onClick={() => toggleIndex(1)}>
          Onion
        </Button>
        <Button
          disabled
          selected={selection.includes(2)}
          onClick={() => toggleIndex(2)}
        >
          Carrot
        </Button>
        <Button selected={selection.includes(3)} onClick={() => toggleIndex(3)}>
          Tomato
        </Button>
      </MultiButton>
    );
  },
};

export const MultipleSelection: StoryObj<MultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState([0, 2, 3, 5]);
    const buttons = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const handleChange = (event, idx) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];
      setSelection(newSelection);
    };

    return (
      <MultiButton style={{ width: "224px" }}>
        {buttons.map((button, i) => (
          <Button
            key={`${buttons[i]}`}
            aria-label={button}
            selected={selection.includes(i)}
            onClick={(evt) => handleChange(evt, i)}
          >
            {button[0]}
          </Button>
        ))}
      </MultiButton>
    );
  },
};

export const EnforcedSelection: StoryObj<MultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          'MultiButton element set as enforced cannot be toggled - In this case **"Location 1" cannot be toggled on/off**.',
      },
    },
  },
  render: () => {
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
        <MultiButton>
          {range(5).map((i) => (
            <Button
              id={`location${i + 1 || ""}`}
              key={`ef-${i}`}
              startIcon={<LocationPin />}
              selected={selection.includes(i)}
              onClick={(evt) => handleChange(evt, i)}
            >
              {`Location ${i + 1}`}
            </Button>
          ))}
        </MultiButton>
      </div>
    );
  },
};

export const MinimumSelection: StoryObj<MultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Specify a number of minimum elements that must be active - in this case a **minimum of 2**.",
      },
    },
  },
  render: () => {
    const [selection, setSelection] = useState([1, 2]);

    const handleChange = (event, idx) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];

      if (newSelection.length >= 2) setSelection(newSelection);
    };

    return (
      <div style={{ width: "800px" }}>
        <MultiButton>
          {range(5).map((i) => (
            <Button
              id={`location${i + 1}`}
              key={`ms-${i}`}
              startIcon={<LocationPin />}
              selected={selection.includes(i)}
              onClick={(evt) => handleChange(evt, i)}
            >
              {`Location ${i + 1}`}
            </Button>
          ))}
        </MultiButton>
      </div>
    );
  },
};

export const MaximumSelection: StoryObj<MultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Specify a number of maximum elements that can be selected - in this case a **maximum of 2**.",
      },
    },
  },
  render: () => {
    const [selection, setSelection] = useState<number[]>([]);

    const handleChange = (event, idx) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];

      if (newSelection.length <= 2) setSelection(newSelection);
    };

    return (
      <div style={{ width: "800px" }}>
        <MultiButton>
          {range(5).map((i) => (
            <Button
              id={`location${i + 1}`}
              key={`maxse-${i}`}
              startIcon={<LocationPin />}
              selected={selection.includes(i)}
              onClick={(evt) => handleChange(evt, i)}
            >
              {`Location ${i + 1}`}
            </Button>
          ))}
        </MultiButton>
      </div>
    );
  },
};

export const VerticalOrientation: StoryObj<MultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "MultiButton combinations with **vertical orientation** and **multiple selection**.",
      },
    },
  },
  render: () => {
    const [selection, setSelection] = useState([0, 2, 3, 5]);

    const buttons = [
      { name: "Map", icon: <Map />, key: 1 },
      { name: "Location", icon: <LocationPin />, key: 2 },
      { name: "Map", icon: <Map />, key: 3 },
      { name: "Location", icon: <LocationPin />, key: 4 },
      { name: "Map", icon: <Map />, key: 5 },
      { name: "Location", icon: <LocationPin />, key: 6 },
    ];

    const handleChange = (event, idx) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];
      setSelection(newSelection);
    };

    return (
      <div style={{ display: "flex" }}>
        <MultiButton vertical style={{ width: "32px" }}>
          {buttons.map(({ name, icon }, i) => (
            <Button
              key={`${buttons[i].key}`}
              aria-label={name}
              selected={selection.includes(i)}
              onClick={(evt) => handleChange(evt, i)}
            >
              {icon}
            </Button>
          ))}
        </MultiButton>
        <MultiButton vertical style={{ marginLeft: "20px", width: "120px" }}>
          {buttons.map(({ name, icon }, i) => (
            <Button
              key={`${buttons[i].key}`}
              aria-label={name}
              startIcon={icon}
              selected={selection.includes(i)}
              onClick={(evt) => handleChange(evt, i)}
            >
              {name}
            </Button>
          ))}
        </MultiButton>
      </div>
    );
  },
};
