/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HvHeader } from "../../src";

const SimpleHeaderController = ({
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

export default SimpleHeaderController;
