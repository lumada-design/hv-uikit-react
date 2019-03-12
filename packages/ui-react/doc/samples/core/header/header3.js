import React, { useState } from "react";
import HvHeader from "@hv-ui/react/core/Header";
import SettingIcon from "@hv-ui/icons/core/S-icons/Settings16";
import TestLogo from "./resources/testlogo.svg";
import photo from "./resources/user.png";

const userData = {
  name: "Andrew Jennings",
  role: "maintenance manager"
};

const userClick = () => alert("clicked");

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
  <div style={{ overflowX: "auto", overflowY: "hidden" }}>
    <SimpleHeaderController
      position="static"
      // Brand
      productLogo={TestLogo}
      productText="Hitachi Content Intelligence"
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
