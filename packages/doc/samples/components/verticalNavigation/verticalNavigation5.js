import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import RawUserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import RawCalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import RawPlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";
import RawLineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import RawMachineS from "@hv/uikit-react-icons/dist/Generic/Machine";
import RawComponents from "@hv/uikit-react-icons/dist/Generic/Components";
import RawSettings from "@hv/uikit-react-icons/dist/Generic/Settings";
import RawHelp from "@hv/uikit-react-icons/dist/Generic/Help";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  box: {
    padding: "6px",
    width: "30px",
    height: "30px"
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

const MachineS = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawMachineS className={classes.box} color={color} />;
  }
);

const Components = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawComponents className={classes.box} color={color} />;
  }
);

const Settings = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawSettings className={classes.box} color={color} />;
  }
);

const Help = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <RawHelp className={classes.box} color={color} />;
  }
);

const data = {
  showSearch: true,
  data: [
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />,
      path: "route3"
    },
    {
      label: "Advanced server DS121",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS122",
      showNavIcon: true,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />,
      subData: {
        showSearch: false,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-243",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-245",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-246",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-247",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-248",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-249",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-250",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-251",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-252",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-253",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-254",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-255",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-256",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-257",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-258",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-259",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-260",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          },
          {
            label: "Variant Y-261",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-262",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS140",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />,
      path: "route3"
    },
    {
      label: "Advanced server DS145",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <UserIcon /> : <UserIcon selected />,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <CalendarIcon /> : <CalendarIcon selected />
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      iconCallback: ({ isSelected }) =>
        !isSelected ? <LineChartIcon /> : <LineChartIcon selected />,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) =>
        !isSelected ? <PlaneIcon /> : <PlaneIcon selected />,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                },
                {
                  label: "Component HS-921",
                  iconCallback: ({ isSelected }) =>
                    !isSelected ? <MachineS /> : <MachineS selected />
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            iconCallback: ({ isSelected }) =>
              !isSelected ? <Components /> : <Components selected />
          }
        ]
      }
    }
  ]
};

const actionValues = [
  {
    label: "Profile",
    iconCallback: ({ isSelected }) =>
      !isSelected ? <UserIcon /> : <UserIcon selected />,
    path: "route3"
  },
  {
    label: "Settings",
    iconCallback: ({ isSelected }) =>
      !isSelected ? <Settings /> : <Settings selected />,
    path: "route3"
  },
  {
    label: "Help",
    iconCallback: ({ isSelected }) =>
      !isSelected ? <Help /> : <Help selected />,
    path: "route3"
  }
];

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} actionValues={actionValues} />
  </div>
);
