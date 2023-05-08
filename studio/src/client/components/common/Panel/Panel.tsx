import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Pin, PinSelected } from "@hitachivantara/uikit-react-icons";

import { IconButton } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import classes from "./styles";

interface PanelProps {
  label?: string;
  actions?: React.ReactNode[];
  children?: React.ReactNode;
}

export const Panel = ({ label, actions, children }: PanelProps) => {
  const {
    setLeftPanelPinned,
    leftPanel: { pined },
  } = useEditorStore();

  return (
    <div className={classes.panel}>
      <div className={classes.header}>
        <HvTypography variant="label">{label}</HvTypography>
        <span style={{ marginLeft: "auto" }}>
          {actions?.map((action) => action)}
          <IconButton
            title={pined ? "Unpin" : "Pin"}
            onClick={() => {
              setLeftPanelPinned(!pined);
            }}
          >
            {pined ? <PinSelected iconSize="XS" /> : <Pin iconSize="XS" />}
          </IconButton>
        </span>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
