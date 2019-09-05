import React, { useState } from "react";
import isNil from "lodash/isNil";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import HitachiLogo from "./resources/hitachi";
import UserIcon from "@hv/uikit-react-icons/dist/User.S";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";

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
            label: "Trend Analysis",
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


const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  responsivenessConfig,
  label
}) => {
  const [selected, setSelected] = useState([0, -1]);

  const handleSelection = (index, subIndex) => {
    setSelected([index, subIndex]);
  }

  const handleKeyDown = (index, subIndex, event) => {
    if(!isKeypress(event, KeyboardCodes.Enter)) {
      return
    }
    handleSelection(index, subIndex);
  };

  return (
    <HvHeader
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      label={label}
      // Navigation
      navigationStructure={navigationData}
      onNavigationClick={handleSelection}
      onNavigationKeyDown={handleKeyDown}
      selected={selected}
      responsivenessConfig={responsivenessConfig}
      useRouter
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 400 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      // Navigation
      navigationData={navigationData}
      responsivenessConfig={responsivenessConfig}
    />
  </div>
);
