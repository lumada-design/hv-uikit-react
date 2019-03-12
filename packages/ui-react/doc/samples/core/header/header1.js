import React, { useState } from "react";
import HvHeader from "@hv-ui/react/core/Header";
import UserIcon from "@hv-ui/icons/core/S-icons/User16";
import SettingIcon from "@hv-ui/icons/core/S-icons/Settings16";
import HelpIcon from "@hv-ui/icons/core/S-icons/Help16";
import HitachiLogo from "./resources/hitachi";

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

const navigationData = [
  {
    label: "Overview",
    path: "/"
  },
  {
    label: "events",
    path: "/events"
  },
  {
    label: "work orders",
    path: "/work"
  },
  {
    label: "asset",
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
];

const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  productText,
  itemActions,
  userData,
  userIcon,
  userClick
}) => {
  const [selected, setSelected] = useState(0);

  const handleChange = index => {
    setSelected(index);
  };

  return (
    <HvHeader
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      productText={productText}
      // Navigation
      navigationData={navigationData}
      onNavigationClick={handleChange}
      selected={selected}
      useRouter
      // User
      userData={userData}
      userIcon={userIcon}
      userClick={userClick}
      // Actions
      itemActions={itemActions}
    />
  );
};

export default (
  <div style={{overflowX: "auto", overflowY: "hidden"}}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      productText="Maintenance Insights"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // User
      userIcon={<UserIcon />}
      userClick={() => alert("clicked")}
      // Actions
      itemActions={[<SettingIcon />, <HelpIcon />]}
    />
  </div>
);
