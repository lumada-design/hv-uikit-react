import { Panel } from "components/common";
import useEditorStore from "lib/store/useEditorStore";

export const PanelTemplates = () => {
  const {
    leftPanel: { selected },
  } = useEditorStore();

  return <Panel label={selected}></Panel>;
};
