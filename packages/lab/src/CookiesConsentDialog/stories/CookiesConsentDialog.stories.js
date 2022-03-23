import React from "react";
import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";
import { HvCookiesConsentDialog } from "../..";

export default {
  title: "Lab/CookiesConsentDialog",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCookiesConsentDialog } from '@hitachivantara/uikit-react-lab'",
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
      <HvButton category="ghost" onClick={() => setOpen(false)}>Accept</HvButton>
      <HvButton category="ghost">See cookie settings</HvButton>
    </>
  );
  return (
    <>
      <HvButton onClick={() => setOpen(true)}>Cookies Dialog</HvButton>
      <HvCookiesConsentDialog
        title={title}
        description={description}
        buttons={buttons}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Sample2 = () => {
  return <HvCookiesConsentDialog id="sample2" />;
};

Sample2.parameters = {
  docs: {
    description: { story: "Sample 2 description." },
  },
};
