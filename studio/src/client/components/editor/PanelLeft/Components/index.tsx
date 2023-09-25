import { Panel, PanelList } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import useAppStore from "lib/store/useAppStore";
import { groupBy } from "lib/utils";

export const Components = () => {
  const {
    leftPanel: { selected },
  } = useEditorStore();

  const { components } = useAppStore();

  const grouped = groupBy(components, "component");

  return (
    <Panel label={selected}>
      <PanelList items={grouped} />
    </Panel>
  );
};
