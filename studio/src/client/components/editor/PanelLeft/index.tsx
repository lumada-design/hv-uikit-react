import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useEditorStore } from "lib/hooks/useEditorStore";

import { Components } from "./Components";
import { Navbar } from "./Navbar";
import { Sections } from "./Sections";
import { Templates } from "./Templates";
import { Views } from "./Views";
import classes from "./styles";

const Panels = {
  Components,
  Sections,
  Templates,
  Views,
};

export const PanelLeft = () => {
  const ref = useRef(null);

  const {
    setLeftPanelSelected,
    leftPanel: { panels, selected, pined },
  } = useEditorStore();

  const handleClickOutside = () => {
    !pined && setLeftPanelSelected();
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <section ref={ref} className={classes.panelLeft}>
      <Navbar />

      {panels?.map(({ id, panel }) => {
        const isActive = selected === id;
        const Panel = Panels[panel];

        return isActive && <Panel key={id} />;
      })}
    </section>
  );
};
