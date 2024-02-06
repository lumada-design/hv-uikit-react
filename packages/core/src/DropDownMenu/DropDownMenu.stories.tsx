import { useState } from "react";
import { Calendar, Plane, User } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import { fireEvent, screen, waitFor } from "@storybook/testing-library";
import {
  HvButton,
  HvDropDownMenu,
  HvDropDownMenuProps,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvDropDownMenu> = {
  title: "Components/Dropdown Menu",
  component: HvDropDownMenu,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", height: 175 }}>
        {Story()}
      </div>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvDropDownMenuProps> = {
  args: {
    dataList: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }],
    placement: "left",
    keepOpened: false,
    disabled: false,
    expanded: undefined,
    defaultExpanded: true,
    variant: "secondaryGhost",
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
        story: "DropDownMenu with icons and disabled actions",
      },
    },
    parameters: {
      eyes: {
        runBefore() {
          fireEvent.click(screen.getByRole("button"));
          return waitFor(() => screen.getByRole("menuitem"));
        },
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
        story: "DropDownMenu toggle opening controlled by an external button.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
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
      </>
    );
  },
};
