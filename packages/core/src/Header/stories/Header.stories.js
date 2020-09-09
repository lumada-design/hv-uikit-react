/* eslint-disable no-alert */
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Alert, Menu, User } from "@hv/uikit-react-icons/dist";
import { HvBadge, HvButton } from "../..";
import HvHeader, { HvHeaderActions, HvHeaderBrand, HvHeaderNavigation } from "..";
import HitachiLogo from "./assets/HitachiLogo";

export default {
  title: "Patterns/Navigation System/Horizontal Navigation",
  parameters: {
    v3: true,
    componentSubtitle: null,
    usage: "import { HvHeader } from '@hv/uikit-react-core/dist'",
    subcomponents: { HvHeaderActions, HvHeaderBrand, HvHeaderNavigation }
  },
  component: HvHeader,
  decorators: [storyFn => <div style={{ minHeight: 100 }}>{storyFn()}</div>]
};

const navigationData = [
  {
    id: "1",
    label: "Overview",
    data: [
      {
        id: "1-1",
        label: "Model Effectiveness 1"
      },
      {
        id: "1-2",
        label: "Trend Analysis 1-2"
      }
    ]
  },
  {
    id: "2",
    label: "Events"
  },
  {
    id: "3",
    label: "Work Orders",
    data: [
      {
        id: "3-1",
        label: "Model Effectiveness 3-1"
      },
      {
        id: "3-2",
        label: "Trend Analysis 3-2"
      }
    ]
  },
  {
    id: "4",
    label: "Asset"
  },
  {
    id: "5",
    label: "Analytics",
    data: [
      {
        id: "5-1",
        label: "Model Effectiveness 5-1"
      },
      {
        id: "5-2",
        label: "Trend Analysis 5-2"
      }
    ]
  }
];

export const Main = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("3-2");
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (e, selectedItem) => {
    setSelected(selectedItem.id);
  };

  return (
    <HvHeader position="relative">
      {!isMdUp && (
        <HvButton icon onClick={() => console.log("menu")}>
          <Menu />
        </HvButton>
      )}
      <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
      {isMdUp && (
        <HvHeaderNavigation data={navigationData} selected={selected} onClick={handleChange} />
      )}
      <HvHeaderActions>
        <HvButton icon onClick={() => console.log("alerts")} aria-label="Open Notifications panel">
          <HvBadge count={1} icon={<Alert />} />
        </HvButton>
        {isMdUp && (
          <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
            <User />
          </HvButton>
        )}
      </HvHeaderActions>
    </HvHeader>
  );
};

Main.parameters = {
  v3: true,
  eyes: {
    // waiting until all elements are rendered (issue #1794)
    waitBeforeScreenshot: ".HvHeaderMenuBar-active"
  }
};
