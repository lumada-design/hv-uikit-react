import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import SettingIcon from "@hv/uikit-react-icons/dist/DawnTheme/Settings.S";
import HelpIcon from "@hv/uikit-react-icons/dist/DawnTheme/Help.S";
import HitachiLogo from "./resources/hitachi";
import isNil from "lodash/isNil";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

const responsivenessConfig = {
  showHbMenus: "md",
  showNavigation: "lg",
  showUser: "md",
  showActions: "md",
  centerAlignElement: "xs"
};

const navigationData = {
  showSearch: false,
  data: [
    {
      label: "Overview",
      leftIcon: UserIcon,
      path: "/"
    },
    {
      label: "Events",
      leftIcon: CalendarIcon,
      path: "/events"
    },
    {
      label: "Work orders",
      path: "/work",
      leftIcon: CalendarIcon
    },
    {
      label: "Asset",
      leftIcon: PlaneIcon,
      path: "/asset"
    },
    {
      label: "Analytics",
      leftIcon: LineChartIcon,
      showNavIcon: true,
      path: "/Analytics",
      subData: {
        data: [
          {
            label: "Model Effectiveness",
            leftIcon: UserIcon,
            path: "/meffectiveness"
          },
          {
            label: "Trend analysis",
            leftIcon: CalendarIcon,
            path: "/tAnalysis"
          }
        ]
      }
    },
    {
      label: "Resources",
      leftIcon: PlaneIcon,
      path: "/Resources"
    }
  ]
};

const actionValues = [
  {
    label: "Profile",
    leftIcon: UserIcon,
    horizontalItemAction:<UserIcon style={{cursor: "pointer"}} onClick={() => alert("Profile")} />,
    onVerticalClick: () => alert("Profile"),
    path: "route3"
  },
  {
    label: "Settings",
    leftIcon: SettingIcon,
    horizontalItemAction:<SettingIcon style={{cursor: "pointer"}} onClick={() => alert("Settings")}/>,
    onVerticalClick: () => alert("Settings"),
    path: "route3"
  },
  {
    label: "Help",
    leftIcon: HelpIcon,
    horizontalItemAction:<HelpIcon style={{cursor: "pointer"}} onClick={() => alert("Help")}/>,
    onVerticalClick: () => alert("Help"),
    path: "route3"
  }
];

const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  label,
  responsivenessConfig
}) => {

  const handleSelection = (index, subIndex) => {
    setSelected([index, subIndex]);
  }

  const handleKeyDown = (index, subIndex, event) => {
    if(!isKeypress(event, KeyboardCodes.Enter)) {
      return
    }
    handleSelection(index, subIndex);
  };

  const [selected, setSelected] = useState([0, -1]);

  return (
    <HvHeader
      id="test"
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      label={label}
      // Navigation
      navigationStructure={navigationData}
      useRouter
      selected={selected}
      onNavigationClick={handleSelection}
      onNavigationKeyDown={handleKeyDown}
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      actionValues={actionValues}
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 600 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      label="Maintenance Insights"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      actionValues={actionValues}
    />
  </div>
);
