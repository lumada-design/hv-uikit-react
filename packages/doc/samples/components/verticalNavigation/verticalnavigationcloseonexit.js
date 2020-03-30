import React, { useState } from "react";

import VerticalNavigation, {
  Navigation,
  Actions,
  Action
} from "@hv/uikit-react-core/dist/VerticalNavigation";

import { Play, Stop } from "@hv/uikit-react-icons/dist";

const navigationData = [
  {
    id: "01",
    label: "System",
    icon: <Play />,
    data: [
      {
        id: "01-01",
        label: "SCPodF",
        data: [
          {
            id: "01-01-01",
            label: "Compute",
            disabled: true
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
            path: "/hello/world",
            params: { a: 2, b: "3" }
          }
        ]
      }
    ]
  },
  {
    id: "02",
    label: "Administration",
    icon: <Stop />,
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

const sampleContainerStyle = {
  height: "600px"
};

function MyVerticalNavigation() {
  const [value, setValue] = useState("02-03-02");

  return (
    <div style={sampleContainerStyle}>
      <VerticalNavigation
        id="sample4"
        navigationLabel="Example 2 navigation"
        isCollapsable
        closeOnExit
      >
        <Navigation
          label="Example 2 navigation"
          selected={value}
          onClick={(event, data) => {
            console.log(data);
            setValue(data.id);
          }}
          data={navigationData}
        />

        <Actions>
          <Action
            label="Action 1"
            icon={<Play />}
            onClick={event => {
              console.log("Action 1", event);
            }}
          />
          <Action
            label="Action 2"
            onClick={event => {
              console.log("Action 2", event);
            }}
          />
          <Action
            label="Action 3"
            icon={<Stop />}
            onClick={event => {
              console.log("Action 3", event);
            }}
          />
        </Actions>
      </VerticalNavigation>
    </div>
  );
}

export default <MyVerticalNavigation />;
