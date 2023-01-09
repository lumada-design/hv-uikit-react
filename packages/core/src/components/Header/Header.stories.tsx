import { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
  HvButton,
  HvHeaderProps,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
} from "components";
import HitachiLogo from "./assets/HitachiLogo";

const navigationData = [
  {
    id: "1",
    label: "Overview",
    data: [
      {
        id: "1-1",
        label: "Model Effectiveness 1",
      },
      {
        id: "1-2",
        label: "Trend Analysis 1-2",
      },
    ],
  },
  {
    id: "2",
    label: "Events",
  },
  {
    id: "3",
    label: "Work Orders",
    data: [
      {
        id: "3-1",
        label: "Model Effectiveness 3-1",
      },
      {
        id: "3-2",
        label: "Trend Analysis 3-2",
      },
    ],
  },
  {
    id: "4",
    label: "Assets",
  },
  {
    id: "5",
    label: "Analytics",
    data: [
      {
        id: "3-1",
        label: "Model Effectiveness 5-1",
      },
      {
        id: "3-2",
        label: "Trend Analysis 5-2",
      },
    ],
  },
];

export default {
  title: "Structure/Header",
  component: HvHeader,
  subcomponents: { HvHeaderBrand, HvHeaderNavigation, HvHeaderActions },
};

export const Main: StoryObj<HvHeaderProps> = {
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
            <HvButton
              onClick={() => {}}
              aria-label="Open Notifications panel"
              variant="ghost"
            ></HvButton>
            <HvButton
              onClick={() => {}}
              aria-label="Open User panel"
              variant="ghost"
            >
              User
            </HvButton>
          </HvHeaderActions>
        </HvHeader>
      </div>
    );
  },
};
