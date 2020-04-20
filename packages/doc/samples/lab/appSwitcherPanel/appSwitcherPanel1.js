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

import { Tool } from "@hv/uikit-react-icons/dist/Generic";

import DefaultHeader from "./utils/DefaultHeader";
import AppSwitcherToggle from "./utils/AppSwitcherToggle";
import { boxStyles } from "./utils/boxStyles";

const appSwitcherToggleProps = {
  applications: [
    {
      iconUrl: "",
      description: "Application without a name should not appear",
      url: "https://github.com/pentaho/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App without url",
      iconUrl: "",
      description: "Application without a url should not appear",
      target: "_top",
    },
    {
      name: "",
      iconUrl: "",
      description: "Application with an empty name should not appear",
      url: "https://github.com/pentaho/hv-uikit-react",
      target: "_top",
    },
    {
      name: "App with empty url",
      iconUrl: "",
      url: "",
      description: "Application with an empty url should not appear",
      target: "_top",
    },
    {
      name: "UI-KIT Storybook",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top",
    },
    {
      name: "UI-KIT GitHub (New Tab)",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "This is the UI-KIT repository on Github",
      url: "https://github.com/pentaho/hv-uikit-react",
      target: "_blank"
    },
    {
      name: "App with a bigger name than the other just to showcase the truncation on the AppSwitcherPanel",
      iconElement: <Tool boxStyles={boxStyles} />,
      description: "App 1 description",
      url: "https://github.com/pentaho/hv-uikit-react",
      target: "_top"
    },
    {
      name: "No Icon App",
      description:
        "This is an App without an icon, URL is set to the UI-KIT storybook",
      url: "https://github.com/pentaho/hv-uikit-react",
    },
    {
      name: "No Description App",
      url: "https://github.com/pentaho/hv-uikit-react",
    }
  ]
};

export default (
  <DefaultHeader>
    <AppSwitcherToggle {...appSwitcherToggleProps} />
  </DefaultHeader>
);
