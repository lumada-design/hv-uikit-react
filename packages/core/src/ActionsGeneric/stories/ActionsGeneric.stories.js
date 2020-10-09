/* eslint-disable react/prop-types */
import React from "react";
import { Add, Delete, Lock, Preview } from "@hv/uikit-react-icons";
import HvActionsGeneric from "..";

export default {
  title: "Components/Actions Generic",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvActionsGeneric } from '@hv/uikit-react-core/dist'",
    dsVersion: "3.2.0",
  },
  component: HvActionsGeneric,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <HvActionsGeneric
    actions={[
      { id: "add", label: "Add", iconCallback: () => <Add /> },
      { id: "delete", label: "Delete", iconCallback: () => <Delete /> },
      { id: "lock", label: "Lock", iconCallback: () => <Lock /> },
      { id: "put", label: "Preview", iconCallback: () => <Preview /> },
    ]}
    maxVisibleActions={2}
  />
);
