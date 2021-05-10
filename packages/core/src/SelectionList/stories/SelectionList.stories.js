import React, { useState } from "react";

import { HvSelectionList, HvListItem } from "../..";

export default {
  title: "Forms/Selection List",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSelectionList } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.2.0",
  },
  component: HvSelectionList,
};

export const Main = () => (
  <HvSelectionList
    id="main"
    label="Choose your favorite items"
    name="favorite"
    onChange={console.log}
  >
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
  </HvSelectionList>
);

export const Horizontal = () => (
  <HvSelectionList
    orientation="horizontal"
    label="Choose your favorite items"
    description="Horizontally, this time"
  >
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
  </HvSelectionList>
);

Horizontal.parameters = {
  docs: {
    description: { story: "Layout items horizontally." },
  },
};

export const Disabled = () => (
  <HvSelectionList disabled label="No way to choose" description="They're all disabled">
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
  </HvSelectionList>
);

Disabled.parameters = {
  docs: {
    description: { story: "Disabled selection list." },
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
};

export const ReadOnly = () => (
  <HvSelectionList readOnly label="Can't change anything">
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
  </HvSelectionList>
);

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable selection list." },
  },
};

export const WithoutLabel = () => (
  <HvSelectionList aria-label="Non-visible label sample">
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
  </HvSelectionList>
);

WithoutLabel.parameters = {
  docs: {
    description:
      "A selection list without label. The accessible name is provided via the `aria-label` property.",
  },
};

export const Controlled = () => {
  const [value, setValue] = useState(["2"]);
  const [status, setStatus] = useState("standBy");

  const handleOnChange = (_evt, newValue) => {
    console.log(newValue);
    setValue(newValue);

    if (newValue === "0") {
      setStatus("invalid");
    } else {
      setStatus("valid");
    }
  };

  return (
    <HvSelectionList
      label="Choose the best item"
      value={value}
      onChange={handleOnChange}
      status={status}
      statusMessage={'Don\'t select "ListItem 0"!'}
    >
      <HvListItem value="0">ListItem 0</HvListItem>
      <HvListItem value="1">ListItem 1</HvListItem>
      <HvListItem value="2">ListItem 2</HvListItem>
    </HvSelectionList>
  );
};

Controlled.parameters = {
  docs: {
    description: { story: "Controlled selection list." },
  },
};

export const ErrorMessage = () => (
  <HvSelectionList status="invalid" statusMessage="No way for this to be valid!" label="Choose">
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
  </HvSelectionList>
);

ErrorMessage.parameters = {
  pa11y: {
    ignore: [
      "region",
      // aria-errormessage value is being reported as invalid because axe-core forces
      // the referenced error element to have aria-live="assertive", when the spec does not
      // https://github.com/dequelabs/axe-core/pull/2590
      "aria-valid-attr-value",
    ],
  },
};

export const MultiSelection = () => (
  <HvSelectionList
    id="main"
    label="Choose your favorite items"
    name="favorite"
    onChange={console.log}
    multiple
  >
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2" selected>
      ListItem 2
    </HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
    <HvListItem value="4">ListItem 4</HvListItem>
    <HvListItem value="5">ListItem 5</HvListItem>
    <HvListItem value="6">ListItem 6</HvListItem>
  </HvSelectionList>
);

export const CleanMultiSelection = () => (
  <HvSelectionList
    id="main"
    label="Choose your favorite items"
    name="favorite"
    onChange={console.log}
    multiple
  >
    <HvListItem value="1">ListItem 1</HvListItem>
    <HvListItem value="2">ListItem 2</HvListItem>
    <HvListItem value="3">ListItem 3</HvListItem>
    <HvListItem value="4">ListItem 4</HvListItem>
    <HvListItem value="5">ListItem 5</HvListItem>
    <HvListItem value="6">ListItem 6</HvListItem>
  </HvSelectionList>
);
