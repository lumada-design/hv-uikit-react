import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/User.S";
import HelpIcon from "@hv/uikit-react-icons/dist/Help.S";
import HitachiLogo from "./resources/hitachi";

import HvBadge from "@hv/uikit-react-core/dist/Badge";
import AlertS from "@hv/uikit-react-icons/dist/DawnTheme/Alert.S";

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

const navigationData = {
  data: [
    {
      label: "Overview",
      path: "/"
    },
    {
      label: "Events",
      path: "/events"
    },
    {
      label: "Work orders",
      path: "/work"
    },
    {
      label: "Asset",
      path: "/asset"
    },
    {
      label: "Analytics",
      path: "/Analytics"
    },
    {
      label: "Resources",
      path: "/Resources"
    }
  ]
};

const responsivenessConfig = {
  showHbMenus: "md",
  showNavigation: "lg",
  showUser: "md",
  showActions: "md",
  centerAlignElement: "xs"
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
    label: "Notifications",
    leftIcon: AlertS,
    horizontalItemAction:<HvBadge count={88} icon={<AlertS onClick={() => alert("Notification")} />} />,
    onVerticalClick: () => alert("Notifications"),
    path: "route3"
  }
];

const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  label,
  actionValues,
  responsivenessConfig
}) => {
  const [selected, setSelected] = useState(0);

  const handleSelection = (index) => {
    setSelected(index);
  }

  const handleKeyDown = (index, event) => {
    if(!isKeypress(event, KeyboardCodes.Enter)) {
      return
    }
    handleSelection(index, subIndex);
  };

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
      onNavigationClick={handleSelection}
      onNavigationKeyDown={handleKeyDown}
      selected={selected}
      useRouter
      // Actions
      actionValues={actionValues}
      responsivenessConfig={responsivenessConfig}
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 400 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      label="Maintenance Insights"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // Actions
      actionValues={actionValues}
      responsivenessConfig={responsivenessConfig}
    />
  </div>
);
