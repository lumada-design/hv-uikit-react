import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import SettingIcon from "@hv/uikit-react-icons/dist/Generic/Settings";
import HelpIcon from "@hv/uikit-react-icons/dist/Generic/Help";
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
const StyledSettingIcon = withStyles(styles, { withTheme: true })(SettingIcon);
const StyledHelpIcon = withStyles(styles, { withTheme: true })(HelpIcon);

const Hitachi = () => <HitachiLogo style={{ width: "72px" }} />;

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
    iconCallback: (state) => <StyledUserIcon {...state} />,
    horizontalItemAction:<StyledUserIcon style={{cursor: "pointer"}} onClick={() => alert("Profile")} />,
    onVerticalClick: () => alert("Profile"),
    path: "route3"
  },
  {
    label: "Settings",
    iconCallback: (state) => <StyledSettingIcon {...state} />,
    horizontalItemAction:<StyledSettingIcon style={{cursor: "pointer"}} onClick={() => alert("Settings")}/>,
    onVerticalClick: () => alert("Settings"),
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: (state) => <StyledHelpIcon {...state} />,
    horizontalItemAction:<StyledHelpIcon style={{cursor: "pointer"}} onClick={() => alert("Help")}/>,
    onVerticalClick: () => alert("Help"),
    path: "route3"
  }
];

const SimpleHeaderController = ({
  position,
  companyLogo,
  productLogo,
  label,
  responsivenessConfig
}) => {

  return (
    <HvHeader
      id="test"
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      label={label}
      // Navigation
      useRouter
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      actionValues={actionValues}
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 600 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      label="Maintenance Insights"
      selected={0}
      useRouter
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      actionValues={actionValues}
    />
  </div>
);
