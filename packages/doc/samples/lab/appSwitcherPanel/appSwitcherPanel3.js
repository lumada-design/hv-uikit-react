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

const getDummyApplicationsList = () => {
  const dummyApplicationsList = [];

  for (let index = 1; index <= 100; index++) {
    dummyApplicationsList.push({
      name: index % 3 === 0 ? `Application ${index} is an application with a big name` : `Application ${index}`,
      iconUrl: `https://i.picsum.photos/id/${index}/32/32.jpg`,
      description: `This is the auto-generated application number ${index}. Note: All the apps redirect to the UI-KIT storybook`,
      url: "https://pentaho.github.io/hv-uikit-react/",
      target: index % 2 === 0 ? "_top" : "_blank"
    });
  }
  return dummyApplicationsList;
};

const appSwitcherToggleProps = {
  title: "Big list of applications",
  applications: getDummyApplicationsList(),
  footer: <div>This is the footer</div>,
};

export default (
  <DefaultHeader>
    <AppSwitcherToggle {...appSwitcherToggleProps} />
  </DefaultHeader>
);
