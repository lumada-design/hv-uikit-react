import { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HvTextArea, HvTextAreaProps } from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvTextArea> = {
  title: "Components/Text Area",
  component: HvTextArea,
  decorators: [(Story) => <div style={{ maxWidth: 600 }}>{Story()}</div>],
};

export default meta;

export const Main: StoryObj<HvTextAreaProps> = {
  args: {
    label: "Label",
    placeholder: "Enter value",
    rows: 5,
    resizable: false,
    description: "Textarea description",
    hideCounter: false,
    blockMax: false,
    autoScroll: false,
    minCharQuantity: 0,
    maxCharQuantity: 160,
    middleCountLabel: "of",
    statusMessage: "Oops, something's gone wrong!",
  },
  argTypes: {
    classes: { control: { disable: true } },
    countCharProps: { control: { disable: true } },
  },
  render: (args) => {
    return <HvTextArea {...args} />;
  },
};

export const Variants: StoryObj<HvTextAreaProps> = {
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-xs [&>*]:w-130px">{Story()}</div>
    ),
  ],
  render: () => {
    return (
      <>
        <HvTextArea
          rows={5}
          label="Required"
          placeholder="Enter value"
          maxCharQuantity={200}
          required
        />
        <HvTextArea
          rows={5}
          label="Disabled"
          placeholder="Enter value"
          maxCharQuantity={200}
          disabled
        />
        <HvTextArea
          rows={5}
          label="Readonly"
          placeholder="Enter value"
          maxCharQuantity={200}
          readOnly
        />
        <HvTextArea
          rows={5}
          label="Invalid"
          placeholder="Enter value"
          maxCharQuantity={200}
          status="invalid"
          statusMessage="Oh no!"
        />
      </>
    );
  },
};

export const LimitedWithCustomLabels: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: { story: "Text area char count with a custom labels." },
    },
  },
  render: () => {
    const validationMessages = {
      requiredError: "This text area can't be empty",
      maxCharError: "Too many characters",
    };

    return (
      <HvTextArea
        rows={5}
        label="Label"
        description="You can write past the limit"
        placeholder="Enter value"
        middleCountLabel="of"
        validationMessages={validationMessages}
        required
        maxCharQuantity={10}
      />
    );
  },
};

export const LimitedBlocking: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Text area that limits the quantity of character that can be introduced in the text area.",
      },
    },
  },
  render: () => {
    return (
      <HvTextArea
        defaultValue="Some text"
        rows={5}
        label="Label"
        placeholder="Enter value"
        maxCharQuantity={10}
        blockMax
      />
    );
  },
};

export const Resizable: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: { story: "Text area that allow resizing." },
    },
  },
  render: () => {
    return (
      <HvTextArea
        label="Label"
        placeholder="Enter value"
        rows={5}
        maxCharQuantity={1000}
        resizable
      />
    );
  },
};

export const WithoutLabel: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Text area without label. The accessible name is provided via the `aria-label` property.",
      },
    },
  },
  render: () => {
    return (
      <HvTextArea aria-label="The label" placeholder="Enter value" rows={5} />
    );
  },
};

export const CustomValidation: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: {
        story: "Text area value that can't contain numbers.",
      },
    },
  },
  render: () => {
    const validationMessages = {
      error: "This text area has a number",
    };

    const hasNumber = (value: string) => /\d/.test(value);

    return (
      <HvTextArea
        rows={5}
        label="Label"
        placeholder="Enter value"
        validationMessages={validationMessages}
        validation={(value) => !hasNumber(value)}
      />
    );
  },
};

export const AutoScroll: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Text Area using `autoScroll` to automatically scroll down. Auto-scroll stops once the user scrolls up, and resumes once the user scrolls back to the bottom.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
      let idx = 1;
      let newline: string;

      const id = setInterval(() => {
        newline = idx === 1 ? "" : "\n";
        setValue((val) => `${val}${newline}${idx}: ${Math.random()}`);
        idx += 1;
      }, 2000);

      return () => {
        clearInterval(id);
      };
    }, []);

    return (
      <HvTextArea
        rows={5}
        label="Logs"
        placeholder="Enter value"
        autoScroll
        value={value}
      />
    );
  },
};
