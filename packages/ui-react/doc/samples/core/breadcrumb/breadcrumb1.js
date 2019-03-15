import React from "react";
import HvBreadCrumb from "@hv-ui/react/core/BreadCrumb";

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
    path: "route2"
  },
  {
    label: "Label5",
    path: "route3"
  },
  {
    label: "Label6",
    path: "route2"
  },
  {
    label: "Label7",
    path: "route3"
  },
  {
    label: "Label8",
    path: "route2"
  },
  {
    label: "Label9",
    path: "route3"
  }
];

export default <HvBreadCrumb listRoute={data} useRouter={false} />;
