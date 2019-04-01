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
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv-ui/icons/core/icons/User.S";
import SettingIcon from "@hv-ui/icons/core/icons/Settings.S";
import HelpIcon from "@hv-ui/icons/core/icons/Help.S";
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
