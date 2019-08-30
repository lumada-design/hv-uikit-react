import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";

const data = {
  showSearch: false,
  data: [
    {
      label: "Advanced server DS120",
      leftIcon: UserIcon
    },
    {
      label: "Advanced server DS122",
      leftIcon: CalendarIcon
    },
    {
      label: "Advanced server DS250"
    },
    {
      label: "Advanced server DS530",
      leftIcon: PlaneIcon
    },
    {
      label: "Advanced server DS555",
      selected: false,
      leftIcon: LineChartIcon
    },
  ]
};

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} onClick={(e) => console.log(e)}/>
  </div>
);
