import React from "react";
import List from "@hv/uikit-react-core/dist/List";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  box: {
    padding: "6px",
    width: "30px",
    height: "30px"
  },
  wrapper: {
    width: 240,
    padding: `${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  }
});

const StyledPlaneIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, disabled }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <PlaneIcon className={classes.box} color={color} />;
  }
);

const StyledUserIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <UserIcon className={classes.box} color={color} />;
  }
);

const StyledCalendarIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <CalendarIcon className={classes.box} color={color} />;
  }
);

const StyledLineChartIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <LineChartIcon className={classes.box} color={color} />;
  }
);

const data = [
  {
    label: "Advanced server DS120",
    selected: false,
    iconCallback: ({ isSelected }) =>
      !isSelected ? <StyledUserIcon /> : <StyledUserIcon selected />
  },
  {
    label: "Advanced server DS122",
    selected: false,
    iconCallback: ({ isSelected }) =>
      !isSelected ? <StyledCalendarIcon /> : <StyledCalendarIcon selected />
  },
  {
    label: "Advanced server DS250",
    selected: true
  },
  {
    label: "Advanced server DS530",
    selected: false,
    disabled: true,
    iconCallback: () => <StyledPlaneIcon disabled />
  },
  {
    label: "Advanced server DS555",
    selected: false,
    iconCallback: ({ isSelected }) =>
      !isSelected ? <StyledLineChartIcon /> : <StyledLineChartIcon selected />
  }
];

const ListWrapper = withStyles(styles, { withTheme: true })(
  ({ classes, children }) => <div className={classes.wrapper}>{children}</div>
);

export default (
  <ListWrapper>
    <List values={data} selectDefault />
  </ListWrapper>
);
