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

import { Tool, PingPong, GameController, Champion } from "@hv/uikit-react-icons/dist/Generic";

import DefaultHeader from "./utils/DefaultHeader";
import AppSwitcherToggle from "./utils/AppSwitcherToggle";

const boxStyles = {
  width: 32,
  height: 32
};

const appSwitcherToggleProps = {
  applications: [
    {
      name: "App 1 - Icon Tool",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "App 1 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    },
    {
      name: "App2 - Url icon",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "App 2 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    },
    {
      name: "App 3 - Icon PingPong",
      iconElement: <PingPong boxStyles={boxStyles} />,
      description: "App 3 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    },
    {
      name: "App 4 - No icon",
      description: "App 4 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    },
    {
      name: "App 5 - Icon GameController",
      iconElement: <GameController boxStyles={boxStyles} />,
      description: "App 5 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    },
    {
      name: "App6 - Wrong url icon",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.pn",
      description: "App 6 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    },
    {
      name: "App 7 - Icon Champion",
      iconElement: <Champion boxStyles={boxStyles} />,
      description: "App 7 description",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top"
    }
  ],
};

export default (
  <DefaultHeader>
    <AppSwitcherToggle {...appSwitcherToggleProps} />
  </DefaultHeader>
);
