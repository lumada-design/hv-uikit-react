import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvGrid,
  HvInlineEditor,
  HvInlineEditorProps,
  HvInput,
  HvTypography,
  HvTypographyVariants,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<HvInlineEditorProps> = {
  title: "Components/Inline Editor",
  component: HvInlineEditor,
};
export default meta;

const variants: HvTypographyVariants[] = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
];

export const Main: StoryObj<typeof HvInlineEditor<typeof HvInput>> = {
  args: {
    showIcon: false,
    variant: "body",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <div style={{ width: 300 }}>
        <HvInlineEditor {...args} />
      </div>
    );
  },
};

export const Disabled: StoryObj<HvInlineEditorProps> = {
  render: () => {
    return (
      <div style={{ width: 300 }}>
        <HvInlineEditor disabled />
      </div>
    );
  },
};

export const LargeVariants = () => {
  const [value, setValue] = useState(
    "Very very very long text that is likely to be truncated",
  );

  return (
    <HvContainer>
      <HvGrid container>
        {variants.map((variant) => (
          <HvGrid item key={variant} xs={12} sm={6} style={{ minHeight: 64 }}>
            <HvInlineEditor
              variant={variant}
              value={value}
              onBlur={(evt, val) => setValue(val)}
              onChange={(evt, val) => setValue(val)}
            />
          </HvGrid>
        ))}
      </HvGrid>
    </HvContainer>
  );
};

export const Test: StoryObj = {
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { disable: true },
  },
  render: () => {
    return (
      <HvContainer>
        <HvTypography variant="title3">Enabled</HvTypography>
        <br />
        <HvInlineEditor />
        <br />
        <HvInlineEditor showIcon />
        <br />
        <HvTypography variant="title3">Disabled</HvTypography>
        <br />
        <HvInlineEditor disabled />
        <br />
        <HvInlineEditor disabled showIcon />
        <br />
        <HvTypography variant="title3">Typography Variants</HvTypography>
        <br />
        <HvGrid container>
          {variants.map((variant) => (
            <HvGrid item key={variant} xs={12} sm={6} style={{ minHeight: 64 }}>
              <HvInlineEditor
                variant={variant}
                value="Very very very long text that is likely to be truncated"
              />
            </HvGrid>
          ))}
        </HvGrid>
      </HvContainer>
    );
  },
};
