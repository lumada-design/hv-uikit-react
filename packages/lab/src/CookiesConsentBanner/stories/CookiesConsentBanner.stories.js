import React from "react";

import { HvButton, HvTypography } from "@hv/uikit-react-core";

import { HvCookiesConsentBanner } from "../..";

export default {
  title: "Lab/CookiesConsentBanner",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCookiesConsentBanner } from '@hv/uikit-react-lab'",
  },
  component: HvCookiesConsentBanner,
};

export const Main = () => {
  const title = "This website uses cookies";
  const description = (
    <>
      This website uses cookies to offer you a better browsing experience. You consent to our
      cookies by clicking &quot;Accept&quot;. For more information, visit&nbsp;
      <HvTypography variant="link" component="a" href="http://www.hitachi.com">
        Hitachi Cookie Policy
      </HvTypography>
      .
    </>
  );
  const buttons = (
    <>
      <HvButton category="ghost" style={{ width: 70 }}>
        Accept
      </HvButton>
      <HvButton category="ghost" style={{ width: 150 }}>
        See cookie settings
      </HvButton>
    </>
  );

  return <HvCookiesConsentBanner title={title} description={description} buttons={buttons} />;
};
