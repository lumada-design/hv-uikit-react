import React from "react";
import classNames from "classnames";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import RawUserIcon from "@hv/uikit-react-icons/dist/User";
import RawCalendarIcon from "@hv/uikit-react-icons/dist/Calendar";
import RawPlaneIcon from "@hv/uikit-react-icons/dist/Plane";
import RawLineChartIcon from "@hv/uikit-react-icons/dist/LineChart";
import withStyles from "@material-ui/core/styles/withStyles";

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

const UserIcon = withStyles(styles, { withTheme: true })(props => (
  <RawUserIcon className={getClasses(props)} />
));

const CalendarIcon = withStyles(styles, { withTheme: true })(props => (
  <RawCalendarIcon className={getClasses(props)} />
));

const LineChartIcon = withStyles(styles, { withTheme: true })(props => (
  <RawLineChartIcon className={getClasses(props)} />
));

const PlaneIcon = withStyles(styles, { withTheme: true })(props => (
  <RawPlaneIcon className={getClasses(props)} />
));

const data = {
  showSearch: false,
  data: [
    {
      label: "Advanced server DS120",
      iconCallback: state => <UserIcon {...state} />
    },
    {
      label: "Advanced server DS122",
      iconCallback: state => <CalendarIcon {...state} />
    },
    {
      label: "Advanced server DS250"
    },
    {
      label: "Advanced server DS530",
      iconCallback: state => <PlaneIcon {...state} />
    },
    {
      label: "Advanced server DS555",
      selected: false,
      iconCallback: state => <LineChartIcon {...state} />
    }
  ]
};

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} onClick={e => console.log(e)} />
  </div>
);
