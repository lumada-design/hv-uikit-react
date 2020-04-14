import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvInput from "@hv/uikit-react-core/dist/Input";
import HvButton from "@hv/uikit-react-core/dist/Button";
import HvFormComposer from "@hv/uikit-react-lab/dist/FormComposer";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

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

const inputStyles = theme => ({
  container: {
    padding: `${theme.hv.spacing.xs}px 0`
  }
});

const CustomInput = withStyles(inputStyles)(HvInput);

const groups = [
  {
    title: "Group 1 - Input",
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

const CustomButton = withStyles(buttonStyles)(HvButton);

const footerContent = [
  <CustomButton
    colorType="secondary"
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
