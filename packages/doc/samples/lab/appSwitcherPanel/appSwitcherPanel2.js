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

import DefaultHeader from "./utils/DefaultHeader";
import AppSwitcherToggle from "./utils/AppSwitcherToggle";

const appSwitcherToggleProps = {
  title: "Dummy Apps with footer and a really big name to not fit in the container",
  applications: [
    {
      name: "UI-KIT Storybook",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top",
    },
    {
      name: "UI-KIT Storybook (New Tab)",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This is the Storybook for the UI-KIT project",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_blank",
    },
    {
      name: "UI-KIT Storybook - This one has a bigger name than the others just so we can see the truncation!!!",
      iconUrl:
        "https://pbs.twimg.com/profile_images/1100804485616566273/sOct-Txm_400x400.png",
      description: "This application has a bigger name than the others so we can see the truncation in action",
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: "_top",
    },
    {
      name: "Pentaho GitHub",
      iconUrl: "https://logodix.com/logo/1960244.png",
      description: "This is the Pentaho repository on Github",
      url: "https://github.com/pentaho/"
    },
    {
      name: "Google",
      iconUrl:
        "https://p7.hiclipart.com/preview/249/19/631/google-logo-g-suite-google-guava-google-plus.jpg",
      url: "https://www.google.com/",
      target: "_top",
    },
    {
      name: "No Icon App",
      description:
        "This is an App without an icon, URL is set to the UI-KIT storybook",
      url: "https://pentaho.github.io/hv-uikit-react/"
    },

    {
      name: "No Description App",
      url: "https://pentaho.github.io/hv-uikit-react/"
    },
    {
      name: "YouTube",
      iconUrl: "https://logodix.com/logo/2735.png",
      description: "YouTube page",
      url: "https://www.youtube.com/"
    },
    {
      name: "GitHub",
      iconUrl: "https://logodix.com/logo/64427.png",
      description: "GitHub page",
      url: "https://www.github.com/"
    }
  ],
  footer: <div>This is the footer</div>
};

export default (
  <DefaultHeader>
    <AppSwitcherToggle {...appSwitcherToggleProps} />
  </DefaultHeader>
);
