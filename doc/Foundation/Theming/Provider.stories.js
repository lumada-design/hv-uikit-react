import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { useTheme } from "@material-ui/core";

import {
  HvProvider,
  HvButton,
  useLocale,
  HvPanel,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import componentDefinitions from "../../GetStarted/ComponentVersioningTable/versions";

const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px",
  },
})(HvButton);

export default {
  title: "Foundation/Provider",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvProvider } from '@hitachivantara/uikit-react-core'",
    maturityStatus: componentDefinitions.dsClassification.stable,
    dsVersion: componentDefinitions.dsVersion.v3,
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

export const Locale = () => {
  const ShowLocale = () => {
    const activeLocale = useLocale();
    const theme = useTheme();

    return (
      <HvPanel width="30%" boxShadow={theme.hv.shadows[1]} margin="10px" display="inline-block">
        <HvTypography>{activeLocale}</HvTypography>
      </HvPanel>
    );
  };

  return (
    <>
      <HvProvider generateClassNameOptions={{ seed: "default" }}>
        <ShowLocale />
      </HvProvider>
      <HvProvider locale="fr-FR" generateClassNameOptions={{ seed: "fr-FR" }}>
        <ShowLocale />
      </HvProvider>
      <HvProvider locale="it-IT" generateClassNameOptions={{ seed: "it-IT" }}>
        <ShowLocale />
      </HvProvider>
    </>
  );
};
