import { MouseEvent, useState } from "react";
import range from "lodash/range";
import { Meta, StoryObj } from "@storybook/react";
import {
  DropDownXS,
  LocationPin,
  Map,
} from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvDropDownMenu,
  HvMultiButton,
  HvMultiButtonProps,
  HvSimpleGrid,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvMultiButton> = {
  title: "Components/Multi Button",
  component: HvMultiButton,
};
export default meta;

export const Main: StoryObj<HvMultiButtonProps> = {
  args: {
    disabled: false,
    vertical: false,
    variant: "secondarySubtle",
    size: undefined,
  },
  argTypes: {
    classes: { control: { disable: true } },
    size: { control: { type: "select" } },
  },
  render: ({ vertical, disabled, variant, size }) => {
    const [val, setVal] = useState(-1);

    return (
      <HvMultiButton
        style={{ width: "210px" }}
        vertical={vertical}
        disabled={disabled}
        variant={variant}
        size={size}
      >
        <HvButton
          key="1"
          startIcon={<Map />}
          selected={val === 0}
          onClick={() => setVal(0)}
        >
          Map
        </HvButton>
        <HvButton
          key="2"
          selected={val === 1}
          onClick={() => setVal(1)}
          startIcon={<LocationPin />}
        >
          Satellite
        </HvButton>
      </HvMultiButton>
    );
  },
};

export const OnlyLabels: StoryObj<HvMultiButtonProps> = {
  render: () => {
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
  },
};

export const OnlyIcons: StoryObj<HvMultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState([0]);
    const buttons = [
      { name: "Map", icon: <Map /> },
      { name: "Location", icon: <LocationPin /> },
    ];

    const handleChange = (event: MouseEvent, idx: number) => {
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
            onClick={(evt) => handleChange(evt, i)}
          >
            {icon}
          </HvButton>
        ))}
      </HvMultiButton>
    );
  },
};

export const Disabled: StoryObj<HvMultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState([0]);

    const toggleIndex = (idx: number) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];

      setSelection(newSelection);
    };

    return (
      <HvMultiButton disabled style={{ width: "320px" }}>
        <HvButton
          selected={selection.includes(0)}
          onClick={() => toggleIndex(0)}
        >
          Potato
        </HvButton>
        <HvButton
          selected={selection.includes(1)}
          onClick={() => toggleIndex(1)}
        >
          Onion
        </HvButton>
        <HvButton
          selected={selection.includes(2)}
          onClick={() => toggleIndex(2)}
        >
          Carrot
        </HvButton>
        <HvButton
          selected={selection.includes(3)}
          onClick={() => toggleIndex(3)}
        >
          Tomato
        </HvButton>
      </HvMultiButton>
    );
  },
};

export const DisabledItem: StoryObj<HvMultiButtonProps> = {
  render: () => {
    const [selection, setSelection] = useState([0]);

    const toggleIndex = (idx: number) => {
      const newSelection = selection.includes(idx)
        ? selection.filter((v) => v !== idx)
        : [...selection, idx];

      setSelection(newSelection);
    };

    return (
      <HvMultiButton style={{ width: "320px" }}>
        <HvButton
          selected={selection.includes(0)}
          onClick={() => toggleIndex(0)}
        >
          Potato
        </HvButton>
        <HvButton
          selected={selection.includes(1)}
          onClick={() => toggleIndex(1)}
        >
          Onion
        </HvButton>
        <HvButton
          disabled
          selected={selection.includes(2)}
          onClick={() => toggleIndex(2)}
        >
          Carrot
        </HvButton>
        <HvButton
          selected={selection.includes(3)}
          onClick={() => toggleIndex(3)}
        >
          Tomato
        </HvButton>
      </HvMultiButton>
    );
  },
};

export const MultipleSelection: StoryObj<HvMultiButtonProps> = {
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

    const handleChange = (event: MouseEvent, idx: number) => {
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
            onClick={(evt) => handleChange(evt, i)}
          >
            {button[0]}
          </HvButton>
        ))}
      </HvMultiButton>
    );
  },
};

export const EnforcedSelection: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          'HvMultiButton element set as enforced cannot be toggled - In this case **"Location 1" cannot be toggled on/off**.',
      },
    },
  },
  render: () => {
    const [selection, setSelection] = useState([0]);

    const handleChange = (event: MouseEvent, idx: number) => {
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
              key={`ef-${i}`}
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
  },
};

export const MinimumSelection: StoryObj<HvMultiButtonProps> = {
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

    const handleChange = (event: MouseEvent, idx: number) => {
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
              key={`ms-${i}`}
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
  },
};

export const MaximumSelection: StoryObj<HvMultiButtonProps> = {
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

    const handleChange = (event: MouseEvent, idx: number) => {
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
              key={`maxse-${i}`}
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
  },
};

export const VerticalOrientation: StoryObj<HvMultiButtonProps> = {
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

    const handleChange = (event: MouseEvent, idx: number) => {
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
              onClick={(evt) => handleChange(evt, i)}
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
              onClick={(evt) => handleChange(evt, i)}
            >
              {name}
            </HvButton>
          ))}
        </HvMultiButton>
      </div>
    );
  },
};

export const SplitButton: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story: "MultiButton component used to create a **Split Button**.",
      },
    },
  },
  render: () => {
    const options = [
      { label: "Create merge commit" },
      { label: "Squash and merge" },
      { label: "Rebase and merge" },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
      <HvSimpleGrid cols={3} spacing="sm">
        <HvMultiButton variant="primary" style={{ width: "232px" }} split>
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton variant="primarySubtle" style={{ width: "232px" }} split>
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="secondarySubtle"
          style={{ width: "232px" }}
          split
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="primary"
          style={{ width: "228px" }}
          split
          size="xs"
        >
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
          <HvButton>{selectedOption.label}</HvButton>
        </HvMultiButton>
        <HvMultiButton
          variant="primarySubtle"
          style={{ width: "228px" }}
          split
          size="xs"
        >
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
          <HvButton>{selectedOption.label}</HvButton>
        </HvMultiButton>
        <HvMultiButton
          variant="secondarySubtle"
          style={{ width: "228px" }}
          split
          size="xs"
        >
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
          <HvButton>{selectedOption.label}</HvButton>
        </HvMultiButton>
        <HvMultiButton
          variant="primary"
          style={{ width: "240px" }}
          split
          size="lg"
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="primarySubtle"
          style={{ width: "240px" }}
          split
          size="lg"
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="secondarySubtle"
          style={{ width: "240px" }}
          split
          size="lg"
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="primary"
          style={{ width: "232px" }}
          split
          disabled
          size="xl"
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="primarySubtle"
          style={{ width: "232px" }}
          split
          disabled
          size="xl"
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
        <HvMultiButton
          variant="secondarySubtle"
          style={{ width: "232px" }}
          split
          disabled
          size="xl"
        >
          <HvButton>{selectedOption.label}</HvButton>
          <HvDropDownMenu
            keepOpened={false}
            dataList={options}
            icon={<DropDownXS />}
            onClick={(e, item) =>
              setSelectedOption(
                options.filter((option) => option.label === item.label)[0]
              )
            }
          />
        </HvMultiButton>
      </HvSimpleGrid>
    );
  },
};
