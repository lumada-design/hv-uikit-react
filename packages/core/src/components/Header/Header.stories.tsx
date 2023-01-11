import { useState } from "react";
import { StoryObj } from "@storybook/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { User, Menu, Alert } from "@hitachivantara/uikit-icons";
import {
  HvBadge,
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

    const muiTheme = useTheme();
    const isLgUp = useMediaQuery(muiTheme.breakpoints.up("lg"));

    return (
      <div style={{ minHeight: 100 }}>
        <HvHeader position={position}>
          {!isLgUp && (
            <HvButton
              style={{ width: 32, height: 32 }}
              variant="secondaryGhost"
              icon
              onClick={() => console.log("menu")}
            >
              <Menu />
            </HvButton>
          )}
          <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
          {isLgUp && (
            <HvHeaderNavigation
              data={navigationData}
              selected={selected}
              onClick={handleChange}
            />
          )}

          <HvHeaderActions aria-label="My-aria-label">
            <HvButton
              icon
              variant="secondaryGhost"
              onClick={() => console.log("alerts")}
              aria-label="Open Notifications panel"
            >
              <HvBadge count={1} icon={<Alert />} />
            </HvButton>
            {isLgUp && (
              <HvButton
                onClick={() => {}}
                aria-label="Open User panel"
                icon
                variant="secondaryGhost"
              >
                <User />
              </HvButton>
            )}
          </HvHeaderActions>
        </HvHeader>
      </div>
    );
  },
};
