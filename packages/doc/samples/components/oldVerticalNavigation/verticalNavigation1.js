import React from "react";
import HvVerticalNavigation from "@hv/uikit-react-core/dist/VerticalNavigation";
import { Calendar, LineChart, Plane, User } from "@hv/uikit-react-icons/dist";

const data = {
  showSearch: false,
  data: [
    {
      label: "Advanced server DS120",
      iconCallback: ({ isSelected }) => (
        <User color={isSelected ? "atmo1" : undefined} />
      )
    },
    {
      label: "Advanced server DS122",
      iconCallback: ({ isSelected }) => (
        <Calendar color={isSelected ? "atmo1" : undefined} />
      )
    },
    {
      label: "Advanced server DS250"
    },
    {
      label: "Advanced server DS530",
      iconCallback: ({ isSelected }) => (
        <Plane color={isSelected ? "atmo1" : undefined} />
      )
    },
    {
      label: "Advanced server DS555",
      selected: false,
      iconCallback: ({ isSelected }) => (
        <LineChart color={isSelected ? "atmo1" : undefined} />
      )
    }
  ]
};

export default (
  <div style={{ height: "700px" }}>
    <HvVerticalNavigation values={data} onClick={e => console.log(e)} />
  </div>
);
