import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import HitachiLogo from "./resources/hitachi";
import photo from "./resources/user.png";

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

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
      label={label}
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
      companyLogo={<Hitachi />}
      // User
      userIcon={photo}
      userData={userData}
    />
  </div>
);
