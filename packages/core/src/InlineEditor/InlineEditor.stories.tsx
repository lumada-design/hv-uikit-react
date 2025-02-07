import { useState } from "react";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvGrid,
  HvInlineEditor,
  HvInlineEditorProps,
  HvInput,
  HvTypographyVariants,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<HvInlineEditorProps> = {
  title: "Components/Inline Editor",
  component: HvInlineEditor,
};
export default meta;

const decorator: Decorator = (Story) => (
  <div style={{ width: 300 }}>{Story()}</div>
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

export const Main: StoryObj<typeof HvInlineEditor<typeof HvInput>> = {
  args: {
    showIcon: false,
    variant: "body",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  decorators: [decorator],
  render: (args) => <HvInlineEditor {...args} />,
};

export const Disabled: StoryObj<HvInlineEditorProps> = {
  decorators: [decorator],
  render: () => <HvInlineEditor disabled />,
};

export const Controlled: StoryObj<HvInlineEditorProps> = {
  decorators: [decorator],
  render: () => {
    const [value, setValue] = useState("My value");

    return (
      <HvInlineEditor
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        onBlur={(event, newValue) => setValue(newValue)}
        onKeyDown={(event, newValue) => setValue(newValue)}
      />
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
    docs: { disable: true },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-5px justify-start items-start">
        <HvInlineEditor />
        <HvInlineEditor showIcon />
        <HvInlineEditor disabled />
        <HvInlineEditor disabled showIcon />
        {variants.map((variant) => (
          <div style={{ maxWidth: 300 }} key={variant}>
            <HvInlineEditor
              variant={variant}
              value="Very very very long text that is likely to be truncated"
            />
          </div>
        ))}
      </div>
    );
  },
};
