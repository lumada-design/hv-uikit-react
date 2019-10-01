import React from "react";
import List from "@hv/uikit-react-core/dist/List";
import UserIcon from "@hv/uikit-react-icons/dist/DawnTheme/User.S";
import CalendarIcon from "@hv/uikit-react-icons/dist/DawnTheme/Calendar.S";
import PlaneIcon from "@hv/uikit-react-icons/dist/DawnTheme/Plane.S";
import LineChartIcon from "@hv/uikit-react-icons/dist/DawnTheme/LineChart.S";

const data = [
  {
    label: "Advanced server DS120",
    selected: false,
    leftIcon: props => <UserIcon {...props} />
  },
  {
    label: "Advanced server DS122",
    selected: false,
    leftIcon: props => <CalendarIcon {...props}/>
  },
  {
    label: "Advanced server DS250",
    selected: true
  },
  {
    label: "Advanced server DS530",
    selected: false,
    disabled: true,
    leftIcon: props => <PlaneIcon {...props}/>
  },
  {
    label: "Advanced server DS555",
    selected: false,
    leftIcon: props => <LineChartIcon {...props}/>
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} selectDefault />
  </div>
);
