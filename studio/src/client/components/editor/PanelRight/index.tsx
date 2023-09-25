import { HvTypography } from "@hitachivantara/uikit-react-core";

import useEditorStore from "lib/store/useEditorStore";
import classes from "./styles";

export const PanelRight = () => {
  const { rightPanel } = useEditorStore();

  return (
    <section className={classes.panelRight}>
      <HvTypography className={classes.title}>{rightPanel.label}</HvTypography>
    </section>
  );
};
