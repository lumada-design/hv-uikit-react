import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import SettingIcon from "@hv/uikit-react-icons/dist/DawnTheme/Settings.S";
import HelpIcon from "@hv/uikit-react-icons/dist/DawnTheme/Help.S";
import HitachiLogo from "./resources/hitachi";

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

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
  companyLogo,
  productLogo,
  label,
  responsivenessConfig
}) => {

  return (
    <HvHeader
      id="test"
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      label={label}
      // Navigation
      useRouter
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
      selected={0}
      useRouter
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      actionValues={actionValues}
    />
  </div>
);
