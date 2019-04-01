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
import HvBreadCrumb from "@hv-ui/react/core/BreadCrumb";

const data = [
  {
    label: "Label1",
    path: "route1"
  },
  {
    label: "Label2",
    path: "route2"
  },
  {
    label: "Label3",
    path: "route3"
  },
  {
    label: "Label4",
    path: "route4"
  },
  {
    label: "Label5",
    path: "route5"
  },
  {
    label: "Label6",
    path: "route6"
  },
  {
    label: "Label7",
    path: "route7"
  },
  {
    label: "Label8",
    path: "route8"
  }
];

export default (
  <HvBreadCrumb listRoute={data} useRouter={false} maxVisible={2} />
);
