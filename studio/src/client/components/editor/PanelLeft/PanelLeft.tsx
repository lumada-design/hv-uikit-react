import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import * as Icons from "@hitachivantara/uikit-react-icons";

import useEditorStore from "lib/store/useEditorStore";
import { IconButton } from "components/common";
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
      <div className={classes.navBar}>
        {panels?.map(({ id, label, icon }) => {
          const isActive = selected === id;
          const Icon = Icons[icon];

          return (
            <IconButton
              key={id}
              title={label}
              onClick={() => {
                setLeftPanelSelected(id);
              }}
              selected={isActive}
              tooltipPlacement="right"
            >
              <Icon />
            </IconButton>
          );
        })}
      </div>

      {panels?.map(({ id, component }) => {
        const isActive = selected === id;
        const Panel = Panels[component];

        return isActive && <Panel key={id} />;
      })}
    </section>
  );
};
