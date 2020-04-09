/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvProvider, HvButton } from "@hv/uikit-react-core/dist";

const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px"
  }
})(HvButton);

export default {
  title: "Foundation/Theming/Provider",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvProvider } from '@hv/uikit-react-core/dist'"
  },
  component: HvProvider
};

export const Usage = () => (
  <>
    <HvProvider>
      <HvButtonWithMargin category="secondary">Wicked</HvButtonWithMargin>
    </HvProvider>
    <HvProvider uiKitTheme="dawn">
      <HvButtonWithMargin category="secondary">Dawn</HvButtonWithMargin>
    </HvProvider>
  </>
);
