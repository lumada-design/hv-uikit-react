export * from "./Components";
export * from "./Pages";
export * from "./Sections";
export * from "./Templates";

import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import useEditorStore from "lib/store/useEditorStore";

import { Navbar } from "./Navbar";
import * as Panels from ".";

import classes from "./styles";

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

      {panels?.map(({ id, component }) => {
        const isActive = selected === id;
        const Component = Panels[component];

        return isActive && <Component key={id} />;
      })}
    </section>
  );
};
