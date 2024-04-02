import { StoryObj } from "@storybook/react";
import { HitachiLogo } from "packages/core/src/Header/assets/HitachiLogo";
import {
  HvBadge,
  HvButton,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
} from "@hitachivantara/uikit-react-core";
import { Alert, User } from "@hitachivantara/uikit-react-icons";

export default {
  title: "Tests/Header",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
};

const navigationDataMain = [
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

export const Main: StoryObj = {
  render: () => (
    <div
      style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <HvHeader position="relative">
        <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
        <HvHeaderNavigation data={navigationDataMain} />
        <HvHeaderActions>
          <HvButton icon aria-label="Open Notifications panel">
            <HvBadge count={1} icon={<Alert />} />
          </HvButton>
          <HvButton onClick={() => {}} aria-label="Open User panel" icon>
            <User />
          </HvButton>
        </HvHeaderActions>
      </HvHeader>

      <HvHeader position="relative">
        <HvHeaderBrand name="Lumada App" />
        <HvHeaderNavigation data={navigationDataMain} selected="3-1" />
      </HvHeader>
    </div>
  ),
};
