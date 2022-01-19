/* eslint-disable no-alert */
import * as React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { HvButton, HvDropdown, HvInput } from "@hitachivantara/uikit-react-core";

import HvFormComposer from "../FormComposer";

export default {
  title: "Lab/FormComposer",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFormComposer } from "@hitachivantara/uikit-react-lab"',
  },
  component: HvFormComposer,
};

/**
 * Basic example of the form composer - Using only the Input component from the UI-KIT
 */
export const Main = () => {
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
          label="Input 1"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input1"
          onChange={(event, value) => value}
          defaultValue="Some text 1"
        />,
        <CustomInput
          label="Input 2"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input2"
          defaultValue="Some text 2"
        />,
      ],
    },
    {
      title: "Group2",
      children: [
        <CustomInput
          label="Input 3"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input3"
          defaultValue="Some text 3"
        />,
        <CustomInput
          label="Input 4"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input4"
        />,
      ],
    },
    {
      title: "Group3",
      children: [
        <CustomInput
          label="Input 5"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input5"
        />,
        <CustomInput
          label="Input 6"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input6"
        />,
      ],
    },
    {
      title: "Group4",
      children: [
        <CustomInput
          label="Input 7"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input7"
        />,
        <CustomInput
          label="Input 8"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input8"
        />,
      ],
    },
    {
      title: "Group5",
      children: [
        <CustomInput
          label="Input 9"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input9"
        />,
        <CustomInput
          label="Input 10"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input10"
        />,
      ],
    },
    {
      title: "Group6",
      children: [
        <CustomInput
          label="Input 11"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input11"
        />,
        <CustomInput
          label="Input 12"
          description="Info text is here"
          placeholder="Placeholder value"
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
          label="Input 1"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input1"
          onChange={(event, value) => value}
          defaultValue="Some text 1"
        />,
        <CustomInput
          label="Input 2"
          description="Info text is here"
          placeholder="Placeholder value"
          name="input2"
          defaultValue="Some text 2"
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

WithComposition.parameters = {
  docs: {
    description: { story: "Example of the form composer using multiple components." },
  },
};
