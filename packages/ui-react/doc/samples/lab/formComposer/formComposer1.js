import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import HvFormComposer from "@hv-ui/react/core/FormComposer";

import Input from "@hv-ui/react/core/Input";
import HvButton from "@hv-ui/react/core/Button";

const inputTextConfiguration = {
  inputLabel: "Default",
  placeholder: "Placeholder value",
  infoText: "Info text is here"
};

const groups = [
  {
    title: "Group1",
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
