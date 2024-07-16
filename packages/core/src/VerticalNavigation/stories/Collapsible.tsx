import { useState } from "react";
import {
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationHeader,
  HvVerticalNavigationTree,
} from "@hitachivantara/uikit-react-core";
import { BarChart, LogOut, User } from "@hitachivantara/uikit-react-icons";

const navigationData = [
  { id: "00", label: "Installation Overview" },
  {
    id: "01",
    label: "Hardware",
    icon: <BarChart />,
    data: [
      {
        id: "01-01",
        label: "Ambient Monitoring",
      },
      {
        id: "01-02",
        label: "Server Status Summary",
      },
    ],
  },
  {
    id: "02",
    label: "System",
    data: [
      {
        id: "02-01",
        label: "Buckets",
      },
      {
        id: "02-02",
        label: "Admin Users",
      },
      {
        id: "02-03",
        label: "Log Bundle",
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
    ],
  },
];

export const Collapsible = () => {
  const [value, setValue] = useState("01-01");
  const [show, setShow] = useState(false);

  const handleIsExpanded = () => {
    setShow(!show);
  };

  return (
    <HvVerticalNavigation open={show}>
      <HvVerticalNavigationHeader
        title="Menu"
        onCollapseButtonClick={handleIsExpanded}
        collapseButtonProps={{
          "aria-label": "collapseButton",
          "aria-expanded": show,
        }}
      />
      <HvVerticalNavigationTree
        collapsible
        defaultExpanded
        aria-label="Example 3 navigation"
        selected={value}
        onChange={(event, data) => setValue(data.id)}
        data={navigationData}
      />
      <HvVerticalNavigationActions>
        <HvVerticalNavigationAction label="Profile" icon={<User />} />
        <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
      </HvVerticalNavigationActions>
    </HvVerticalNavigation>
  );
};
