import React from "react";
import HvBreadCrumb from "@hv/uikit-react-core/dist/BreadCrumb";

const data = [
  {
    label: "Label1",
    path: "route1"
  },
  {
    label: "Label2",
    path: "route2"
  },
  {
    label: "Label3",
    path: "route3"
  },
  {
    label: "Label4",
    path: "route4"
  },
  {
    label: "Label5",
    path: "route5"
  },
  {
    label: "Label6",
    path: "route6"
  },
  {
    label: "Label7",
    path: "route7"
  },
  {
    label: "Label8",
    path: "route8"
  }
];

export default (
  <HvBreadCrumb listRoute={data} useRouter={false} maxVisible={2} />
);
