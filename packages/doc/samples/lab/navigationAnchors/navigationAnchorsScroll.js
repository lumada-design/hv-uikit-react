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
import HvNavigationAnchors from "@hv/uikit-react-lab/dist/NavigationAnchors";

const options = [
  {
    label: "Option1",
    value: "Id1"
  },
  {
    label: "Option2",
    value: "Id2"
  },
  {
    label: "Option3",
    value: "Id3"
  },
  {
    label: "Option4",
    value: "Id4"
  }
];

export default (
  <div style={{ display: "flex" }}>
    <HvNavigationAnchors
      style={{ position: "auto", background: "red" }}
      href
      options={options}
      floating={false}
      scrollElementId="pageContentId"
    />
    <div
      id="pageContentId"
      style={{
        width: "800px",
        height: "600px",
        overflow: "auto"
      }}
    >
      <div
        id="Id1"
        style={{
          height: "400px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
      <div
        id="Id2"
        style={{
          height: "150px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
      <div
        id="Id3"
        style={{
          height: "500px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
      <div
        id="Id4"
        style={{
          height: "300px",
          backgroundColor: "#D1D2D3",
          marginBottom: "20px"
        }}
      />
    </div>
  </div>
);
