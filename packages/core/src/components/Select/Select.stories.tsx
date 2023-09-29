import { Meta, StoryObj } from "@storybook/react";
import {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
  Priority5,
} from "@hitachivantara/uikit-react-icons";

import { HvSelect, HvSelectProps } from "./Select";
import { HvDropdown, HvDropdownProps } from "./Dropdown";

const meta: Meta<typeof HvSelect> = {
  title: "Components/Select",
  component: HvSelect,
  decorators: [(Story) => <div style={{ width: "300px" }}>{Story()}</div>],
  parameters: { eyes: { include: false } },
};
export default meta;

const priorities = [
  <Priority1 role="none" />,
  <Priority2 role="none" />,
  <Priority3 role="none" />,
  <Priority4 role="none" />,
  <Priority5 role="none" />,
].map((icon, i) => {
  return {
    value: `p${i + 1}`,
    label: `Priority P${i + 1}`,
    icon,
  };
});

const pets = [
  {
    value: "dog",
    label: "Dog",
  },
  {
    value: "cat",
    label: "Cat",
  },
  {
    value: "hamster",
    label: "Hamster",
  },
  {
    value: "parrot",
    label: "Parrot",
  },
  {
    value: "spider",
    label: "Spider",
  },
  {
    value: "goldfish",
    label: "Goldfish",
  },
];

export const Main: StoryObj<HvSelectProps> = {
  args: {
    values: pets,
    "aria-label": "Pet",
  },
  render: (args) => {
    return <HvSelect {...args} />;
  },
};

export const WithIcons: StoryObj<HvSelectProps> = {
  args: {
    values: priorities,
    "aria-label": "Priority",
  },
  render: (args) => {
    return <HvSelect {...args} />;
  },
};

export const Dropdown: StoryObj<HvDropdownProps> = {
  args: {
    values: pets,
    label: "Pet",
    description: "Choose your favorite pet",
  },
  render: (args) => {
    return <HvDropdown {...args} />;
  },
};

export const Multiple: StoryObj<HvDropdownProps> = {
  args: {
    values: pets,
    label: "Pets",
    description: "Choose your favorites pets",
  },
  render: (args) => {
    return <HvDropdown multiple {...args} />;
  },
};

export const Variants: StoryObj<HvDropdownProps> = {
  args: {
    values: pets,
  },
  render: (args) => {
    return (
      <>
        <HvDropdown required label="Required" {...args} />
        <HvDropdown disabled label="Disabled" {...args} />
        <HvDropdown readOnly label="Read only" {...args} />
        <HvDropdown status="invalid" label="Invalid" {...args} />
      </>
    );
  },
};
