import { Panel } from "components/common";
import useEditorStore from "lib/store/useEditorStore";

export const Templates = () => {
  const {
    leftPanel: { selected },
  } = useEditorStore();

  return <Panel label={selected}></Panel>;
};
