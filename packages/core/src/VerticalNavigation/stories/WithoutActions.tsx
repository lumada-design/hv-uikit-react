import { useState } from "react";
import {
  HvVerticalNavigation,
  HvVerticalNavigationTree,
} from "@hitachivantara/uikit-react-core";

const navigationData = [
  {
    id: "01",
    label: "System",
    data: [
      {
        id: "01-01",
        label: "SCPodF",
        data: [
          {
            id: "01-01-01",
            label: "Compute",
          },
          {
            id: "01-01-02",
            label: "Storage",
          },
          {
            id: "01-01-03",
            label: "Ethernet",
          },
          {
            id: "01-01-04",
            label: "Fiber Channel",
            payload: { path: "/hello/world", params: { a: 2, b: "3" } },
          },
        ],
      },
    ],
  },
  {
    id: "02",
    label: "Administration",
    data: [
      {
        id: "02-01",
        label: "Rest API",
      },
      {
        id: "02-02",
        label: "License",
      },
      {
        id: "02-03",
        label: "Some big text that shouldn't fit",
        data: [
          {
            id: "02-03-01",
            label: "Rest API",
          },
          {
            id: "02-03-02",
            label: "License",
          },
        ],
      },
      {
        id: "02-04",
        label: "Log Bundle",
      },
    ],
  },
];

export const WithoutActions = () => {
  const [value, setValue] = useState("02-03-02");

  return (
    <HvVerticalNavigation>
      <HvVerticalNavigationTree
        aria-label="Example 1 navigation"
        selected={value}
        onChange={(event, data) => {
          setValue(data.id);
        }}
        data={navigationData}
      />
    </HvVerticalNavigation>
  );
};
