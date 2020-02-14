/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";

import VerticalNavigation, {
  Navigation,
  Actions,
  Action
} from "@hv/uikit-react-core/dist/NewVerticalNavigation";

import { Play, Stop } from "@hv/uikit-react-icons/dist/Generic";

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
        navigationLabel="Example 2 navigation"
        isCollapsable={true}
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
            onClick={(event, data) => {
              console.log("Action 1", event);
            }}
          />
          <Action
            label="Action 2"
            onClick={(event, data) => {
              console.log("Action 2", event);
            }}
          />
          <Action
            label="Action 3"
            icon={<Stop />}
            onClick={(event, data) => {
              console.log("Action 3", event);
            }}
          />
        </Actions>
      </VerticalNavigation>
    </div>
  );
}

export default <MyVerticalNavigation />;
