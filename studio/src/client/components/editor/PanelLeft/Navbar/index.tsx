import * as Icons from "@hitachivantara/uikit-react-icons";

import { IconButton } from "components/common";
import { useEditorStore } from "lib/hooks/useEditorStore";

import classes from "./styles";

export const Navbar = () => {
  const {
    setLeftPanelSelected,
    leftPanel: { panels, selected },
  } = useEditorStore();

  return (
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
  );
};
