import { HvButton, HvTypography } from "@hv/uikit-react-core";
import React from "react";
import HvCookiesConsentDialog from ".."; // for named export update to lab index.js

export default {
  title: "Lab/CookiesConsentDialog",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCookiesConsentDialog } from '@hv/uikit-react-lab'",
  },
  component: HvCookiesConsentDialog,
};

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
      <HvButton onClick={() => setOpen(true)}>Cookies Dialog</HvButton>

      <HvCookiesConsentDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        description={description}
        buttons={buttons}
      />
    </>
  );
};
