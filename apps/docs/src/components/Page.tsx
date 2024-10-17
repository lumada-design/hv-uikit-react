import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import {
  HvContainer,
  HvTab,
  HvTabs,
  theme,
} from "@hitachivantara/uikit-react-core";

import { Classes } from "./Classes";
import { Props } from "./Props";

const classes = {
  root: css({
    paddingTop: theme.space.lg,
    display: "flex",
    flexDirection: "column",
    gap: theme.space.md,
  }),
  container: css({
    position: "relative",
  }),
};

export const Page = ({ children }: { children: React.ReactNode }) => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const tocElement = document.querySelector<HTMLElement>("nav.nextra-toc");
    if (tocElement) {
      tocElement.style.display = tab !== 0 ? "none" : "block";
    }
  }, [tab]);

  return (
    <div className={classes.root}>
      <HvTabs variant="standard" value={tab} onChange={(_, val) => setTab(val)}>
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
