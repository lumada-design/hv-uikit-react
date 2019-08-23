import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import SettingIcon from "@hv/uikit-react-icons/dist/Settings.S";
import TestLogo from "./resources/testlogo.svg";
import photo from "./resources/user.png";

const userData = {
  name: "Andrew Jennings",
  role: "maintenance manager"
};

const navigationData = [
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
];

const userClick = () => alert("clicked");

const SimpleHeaderController = ({
  position,
  companyLogo,
  productLogo,
  label,
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
      navigationData={navigationData}
      onNavigationClick={handleChange}
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      label={label}
      // Navigation
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
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 400 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      productLogo={TestLogo}
      label="Hitachi Content Intelligence"
      // Navigation
      useRouter
      // User
      userIcon={photo}
      userData={userData}
      userClick={userClick}
      itemActions={[<SettingIcon />]}
    />
  </div>
);
