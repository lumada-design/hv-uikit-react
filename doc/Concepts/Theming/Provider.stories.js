import React from "react";
import { withStyles, useTheme } from "@mui/styles";

import {
  HvProvider,
  HvButton,
  useLocale,
  HvPanel,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import componentDefinitions from "../../Concepts/versions";

const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px",
  },
})(HvButton);

export default {
  title: "Theming/Provider",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvProvider } from '@hitachivantara/uikit-react-core'",
    dsVersion: componentDefinitions.dsVersion.v3,
  },
  component: HvProvider,
};

export const Main = () => (
  <>
    <HvProvider uiKitTheme="dawn" generateClassNameOptions={{ seed: "dawn" }} disableCssBaseline>
      <HvButtonWithMargin category="secondary">Dawn</HvButtonWithMargin>
    </HvProvider>
    <HvProvider
      uiKitTheme="wicked"
      generateClassNameOptions={{ seed: "wicked" }}
      disableCssBaseline
    >
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
      <HvProvider generateClassNameOptions={{ seed: "default" }} disableCssBaseline>
        <ShowLocale />
      </HvProvider>
      <HvProvider locale="fr-FR" generateClassNameOptions={{ seed: "fr-FR" }} disableCssBaseline>
        <ShowLocale />
      </HvProvider>
      <HvProvider locale="it-IT" generateClassNameOptions={{ seed: "it-IT" }} disableCssBaseline>
        <ShowLocale />
      </HvProvider>
    </>
  );
};
