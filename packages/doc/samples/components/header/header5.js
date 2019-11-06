import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvHeader from "@hv/uikit-react-core/dist/Header";
import HitachiLogo from "./resources/hitachi";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";

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
const StyledCalendarIcon = withStyles(styles, { withTheme: true })(CalendarIcon);
const StyledLineChartIcon = withStyles(styles, { withTheme: true })(LineChartIcon);
const StyledPlaneIcon = withStyles(styles, { withTheme: true })(PlaneIcon);

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
