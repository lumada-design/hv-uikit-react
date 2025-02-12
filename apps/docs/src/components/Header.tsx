import { useEffect } from "react";
import { useRouter } from "next/router";
import { HvContainer, HvTab, HvTabs } from "@hitachivantara/uikit-react-core";

import { Classes } from "./usage/Classes";
import { Description } from "./usage/Description";
import { Props } from "./usage/Props";

type TabId = "usage" | "props" | "classes";

/**
 * The `Header` component manages a tab-based layout
 * and dynamically displays specific sections based on the selected tab.
 */
export const Header = () => {
  const { query, push } = useRouter();

  const tab = (query.tab as TabId) || "usage";

  useEffect(() => {
    const tocElement = document.querySelector<HTMLElement>("nav.nextra-toc");
    if (tocElement) {
      tocElement.style.display = tab === "usage" ? "block" : "none";
    }
  }, [tab]);

  return (
    <div
      // Hide sibling elements except for the last child when tab !== 0.
      className={tab === "usage" ? "" : "[&~*:not(:last-child)]:hidden"}
    >
      <Description />
      <div className="pt-md">
        <HvTabs
          variant="fullWidth"
          value={tab}
          onChange={(_, value) => push({ query: { ...query, tab: value } })}
          className="mt-sm mb-md w-360px"
        >
          <HvTab value="usage" label="Usage" />
          <HvTab value="props" label="Props" />
          <HvTab value="classes" label="Classes" />
        </HvTabs>
        <HvContainer disableGutters className="mb-lg">
          {tab === "props" && <Props />}
          {tab === "classes" && <Classes />}
        </HvContainer>
      </div>
    </div>
  );
};
