/* eslint-disable no-alert */
import * as React from "react";

import { HvButton, HvTypography } from "@hv/uikit-react-core";

import HvCookiesConsentBanner from "../CookiesConsentBanner";
import CookiesConsentDialog from "../CookiesConsentDialog";

export default {
  title: "Lab/CookiesConsent",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCookiesConsentBanner, HvCookiesConsentDialog } from "@hv/uikit-react-lab"',
  },
  subcomponents: { HvCookiesConsentBanner, CookiesConsentDialog },
};

/**
 * Basic example of the form composer - Using only the Input component from the UI-KIT
 */
export const Main = () => {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <HvCookiesConsentBanner
        style={{ width: 810 }}
        title={title}
        description={description}
        buttons={buttons}
      />
      <div style={{ paddingTop: 30 }}>
        <HvButton onClick={() => setOpen(true)}>Cookies Dialog</HvButton>
      </div>
      <CookiesConsentDialog
        open={open}
        title={title}
        description={description}
        onClose={() => setOpen(false)}
        buttons={buttons}
      />
    </>
  );
};
