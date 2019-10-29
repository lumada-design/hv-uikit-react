import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import SettingIcon from "@hv/uikit-react-icons/dist/Generic/Settings";
import HitachiLogo from "./resources/hitachi";
import TestLogo from "./resources/testlogo.svg";

const styles = {
  rootS: {
    width: "30px",
    height: "30px",
    "&>svg": {
      margin: "7px"
    }
  }
};

const StyledSettingIcon = withStyles(styles, { withTheme: true })(SettingIcon);

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

const responsivenessConfig = {
  showHbMenus: "md",
  showNavigation: "lg",
  showUser: "md",
  showActions: "md",
  centerAlignElement: "xs"
};

const navigationData = {
  showSearch: false,
  data: [
    {
      label: "Overview",
      path: "/",
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

const actionValues = [
  {
    label: "Settings",
    iconCallback: (state) => <StyledSettingIcon {...state}/>,
    horizontalItemAction:<StyledSettingIcon style={{cursor: "pointer"}} onClick={() => alert("Settings")}/>,
    onVerticalClick: () => alert("Settings"),
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

  const handleSelection = (index, subIndex) => {
    setSelected([index, subIndex]);
  }

  const handleKeyDown = (index, subIndex, event) => {
    if(!isKeypress(event, KeyboardCodes.Enter)) {
      return
    }
    handleSelection(index, subIndex);
  };

  const [selected, setSelected] = useState([0, -1]);

  return (
    <HvHeader
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
      actionValues={actionValues}
      // Responsiveness Settings
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
      label="Application Name"
      productLogo={TestLogo}
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      actionValues={actionValues}
    />
  </div>
);
