import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvProvider, HvButton } from "@hitachivantara/uikit-react-core";

const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px",
  },
})(HvButton);

export default {
  title: "Foundation/Provider",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvProvider } from "@hitachivantara/uikit-react-core";',
  },
  component: HvProvider,
};

export const Main = () => (
  <>
    <HvProvider uiKitTheme="dawn" generateClassNameOptions={{ seed: "dawn" }}>
      <HvButtonWithMargin category="secondary">Dawn</HvButtonWithMargin>
    </HvProvider>
    <HvProvider uiKitTheme="wicked" generateClassNameOptions={{ seed: "wicked" }}>
      <HvButtonWithMargin category="secondary">Wicked</HvButtonWithMargin>
    </HvProvider>
  </>
);
