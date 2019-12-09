import React, { useState } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import SettingIcon from "@hv/uikit-react-icons/dist/Generic/Settings";
import ActionsPopover from "./ActionsPopover";
import ActionsList from "./ActionsList";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import HelpIcon from "@hv/uikit-react-icons/dist/Generic/Help";

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
const StyledSettingIcon = withStyles(styles, { withTheme: true })(props => (
  <SettingIcon className={getClasses(props)} />
));
const StyledCalendarIcon = withStyles(styles, { withTheme: true })(props => (
  <CalendarIcon className={getClasses(props)} />
));
const StyledLineChartIcon = withStyles(styles, { withTheme: true })(props => (
  <LineChartIcon className={getClasses(props)} />
));
const StyledPlaneIcon = withStyles(styles, { withTheme: true })(props => (
  <PlaneIcon className={getClasses(props)} />
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

const navigationData = {
  showSearch: false,
  data: [
    {
      label: "Overview",
      iconCallback: state => <StyledUserIcon {...state} />,
      path: "/"
    },
    {
      label: "Events",
      iconCallback: state => <StyledCalendarIcon {...state} />,
      path: "/events"
    },
    {
      label: "Work orders",
      path: "/work",
      iconCallback: state => <StyledCalendarIcon {...state} />
    },
    {
      label: "Asset",
      iconCallback: state => <StyledPlaneIcon {...state} />,
      path: "/asset"
    },
    {
      label: "Analytics",
      iconCallback: state => <StyledLineChartIcon {...state} />,
      path: "/Analytics"
    },
    {
      label: "Resources",
      iconCallback: state => <StyledPlaneIcon {...state} />,
      path: "/Resources"
    }
  ]
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
    label: "Settings",
    iconCallback: state => <StyledSettingIcon {...state} />,
    horizontalItemAction: (
      <StyledSettingIcon
        style={{ cursor: "pointer" }}
        onClick={() => console.log("Settings")}
      />
    ),
    onVerticalClick: () => console.log("Settings"),
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
  responsivenessConfig
}) => {
  const handleSelection = (index, subIndex) => {
    setSelected([index, subIndex]);
  };

  const handleKeyDown = (index, subIndex, event) => {
    if (!isKeypress(event, KeyboardCodes.Enter)) {
      return;
    }
    handleSelection(index, subIndex);
  };

  const [selected, setSelected] = useState([0, -1]);

  return (
    <HvHeader
      id="test"
      position={position}
      // Brand
      companyLogo={companyLogo}
      productLogo={productLogo}
      label={label}
      selected={selected}
      // Navigation
      navigationStructure={navigationData}
      useRouter
      // onNavigationClick={handleChange}
      onNavigationClick={handleSelection}
      onNavigationKeyDown={handleKeyDown}
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      itemActions={itemActions}
      actionValues={actionValues}
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 600 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      label="Hitachi Service Name"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // User
      userIcon={<UserIcon />}
      userData={userData}
      // Responsiveness Settings
      responsivenessConfig={responsivenessConfig}
      // Actions
      itemActions={[
        <SettingIcon />,
        <ActionsPopover>
          <ActionsList eventId="id" dismiss={() => {}} />
        </ActionsPopover>
      ]}
    />
  </div>
);
