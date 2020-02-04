import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import HelpIcon from "@hv/uikit-react-icons/dist/Generic/Help";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import Hitachi from "./resources/hitachi";

const iconBox = { width: 32, height: 32 };

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
      iconCallback: ({ isSelected }) => (
        <UserIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
      ),
      path: "/"
    },
    {
      label: "Events",
      iconCallback: ({ isSelected }) => (
        <CalendarIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
      ),
      path: "/events"
    },
    {
      label: "Work orders",
      path: "/work",
      iconCallback: ({ isSelected }) => (
        <CalendarIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
      )
    },
    {
      label: "Asset",
      iconCallback: ({ isSelected }) => (
        <PlaneIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
      ),
      path: "/asset"
    },
    {
      label: "Analytics",
      iconCallback: ({ isSelected }) => (
        <LineChartIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
      ),
      showNavIcon: true,
      subData: {
        data: [
          {
            label: "Model Effectiveness",
            iconCallback: ({ isSelected }) => (
              <UserIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
            ),
            path: "/meffectiveness"
          },
          {
            label: "Trend analysis",
            iconCallback: ({ isSelected }) => (
              <CalendarIcon
                boxStyles={iconBox}
                color={[isSelected && "atmo1"]}
              />
            ),
            path: "/tAnalysis"
          }
        ]
      }
    },
    {
      label: "Resources",
      iconCallback: ({ isSelected }) => (
        <PlaneIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
      ),
      path: "/Resources"
    }
  ]
};

const actionValues = [
  {
    label: "Profile",
    iconCallback: ({ isSelected }) => (
      <UserIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
    ),
    horizontalItemAction: (
      <UserIcon
        style={{ cursor: "pointer" }}
        boxStyles={iconBox}
        onClick={() => console.log("Profile")}
      />
    ),
    onVerticalClick: () => console.log("Profile"),
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: ({ isSelected }) => (
      <HelpIcon boxStyles={iconBox} color={[isSelected && "atmo1"]} />
    ),
    horizontalItemAction: (
      <HelpIcon
        style={{ cursor: "pointer" }}
        boxStyles={iconBox}
        onClick={() => console.log("Help")}
      />
    ),
    onVerticalClick: () => console.log("Help"),
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
  };

  const handleKeyDown = (index, subIndex, event) => {
    if (!isKeypress(event, KeyboardCodes.Enter)) return;
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
