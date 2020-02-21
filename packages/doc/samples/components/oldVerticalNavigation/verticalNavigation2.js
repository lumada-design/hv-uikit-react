import React from "react";
import classNames from "classnames";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import RawUserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import RawCalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import RawPlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import RawLineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import RawMachineS from "@hv/uikit-react-icons/dist/Generic/Machine";
import RawComponents from "@hv/uikit-react-icons/dist/Generic/Components";
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

const data = {
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
        data: [
          {
            label: "Variant X-333",
            iconCallback: state => <Components {...state} />,
            showNavIcon: true,
            subData: {
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

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} onClick={e => console.log(e)} />
  </div>
);
