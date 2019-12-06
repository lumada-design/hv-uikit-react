import React, { useState } from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import HitachiLogo from "./resources/hitachi";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";

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

const StyledUserIcon = withStyles(styles, { withTheme: true })(props => 
  <UserIcon className={getClasses(props)} />
);
const StyledCalendarIcon = withStyles(styles, { withTheme: true })(props => 
  <CalendarIcon className={getClasses(props)} />
);
const StyledLineChartIcon = withStyles(styles, { withTheme: true })(props => 
  <LineChartIcon className={getClasses(props)} />
);
const StyledPlaneIcon = withStyles(styles, { withTheme: true })(props => 
  <PlaneIcon className={getClasses(props)} />
);

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
      iconCallback: (state) => <StyledUserIcon {...state}/>,
      path: "/"
    },
    {
      label: "Events",
      iconCallback: (state) => <StyledCalendarIcon {...state}/>,
      path: "/events"
    },
    {
      label: "Work orders",
      path: "/work",
      iconCallback: (state) => <StyledCalendarIcon {...state}/>
    },
    {
      label: "Asset",
      iconCallback: (state) => <StyledPlaneIcon {...state}/>,
      path: "/asset"
    },
    {
      label: "Analytics",
      iconCallback: (state) => <StyledLineChartIcon {...state}/>,
      showNavIcon: true,
      path: "/Analytics",
      subData: {
        data: [
          {
            label: "Model Effectiveness",
            iconCallback: (state) => <StyledUserIcon {...state}/>,
            path: "/meffectiveness"
          },
          {
            label: "Trend Analysis",
            iconCallback: (state) => <StyledCalendarIcon {...state}/>,
            path: "/tAnalysis"
          }
        ]
      }
    },
    {
      label: "Resources",
      iconCallback: (state) => <StyledPlaneIcon {...state}/>,
      path: "/Resources"
    }
  ]
};


const SimpleHeaderController = ({
  position,
  navigationData,
  companyLogo,
  productLogo,
  responsivenessConfig,
  label
}) => {
  const [selected, setSelected] = useState([0, -1]);

  const handleSelection = (index, subIndex) => {
    setSelected([index, subIndex]);
  }

  const handleKeyDown = (index, subIndex, event) => {
    if(!isKeypress(event, KeyboardCodes.Enter)) {
      return
    }
    handleSelection(index, subIndex);
  };

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
      responsivenessConfig={responsivenessConfig}
      useRouter
    />
  );
};

export default (
  <div style={{ overflowX: "auto", overflowY: "hidden", height: 400 }}>
    <SimpleHeaderController
      position="static"
      // Brand
      companyLogo={<Hitachi />}
      // Navigation
      navigationData={navigationData}
      responsivenessConfig={responsivenessConfig}
    />
  </div>
);
