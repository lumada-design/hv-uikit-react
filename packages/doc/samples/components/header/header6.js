import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import AlertIcon from "@hv/uikit-react-icons/dist/Generic/Alert";
import HvBadge from "@hv/uikit-react-core/dist/Badge";

import HitachiLogo from "./resources/hitachi";

const styles = {
  rootS: {
    width: "30px",
    height: "30px",
    "&>svg": {
      margin: "7px"
    }
  }
};

const StyledUserIcon = withStyles(styles, { withTheme: true })(UserIcon);
const StyledAlertIcon = withStyles(styles, { withTheme: true })(AlertIcon);

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
    iconCallback: (state) => <StyledUserIcon {...state}/>,
    horizontalItemAction: <StyledUserIcon style={{cursor: "pointer"}} onClick={() => alert("Profile")} />,
    onVerticalClick: () => alert("Profile"),
    path: "route3"
  },
  {
    label: "Notifications",
    iconCallback: (state) => <StyledAlertIcon {...state}/>,
    horizontalItemAction:<HvBadge count={88} icon={<StyledAlertIcon onClick={() => alert("Notification")} />} />,
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
