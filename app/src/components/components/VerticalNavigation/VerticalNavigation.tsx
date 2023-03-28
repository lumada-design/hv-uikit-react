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
import { useEffect, useState } from "react";

export const VerticalNavigation = () => {
  const [navigationDataState, setNavigationDataState] = useState<any[]>([]);

  useEffect(() => {
    setNavigationDataState([
      { id: "00", label: "Instalation Overview", icon: <Open /> },
      {
        id: "01",
        label: "Hardware",
        icon: <BarChart />,
        selectable: true,
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
        icon: <Deploy />,
        selectable: true,
        data: [
          {
            id: "02-01",
            label: "Buckets",
            icon: <Deploy />,
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
      {
        id: "03",
        label: "System 2",
        // icon: <Deploy />,
        selectable: true,
        data: [
          {
            id: "03-01",
            label: "Buckets",
          },
          {
            id: "03-02",
            label: "Admin Users",
          },
          {
            id: "03-03",
            label: "Log Bundle",
            data: [
              {
                id: "03-03-01",
                label: "Rest API",
              },
              {
                id: "03-03-02",
                label: "License",
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  const [value, setValue] = useState("01-01");

  const [show, setShow] = useState(true);

  const handleIsExpanded = () => {
    setShow(!show);
  };

  return (
    <div style={{ display: "flex", width: 220, height: 530 }}>
      <HvVerticalNavigation open={show} collapsedMode={"icon"}>
        <HvVerticalNavigationHeader
          title="Menu"
          onCollapseButtonClick={handleIsExpanded}
          collapseButtonProps={{
            "aria-label": "collapseButton",
            "aria-expanded": show,
          }}
        />
        <HvVerticalNavigationTree
          mode="treeview"
          collapsible
          defaultExpanded
          aria-label="Example 3 navigation"
          selected={value}
          onChange={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationDataState}
        />
        <HvVerticalNavigationActions>
          <HvVerticalNavigationAction label="Profile" icon={<User />} />
          <HvVerticalNavigationAction label="Logout" icon={<LogOut />} />
        </HvVerticalNavigationActions>
      </HvVerticalNavigation>
    </div>
  );
};
