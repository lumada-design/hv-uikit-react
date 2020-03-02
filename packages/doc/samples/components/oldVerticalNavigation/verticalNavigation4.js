import React from "react";
import classNames from "classnames";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import RawUserIcon from "@hv/uikit-react-icons/dist/User";
import RawCalendarIcon from "@hv/uikit-react-icons/dist/Calendar";
import RawPlaneIcon from "@hv/uikit-react-icons/dist/Plane";
import RawLineChartIcon from "@hv/uikit-react-icons/dist/LineChart";
import RawMachineS from "@hv/uikit-react-icons/dist/Machine";
import RawComponents from "@hv/uikit-react-icons/dist/Components";
import RawSettings from "@hv/uikit-react-icons/dist/Settings";
import RawHelp from "@hv/uikit-react-icons/dist/Help";
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

const MachineS = withStyles(styles, { withTheme: true })(props => (
  <RawMachineS className={getClasses(props)} />
));

const Components = withStyles(styles, { withTheme: true })(props => (
  <RawComponents className={getClasses(props)} />
));

const Settings = withStyles(styles, { withTheme: true })(props => (
  <RawSettings className={getClasses(props)} />
));

const Help = withStyles(styles, { withTheme: true })(props => (
  <RawHelp className={getClasses(props)} />
));

const data = {
  showSearch: true,
  data: [
    {
      label: "Advanced server DS120",
      iconCallback: state => <UserIcon {...state} />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: state => <CalendarIcon {...state} />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: state => <LineChartIcon {...state} />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: state => <Components {...state} />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: state => <Components {...state} />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: state => <PlaneIcon {...state} />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: state => <Components {...state} />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: state => <MachineS {...state} />
                },
                {
                  label: "Component HS-921",
                  iconCallback: state => <MachineS {...state} />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: state => <Components {...state} />
          }
        ]
      }
    }
  ]
};

const actionValues = [
  {
    label: "Profile",
    iconCallback: state => <UserIcon {...state} />,
    path: "route3"
  },
  {
    label: "Settings",
    iconCallback: state => <Settings {...state} />,
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: state => <Help {...state} />,
    path: "route3"
  }
];

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} actionValues={actionValues} />
  </div>
);
