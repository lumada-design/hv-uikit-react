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

import HvButton from "@hv/uikit-react-core/Button";
import HvInput from "@hv/uikit-react-core/Input";
import HvFormComposer from "@hv/uikit-react-lab/FormComposer";


const inputTextConfiguration = {
  inputLabel: "Default",
  placeholder: "Placeholder value",
  infoText: "Info text is here"
};

const groups = [
  {
    title: "Group1",
    children: [
      <HvInput
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 1"
        }}
        name="input1"
        onChange={value => value}
        value="Some text 1"
      />,
      <HvInput
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
    title: "Group2",
    children: [
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 3"
        }}
        name="input3"
        value="Some text 3"
      />,
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 4"
        }}
        name="input4"
      />
    ]
  },
  {
    title: "Group3",
    children: [
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 5"
        }}
        name="input5"
      />,
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 6"
        }}
        name="input6"
      />
    ]
  },
  {
    title: "Group4",
    children: [
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 7"
        }}
        name="input7"
      />,
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 8"
        }}
        name="input8"
      />
    ]
  },
  {
    title: "Group5",
    children: [
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 9"
        }}
        name="input9"
      />,
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 10"
        }}
        name="input10"
      />
    ]
  },
  {
    title: "Group6",
    children: [
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 11"
        }}
        name="input11"
      />,
      <Input
        inputTextConfiguration={{
          ...inputTextConfiguration,
          inputLabel: "Input 12"
        }}
        name="input12"
      />
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
