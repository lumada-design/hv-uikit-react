import { useEffect, useState } from "react";
import { HvContainer, HvTab, HvTabs } from "@hitachivantara/uikit-react-core";

import { Classes } from "./usage/Classes";
import { Description } from "./usage/Description";
import { Props } from "./usage/Props";

/**
 * The `Header` component manages a tab-based layout
 * and dynamically displays specific sections based on the selected tab.
 */
export const Header = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const tocElement = document.querySelector<HTMLElement>("nav.nextra-toc");
    if (tocElement) {
      tocElement.style.display = tab === 0 ? "block" : "none";
    }
  }, [tab]);

  return (
    <div
      // Hide sibling elements except for the last child when tab !== 0.
      className={tab === 0 ? "" : "[&~*:not(:last-child)]:hidden"}
    >
      <Description />
      <div className="pt-md">
        <HvTabs
          variant="fullWidth"
          value={tab}
          onChange={(_, value) => setTab(value)}
          className="mt-2 mb-4 w-360px"
        >
          <HvTab label="Usage" />
          <HvTab label="Props" />
          <HvTab label="Classes" />
        </HvTabs>
        <HvContainer disableGutters className="mb-8">
          {tab === 1 && <Props />}
          {tab === 2 && <Classes />}
        </HvContainer>
      </div>
    </div>
  );
};
