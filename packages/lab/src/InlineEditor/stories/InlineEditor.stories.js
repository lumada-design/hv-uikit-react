import React, { useState } from "react";
import { HvContainer, HvGrid, HvTextArea } from "@hv/uikit-react-core";

import { HvInlineEditor } from "../..";

export default {
  title: "Lab/Inline Editor",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInlineEditor } from '@hv/uikit-react-lab'",
  },
  component: HvInlineEditor,
};

export const Main = () => (
  <div style={{ maxWidth: 400 }}>
    <HvInlineEditor />
  </div>
);

export const LargeVariants = () => {
  const [value, setValue] = useState("Very very very long text that is likely to be truncated");
  const variants = [
    "3xlTitle",
    "xxlTitle",
    "xlTitle",
    "lTitle",
    "mTitle",
    "sTitle",
    "xsTitle",
    "xxsTitle",
    "sectionTitle",
    "normalText",
    "placeholderText",
    "link",
    "disabledText",
    "selectedNavText",
    "vizText",
    "vizTextDisabled",
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

LargeVariants.parameters = {
  docs: {
    description: {
      story: "Inline Editor with a large Typography and long text that is truncated.",
    },
  },
};

export const TextArea = () => (
  <HvInlineEditor
    variant="sTitle"
    defaultValue="Initial value"
    component={HvTextArea}
    rows={6}
    typographyProps={{ style: { whiteSpace: "pre-wrap", textAlign: "initial" } }}
  />
);

TextArea.parameters = {
  docs: {
    description: {
      story:
        "Inline Editor with editor as TextArea. You may use a component that extends `HvBaseInput` (such as the default `HvInput` or `HvTextArea`), or create your own based on it",
    },
  },
};

export const Form = () => {
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const { username } = evt.target;
    alert(`Submitted: ${username.value}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <HvInlineEditor name="username" defaultValue="John Doe" />
    </form>
  );
};

TextArea.parameters = {
  docs: {
    description: {
      story: "Inline Editor being used as part of a form. Press `Enter` to submit the form. ",
    },
  },
};
