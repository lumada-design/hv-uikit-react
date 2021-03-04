import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvProvider, HvButton } from "@hv/uikit-react-core";

import componentDefinitions from "../../GetStarted/ComponentVersioningTable/versions";

const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px",
  },
})(HvButton);

export default {
  title: "Foundation/Theming/Provider",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvProvider } from '@hv/uikit-react-core'",
    maturityStatus: componentDefinitions.dsClassification.stable,
    dsVersion: componentDefinitions.dsVersion.v3,
  },
  component: HvProvider,
};

export const Usage = () => (
  <>
    <HvProvider uiKitTheme="dawn" generateClassNameOptions={{ seed: "dawn" }}>
      <HvButtonWithMargin category="secondary">Dawn</HvButtonWithMargin>
    </HvProvider>
    <HvProvider uiKitTheme="wicked" generateClassNameOptions={{ seed: "wicked" }}>
      <HvButtonWithMargin category="secondary">Wicked</HvButtonWithMargin>
    </HvProvider>
  </>
);
