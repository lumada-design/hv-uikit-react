import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import HelpIcon from "@hv/uikit-react-icons/dist/Generic/Help";
import Hitachi from "./resources/hitachi";

const styles = theme => ({
  box: {
    width: "32px",
    height: "32px"
  },
  selected: {
    "& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo1
    }
  }
});

const getClasses = ({ classes, isSelected }) =>
  classNames(classes.box, isSelected && classes.selected);

const StyledUserIcon = withStyles(styles, { withTheme: true })(props => (
  <UserIcon className={getClasses(props)} />
));
const StyledHelpIcon = withStyles(styles, { withTheme: true })(props => (
  <HelpIcon className={getClasses(props)} />
));


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
    iconCallback: state => <StyledUserIcon {...state} />,
    horizontalItemAction: (
      <StyledUserIcon
        style={{ cursor: "pointer" }}
        onClick={() => console.log("Profile")}
      />
    ),
    onVerticalClick: () => console.log("Profile"),
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: state => <StyledHelpIcon {...state} />,
    horizontalItemAction: (
      <StyledHelpIcon
        style={{ cursor: "pointer" }}
        onClick={() => console.log("Help")}
      />
    ),
    onVerticalClick: () => console.log("Help"),
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
