import { useState } from "react";
import { StoryObj } from "@storybook/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { User, Menu, Alert } from "@hitachivantara/uikit-react-icons";
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
        href: "/overview/model-effectiveness",
      },
      {
        id: "1-2",
        label: "Trend Analysis 1-2",
        href: "/overview/trend-analysis",
      },
    ],
  },
  {
    id: "2",
    label: "Events",
    href: "/events",
  },
  {
    id: "3",
    label: "Work Orders",
    data: [
      {
        id: "3-1",
        label: "Model Effectiveness 3-1",
        href: "/work-orders/model-effectiveness",
      },
      {
        id: "3-2",
        label: "Trend Analysis 3-2",
        href: "/work-orders/trend-analysis",
      },
    ],
  },
  {
    id: "4",
    label: "Assets",
    href: "/assets",
  },
  {
    id: "5",
    label: "Analytics",
    data: [
      {
        id: "5-1",
        label: "Model Effectiveness 5-1",
        href: "/analytics/model-effectiveness",
      },
      {
        id: "5-2",
        label: "Trend Analysis 5-2",
        href: "/analytics/trend-analysis",
      },
    ],
  },
];

export default {
  title: "Components/Header",
  component: HvHeader,
  subcomponents: { HvHeaderBrand, HvHeaderNavigation, HvHeaderActions },
};

export const Main: StoryObj<HvHeaderProps> = {
  args: {
    position: "relative",
  },
  argTypes: {
    classes: { control: { disable: true } },
    position: {
      control: "select",
    },
  },
  render: ({ position }) => {
    const [selected, setSelected] = useState<string>("2");
    const handleChange = (e, selectedItem) => {
      if (selectedItem.href) {
        setSelected(selectedItem.id);
      } else if (selectedItem.data?.length) {
        setSelected(selectedItem.data[0].id);
      }
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
