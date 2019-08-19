import React, { useState } from "react";
import HvHeader from "@hv/uikit-react-lab/dist/Header";
import HitachiLogo from "./resources/hitachi";
import {TimeS, EventS, GroupS, DocS, CalendarS, LineChartS, HelpS, SettingsS, UserS } from "@hv/uikit-react-icons/dist";


const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

const navigationData = [
  {
    label: "Overview",
    path: "/",
    icon: color => <TimeS color={color} />
  },
  {
    label: "events",
    path: "/events",
    icon: color => <EventS color={color} />
  },
  {
    label: "work orders",
    path: "/work",
    icon: color => <CalendarS color={color} />
  },
  {
    label: "asset",
    path: "/asset",
    icon: color => <GroupS color={color} />
  },
  {
    label: "Analytics",
    path: "/Analytics",
    icon: color => <LineChartS color={color} />
  },
  {
    label: "Resources",
    path: "/Resources",
    icon: color => <DocS color={color} />
  }
];

const itemActions = [
  {
    action: <SettingsS />,
    label: "Settings"
  },
  {
    action: <HelpS />,
    label: "Help"
  }
]

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
      id="test"
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
  <div style={{overflowX: "auto", height: "700px"}}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      label="Maintenance Insights"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // User
      userIcon={<UserS />}
      userClick={() => alert("clicked")}
      // Actions
      itemActions={itemActions}
    />
  </div>
);
