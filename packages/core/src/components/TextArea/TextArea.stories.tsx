import { Meta, StoryObj } from "@storybook/react";
import { HvTypography } from "components";
import { useEffect, useState } from "react";
import { HvTextArea, HvTextAreaProps } from "./TextArea";

const meta: Meta<typeof HvTextArea> = {
  title: "Inputs/Text Area",
  component: HvTextArea,
  decorators: [(Story) => <div style={{ maxWidth: 600 }}>{Story()}</div>],
};

export default meta;

export const Main: StoryObj<HvTextAreaProps> = {
  args: {
    label: "Label",
    placeholder: "Enter value",
    rows: 5,
    invalid: false,
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
    countCharProps: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvTextArea id="main" {...args} />;
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
        id="limited-custom-label"
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
    const [textLength, setTextLength] = useState<number>(0);

    const setCounter = (_, data) => {
      setTextLength(data.length);

      return data;
    };

    return (
      <HvTextArea
        id="limited-blocking"
        defaultValue="Some text"
        rows={5}
        label="Label"
        placeholder="Enter value"
        maxCharQuantity={10}
        blockMax
        onChange={setCounter}
        countCharProps={{
          "aria-label": `You have inserted ${textLength} characters`,
        }}
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
        id="resize"
        label="Label"
        placeholder="Enter value"
        rows={5}
        maxCharQuantity={1000}
        resizable
      />
    );
  },
};

export const Disabled: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: { story: "Text area that does not allows any interaction." },
    },
  },
  render: () => {
    return (
      <HvTextArea
        id="disabled"
        rows={5}
        label="Label"
        placeholder="Enter value"
        maxCharQuantity={1500}
        disabled
      />
    );
  },
};

export const ReadOnly: StoryObj<HvTextAreaProps> = {
  parameters: {
    docs: {
      description: { story: "Not editable text area." },
    },
  },
  render: () => {
    return (
      <HvTextArea
        readOnly
        rows={5}
        label="Label"
        placeholder="Enter value"
        defaultValue="You can't change this..."
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
        id="custom-validation"
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
        story: "Text area with autoscroll.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
      let idx = 1;
      let newline;

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
      <>
        <HvTypography variant="title4">Description:</HvTypography>
        <HvTypography>
          Autoscrolling textarea. It should be automatically scrolled down until
          the user scrolls up at which point the automatic scrolling stops. It
          will resume as soon as the user scrolls fully to the bottom again.
        </HvTypography>
        <br />
        <HvTypography variant="title4">Example:</HvTypography>
        <br />
        <HvTextArea
          id="custom-validation"
          rows={5}
          label="Logs"
          placeholder="Enter value"
          autoScroll
          value={value}
        />
      </>
    );
  },
};
