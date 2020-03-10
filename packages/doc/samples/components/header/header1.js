import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HvHeader, {
  HvHeaderBrand,
  HvHeaderActions,
  HvHeaderNavigation
} from "@hv/uikit-react-core/dist/Header";
import HvButton from "@hv/uikit-react-core/dist/Button";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import { Alert, Menu, User } from "@hv/uikit-react-icons/dist";
import HitachiLogo from "./assets/HitachiLogo";

import useTheme from "@hv/uikit-react-core/dist/styles/useTheme";

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

const HeaderSample = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("3-2");
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (e, selectedItem) => {
    setSelected(selectedItem.id);
  };

  return (
    <HvHeader position="relative">
      {!isMdUp && (
        <HvButton category="icon" onClick={() => console.log("menu")}>
          <Menu />
        </HvButton>
      )}
      <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
      {isMdUp && (
        <HvHeaderNavigation
          data={navigationData}
          selected={selected}
          onClick={handleChange}
        />
      )}
      <HvHeaderActions>
        <HvButton
          category="icon"
          onClick={() => console.log("alerts")}
          aria-label="Open Notifications panel"
        >
          <HvBadge count={1} icon={<Alert />} />
        </HvButton>
        {isMdUp && (
          <HvButton
            category="icon"
            onClick={() => console.log("user")}
            aria-label="Open User panel"
          >
            <User />
          </HvButton>
        )}
      </HvHeaderActions>
    </HvHeader>
  );
};

export default <div style={{ height: 100 }}><HeaderSample /></div>;
