import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import RawUserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import RawCalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import RawPlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import RawLineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  box: {
    padding: "7px",
    width: "32px",
    height: "32px"
  }
});

const UserIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawUserIcon className={classes.box} color={color} />;
  }
);

const CalendarIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawCalendarIcon className={classes.box} color={color} />;
  }
);

const LineChartIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawLineChartIcon className={classes.box} color={color} />;
  }
);

const PlaneIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawPlaneIcon className={classes.box} color={color} />;
  }
);

const data = {
  showSearch: false,
  data: [
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS250"
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />
    },
    {
      label: "Advanced server DS555",
      selected: false,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />
    }
  ]
};

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} onClick={e => console.log(e)} />
  </div>
);
