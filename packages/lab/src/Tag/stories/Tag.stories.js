import * as React from "react";

import { HvTag } from "../Tag";

export default {
  title: "Lab/Tag",
  parameters: {
    componentSubtitle: "This component is deprecated. Please use the one in Core.",
    usage: 'import { HvTag } from "@hitachivantara/uikit-react-core"',

    dsVersion: "3.3.0",
  },
  component: HvTag,
};

export const Default = () => {
  return (
    <>
      <HvTag category="informational" id="Tag1">
        Hello
      </HvTag>
      <HvTag category="informational" id="Tag2" showcancelicon>
        How
      </HvTag>
      <HvTag category="informational" id="Tag3" shape="round">
        Are
      </HvTag>
      <HvTag category="informational" id="Tag4" showcancelicon shape="round">
        You
      </HvTag>
    </>
  );
};
Default.decorators = [
  (Story) => (
    <div
      style={{
        display: "inline",
        alignItems: "center",
        width: 400,
        justifyContent: "space-between",
      }}
    >
      <Story />
    </div>
  ),
];

export const Disabled = () => {
  return (
    <>
      <HvTag variant="informational" id="Tag1" disabled>
        Hello
      </HvTag>
      <HvTag variant="informational" id="Tag2" disabled showcancelicon>
        Hello
      </HvTag>
      <HvTag variant="informational" id="Tag2" disabled>
        Hello
      </HvTag>
      <HvTag variant="informational" id="Tag3" disabled shape="round">
        Example
      </HvTag>
    </>
  );
};
Disabled.decorators = [
  (Story) => (
    <div
      style={{
        display: "inline-block",
        alignItems: "center",
        width: 400,
        justifyContent: "space-between",
      }}
    >
      <Story />
    </div>
  ),
];

export const Variant = () => {
  return (
    <>
      <HvTag semantic="sema1">Hello</HvTag>
      <HvTag semantic="sema2">Hello</HvTag>
      <HvTag semantic="sema3">Hello</HvTag>
      <HvTag semantic="sema4">Hello</HvTag>
    </>
  );
};
Variant.decorators = [
  (Story) => (
    <div
      style={{
        display: "inline-block",
        alignItems: "center",
        width: 400,
        justifyContent: "space-between",
      }}
    >
      <Story />
    </div>
  ),
];
