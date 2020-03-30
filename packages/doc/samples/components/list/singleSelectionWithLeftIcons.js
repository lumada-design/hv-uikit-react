import React from "react";
import classNames from "classnames";
import List from "@hv/uikit-react-core/dist/List";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import MachineIcon from "@hv/uikit-react-icons/dist/Generic/Machine";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  box: {
    width: "32px",
    height: "32px"
  },
  wrapper: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  selected: {
    "& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo1
    }
  },
  disabled: {
    "& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo7
    }
  }
});

const getClasses = ({ classes, isSelected, isDisabled }) =>
  classNames(classes.box, {
    [classes.selected]: isSelected,
    [classes.disabled]: isDisabled
  });

const StyledPlaneIcon = withStyles(styles, { withTheme: true })(props => (
  <PlaneIcon className={getClasses(props)} />
));

const StyledUserIcon = withStyles(styles, { withTheme: true })(props => (
  <UserIcon className={getClasses(props)} />
));

const StyledCalendarIcon = withStyles(styles, { withTheme: true })(props => (
  <CalendarIcon className={getClasses(props)} />
));

const StyledMachineIcon = withStyles(styles, { withTheme: true })(props => (
  <MachineIcon className={getClasses(props)} />
));

const StyledLineChartIcon = withStyles(styles, { withTheme: true })(props => (
  <LineChartIcon className={getClasses(props)} />
));

const data = [
  {
    label: "Advanced server DS120",
    selected: false,
    iconCallback: state => <StyledUserIcon {...state} />
  },
  {
    label: "Advanced server DS122",
    selected: false,
    iconCallback: state => <StyledCalendarIcon {...state} />
  },
  {
    label: "Advanced server DS250",
    selected: true,
    iconCallback: state => <StyledMachineIcon {...state} />
  },
  {
    label: "Advanced server DS530",
    selected: false,
    disabled: true,
    iconCallback: state => <StyledPlaneIcon {...state} />
  },
  {
    label: "Advanced server DS555",
    selected: false,
    iconCallback: state => <StyledLineChartIcon {...state} />
  }
];

const ListWrapper = withStyles(styles, {
  withTheme: true
})(({ classes, children }) => (
  <div className={classes.wrapper}>{children}</div>
));

// Passing the aria-label to the component is necessary in order for the component
// to meet accessibility requirements
const ariaProps = {
  "aria-label": "Single Selection List with Left Icons Title"
};

export default (
  <ListWrapper>
    <List values={data} selectDefault listProps={ariaProps} hasTooltips />
  </ListWrapper>
);
