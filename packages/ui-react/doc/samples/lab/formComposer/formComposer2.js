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
import withStyles from "@material-ui/core/styles/withStyles";

import HvFormComposer from "@hv-ui/react/core/FormComposer";

import Input from "@hv-ui/react/core/Input";
import HvDropdown from "@hv-ui/react/core/Dropdown";
import HvButton from "@hv-ui/react/core/Button";

const inputTextConfiguration = {
  inputLabel: "Default",
  placeholder: "Placeholder value",
  infoText: "Info text is here"
};

const data = [
  {
    label: "value 1",
    selected: false
  },
  {
    label: "value 2",
    selected: false
  },
  {
    label: "value 3",
    selected: true
  },
  {
    label: "value 4",
    selected: false
  }
];

const groups = [
  {
    title: "Group 1 - Input",
    children: [
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 1"
        }}
        name="input1"
        onChange={value => value}
        value="Some text 1"
      />,
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 2"
        }}
        name="input2"
        value="Some text 2"
      />
    ]
  },
  {
    title: "Group 2 - Dropdown",
    children: [
      <HvDropdown name="dropdown1" values={data} multiSelect showSearch label="Dropdown 1" />,
      <HvDropdown name="dropdown2" values={data} multiSelect showSearch label="Dropdown 2" />
    ]
  }
];

const buttonStyles = theme => ({
  root: {
    marginLeft: `${theme.hv.spacing.sm}px`
  }
});

const CustomButton = withStyles(buttonStyles, { withTheme: true })(HvButton);

const footerContent = [
  <CustomButton
    colorType="secondary"
    onClick={componentValues => {
      console.log("ACTION CANCELLED!!!!!!");
    }}
  >
    Cancel
  </CustomButton>,
  <CustomButton
    onClick={componentValues => {
      console.log(componentValues);
    }}
  >
    Save
  </CustomButton>
];

export default (
  <HvFormComposer
    mainTitle="Form composer title"
    groups={groups}
    hasNavigation
    hasFooter
    footerContent={footerContent}
  />
);
