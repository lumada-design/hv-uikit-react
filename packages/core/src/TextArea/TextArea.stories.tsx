import { useEffect, useState } from "react";
import { css } from "@emotion/css";
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
    label: {
      description:
        "The label of the form element. The form element must be labeled for accessibility reasons. If not provided, an aria-label or aria-labelledby must be provided instead.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    placeholder: {
      description: "The placeholder value of the text area.",
      table: {
        type: { summary: "string" },
      },
    },
    description: {
      description: "Provide additional descriptive text for the form element.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    status: {
      description:
        "The status of the form element. Valid is correct, invalid is incorrect and standBy means no validations have run. When uncontrolled and unspecified it will default to `standBy` and change to either `valid` or `invalid` after any change to the state.",
      table: {
        type: { summary: "HvFormStatus" },
      },
    },
    statusMessage: {
      description: "The error message to show when `status` is `invalid`.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    middleCountLabel: {
      description: "Text between the current char counter and max value.",
      table: {
        defaultValue: { summary: "/" },
        type: { summary: "string" },
      },
    },
    validationMessages: {
      description:
        "An Object containing the various texts associated with the input.",
      table: {
        type: { summary: "HvValidationMessages" },
      },
    },
    validation: {
      description:
        "The custom validation function, it receives the value and must return either `true` for valid or `false` for invalid, default validations would only occur if this function is null or undefined.",
      table: {
        type: { summary: "(value: string) => boolean" },
      },
    },
    maxCharQuantity: {
      description:
        "The maximum allowed length of the characters, if this value is null no check will be performed.",
      table: {
        type: { summary: "number" },
      },
    },
    minCharQuantity: {
      description:
        "The minimum allowed length of the characters, if this value is null no check will be performed.",
      table: {
        type: { summary: "number" },
      },
    },
    autoFocus: {
      description: "If `true` it should autofocus.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    rows: {
      description: "The number of rows of the text area.",
      table: {
        type: { summary: "number" },
      },
    },
    resizable: {
      description: "If `true` the component is resizable.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    autoScroll: {
      description:
        "Auto-scroll: automatically scroll to the end on value changes. Will stop if the user scrolls up and resume if scrolled to the bottom.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    blockMax: {
      description: "If `true` it isn't possible to pass the `maxCharQuantity`.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    hideCounter: {
      description:
        "If `true` the character counter isn't shown even if `maxCharQuantity` is set.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    countCharProps: {
      description: "Props passed to the char count.",
      control: { disable: true },
      table: {
        type: { summary: "Partial<HvCharCounterProps>" },
      },
    },
    onChange: {
      description: "Called back when the value is changed.",
      table: {
        type: {
          summary:
            "(event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void",
        },
      },
    },
    onBlur: {
      description: "Called back when the value is changed.",
      table: {
        type: {
          summary:
            "(event: React.FocusEvent<HTMLTextAreaElement>, value: string, validationState: HvInputValidity) => void",
        },
      },
    },
    onFocus: {
      description:
        "The function that will be executed onBlur, allows checking the value state, it receives the value.",
      table: {
        type: {
          summary:
            "(event: React.FocusEvent<HTMLTextAreaElement>, value: string) => void",
        },
      },
    },
    classes: {
      description:
        "A Jss Object used to override or extend the styles applied to the component.",
      table: {
        type: { summary: "HvTextAreaClasses" },
      },
      control: { disable: true },
    },
  },
  render: (args) => {
    return <HvTextArea {...args} />;
  },
};

export const Variants: StoryObj<HvTextAreaProps> = {
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: () => {
    const classes = {
      root: css({
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        "& > div": {
          width: 130,
        },
      }),
    };

    return (
      <div className={classes.root}>
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
      </div>
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
