/* eslint-disable no-alert */
import * as React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { HvButton, HvDropdown, HvInput } from "@hitachivantara/uikit-react-core";

import HvFormComposer from "../FormComposer";

export default {
  title: "Lab/FormComposer",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFormComposer } from "@hitachivantara/uikit-react-lab";',
  },
  component: HvFormComposer,
};

/**
 * Basic example of the form composer - Using only the Input component from the UI-KIT
 */
export const Main = () => {
  const inputTextConfiguration = {
    inputLabel: "Default",
    placeholder: "Placeholder value",
    infoText: "Info text is here",
  };

  const inputStyles = (theme) => ({
    root: {
      padding: `${theme.hv.spacing.xs}px 0`,
    },
  });

  const CustomInput = withStyles(inputStyles)(HvInput);

  const groups = [
    {
      title: "Group1",
      children: [
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 1",
          }}
          name="input1"
          onChange={(event, value) => value}
          initialValue="Some text 1"
        />,
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 2",
          }}
          name="input2"
          initialValue="Some text 2"
        />,
      ],
    },
    {
      title: "Group2",
      children: [
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 3",
          }}
          name="input3"
          initialValue="Some text 3"
        />,
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 4",
          }}
          name="input4"
        />,
      ],
    },
    {
      title: "Group3",
      children: [
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 5",
          }}
          name="input5"
        />,
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 6",
          }}
          name="input6"
        />,
      ],
    },
    {
      title: "Group4",
      children: [
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 7",
          }}
          name="input7"
        />,
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 8",
          }}
          name="input8"
        />,
      ],
    },
    {
      title: "Group5",
      children: [
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 9",
          }}
          name="input9"
        />,
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 10",
          }}
          name="input10"
        />,
      ],
    },
    {
      title: "Group6",
      children: [
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 11",
          }}
          name="input11"
        />,
        <CustomInput
          labels={{
            ...inputTextConfiguration,
            inputLabel: "Input 12",
          }}
          name="input12"
        />,
      ],
    },
  ];

  const buttonStyles = (theme) => ({
    root: {
      marginLeft: `${theme.hv.spacing.sm}px`,
    },
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
      onClick={(componentValues) => {
        console.log(componentValues);
      }}
    >
      Save
    </CustomButton>,
  ];

  return (
    <HvFormComposer
      mainTitle="Form composer title"
      groups={groups}
      hasNavigation
      hasFooter
      footerContent={footerContent}
    />
  );
};

export const WithComposition = () => {
  const data = [
    {
      label: "value 1",
      selected: false,
    },
    {
      label: "value 2",
      selected: false,
    },
    {
      label: "value 3",
      selected: true,
    },
    {
      label: "value 4",
      selected: false,
    },
  ];

  const inputStyles = (theme) => ({
    container: {
      padding: `${theme.hv.spacing.xs}px 0`,
    },
  });

  const CustomInput = withStyles(inputStyles)(HvInput);

  const groups = [
    {
      title: "Group 1 - Input",
      children: [
        <CustomInput
          labels={{
            inputLabel: "Input 1",
          }}
          name="input1"
          onChange={(event, value) => value}
          initialValue="Some text 1"
        />,
        <CustomInput
          labels={{
            inputLabel: "Input 2",
          }}
          name="input2"
          initialValue="Some text 2"
        />,
      ],
    },
    {
      title: "Group 2 - Dropdown",
      children: [
        <HvDropdown name="dropdown1" values={data} multiSelect showSearch label="Dropdown 1" />,
        <HvDropdown name="dropdown2" values={data} multiSelect showSearch label="Dropdown 2" />,
      ],
    },
  ];

  const buttonStyles = (theme) => ({
    root: {
      marginLeft: `${theme.hv.spacing.sm}px`,
    },
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
      onClick={(componentValues) => {
        console.log(componentValues);
      }}
    >
      Save
    </CustomButton>,
  ];

  return (
    <HvFormComposer
      mainTitle="Form composer title"
      groups={groups}
      hasNavigation
      hasFooter
      footerContent={footerContent}
    />
  );
};

WithComposition.story = {
  parameters: {
    docs: {
      storyDescription: "Example of the form composer using multiple components.",
    },
  },
};
