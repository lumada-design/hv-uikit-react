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
import SearchBox from "@hv/uikit-react-core/dist/SearchBox";

const suggestionHandler = value => {
  let random = Math.random()
    .toString(36)
    .substring(7);
  if (typeof value === "string" && value !== "") {
    return [
      {
        id: "2",
        label: `${value} first suggestion`
      },
      {
        id: "3",
        label: `${value} second suggestion`
      },
      {
        id: "4",
        label: `${random} second suggestion`
      }
    ];
  } else {
    return null;
  }
};

export default (
  <SearchBox
    suggestionListCallback={suggestionHandler}
    suggestionSelectedCallback={item => alert(item.label + " selected")}
    onChange={value => alert(value + " submitted")}
  />
);
