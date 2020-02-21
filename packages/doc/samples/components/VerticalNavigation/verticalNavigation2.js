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

import React from "react";

import VerticalNavigation, {
  Navigation
} from "@hv/uikit-react-core/dist/VerticalNavigation";

import {
  Tool,
  Operation,
} from "@hv/uikit-react-icons/dist/Generic";

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
    <VerticalNavigation isCollapsable={false}>
      <Navigation
        label="Example 1 navigation"
        selected={value}
        onClick={(event, data) => {
          console.log(data);
          setValue(data.id);
        }}
        data={navigationData}
      />
    </VerticalNavigation>
  );
}

export default <MyVerticalNavigation />;
