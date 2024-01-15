import React from "react";
import { Operation, Tool } from "@hitachivantara/uikit-react-icons";

const headerConfiguration = [
  {
    id: "01",
    label: "System",
    icon: <Tool />,
    onClick: () => console.log("01"),
    data: [
      {
        id: "01-01",
        label: "SCPodF",
        onClick: () => console.log("01-01"),
        data: [
          {
            id: "01-01-01",
            label: "Compute",
            onClick: () => console.log("01-01-01"),
            disabled: true
          },
          {
            id: "01-01-02",
            label: "Storage",
            onClick: () => console.log("01-01-02")
          },
          {
            id: "01-01-03",
            label: "Ethernet",
            onClick: () => console.log("01-01-03")
          },
          {
            id: "01-01-04",
            label: "Fiber Channel",
            onClick: () => console.log("01-01-04"),
            payload: { path: "/hello/world", params: { a: 2, b: "3" } }
          }
        ]
      }
    ]
  },
  {
    id: "02",
    label: "Administration",
    icon: <Operation />,
    onClick: () => console.log("02"),
    data: [
      {
        id: "02-01",
        label: "Rest API",
        onClick: () => console.log("02-01")
      },
      {
        id: "02-02",
        label: "License",
        onClick: () => console.log("02-02")
      },
      {
        id: "02-03",
        label: "Log Bundle",
        onClick: () => console.log("02-03"),
        data: [
          {
            id: "02-03-01",
            label: "Rest API",
            onClick: () => console.log("02-03-01")
          },
          {
            id: "02-03-02",
            label: "License",
            onClick: () => console.log("02-03-02")
          }
        ]
      },
      {
        id: "02-04",
        label: "Log Bundle",
        onClick: () => console.log("02-04")
      }
    ]
  },
  {
    id: "03",
    label: "Analytics",
    data: [
      {
        id: "03-01",
        label: "Model Effectiveness"
      }
    ]
  },
  {
    id: "04",
    label: "Summary"
  }
];

export default headerConfiguration;
