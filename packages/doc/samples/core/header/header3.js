/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-core/Header";
import SettingIcon from "@hv/uikit-react-icons/Settings.S";
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
