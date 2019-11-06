/*
 * Copyright 2019 Hitachi Vantara Corporation
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
import Alert from "@hv/uikit-react-icons/dist/Generic/Alert";
import Badge from "@hv/uikit-react-core/dist/Badge";

const navigationData = {
  showSearch: false,
  data: [
    {
      label: "Overview",
      path: "/"
    },
    {
      label: "Events",
      path: "/events"
    },
    {
      label: "Work orders",
      path: "/work"
    },
    {
      label: "Asset",
      path: "/asset"
    },
    {
      label: "Analytics",
      path: "/Analytics"
    },
    {
      label: "Resources",
      path: "/Resources"
    }
  ]
};

const boxStyles = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center"
};

const svgStyles = {
  margin: "0 auto"
};

const actionValues = [
  {
    label: "Notifications",
    horizontalItemAction: (
      <Badge
        count={88}
        icon={
          <Alert
            boxStyles={boxStyles}
            onClick={() => alert("Notification")}
            style={svgStyles}
          />
        }
      />
    ),
    path: "route3"
  }
];

export { navigationData, actionValues };
