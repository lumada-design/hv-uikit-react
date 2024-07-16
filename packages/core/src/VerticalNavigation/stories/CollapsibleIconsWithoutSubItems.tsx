import { useState } from "react";
import {
  HvVerticalNavigation,
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
  HvVerticalNavigationHeader,
  HvVerticalNavigationTree,
} from "@hitachivantara/uikit-react-core";
import {
  BarChart,
  Cloud,
  Deploy,
  LogOut,
  Open,
  User,
} from "@hitachivantara/uikit-react-icons";

const navigationData = [
  { id: "00", label: "Installation Overview", icon: <Open /> },
  {
    id: "01",
    label: "Hardware",
    icon: <BarChart />,
  },
  {
    id: "02",
    label: "System",
    icon: <Deploy />,
  },
  {
    id: "03",
    label: "System 2",
    icon: <Cloud />,
  },
];

export const CollapsibleIconsWithoutSubItems = () => {
  const [value, setValue] = useState("01-01");
  const [show, setShow] = useState(false);

  const handleIsExpanded = () => {
    setShow(!show);
  };

  return (
    <HvVerticalNavigation open={show} useIcons>
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
