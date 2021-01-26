import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvProvider, HvButton } from "@hv/uikit-react-core";

const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px"
  }
})(HvButton);

export default {
  title: "Foundation/Theming/Provider",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvProvider } from "@hv/uikit-react-core";'
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
