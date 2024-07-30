import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvGrid,
  HvInlineEditor,
  HvInput,
  HvTypographyVariants,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvInlineEditor<typeof HvInput>> = {
  title: "Components/Inline Editor",
  component: HvInlineEditor,
};
export default meta;

export const Main: StoryObj<typeof HvInlineEditor> = {
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

export const Disabled: StoryObj<typeof HvInlineEditor<typeof HvInput>> = {
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
