import { useEffect, useState } from "react";
import { HvContainer, HvTab, HvTabs } from "@hitachivantara/uikit-react-core";

import { Classes } from "./Classes";
import { Props } from "./Props";

export const Page = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (tab === 0) return;

    const tocElement = document.querySelector<HTMLElement>("nav.nextra-toc");
    if (tocElement) {
      tocElement.style.display = "none";
    }
  }, [tab]);

  return (
    <div className="pt-md">
      <HvTabs
        variant="fullWidth"
        value={tab}
        onChange={(_, val) => setTab(val)}
        className="mt-2 mb-4 w-360px"
      >
        <HvTab label="Usage" />
        <HvTab label="Props" />
        <HvTab label="Classes" />
      </HvTabs>
      <HvContainer disableGutters>
        {tab === 0 && children}
        {tab === 1 && <Props />}
        {tab === 2 && <Classes />}
      </HvContainer>
    </div>
  );
};
