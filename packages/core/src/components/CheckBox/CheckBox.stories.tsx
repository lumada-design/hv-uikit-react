import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import { HvBaseCheckBox, HvGrid, HvTypography } from "components";
import { useState } from "react";
import { HvCheckBox, HvCheckBoxProps } from "./CheckBox";

const StyledDecorator = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  "& > *": {
    margin: "0 10px 5px 0",
  },
});

const meta: Meta<typeof HvCheckBox> = {
  title: "Inputs/Checkbox/Checkbox",
  component: HvCheckBox,
  subcomponents: { HvBaseCheckBox },
  decorators: [
    (Story) => (
      <StyledDecorator>
        <Story />
      </StyledDecorator>
    ),
  ],
};

export default meta;

export const Main: StoryObj<HvCheckBoxProps> = {
  args: { label: "Checkbox 0" },
  render: (args) => {
    return (
      <>
        <HvCheckBox {...args} />
        <HvCheckBox label="Checkbox 1" />
        <HvCheckBox defaultChecked label="Checkbox 2" />
        <HvCheckBox indeterminate label="Checkbox 3" />
      </>
    );
  },
};

export const Disabled: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story: "Disabled checkboxes.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvCheckBox disabled label="Checkbox 1" />
        <HvCheckBox defaultChecked disabled label="Checkbox 2" />
        <HvCheckBox indeterminate disabled label="Checkbox 3" />
      </>
    );
  },
};

export const ReadOnly: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story: "Not editable checkboxes.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvCheckBox readOnly label="Checkbox 1" />
        <HvCheckBox defaultChecked readOnly label="Checkbox 2" />
        <HvCheckBox indeterminate readOnly label="Checkbox 3" />
      </>
    );
  },
};

export const WithoutLabel: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Checkboxes without labels. The accessible name is provided via the `aria-label` property.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvCheckBox aria-label="Checkbox 1" />
        <HvCheckBox defaultChecked aria-label="Checkbox 2" />
        <HvCheckBox indeterminate aria-label="Checkbox 3" />
      </>
    );
  },
};

export const Required: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story: "Required checkbox. Uncheck to show default error message.",
      },
    },
  },
  render: () => {
    return <HvCheckBox required defaultChecked label="Checkbox 1" />;
  },
};

export const Controlled: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlled checkbox. Clicking the Checkbox 1 does nothing, while clicking Checkbox 2 changes both inputs.",
      },
    },
  },
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <>
        <HvCheckBox checked={isChecked} label="Checkbox 1" />
        <HvCheckBox
          checked={isChecked}
          onChange={(_, checked) => setIsChecked(checked)}
          label="Checkbox 2"
        />
      </>
    );
  },
};

export const ErrorMessage: StoryObj<HvCheckBoxProps> = {
  render: () => {
    return (
      <HvCheckBox
        status="invalid"
        statusMessage="No way for this to be valid!"
        label="Checkbox 1"
      />
    );
  },
};

export const ExternalErrorMessage: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
      },
    },
  },
  render: () => {
    const [firstCheckboxErrorMessage, setFirstCheckboxErrorMessage] = useState<
      string | null
    >(null);
    const [secondCheckboxErrorMessage, setSecondCheckboxErrorMessage] =
      useState<string | null>("No way for the second checkbox to be valid!");

    const StyledList = styled("ul")({
      margin: "16px 0px",
      paddingLeft: "40px",
    });

    const StyledTitle = styled(HvTypography)({
      color: theme.colors.base2,
    });

    return (
      <HvGrid container>
        <HvGrid item xs={5} container>
          <HvGrid item xs={12}>
            <HvCheckBox
              required
              defaultChecked
              aria-errormessage="firstCheckbox-error"
              onChange={(_, checked) => {
                if (checked) {
                  setFirstCheckboxErrorMessage(null);
                } else if (!checked) {
                  setFirstCheckboxErrorMessage(
                    "You must check the first checkbox"
                  );
                }
              }}
              label="First Checkbox"
            />
          </HvGrid>
          <HvGrid item xs={12}>
            <HvCheckBox
              status="invalid"
              aria-errormessage="secondCheckbox-error"
              onChange={() => {
                setSecondCheckboxErrorMessage(
                  "No way for the second checkbox to be valid! I told you!"
                );
              }}
              label="Second Checkbox"
            />
          </HvGrid>
        </HvGrid>
        <HvGrid item xs={7} container>
          <HvGrid
            style={{
              backgroundColor: theme.colors.sema9,
              color: theme.colors.base2,
            }}
            item
            xs={12}
            alignItems="center"
          >
            <StyledTitle as="h4" variant="title4">
              Form errors:
            </StyledTitle>
            <StyledList>
              {firstCheckboxErrorMessage && (
                <li id="firstCheckbox-error" aria-live="polite">
                  {firstCheckboxErrorMessage}
                </li>
              )}
              {secondCheckboxErrorMessage && (
                <li id="secondCheckbox-error" aria-live="polite">
                  {secondCheckboxErrorMessage}
                </li>
              )}
            </StyledList>
          </HvGrid>
        </HvGrid>
      </HvGrid>
    );
  },
};
