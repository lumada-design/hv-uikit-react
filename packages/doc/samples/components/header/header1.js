import React, { useState } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import SettingIcon from "@hv/uikit-react-icons/dist/Generic/Settings";
import HelpIcon from "@hv/uikit-react-icons/dist/Generic/Help";
import HitachiLogo from "./resources/hitachi";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";

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
const StyledPlaneIcon = withStyles(styles, { withTheme: true })(props => (
  <PlaneIcon className={getClasses(props)} />
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
      showNavIcon: true,
      path: "/Analytics",
      subData: {
        data: [
          {
            label: "Model Effectiveness",
            iconCallback: state => <StyledUserIcon {...state} />,
            path: "/meffectiveness"
          },
          {
            label: "Trend analysis",
            iconCallback: state => <StyledCalendarIcon {...state} />,
            path: "/tAnalysis"
          }
        ]
      }
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
    horizontalItemAction: <StyledUserIcon style={{ cursor: "pointer" }} onClick={() => console.log("Profile")} />,
    onVerticalClick: () => console.log("Profile"),
    path: "route3"
  },
  {
    label: "Settings",
    iconCallback: state => <StyledSettingIcon {...state} />,
    horizontalItemAction: <StyledSettingIcon style={{ cursor: "pointer" }} onClick={() => console.log("Settings")} />,
    onVerticalClick: () => console.log("Settings"),
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: state => <StyledHelpIcon {...state} />,
    horizontalItemAction: <StyledHelpIcon style={{ cursor: "pointer" }} onClick={() => console.log("Help")} />,
    onVerticalClick: () => console.log("Help"),
    path: "route3"
  }
];

const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  label,
  responsivenessConfig
}) => {
  const handleSelection = (index, subIndex) => {
    setSelected([index, subIndex]);
  };

  const handleKeyDown = (index, subIndex, event) => {
    if (!isKeypress(event, KeyboardCodes.Enter)) return;
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
      // Navigation
      navigationStructure={navigationData}
      useRouter
      selected={selected}
      onNavigationClick={handleSelection}
      onNavigationKeyDown={handleKeyDown}
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
