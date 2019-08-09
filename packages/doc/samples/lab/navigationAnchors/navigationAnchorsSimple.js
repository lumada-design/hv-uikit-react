import React from "react";
import HvNavigationAnchors from "@hv/uikit-react-lab/dist/NavigationAnchors";

const options = [
  {
    label: "Option1",
    value: "Value1"
  },
  {
    label: "Option2",
    value: "Value2"
  },
  {
    label: "Option3",
    value: "Value3"
  }
];

export default (
  <HvNavigationAnchors
    style={{ position: "auto", background: "red" }}
    href
    options={options}
    floating={false}
  />
);
