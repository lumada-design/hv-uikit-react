import React, { useState } from "react";

import { HvCheckBoxGroup, HvCheckBox } from "../..";

export default {
  title: "Forms/Checkbox Group",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCheckBoxGroup } from '@hv/uikit-react-core/dist'",
  },
  component: HvCheckBoxGroup,
};

export const Main = () => (
  <HvCheckBoxGroup showSelectAll label="Choose your favorite checkboxes" name="favorite">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

Main.story = {
  parameters: {
    v3: true,
  },
};

export const Horizontal = () => (
  <HvCheckBoxGroup
    orientation="horizontal"
    label="Choose your favorite checkboxes"
    description="Horizontally, this time"
  >
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

Horizontal.story = {
  parameters: {
    docs: {
      description: {
        story: "Layout checkboxes horizontally.",
      },
    },
    v3: true,
  },
};

export const Disabled = () => (
  <HvCheckBoxGroup
    showSelectAll
    disabled
    label="No way to choose"
    description="They're all disabled"
  >
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

Disabled.story = {
  parameters: {
    docs: {
      description: {
        story: "Disabled checkbox group.",
      },
    },
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
    v3: true,
  },
};

export const ReadOnly = () => (
  <HvCheckBoxGroup showSelectAll readOnly label="Can't change anything">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

ReadOnly.story = {
  parameters: {
    docs: {
      description: {
        story: "Not editable checkbox group.",
      },
    },
    v3: true,
  },
};

export const WithoutLabel = () => (
  <HvCheckBoxGroup aria-label="Non-visible label sample">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

WithoutLabel.story = {
  parameters: {
    docs: {
      description: {
        story:
          "A checkbox group without label. The accessible name is provided via the `aria-label` property.",
      },
    },
    v3: true,
  },
};

export const Required = () => (
  <>
    <HvCheckBoxGroup orientation="horizontal" label="Select at least one" required>
      <HvCheckBox label="Checkbox 1" value="1" />
      <HvCheckBox label="Checkbox 2" value="2" checked />
      <HvCheckBox label="Checkbox 3" value="3" />
    </HvCheckBoxGroup>
  </>
);

Required.story = {
  parameters: {
    docs: {
      description: {
        story: "Required checkbox group. Uncheck all checkboxes to show default error message.",
      },
    },
    v3: true,
  },
};

export const Controlled = () => {
  const [value, setValue] = useState(["2"]);

  const handleOnChange = (_evt, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <HvCheckBoxGroup
      label="Choose the best checkbox"
      value={value}
      onChange={handleOnChange}
      showSelectAll
    >
      <HvCheckBox label="Checkbox 1" value="1" />
      <HvCheckBox label="Checkbox 2" value="2" />
      <HvCheckBox label="Checkbox 3" value="3" />
    </HvCheckBoxGroup>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      description: {
        story: "Controlled checkbox group.",
      },
    },
    v3: true,
  },
};

export const ErrorMessage = () => (
  <HvCheckBoxGroup status="invalid" statusMessage="No way for this to be valid!" label="Choose">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

ErrorMessage.story = {
  parameters: {
    pa11y: {
      ignore: [
        "region",
        // aria-errormessage value is being reported as invalid, but the references an existing ID
        "aria-valid-attr-value",
      ],
    },
    v3: true,
  },
};
