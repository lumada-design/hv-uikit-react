import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/User.S";
import SettingIcon from "@hv/uikit-react-icons/dist/Settings.S";
import ActionsPopover from "./ActionsPopover";
import ActionsList from "./ActionsList";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import HelpIcon from "@hv/uikit-react-icons/dist/Help.S";

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
      path: "/Analytics",
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

const userData = {
  name: "Andrew Jennings",
  role: "maintenance manager"
};

const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  label,
  itemActions,
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
      selected={selected}
      // Navigation
      navigationStructure={navigationData}
      useRouter
      // onNavigationClick={handleChange}
      onNavigationClick={handleSelection}
      onNavigationKeyDown={handleKeyDown}
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      itemActions={itemActions}
      actionValues={actionValues}
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 600 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      label="Hitachi Service Name"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // User
      userIcon={<UserIcon />}
      userData={userData}
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      itemActions={[
        <SettingIcon />,
        <ActionsPopover>
          <ActionsList eventId="id" dismiss={() => {}} />
        </ActionsPopover>
      ]}
    />
  </div>
);
