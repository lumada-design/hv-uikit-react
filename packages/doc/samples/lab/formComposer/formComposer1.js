import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import HvButton from "@hv/uikit-react-core/dist/Button";
import HvInput from "@hv/uikit-react-core/dist/Input";
import HvFormComposer from "@hv/uikit-react-lab/dist/FormComposer";

const inputTextConfiguration = {
  inputLabel: "Default",
  placeholder: "Placeholder value",
  infoText: "Info text is here"
};

const inputStyles = theme => ({
  root: {
    padding: `${theme.hv.spacing.xs}px 0`
  }
});

const CustomInput = withStyles(inputStyles)(HvInput);

const groups = [
  {
    title: "Group1",
    children: [
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 1"
        }}
        name="input1"
        onChange={(event, value) => value}
        initialValue="Some text 1"
      />,
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 2"
        }}
        name="input2"
        initialValue="Some text 2"
      />
    ]
  },
  {
    title: "Group2",
    children: [
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 3"
        }}
        name="input3"
        initialValue="Some text 3"
      />,
      <CustomInput
        labels={{
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
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 5"
        }}
        name="input5"
      />,
      <CustomInput
        labels={{
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
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 7"
        }}
        name="input7"
      />,
      <CustomInput
        labels={{
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
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 9"
        }}
        name="input9"
      />,
      <CustomInput
        labels={{
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
      <CustomInput
        labels={{
          ...inputTextConfiguration,
          inputLabel: "Input 11"
        }}
        name="input11"
      />,
      <CustomInput
        labels={{
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

const CustomButton = withStyles(buttonStyles)(HvButton);

const footerContent = [
  <CustomButton
    category="secondary"
    onClick={() => {
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
