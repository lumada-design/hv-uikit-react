import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvDropDownMenu,
  HvDropDownMenuProps,
} from "@hitachivantara/uikit-react-core";
import { Calendar, Plane, User } from "@hitachivantara/uikit-react-icons";

export default {
  title: "Components/Dropdown Menu",
  component: HvDropDownMenu,
  parameters: {
    a11y: {
      config: {
        rules: [
          // TODO: review aria-haspopup on a role-less element
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", height: 175 }}>
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof HvDropDownMenu>;

export const Main: StoryObj<HvDropDownMenuProps> = {
  args: {
    dataList: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }],
    placement: "left",
    keepOpened: false,
    disabled: false,
    expanded: undefined,
    defaultExpanded: true,
    variant: "secondaryGhost",
    size: "md",
  },
  argTypes: {
    classes: { control: { disable: true } },
    onToggle: { control: { disable: true } },
    onClick: { control: { disable: true } },
  },
  render: (args) => {
    return <HvDropDownMenu {...args} />;
  },
};

/** wrapper needed for Storybook not to crash */
const renderIcon = (Icon: React.ElementType) => () => <Icon />;

export const WithIcons: StoryObj<HvDropDownMenuProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with icons and disabled actions.",
      },
    },
  },
  render: () => {
    return (
      <HvDropDownMenu
        placement="right"
        onClick={(e, item) => console.log(item.label)}
        dataList={[
          { label: "Label 1", icon: renderIcon(User) },
          { label: "Label 2", icon: renderIcon(Calendar), disabled: true },
          { label: "Label 3", icon: renderIcon(Plane) },
        ]}
      />
    );
  },
};

export const Controlled: StoryObj<HvDropDownMenuProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu open state controlled by an external button.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "flex", gap: 5 }}>
        <HvButton variant="secondaryGhost" onClick={() => setOpen(!open)}>
          {`Click to ${!open ? "Open" : "Close"}`}
        </HvButton>
        <HvDropDownMenu
          expanded={open}
          onClick={(e, item) => console.log(item.label)}
          disablePortal={false}
          keepOpened={false}
          dataList={[
            { label: "Label 1" },
            { label: "Label 2" },
            { label: "Label 3" },
          ]}
          onToggle={(e, s) => {
            setOpen(s);
          }}
        />
      </div>
    );
  },
};
