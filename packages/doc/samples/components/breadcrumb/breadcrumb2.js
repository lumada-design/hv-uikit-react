import React from "react";
import HvBreadCrumb from "@hv/uikit-react-core/dist/BreadCrumb";

const data = [
  {
    label: "Label 1",
    path: "route1"
  },
  {
    label: "Label 2",
    path: "route2"
  },
  {
    label: "Label 3",
    path: "route3"
  },
  {
    label: "Label 4",
    path: "route4"
  },
  {
    label: "Label 5",
    path: "route5"
  },
  {
    label: "Label 6",
    path: "route6"
  },
  {
    label: "Label 7",
    path: "route7"
  }
];

export default (
  <HvBreadCrumb
    listRoute={data}
    useRouter={false}
    maxVisible={5}
    id="breadcrumb2"
    aria-label="Breadcrumb"
  />
);
