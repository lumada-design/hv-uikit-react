import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";
import MachineS from "@hv/uikit-react-icons/dist/DawnTheme/Machine.S";
import Components from "@hv/uikit-react-icons/dist/DawnTheme/Components.S";

import Settings from "@hv/uikit-react-icons/dist/DawnTheme/Settings.S";
import Help from "@hv/uikit-react-icons/dist/DawnTheme/Help.S";

const data = {
  showSearch: true,
  data: [
    {
      label: "Advanced server DS120",
      leftIcon: UserIcon,
      path: "route3"
    },
    {
      label: "Advanced server DS121",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS122",
      showNavIcon: true,
      leftIcon: LineChartIcon,
      subData: {
        showSearch: false,
        data: [
          {
            label: "Variant Y-242",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-243",
            leftIcon: Components
          },
          {
            label: "Variant Y-245",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-246",
            leftIcon: Components
          },
          {
            label: "Variant Y-247",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-248",
            leftIcon: Components
          },
          {
            label: "Variant Y-249",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-250",
            leftIcon: Components
          },
          {
            label: "Variant Y-251",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-252",
            leftIcon: Components
          },
          {
            label: "Variant Y-253",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-254",
            leftIcon: Components
          },
          {
            label: "Variant Y-255",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-256",
            leftIcon: Components
          },
          {
            label: "Variant Y-257",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-258",
            leftIcon: Components
          },
          {
            label: "Variant Y-259",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-260",
            leftIcon: Components
          },
          {
            label: "Variant Y-261",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-262",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  leftIcon: MachineS
                },
                {
                  label: "Component HS-921",
                  leftIcon: MachineS
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS140",
      leftIcon: UserIcon,
      path: "route3"
    },
    {
      label: "Advanced server DS145",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      leftIcon: LineChartIcon,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  leftIcon: MachineS
                },
                {
                  label: "Component HS-921",
                  leftIcon: MachineS
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      leftIcon: UserIcon,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      leftIcon: LineChartIcon,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  leftIcon: MachineS
                },
                {
                  label: "Component HS-921",
                  leftIcon: MachineS
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      leftIcon: UserIcon,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      leftIcon: LineChartIcon,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  leftIcon: MachineS
                },
                {
                  label: "Component HS-921",
                  leftIcon: MachineS
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      leftIcon: UserIcon,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      leftIcon: LineChartIcon,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  leftIcon: MachineS
                },
                {
                  label: "Component HS-921",
                  leftIcon: MachineS
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS120",
      leftIcon: UserIcon,
      path: "route3"
    },
    {
      label: "Advanced server DS122",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS250",
      showNavIcon: true,
      leftIcon: LineChartIcon,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant Y-242",
            leftIcon: Components,
            path: "route3"
          },
          {
            label: "Variant Y-244",
            leftIcon: Components
          }
        ]
      }
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon,
      showNavIcon: true,
      subData: {
        showSearch: true,
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
              showSearch: true,
              data: [
                {
                  label: "Component KY-121",
                  leftIcon: MachineS
                },
                {
                  label: "Component HS-921",
                  leftIcon: MachineS
                }
              ]
            }
          },
          {
            label: "Variant X-335",
            leftIcon: Components
          }
        ]
      }
    }
  ]
};

const actionValues = [
  {
    label: "Profile",
    leftIcon: UserIcon,
    path: "route3"
  },
  {
    label: "Settings",
    leftIcon: Settings,
    path: "route3"
  },
  {
    label: "Help",
    leftIcon: Help,
    path: "route3"
  }
];

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} actionValues={actionValues} />
  </div>
);
