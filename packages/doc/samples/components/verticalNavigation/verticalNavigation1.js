import React from "react";

import VerticalNavigation, {
  Action,
  Actions,
  Navigation
} from "@hv/uikit-react-core/dist/VerticalNavigation";

import { LogOut, Tool, Operation, OpenBook, User } from "@hv/uikit-react-icons/dist";

const navigationData = [
  {
    id: "01",
    label: "System",
    icon: <Tool />,
    data: [
      {
        id: "01-01",
        label: "SCPodF",
        data: [
          {
            id: "01-01-01",
            label: "Compute"
          },
          {
            id: "01-01-02",
            label: "Storage"
          },
          {
            id: "01-01-03",
            label: "Ethernet"
          },
          {
            id: "01-01-04",
            label: "Fiber Channel",
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
    data: [
      {
        id: "02-01",
        label: "Rest API"
      },
      {
        id: "02-02",
        label: "License"
      },
      {
        id: "02-03",
        label: "Log Bundle",
        data: [
          {
            id: "02-03-01",
            label: "Rest API"
          },
          {
            id: "02-03-02",
            label: "License"
          }
        ]
      },
      {
        id: "02-04",
        label: "Log Bundle"
      }
    ]
  }
];

function MyVerticalNavigation() {
  const [value, setValue] = React.useState("02-03-02");

  return (
    <VerticalNavigation id="sample1" isCollapsable={false}>
      <Navigation
        label="Example 1 navigation"
        selected={value}
        onClick={(event, data) => {
          console.log(data);
          setValue(data.id);
        }}
        data={navigationData}
      />

      <Actions>
        <Action
          label="User"
          icon={<User />}
          onClick={event => {
            console.log("Action 1", event);
          }}
        />
        <Action
          label="Documentation"
          icon={<OpenBook />}
          onClick={event => {
            console.log("Action 2", event);
          }}
        />
        <Action
          label="Logout"
          icon={<LogOut />}
          onClick={event => {
            console.log("Action 3", event);
          }}
        />
      </Actions>
    </VerticalNavigation>
  );
}

export default <MyVerticalNavigation />;
