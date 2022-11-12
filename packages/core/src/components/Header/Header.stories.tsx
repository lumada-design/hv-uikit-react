import { StoryObj } from "@storybook/react";
import {
  Button,
  HeaderProps,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
} from "components";
import { useState } from "react";
import HitachiLogo from "./assets/HitachiLogo";

const navigationData = [
  {
    id: "1",
    label: "Overview",
    data: [
      {
        id: "1-1",
        label: "Overview 1",
      },
      {
        id: "1-2",
        label: "Overview 2",
      },
    ],
  },
  {
    id: "2",
    label: "Events",
    href: "",
  },
  {
    id: "3",
    label: "Orders",
    data: [
      {
        id: "3-1",
        label: "Orders 1",
      },
      {
        id: "3-2",
        label: "Orders 2",
      },
    ],
  },
];

export default {
  title: "Structure/Header",
  component: HvHeader,
  subcomponents: { HvHeaderBrand, HvHeaderNavigation, HvHeaderActions },
};

export const Main: StoryObj<HeaderProps> = {
  args: {
    position: "relative",
  },
  argTypes: {
    position: {
      control: "select",
    },
  },
  render: ({ position }) => {
    const [selected, setSelected] = useState<string>("2");
    const handleChange = (e, selectedItem) => {
      console.log(selectedItem);
      setSelected(selectedItem.id);
    };

    return (
      <div style={{ minHeight: 100 }}>
        <HvHeader position={position}>
          <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
          <HvHeaderNavigation
            data={navigationData}
            selected={selected}
            onClick={handleChange}
          />
          <HvHeaderActions aria-label="My-aria-label">
            <Button
              onClick={() => console.log("badge")}
              aria-label="Open Notifications panel"
              variant="ghost"
            ></Button>
            <Button
              onClick={() => console.log("user")}
              aria-label="Open User panel"
              variant="ghost"
            >
              User
            </Button>
          </HvHeaderActions>
        </HvHeader>
      </div>
    );
  },
};
