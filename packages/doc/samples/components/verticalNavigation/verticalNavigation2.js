import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";
import MachineS from "@hv/uikit-react-icons/dist/DawnTheme/Machine.S";
import Components from "@hv/uikit-react-icons/dist/DawnTheme/Components.S";

const data = {
  data: [
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
        data: [
          {
            label: "Variant X-333",
            leftIcon: Components,
            showNavIcon: true,
            subData: {
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

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} onClick={(e) => console.log(e)}/>
  </div>
);
