import React, {useState} from "react";
import HvCookiesConsentDialog from "..";
import { HvButton } from "@hv/uikit-react-core"; // for named export update to lab index.js

export default {
  title: "Lab/CookiesConsentDialog",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCookiesConsentDialog } from '@hv/uikit-react-lab'",
  },
  component: HvCookiesConsentDialog,
};

export const Main = () => {
  const [open, setOpen] = useState(false);


  const title = "This website uses cookies";
  const description = "A description very very long";
  const buttons = (
    <>
      <HvButton type="ghost">Accept</HvButton>
      <HvButton type="ghost">Settings</HvButton>
    </>
  );

  return (
    <>
      <div>
        <HvButton onClick={() => setOpen(true)}>Cookies</HvButton>
      </div>
      <HvCookiesConsentDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        buttons={buttons}
      />
    </>
  );
}
