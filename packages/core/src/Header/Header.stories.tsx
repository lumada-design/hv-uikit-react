import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
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
  HvHeaderNavigationProps,
  HvVerticalNavigation,
  HvVerticalNavigationTree,
  HvHeaderNavigationItemProp,
  theme,
} from "@hitachivantara/uikit-react-core";

import { HitachiLogo } from "./assets/HitachiLogo";

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

export default {
  title: "Widgets/Header",
  component: HvHeader,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvHeaderBrand, HvHeaderNavigation, HvHeaderActions },
} satisfies Meta<typeof HvHeader>;

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
  decorators: [(Story) => <div style={{ height: 150 }}>{Story()}</div>],
  render: ({ position }) => {
    const [selected, setSelected] = useState<string>("2");
    const handleChange: HvHeaderNavigationProps["onClick"] = (
      event,
      selectedItem
    ) => {
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
              icon
              onClick={() => console.log("menu")}
              aria-label="Menu"
            >
              <Menu />
            </HvButton>
          )}
          <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
          {isLgUp && (
            <HvHeaderNavigation
              data={navigationDataMain}
              selected={selected}
              onClick={handleChange}
            />
          )}

          <HvHeaderActions>
            <HvButton
              icon
              onClick={() => console.log("alerts")}
              aria-label="Open Notifications panel"
            >
              <HvBadge count={1} icon={<Alert />} />
            </HvButton>
            {isLgUp && (
              <HvButton onClick={() => {}} aria-label="Open User panel" icon>
                <User />
              </HvButton>
            )}
          </HvHeaderActions>
        </HvHeader>
      </div>
    );
  },
};

const navigationDataCombined = [
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
        data: [
          {
            id: "3-1-1",
            label: "Another Sub Level 3-1-1",
            href: "/work-orders/model-effectiveness-3-1-1",
          },
          {
            id: "3-1-2",
            label: "Another Sub Level 3-1-2",
            href: "/work-orders/trend-analysis-3-1-2",
          },
        ],
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

export const CombinedNavigation: StoryObj<HvHeaderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal and vertical navigation were combined for better organization and distribution of multi-level navigation.",
      },
    },
  },
  decorators: [(Story) => <div style={{ height: 300 }}>{Story()}</div>],
  render: () => {
    const [selectedHeaderItem, setSelectedHeaderItem] =
      useState<HvHeaderNavigationItemProp>(navigationDataCombined[0]);
    const [selected, setSelected] = useState(
      navigationDataCombined[0].data?.[0].id
    );

    const traverseItem = (
      item: HvHeaderNavigationItemProp
    ): string | undefined => {
      if (item.data) {
        return traverseItem(item.data[0]);
      }
      return item.id;
    };

    const handleChange: HvHeaderNavigationProps["onClick"] = (event, item) => {
      setSelectedHeaderItem(item);
      setSelected(traverseItem(item));
    };

    const muiTheme = useTheme();
    const isLgUp = useMediaQuery(muiTheme.breakpoints.up("lg"));

    return (
      <div>
        <HvHeader position="relative">
          {!isLgUp && (
            <HvButton
              icon
              onClick={() => console.log("menu")}
              style={{ width: 32, height: 32 }}
              aria-label="Menu"
            >
              <Menu />
            </HvButton>
          )}

          {isLgUp && (
            <HvHeaderNavigation
              data={navigationDataCombined}
              selected={selectedHeaderItem.id}
              onClick={handleChange}
              levels={1}
            />
          )}
        </HvHeader>
        <div
          style={{
            display: "flex",
            height: `calc(300px - ${theme.header.height})`,
          }}
        >
          <HvVerticalNavigation>
            <HvVerticalNavigationTree
              collapsible
              defaultExpanded
              selected={selected}
              onChange={(event, data) => {
                event.preventDefault();

                setSelected(data.id);
              }}
              data={selectedHeaderItem.data ?? [selectedHeaderItem]}
            />
          </HvVerticalNavigation>
        </div>
      </div>
    );
  },
};
