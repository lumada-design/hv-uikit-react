import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationHeader,
  HvVerticalNavigationTree,
} from "@hitachivantara/uikit-react-core";
import {
  BarChart,
  Deploy,
  LogOut,
  Open,
  User,
} from "@hitachivantara/uikit-react-icons";

const navigationData = [
  {
    id: "menu1",
    label: "Menu 1",
    path: "",
    icon: <Open />,
    data: [
      {
        id: "menu1-1",
        label: "Menu 1-1",
        path: "",
        icon: <Open />,
        parent: null,
      },
      {
        id: "menu1-2",
        label: "Menu 1-2",
        path: "",
        icon: <BarChart />,
        data: [
          {
            id: "menu1-2-1",
            label: "Menu 1-2-1",
            path: "",
            icon: <Open />,
            parent: null,
          },
          {
            id: "menu1-2-2",
            label: "Menu 1-2-2",
            path: "",
            icon: <BarChart />,
            parent: null,
          },
          {
            id: "menu1-2-3",
            label: "Menu 1-2-3",
            path: "",
            icon: <Deploy />,
            parent: null,
          },
        ],
        parent: null,
      },
      {
        id: "menu1-3",
        label: "Menu 1-3",
        path: "",
        icon: <Deploy />,
        parent: null,
      },
    ],
    parent: null,
  },
  {
    id: "menu2",
    label: "Menu 2",
    path: "",
    icon: <BarChart />,
    parent: null,
  },
  {
    id: "menu3",
    label: "Menu 3",
    path: "",
    icon: <Deploy />,
    parent: null,
  },
];

export const MobileNavigation = () => {
  const [value, setValue] = useState("menu1-3");
  const [show, setShow] = useState(true);

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const handleIsExpanded = () => {
    setShow(!show);
  };

  return (
    <HvVerticalNavigation open={show} slider={isXs}>
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
        aria-label="Example 4 navigation slider"
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
